import axios from 'axios';

const apiClient = axios.create({
    baseURL: `https://localhost:7012`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
})
  
export default {
  async GetDonationsData() {
    return Promise.allSettled([
      apiClient.get("/api/Dashboard/GetDonationsNumber"),
      apiClient.get("/api/Dashboard/GetMonthlyDonations"),
      apiClient.get("/api/Dashboard/GetLocationDonations")
    ]).then((responses) => {
      // `result` should contain an array of either http responses or errors
      const donationsNumberResponse = responses[0]
      const monthlyDonationsResponse = responses[1]
      const locationDonationsResponse = responses[2]
    
      return {donationsNumberResponse, monthlyDonationsResponse, locationDonationsResponse}
    })
  },

  async GetUsersData() {
    return Promise.allSettled([
      apiClient.get("/api/Dashboard/GetUsersNumber"),
      apiClient.get("/api/Dashboard/GetLocationUsers"),
      apiClient.get("/api/Dashboard/GetTopDonators")
    ]).then((responses) => {
      // `result` should contain an array of either http responses or errors
      const usersNumberResponse = responses[0]
      const locationUsersResponse = responses[1]
      const topDonatorsResponse = responses[2]
    
      return {usersNumberResponse, locationUsersResponse, topDonatorsResponse}
    })
  }
}
