using Microsoft.Extensions.Logging;

namespace DriveSync
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading;
    using Google.Apis.Auth.OAuth2;
    using Google.Apis.Drive.v3;
    using Google.Apis.Services;
    using Google.Apis.Util.Store;
    using Microsoft.Extensions.Configuration;
    using File = Google.Apis.Drive.v3.Data.File;

    public class BackupFileToDrive
    {
        private readonly ILogger<BackupFileToDrive> _logger;
        private static readonly string[] Scopes = { DriveService.Scope.DriveFile };
        private const string ApplicationName = "KassaDG";

        private readonly string _googleDriveFolderId;

        public BackupFileToDrive(IConfiguration configuration, ILogger<BackupFileToDrive> logger)
        {
            _logger = logger;
            _googleDriveFolderId = configuration["GoogleDriveUrl"];
        }
        
        public void UploadFile(string filePath)
        {
            var service = GetDriveService();
            const string mimeType = "application/x-sqlite3";
            var fileMetadata = new File
            {
                Name = "KassaDG.db.bak",
                MimeType = mimeType,
                Parents = new List<string> {_googleDriveFolderId}
            };
            FilesResource.CreateMediaUpload request;
            using var stream = new FileStream(filePath, FileMode.Open);
            request = service.Files.Create(fileMetadata, stream, mimeType);
            request.Fields = "id";
            try
            {
                var result = request.Upload();
                if (result.Exception != null)
                {
                    throw result.Exception;
                }
            }
            catch (Exception e)
            {
                _logger.LogCritical(e, "Something went wrong while uploading to Google Drive");
            }
        }

        private DriveService GetDriveService()
        {
            UserCredential credential;
            const string credentialsFilePath = "credentials.json";

            using (var stream =
                new FileStream(credentialsFilePath, FileMode.Open, FileAccess.Read))
            {
                // The file token.json stores the user's access and refresh tokens, and is created
                // automatically when the authorization flow completes for the first time.
                const string credPath = "token.json";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.FromStream(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
            }

            // Create Drive API service.
            return new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
        }
    }
}