using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using DatingApp.Interfaces;

using Microsoft.Extensions.Options;

namespace DatingApp.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<Account> account)
        {
            _cloudinary = new Cloudinary(account.Value);
        }
        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadRes = new ImageUploadResult();
            if (file != null && file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var upParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                    Folder = "da-net7"
                };
                uploadRes = await _cloudinary.UploadAsync(upParams);
            }
            return uploadRes;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var delParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(delParams);
        }
    }
}
