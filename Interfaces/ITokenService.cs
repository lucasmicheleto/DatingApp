namespace DatingApp;

public interface ITokenService
{
    string CreateToken(AppUser user);
}
