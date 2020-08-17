namespace KassaDG.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Persistence.Entities;
    using Persistence.Repositories;

    public class OrderController : BaseController<Order>
    {
        private readonly IRepository<Account> _accountRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Order> _orderRepository;

        public OrderController(IRepository<Order> repository,
            IRepository<Account> accountRepository,
            IRepository<Product> productRepository,
            IRepository<Order> orderRepository) : base(repository)
        {
            _accountRepository = accountRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
        }

        [HttpPost]
        public StatusCodeResult Order(OrderCommand orderCommand)
        {
            try
            {
                SubtractFundsFromAccount(orderCommand);
                SaveOrder(orderCommand);
                RemoveProductsFromStock(orderCommand);
                Repository.SaveChanges();
            }
            catch (DbUpdateException)
            {
                return new StatusCodeResult(409);
            }

            return Ok();
        }

        private void SubtractFundsFromAccount(OrderCommand orderCommand)
        {
            var user = FindUser(orderCommand.AccountId);
            var totalPrice = CalculateTotalPrice(orderCommand.OrderCommandLines);
            user.BalanceCents -= totalPrice;
            if (orderCommand.Deposit != null)
            {
                user.BalanceCents += orderCommand.Deposit.Value;
            }
        }

        private void RemoveProductsFromStock(OrderCommand orderCommand)
        {
            foreach (var orderLine in orderCommand.OrderCommandLines)
            {
                RemoveFromStock(orderLine);
            }
        }

        private void RemoveFromStock(OrderCommandLine orderLine)
        {
            FindProduct(orderLine.Id).AmountInStock -= orderLine.Amount;
        }

        private void SaveOrder(OrderCommand orderCommand)
        {
            var order = new Order
            {
                Account = FindUser(orderCommand.AccountId),
                AccountId = orderCommand.AccountId,
                OrderDate = DateTimeOffset.Now,
                Deposit = orderCommand.Deposit
            };
            order.OrderLines = CreateOrderLines(orderCommand.OrderCommandLines, order);
            _orderRepository.Add(order);
        }

        private ICollection<OrderLine> CreateOrderLines(IEnumerable<OrderCommandLine> orderCommandLines, Order order)
        {
            return orderCommandLines.Select(x =>
            {
                var product = FindProduct(x.Id);
                return new OrderLine
                {
                    Amount = x.Amount,
                    ProductName = product.ProductName,
                    ProductPriceCents = product.PricePerPieceCents,
                    Order = order,
                    OrderId = order.Id
                };
            }).ToList();
        }

        private int CalculateTotalPrice(IEnumerable<OrderCommandLine> orderLines)
        {
            return orderLines
                .Select(x => x.Amount * FindProduct(x.Id).PricePerPieceCents)
                .Aggregate(0, (prev, cur) => prev + cur);
        }

        private Product FindProduct(int productId)
        {
            return _productRepository.Get().Single(x => x.Id == productId);
        }

        private Account FindUser(int id)
        {
            return _accountRepository.Get().Single(x => x.Id == id);
        }
    }
}