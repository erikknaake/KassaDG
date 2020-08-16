namespace Persistence.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        
        [Required]
        public DateTimeOffset OrderDate { get; set; }

        [Required]
        public int AccountId { get; set; }
        [Required]
        public Account Account { get; set; }
        
        public ICollection<OrderLine> OrderLines { get; set; }
    }
}