using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Persistence;

namespace KassaDG.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (UniqueViolationException)
        {
            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await context.Response.CompleteAsync();
        }
        catch (DependentEntitiesExistException e)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsync(JsonConvert.SerializeObject(new {error = e.Message}));
            await context.Response.CompleteAsync();
        }
        catch (Exception)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.CompleteAsync();
        }
    }
}