import axios from "axios";

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})

export default {
    GetAppointments(){
        return apiClient.get("/api/Appointment")
    },
    
    GetAppointment(id) {
                        //post
        return apiClient.get("/api/Appointment/" + id);
    },
    CreateAppointment(appointment){
        console.log(appointment);
        return apiClient.post("/api/Appointment?id=" + appointment.id, appointment)
    },

    EditAppointment(appointment){
        console.log(appointment);
        return apiClient.put("/api/Appointment?id=" + appointment.id, appointment)
    },

    DeleteAppointment(id){
        return apiClient.delete("/api/Appointment" + id);
    }

}
