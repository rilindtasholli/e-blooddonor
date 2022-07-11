import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:1337`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
    getAllMessages(){
        return apiClient.get("/api/Messages")
    },
    createMessages(message){
        return apiClient.post("/api/Messages/"+message);
    },

    deleteMessages(id){
        return apiClient.delete("/api/Messages/"+id)
    }
}