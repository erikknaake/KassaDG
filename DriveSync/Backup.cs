namespace DriveSync
{
    using Microsoft.Extensions.Configuration;

    public class Backup
    {
        private BackupFileToDrive _backupFileToDrive;
        private FileCopy _fileCopy;
        
        public Backup(IConfiguration configuration)
        {
            _backupFileToDrive = new BackupFileToDrive(configuration);
            _fileCopy = new FileCopy();
        }

        public void BackupFile(string filePath)
        {
            var destination = filePath + ".bak";
            _fileCopy.Copy(filePath, destination);
            _backupFileToDrive.UploadFile(destination);
        }
    }
}