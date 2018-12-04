using backend.Models.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace backend.Models
{
    class WeatherAppContext : IWeatherAppContext
    {
        private readonly IMongoDatabase _db;

        public WeatherAppContext(IOptions<Settings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            _db = client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<WeatherLocation> WeatherLocations => _db.GetCollection<WeatherLocation>("WeatherLocations");
    }
}