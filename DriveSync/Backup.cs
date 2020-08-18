namespace DriveSync
{
    public class Backup
    {
        private BackupFileToDrive _backupFileToDrive;
        private FileCopy _fileCopy;
        
        public Backup()
        {
            _backupFileToDrive = new BackupFileToDrive();
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