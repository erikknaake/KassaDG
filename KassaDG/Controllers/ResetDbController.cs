using System;
using Microsoft.AspNetCore.Mvc;

namespace KassaDG.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResetDbController : ControllerBase
    {
        [HttpPost]
        public void ResetDb()
        {
            if (Environment.GetEnvironmentVariable("DATABASE_CAN_BE_RESET") != null)
            {
                System.IO.File.Copy("Persistence/KassaDG.db.clean", "Persistence/KassaDG.db", true);
            }
            else
            {
                Console.WriteLine("Can not reset database, flag DATABASE_CAN_BE_RESET is not set");
            }
        }
    }
}