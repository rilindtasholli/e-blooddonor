import axios from 'axios';

// const apiClient = axios.create({
//     baseURL: `https://localhost:1337`,
//     withCredentials: true,
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('jwt')}`
//     }
// })
  
const apiClient = axios.create({
    baseURL: `http://localhost:1337`
})

export default {
    GetAllMessages(){
        return apiClient.get("/messages")
    },
    CreateMessage(message){
        return apiClient.post("/messages/"+message);
    },

    DeleteMessage(id){
        return apiClient.delete("/messages/"+id)
    }
}