import axios from 'axios';

const apiClient = axios.create({
    baseURL: `http://localhost:1337`,
    headers: {"Access-Control-Allow-Origin": "*"}
})
  
export default {
  GetAllLogs() {
    return apiClient.get("/logger")
  },
  CreateLog(log) {
    return apiClient.post("/logger", log)
  },
  DeleteLog(id){
    return apiClient.delete("/logger/" + id)
  }
}
