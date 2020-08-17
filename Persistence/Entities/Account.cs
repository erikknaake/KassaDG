namespace Persistence.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Account
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string AccountName { get; set; }
        
        [Required]
        public int BalanceCents { get; set; }
        
        public ICollection<Order> Orders { get; set; }
    }
}