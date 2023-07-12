using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp;

[Authorize]
public class UsersController: BaseApiController
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository repo)
    {
        this._userRepository = repo;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return Ok(await _userRepository.GetUsersAsync());
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        var user = await _userRepository.GetUserByName(username);
        if (user == null)
            return NotFound(user);
        return Ok(user);
    }
}
