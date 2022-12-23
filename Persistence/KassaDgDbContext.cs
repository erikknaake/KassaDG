using System;
using Microsoft.Data.Sqlite;

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
        private readonly string _dbFile;
        private readonly int _backupCountRollover;
        private const int UniqueConstraintFailed = 19;
        
        public KassaDgDbContext()
        {
            Console.WriteLine("Init KassaDgDbContext without configuration!");
        }
        
        public KassaDgDbContext(IConfiguration configuration, Backup backup)
        {
            _backupCountRollover = int.Parse(configuration["BackupCountRollover"]);
            _dbFile = configuration["DbFile"];
            _backup = backup;
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

            builder.Entity<Order>()
                .HasOne(x => x.Account)
                .WithMany(x => x.Orders)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (SqliteException e) when(e.SqliteErrorCode == UniqueConstraintFailed)
            {
                throw new UniqueViolationException();
            }
            catch (DbUpdateException e) when (e.InnerException is SqliteException { SqliteErrorCode: UniqueConstraintFailed })
            {
                throw new UniqueViolationException();
            }
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