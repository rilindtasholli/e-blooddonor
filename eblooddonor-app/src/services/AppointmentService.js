import axios from "axios";

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})

export default {
    GetAppointments() {
      return apiClient.get("/api/Appointment")
    },
    GetAppointment(id) {
      return apiClient.get("/api/Appointment?id=" + id)
    },
    CreateAppointment(user) {
      return apiClient.post("/api/Appointment", user)
    },
    DeleteAppointment(id) {
      return apiClient.delete("/api/Appointment/" + id)
    },
    ApproveAppointment(id) {
      return apiClient.put("/api/Appointment/approve?id=" + id)
    }
  }
