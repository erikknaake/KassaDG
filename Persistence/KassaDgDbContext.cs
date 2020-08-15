namespace Persistence
{
    using Entities;
    using Microsoft.EntityFrameworkCore;

    public class KassaDgDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=../Persistence/KassaDG.db");
    }
}