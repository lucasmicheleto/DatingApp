using DatingApp.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(AppUser user)
        {
            _context.Users.Add(user);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .FindAsync(id);
        }

        public async Task<AppUser> GetUserByName(string name)
        {
            return await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.UserName == name);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(u => u.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}

