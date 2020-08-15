namespace Persistence.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        
        [Required]
        [MaxLength(128)]
        public string ProductName { get; set; }
        
        public ProductCategory ProductCategory { get; set; }
    }
}