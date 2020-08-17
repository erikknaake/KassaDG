namespace Persistence.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ProductCategory : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(128)]
        public string CategoryName { get; set; }
        
        public ICollection<Product> Products { get; set; }
        
        public ICollection<ProductCategory> ChildrenCategories { get; set; }
        public ProductCategory ParentCategory { get; set; }
        public int? ParentCategoryId { get; set; }
    }
}