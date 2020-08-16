namespace Persistence.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class OrderLine
    {
        [Key]
        public int OrderLineId { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        [Required]
        public Order Order { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        [Required]
        public Product Product { get; set; }
        
        [Required]
        public int ProductPriceCents { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}