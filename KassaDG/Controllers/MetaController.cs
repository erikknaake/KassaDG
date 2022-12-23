using System;
using System.Net;
using System.Reflection;
using KassaDG.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace KassaDG.Controllers;

[ApiController]
public class MetaController : ControllerBase
{
    private readonly KassaDgDbContext _dbContext;
    private readonly IConfiguration _configuration;

    public MetaController(KassaDgDbContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpPost("[action]")]
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

    [HttpGet("version")]
    [ProducesResponseType(typeof(VersionModel), StatusCodes.Status200OK)]
    public IActionResult GetVersion()
    {
        return Ok(new VersionModel(Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "Version unknown"));
    }
}