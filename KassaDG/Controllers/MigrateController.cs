using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace KassaDG.Controllers;

[ApiController]
[Route("[controller]")]
public class MigrateController : ControllerBase
{
    
    private readonly KassaDgDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public MigrateController(KassaDgDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult Migrate()
    {
        if (_configuration["DATABASE_CAN_BE_RESET"] == "true")
        {
            Console.WriteLine("Deleting and migrating DB");
            _dbContext.Database.EnsureDeleted();
            _dbContext.Database.Migrate();
            return Ok();
        }
        Console.WriteLine("Not deleting and migrating DB");
        return StatusCode(StatusCodes.Status405MethodNotAllowed);
    }
}