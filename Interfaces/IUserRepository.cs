using System;
namespace DatingApp.Interfaces
{
	public interface IUserRepository
	{
		void Update(AppUser user);
		void Add(AppUser user);
		Task<bool> SaveAllAsync();
		Task<IEnumerable<AppUser>> GetUsersAsync();
		Task<AppUser> GetUserByIdAsync(int id);
		Task<AppUser> GetUserByName(string name);
	}
}