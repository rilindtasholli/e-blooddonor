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
    return apiClient.get("/api/User/" + id)
  },
  EditUser(user) {
    console.log(user)
    return apiClient.put("/api/User?id=" + user.id, user)
  },
  DeleteUser(id) {
    return apiClient.delete("/api/User/" + id)
  },
  
  //Manage Admins (Roles)
  GetAdmins() {
    return apiClient.get("/api/User/role/getAllAdmins")
  },
  SetUserRole(id, role) {
    return apiClient.put(`/api/User/role/setUserRole?id=${id}&role=${role}`)
  },
  GetUserRole(id) {
    return apiClient.get("/api/User/role/getUserRole?id=" + id)
  }
  
}
