﻿using System.ComponentModel.DataAnnotations;

namespace DatingApp;

public class RegisterDTO
{
    [Required]
    public string Username { get; set; }
    [Required]
    [StringLength(20, MinimumLength = 6)]
    public string Password { get; set; }
}
