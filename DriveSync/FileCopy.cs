using System;

namespace DriveSync
{
    public class FileCopy
    {
        public void Copy(string filePath, string destinationPath)
        {
            System.IO.File.Copy(filePath, destinationPath, true);
        }
    }
}