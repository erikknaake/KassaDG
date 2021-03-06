﻿namespace Persistence.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Product : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(128)]
        public string ProductName { get; set; }
        
        [Required]
        public int PricePerPieceCents { get; set; }
        
        [Required]
        public int ProductCategoryId { get; set; }
        // [Required]
        public ProductCategory ProductCategory { get; set; }
        
        [Required]
        public int AmountInStock { get; set; }
    }
}