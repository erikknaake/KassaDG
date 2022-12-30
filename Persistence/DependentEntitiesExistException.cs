using System;

namespace Persistence;

public class DependentEntitiesExistException : Exception
{
    public DependentEntitiesExistException() : base("Dependent entities must be deleted before deleting this entity")
    {
    }
}