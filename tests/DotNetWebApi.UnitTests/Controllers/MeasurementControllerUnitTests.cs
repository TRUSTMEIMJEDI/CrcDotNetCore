using DotNetCoreWebApi.Controllers;
using DotNetCoreWebApi.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace DotNetWebApi.UnitTests.Controllers
{
    public class MeasurementControllerUnitTests
    {
        [Fact]
        public async Task get_all_measurements()
        {
            // Arrange
            var repository = MeasurementContextMocker.GetInMemoryMeasurementsRepository(nameof(get_all_measurements));
            var controller = new MeasurementController(repository);

            // Act
            var response = await controller.GetAll() as ObjectResult;
            var measurement = response.Value as List<Measurement>;

            // Assert 
            Assert.Equal(200, response.StatusCode);
            Assert.Equal(5, measurement.Count);
        }

        [Fact]
        public async Task get_all_measurements_with_existing_id()
        {
            // Arrange
            var repository = MeasurementContextMocker.GetInMemoryMeasurementsRepository(nameof(get_all_measurements_with_existing_id));
            var controller = new MeasurementController(repository);
            var expectedValue = 0.25m;

            // Act
            var response = await controller.Get(1) as ObjectResult;
            var measurement = response.Value as Measurement;

            // Assert 
            Assert.Equal(200, response.StatusCode);
            Assert.Equal(expectedValue, measurement.Value);
        }
    }
}
