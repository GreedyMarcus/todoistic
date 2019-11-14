﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Todoistic.Data;

namespace Todoistic.Migrations
{
    [DbContext(typeof(TodoisticDbContext))]
    partial class TodoisticDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.11-servicing-32099");

            modelBuilder.Entity("Todoistic.Models.TodoItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<DateTime>("Due");

                    b.Property<int>("Priority");

                    b.Property<int>("PriorityMax");

                    b.Property<int>("Status");

                    b.Property<string>("Title");

                    b.HasKey("ID");

                    b.ToTable("TodoItems");
                });
#pragma warning restore 612, 618
        }
    }
}
