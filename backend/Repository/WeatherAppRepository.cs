using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Models.Interfaces;
using MongoDB.Driver;

namespace backend.Repository
{
    class WeatherAppRepository : IWeatherAppRepository
    {
        public IWeatherAppContext _context { get; }

        public WeatherAppRepository(IWeatherAppContext context) => _context = context;

        public async Task<IEnumerable<WeatherLocation>> GetAllWeatherLocations()
        {
            return await _context
                        .WeatherLocations
                        .Find(_ => true)
                        .ToListAsync();
        }

        public Task<WeatherLocation> GetWeatherLocation(string city)
        {
            FilterDefinition<WeatherLocation> filter = Builders<WeatherLocation>.Filter.Eq(m => m.City, city);

            return _context
                    .WeatherLocations
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task Create(WeatherLocation weatherLocation)
        {
            await _context.WeatherLocations.InsertOneAsync(weatherLocation);
        }

        public async Task<bool> Update(WeatherLocation weatherLocation)
        {
            ReplaceOneResult updateResult =
            await _context
                    .WeatherLocations
                    .ReplaceOneAsync(
                        filter: w => w.Id == weatherLocation.Id,
                        replacement: weatherLocation);

            return updateResult.IsAcknowledged 
                && updateResult.ModifiedCount > 0;
        }

        public async Task<bool> Delete(string city)
        {
            FilterDefinition<WeatherLocation> filter = Builders<WeatherLocation>.Filter.Eq(m => m.City, city);

            DeleteResult deleteResult = await _context
                                                .WeatherLocations
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }
    }
}