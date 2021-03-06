﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Todoistic.Data;

namespace Todoistic.Migrations
{
    [DbContext(typeof(TodoisticDbContext))]
    [Migration("20191205232444_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099");

            modelBuilder.Entity("Todoistic.Models.Status", b =>
                {
                    b.Property<int>("StatusID");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("StatusID");

                    b.ToTable("Status");

                    b.HasData(
                        new { StatusID = 0, Title = "Todo" },
                        new { StatusID = 1, Title = "In progress" },
                        new { StatusID = 2, Title = "Done" },
                        new { StatusID = 3, Title = "Postponed" }
                    );
                });

            modelBuilder.Entity("Todoistic.Models.TodoItem", b =>
                {
                    b.Property<int>("TodoItemID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<DateTime>("Due");

                    b.Property<int>("Priority");

                    b.Property<int>("StatusID");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.HasKey("TodoItemID");

                    b.HasIndex("StatusID");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("Todoistic.Models.TodoItem", b =>
                {
                    b.HasOne("Todoistic.Models.Status", "Status")
                        .WithMany("TodoItems")
                        .HasForeignKey("StatusID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
