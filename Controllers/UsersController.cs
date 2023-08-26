using System.Security.Claims;
using AutoMapper;

using CloudinaryDotNet.Actions;

using DatingApp.DTO;
using DatingApp.Extensions;
using DatingApp.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DatingApp;

[Authorize]
public class UsersController: BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository repo, IMapper mapper, IPhotoService photoService)
    {
        _userRepository = repo;
        _mapper = mapper;
        _photoService = photoService;
    }

    [HttpGet]
    // [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        return Ok(await _userRepository.GetMembersAsync());
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        var user = await _userRepository.GetMemberByName(username);
        if (user == null)
            return NotFound(user);
        return Ok(user);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDTO memberUpdate)
    {
        var user = await _userRepository.GetUserByName(User.GetUsername());
        if (user == null){
            return NotFound(User.GetUsername());
        }
        _mapper.Map(memberUpdate, user);
        if (await _userRepository.SaveAllAsync()) return NoContent();
        return BadRequest(user);
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file)
    {
        var user = await _userRepository.GetUserByName(User.GetUsername());

        if (user == null) { return NotFound(); }
        var res = await _photoService.AddPhotoAsync(file);
        if (res.Error != null) { return BadRequest(res.Error.Message); }
        var photo = new Photo()
        {
            Url = res.SecureUrl.AbsoluteUri,
            PublicId = res.PublicId,
        };

        if (user.Photos.Count == 0) { photo.IsMain = true; }
        user.Photos.Add(photo);
        if (await _userRepository.SaveAllAsync())
        {
            var dto = _mapper.Map<PhotoDTO>(photo);
            return Ok(dto);
        }
        return BadRequest(photo);
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto([FromRoute]int photoId)
    {
        var user = await _userRepository.GetUserByName(User.GetUsername());
        if (user == null) { return NotFound(); }
        var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
        if (photo == null) { return NotFound(); }    
        if (photo.IsMain) { return BadRequest("Already main photo"); }
        var main = user.Photos.FirstOrDefault(p => p.IsMain);
        if (main != null) { main.IsMain = false; }
        photo.IsMain = true;
        if (await _userRepository.SaveAllAsync())
        {
            return NoContent();
        }
        return BadRequest(photoId);
    }

    // [HttpDelete("delete-photo/{photoId}")]
    // public async Task<ActionResult> DeletePhoto([FromRoute]int photoId)
    // {
        
    // }
}
