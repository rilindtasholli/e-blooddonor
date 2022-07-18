using System.ComponentModel.DataAnnotations;

namespace aspnet_core_api.Models
{
    public class Register
    {
        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        [Required]
        public string? Location { get; set; }


        [Required]
        public string? BloodType { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }


        [Required]
        [Display(Name = "Confirm Password")]
        [Compare("Password", ErrorMessage = "Password and confirm password do not match!")]
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }
    }
}
