namespace aspnet_core_api.Models
{
    public class User
    {
        public Guid Id { get; set; }

        // FullName will be computed automatically
        public string? FullName { get; private set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Location { get; set; }

        public string? BloodType { get; set; }
        public List<Appointment>? Appointments { get; set; }
    }
}
