namespace aspnet_core_api.Models
{
    public class Appointment
    {
        public Guid Id { get; set; }
        public DateTime? Date { get; set; }
        public string? Location { get; set; }
        public string? Status { get; private set; }

    }
}
