namespace Persistence
{
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class KassaDgDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=../Persistence/KassaDG.db");
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Product>()
                .HasIndex(u => u.ProductName)
                .IsUnique();
            
            builder.Entity<ProductCategory>()
                .HasIndex(u => u.CategoryName)
                .IsUnique();
            
            builder.Entity<Account>()
                .HasIndex(u => u.AccountName)
                .IsUnique();
        }
    }
}