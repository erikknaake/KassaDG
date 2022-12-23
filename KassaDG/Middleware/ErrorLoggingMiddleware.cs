using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace KassaDG;

public class ErrorLoggingMiddleware
{
    private readonly RequestDelegate _next;

    public ErrorLoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            Console.WriteLine($"The following error happened: {e.Message}");
            throw;
        }
    }
}