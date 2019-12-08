using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Todoistic.Controllers;
using Todoistic.Models;
using Todoistic.Services.TodoService;
using Todoistic.Test.FakeServices;
using Xunit;

namespace Todoistic.Test
{
    public class TodosControllerTest
    {
        private TodosController controller;
        private ITodoRepository repository;

        public TodosControllerTest()
        {
            repository = new TodoRepositoryFake();
            controller = new TodosController(repository);
        }

        [Fact]
        public void GetTodoItems_WhenCalled_ReturnsAllTodoItems()
        {
            // Act
            var result = controller.GetTodoItems().Result;

            // Assert
            var todoItems = Assert.IsType<List<TodoItemDTO>>(result.Value);
            Assert.Equal(3, todoItems.Count);
        }

        [Fact]
        public void GetTodoItem_UnknownIdPassed_ReturnsNotFoundResult()
        {
            // Arrange
            int testId = 0;
            
            // Act
            var notFoundResult = controller.GetTodoItem(testId).Result;

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult.Result);
        }

        [Fact]
        public void GetTodoItem_ExistingIdPassed_ReturnsRightTodoItem()
        {
            // Arrange
            int testId = 1;

            // Act
            var result = controller.GetTodoItem(testId).Result;

            // Assert
            Assert.IsType<TodoItemDTO>(result.Value);
            Assert.Equal(testId, (result.Value as TodoItemDTO).TodoItemID);
        }

        [Fact]
        public void CreateTodoItem_InvalidObjectPassed_ReturnsBadRequest()
        {
            // Arrange
            var titleMissingItem = new TodoItem()
            {
                Due = new DateTime(2019, 12, 20),
                StatusID = 0,
                Priority = 1
            };
            controller.ModelState.AddModelError("Title", "Required");

            // Act
            var badResponse = controller.CreateTodoItem(titleMissingItem).Result;

            // Assert
            Assert.IsType<BadRequestResult>(badResponse.Result);
        }

        [Fact]
        public void CreateTodoItem_ValidObjectPassed_ReturnsCreatedResponse()
        {
            // Arrange
            var testItem = new TodoItem()
            {
                Title = "Go hiking",
                Due = new DateTime(2019, 12, 20),
                StatusID = 0,
                Priority = 4
            };

            // Act
            var createdResponse = controller.CreateTodoItem(testItem).Result;

            // Assert
            Assert.IsType<CreatedAtActionResult>(createdResponse.Result);
        }

        [Fact]
        public void UpdateTodoItem_UnknownIdPassed_ReturnsBadRequestResult()
        {
            // Arrange
            int testId = 0;
            var testItem = new TodoItem()
            {
                TodoItemID = 1,
                Title = "Finish assignment",
                Description = "Write an essay about Napoleon.",
                Due = new DateTime(2019, 12, 20),
                StatusID = 0,
                Priority = 1
            };

            // Act
            var badRequestResult = controller.UpdateTodoItem(testId, testItem).Result;

            // Assert
            Assert.IsType<BadRequestResult>(badRequestResult);
        }

        [Fact]
        public void UpdateTodoItem_ExistingIdPassed_ReturnsOkResult()
        {
            // Arrange
            int testId = 1;
            var testItem = new TodoItem()
            {
                TodoItemID = testId,
                Title = "Finish assignment",
                Description = "Write an essay about Napoleon and his famous wars.",
                Due = new DateTime(2019, 12, 24),
                StatusID = 0,
                Priority = 1
            };

            // Act
            var okResult = controller.UpdateTodoItem(testId, testItem).Result;

            // Assert
            Assert.IsType<OkObjectResult>(okResult);
        }

        [Fact]
        public void DeleteTodoItem_NotExistingIdPassed_ReturnsNotFoundResponse()
        {
            // Arrange
            int notExistingId = 0;

            // Act
            var notFoundResponse = controller.DeleteTodoItem(notExistingId).Result;

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResponse);
        }

        [Fact]
        public void DeleteTodoItem_ExistingIdPassed_ReturnsOkResult()
        {
            // Arrange
            int existingId = 1;

            // Act
            var okResponse = controller.DeleteTodoItem(existingId).Result;

            // Assert
            Assert.IsType<OkResult>(okResponse);
        }

        [Fact]
        public void DeleteTodoItem_ExistingIsPassed_RemovesOneItem()
        {
            // Arrange
            int existingId = 1;

            // Act
            var okResponse = controller.DeleteTodoItem(existingId);

            // Assert
            Assert.Equal(2, controller.GetTodoItems().Result.Value.Count);
        }
    }
}