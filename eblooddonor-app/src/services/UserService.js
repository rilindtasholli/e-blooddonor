import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
  GetUsers() {
    return apiClient.get("/api/User")
  },
  GetUser(id) {
    return apiClient.post("/api/User/" + id)
  },
  EditUser(user) {
    console.log(user)
    return apiClient.put("/api/User?id=" + user.id, user)
  },
  DeleteUser(id) {
    return apiClient.delete("/api/User/" + id)
  }
  // Test() {
  //   return apiClient.get("/api/User")
  // }
}
