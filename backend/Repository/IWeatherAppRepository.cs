using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repository
{
    interface IWeatherAppRepository
    {
        Task<IEnumerable<WeatherLocation>> GetAllWeatherLocations();
        Task<WeatherLocation> GetWeatherLocation(string city);
        Task Create(WeatherLocation weatherLocation);
        Task<bool> Update(WeatherLocation weatherLocation);
        Task<bool> Delete(string city);
    }
}