using System;

namespace Persistence;

public class UniqueViolationException : Exception
{
    public UniqueViolationException() : base($"Entity did not satisfy uniqueness constraints")
    {
    }
}