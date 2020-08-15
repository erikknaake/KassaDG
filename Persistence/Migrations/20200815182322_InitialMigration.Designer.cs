﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(KassaDgDbContext))]
    [Migration("20200815182322_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7");

            modelBuilder.Entity("Persistence.Entities.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ProductCategoryCategoryId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasMaxLength(128);

                    b.HasKey("ProductId");

                    b.HasIndex("ProductCategoryCategoryId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Persistence.Entities.ProductCategory", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasMaxLength(128);

                    b.HasKey("CategoryId");

                    b.ToTable("ProductCategories");
                });

            modelBuilder.Entity("Persistence.Entities.Product", b =>
                {
                    b.HasOne("Persistence.Entities.ProductCategory", "ProductCategory")
                        .WithMany("Products")
                        .HasForeignKey("ProductCategoryCategoryId");
                });
#pragma warning restore 612, 618
        }
    }
}
