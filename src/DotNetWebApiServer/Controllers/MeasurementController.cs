using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCoreWebApi.Model;
using DotNetCoreWebApi.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreWebApi.Controllers
{
    [Route("api/measurement")]
    [ApiController]
    public class MeasurementController : Controller
    {
        private readonly IMeasurementRepository<Measurement> measurementRepository;

        public MeasurementController(IMeasurementRepository<Measurement> measurementRepository)
        {
            this.measurementRepository = measurementRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var measurements = await this.measurementRepository.GetAll();

            return Ok(measurements);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(long id)
        {
            var measurements = await this.measurementRepository.Get(id);

            return Ok(measurements);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Measurement measurement)
        {
            await this.measurementRepository.Add(measurement);

            return CreatedAtAction(nameof(Get), new { id = measurement.Id }, measurement);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, Measurement measurement)
        {
            var measurementToUpdate = await this.measurementRepository.Get(id);

            await this.measurementRepository.Update(measurementToUpdate, measurement);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id, Measurement measurement)
        {
            var measurementToDelete = await this.measurementRepository.Get(id);

            await this.measurementRepository.Delete(measurementToDelete);

            return NoContent();
        }
    }
}