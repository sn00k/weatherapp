using MongoDB.Driver;
using backend.Models;

namespace backend.Models.Interfaces
{
    public interface IWeatherAppContext
    {
        IMongoCollection<WeatherLocation> WeatherLocations { get; }
    }
}