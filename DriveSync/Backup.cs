namespace DriveSync
{
    using Microsoft.Extensions.Configuration;

    public class Backup
    {
        private BackupFileToDrive _backupFileToDrive;
        private FileCopy _fileCopy;
        
        public Backup(BackupFileToDrive backupFileToDrive, FileCopy fileCopy)
        {
            _backupFileToDrive = backupFileToDrive;
            _fileCopy = fileCopy;
        }

        public void BackupFile(string filePath)
        {
            var destination = filePath + ".bak";
            _fileCopy.Copy(filePath, destination);
            _backupFileToDrive.UploadFile(destination);
        }
    }
}