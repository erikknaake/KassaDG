namespace Persistence
{
    using System.Linq;
    using System.Threading.Tasks;
    using DriveSync;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;

    public class KassaDgDbContext : DbContext
    {
        private readonly Backup _backup;
        private readonly string _dbFile = "../Persistence/KassaDG.db";
        private readonly int _backupCountRollover;

        public KassaDgDbContext()
        {
            
        }
        
        public KassaDgDbContext(IConfiguration configuration)
        {
            _backupCountRollover = int.Parse(configuration["BackupCountRollover"]);
            _backup = new Backup(configuration);
        }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        public DbSet<BackupCounter> BackupCounters { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=" + _dbFile);

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
            builder.Entity<Account>()
                .Property(x => x.IsActive)
                .HasDefaultValue(true);
        }

        public void Backup()
        {
            var backupCounter = BackupCounters.AsQueryable().SingleOrDefault();
            if (backupCounter == null)
            {
                backupCounter = new BackupCounter();
                BackupCounters.Add(backupCounter);
            }
            if (backupCounter.Counter % _backupCountRollover == 0)
            {
                Task.Factory.StartNew(() =>
                {
                    _backup.BackupFile(_dbFile);
                });
            }

            backupCounter.Counter++;
            SaveChanges();
        }
    }
}