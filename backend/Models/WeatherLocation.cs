using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
public class WeatherLocation
    {
        [BsonId]
        public ObjectId Id { get; set; }

        public string City { get; set; }
    }
}