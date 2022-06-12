import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
  GetAnnouncement() {
    return apiClient.get("/api/Announcement")
  },
  GetAnnouncement(id) {
    return apiClient.post("/api/Announcement/" + id)
  },
  EditAnnouncement(announcement) {
    console.log(announcement)
    return apiClient.put("/api/Announcement?id=" + announcement.id, announcement)
  },
  DeleteAnnouncement(id) {
    return apiClient.delete("/api/Announcement/" + id)
  }
 
}
