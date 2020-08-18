namespace Persistence.Entities
{
    using System.ComponentModel.DataAnnotations;

    public class BackupCounter : IBaseEntity
    {
        [Key]
        public int Id { get; set; }
        public int Counter { get; set; }
    }
}