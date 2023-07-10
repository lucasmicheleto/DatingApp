using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp;

public class AccountController: BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> RegisterUser(RegisterDTO register)
    {
        if(await UserExists(register.Username))
        {
            return BadRequest($"User name: {register.Username} already taken!");
        }       
        using var hmac = new HMACSHA512();

        var user = new AppUser()
        {
            UserName = register.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
            PasswordSalt = hmac.Key
        }; 

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new UserDTO() 
        {
            Username = register.Username,
            Token = _tokenService.CreateToken(user),
        });
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(RegisterDTO login)
    {
        var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == login.Username);
        if (user == null)
            return Unauthorized();
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var cpHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));
        int i = 0;
        try
        {
            foreach (var b in cpHash)
            {
                if (b != user.PasswordHash[i])
                    return Unauthorized();
                i++;
            }
        }
        catch (System.Exception)
        {
            return Unauthorized();
        }

        return Ok(new UserDTO() 
        {
            Username = login.Username,
            Token = _tokenService.CreateToken(user),
        });
    }
    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(u => u.UserName.ToLower() == username.ToLower());
    }
}
