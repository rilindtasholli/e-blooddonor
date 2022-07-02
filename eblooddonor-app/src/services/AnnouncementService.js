import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
  GetAnnouncements(page) {
    return apiClient.get("/api/Announcement/all/" + page)
  },
  GetAnnouncement(id) {
    return apiClient.get("/api/Announcement/" + id)
  },
  CreateAnnouncement(announcement) {
    return apiClient.post("/api/Announcement/", announcement)
  },
  EditAnnouncement(announcement) {
    return apiClient.put("/api/Announcement?id=" + announcement.id, announcement)
  },
  DeleteAnnouncement(id) {
    return apiClient.delete("/api/Announcement/" + id)
  }
 
}
