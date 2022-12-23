using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        }
        catch (Exception)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        }
    }
}