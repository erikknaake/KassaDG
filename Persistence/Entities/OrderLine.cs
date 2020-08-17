namespace Persistence.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class OrderLine : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        
        public string ProductName { get; set; }
        
        [Required]
        public int ProductPriceCents { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}