using System;
using AutoMapper;
using AutoMapper.Execution;
using DatingApp.DTO;

namespace DatingApp.Helpers
{
	public class AutoMapperProfiles: Profile
	{
		public AutoMapperProfiles()
		{
			CreateMap<AppUser, MemberDTO>()
				.ForMember(u => u.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url))
				.ForMember(u => u.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()));
			CreateMap<Photo, PhotoDTO>();
			CreateMap<MemberUpdateDTO, AppUser>();
		}
	}
}

