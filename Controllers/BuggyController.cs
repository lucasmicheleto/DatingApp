using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp;

public class BuggyController : BaseApiController
{
    private readonly DataContext _context;

    public BuggyController(DataContext context)
    {
        this._context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
        return "secret text";
    }
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var nUser = _context.Users.Find(-1);
        if (nUser == null) return NotFound(nUser);
        return nUser;
    }
    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {       
        var nUser = _context.Users.Find(-1);
        return nUser.ToString();
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }

}
