 using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PropVivoBackend.Models;

namespace PropVivoBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMongoCollection<Customer> _customers;

        public CustomerController()
        {
            var client = new MongoClient("mongodb+srv://radhe:radhe123@propvivocluster.j8qyv4t.mongodb.net/?retryWrites=true&w=majority&appName=PropVivoCluster");
            var database = client.GetDatabase("PropVivoDB");
            _customers = database.GetCollection<Customer>("Customers");
        }

        [HttpGet("{phone}")]
        public ActionResult<Customer> Get(string phone)
        {
            var customer = _customers.Find(c => c.Phone == phone).FirstOrDefault();
            if (customer == null)
                return NotFound("Customer not found");
            return Ok(customer);
        }
    }
}
