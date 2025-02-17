using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
            .HasMany(u => u.Groups)
            .WithMany(g => g.Users)
            .UsingEntity(j => j.ToTable("UserGroups"));

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>()
            .HasMany(u => u.Expenses)
            .WithMany(g => g.Users)
            .UsingEntity(j => j.ToTable("UserExpenses"));

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Expense>()
            .HasOne(u=>u.Group).WithMany(g => g.Expenses).HasForeignKey(u=>u.GroupId);

        }
    }
}
