import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
  Login(user) {
    return apiClient.post("/api/Authenticate/login", user)
  },
  Register(user) {
    return apiClient.post("/api/Authenticate/register", user)
  },
  Test() {
    return apiClient.get("/api/Authenticate/test")
  }
}
