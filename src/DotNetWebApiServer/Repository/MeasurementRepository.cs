using DotNetCoreWebApi.DbContexts;
using DotNetCoreWebApi.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreWebApi.Repository
{
    public class MeasurementRepository : IMeasurementRepository<Measurement>
    {
        private readonly MeasurementContext dbcontext;

        public MeasurementRepository(MeasurementContext dbcontext)
        {
            this.dbcontext = dbcontext;
        }

        public async Task<IEnumerable<Measurement>> GetAll()
        {
            return await dbcontext.Measurements.ToListAsync();
        }

        public async Task<Measurement> Get(long id)
        {
            return await dbcontext.Measurements.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task Add(Measurement entity)
        {
            await dbcontext.Measurements.AddAsync(entity);
            await dbcontext.SaveChangesAsync();
        }

        public async Task Delete(Measurement measurement)
        {
            dbcontext.Measurements.Remove(measurement);
            await dbcontext.SaveChangesAsync();
        }

        public async Task Update(Measurement measurement, Measurement entity)
        {
            measurement.Name = entity.Name;
            measurement.Value = entity.Value;
            measurement.CreatedAt = entity.CreatedAt;
            measurement.CreatedBy = entity.CreatedBy;

            await dbcontext.SaveChangesAsync();
        }
    }
}
