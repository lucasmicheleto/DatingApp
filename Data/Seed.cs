using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace DatingApp;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync())
        {
            return;
        }
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions() 
        {
            PropertyNameCaseInsensitive = true
        };

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("123456"));
            user.PasswordSalt = hmac.Key;
            PropertyInfo[] properties = typeof(AppUser).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                if(property.PropertyType == typeof(string) && property.GetValue(user) == null)
                    property.SetValue(user, string.Empty);
            }
            PropertyInfo[] properties2 = typeof(Photo).GetProperties();
            foreach (var photo in user.Photos)
                foreach (PropertyInfo property in properties2)
                {
                    if(property.PropertyType == typeof(string) && property.GetValue(photo) == null)
                        property.SetValue(photo, string.Empty);
                }
            await context.Users.AddAsync(user);
        }
        await context.SaveChangesAsync();
    }
}
