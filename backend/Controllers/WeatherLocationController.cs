using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers
{
    //[Produces("application/json")]
    [Route("api/[controller]")]
    public class WeatherLocationController : Controller
    {
        private readonly IWeatherAppRepository _weatherAppRepository;

        public WeatherLocationController(IWeatherAppRepository weatherAppRepository) => _weatherAppRepository = weatherAppRepository;

        //GET: api/weatherlocation
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _weatherAppRepository.GetAllWeatherLocations());
        }

        // POST: api/weatherlocation
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]WeatherLocation weatherLocation)
        {
            await _weatherAppRepository.Create(weatherLocation);
            return new OkObjectResult(weatherLocation);
        }
    }
}