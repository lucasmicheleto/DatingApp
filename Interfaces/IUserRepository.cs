using System;
using DatingApp.DTO;

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
        Task<IEnumerable<MemberDTO>> GetMembersAsync();
        Task<MemberDTO> GetMemberByName(string name);
    }
}