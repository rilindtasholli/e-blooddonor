<template>
  <div class="main">
    <h1><font-awesome-icon :icon="['fas', 'chart-pie']" /> Dashboard</h1>

    <div class="main-content">
      <section>
        <div class="section-body">
         
          <a class="card donations-card" href="#donation-stats">
            <h3>Donations <font-awesome-icon :icon="['fas', 'droplet']" /></h3>
            <span>{{ this.getDonationsNumber }}</span>
          </a>
         
  
          <a class="card users-card" href="#user-stats">
            <h3>Users <font-awesome-icon :icon="['fas', 'user']" /></h3>
            <span>{{ this.getUsersNumber}}</span>
          </a>
        </div>
      </section>
      
      <section id="donation-stats">
        <h2>Donation Stats</h2>

        <div class="section-body">
          <div class="chart">
            <LineChart :datasets="this.getMonthlyDonationsDatasets()"/>
          </div>
  
          <div class="chart">
            <Doughnut :datasets="this.getDonationsFromLocationsDatasets()"/>
          </div>
        </div>
        
      </section>

      <section id="user-stats">
        <h2>User Stats</h2>

        <div class="section-body">
          <div class="chart">
            <Bar :datasets="this.getUsersFromLocationsDatasets()"/>
          </div>
  
          <div class="chart">
            <h3><font-awesome-icon :icon="['fas', 'ranking-star']" /> Top Donators</h3>
            <div class="top-users">
              <table>
                <tr>
                  <th width="100%">Name</th>
                  <th>Location</th>
                  <th>Donations</th>
                </tr>

                <tr v-for="user in this.getTopDonators" :key="user.user.id">
                  <td>{{ user.user.name }}</td>
                  <td>{{ user.user.location }}</td>
                  <td>{{ user.donationsCount }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        
      </section>
    </div>
  </div>
</template>

<script>
//import PieChart from '@/components/charts/Pie.vue'
import Doughnut from '@/components/charts/Doughnut.vue'
import LineChart from '@/components/charts/Line.vue'
import Bar from '@/components/charts/Bar.vue'
import { mapActions, mapGetters } from 'vuex'
// import Pie from '@/components/charts/Pie.vue'

export default {
  components: {
    LineChart,
    Doughnut,
    Bar,
    // Pie
  },

  created(){
    this.getDonationsData()
    this.getUsersData()
  },

  computed:{
    ...mapGetters([
      'getDonationsNumber',
      'getDonationsFromLastMonths',
      'getDonationsFromLocations',
      'getUsersNumber',
      'getUsersFromLocations',
      'getTopDonators',
    ])
  },

  methods:{
    ...mapActions(['getDonationsData', 'getUsersData']),

    getMonthlyDonationsDatasets(){
      var datasets = [{
          label: 'Donations',
          backgroundColor:  'rgba(58, 83, 222, 0.18)',
          data: this.getDonationsFromLastMonths,
          fill: true,
          borderColor: '#7faef4',
          pointBackgroundColor: 'rgba(230, 69, 69, 0.6)',
          tension: 0.2
        }]

        return datasets
    },

    getDonationsFromLocationsDatasets(){
      var datasets = [{
          backgroundColor: ['#e64545', '#47d663', '#e08b4a', '#e0cf4a', '#36c7bb', '#3277a8', '#6e66fa'],
          data: this.getDonationsFromLocations
        }]

        return datasets
    },

    getUsersFromLocationsDatasets(){
      var datasets = [
        {
            label: 'Users',
            backgroundColor: ['#e64545', '#47d663', '#e08b4a', '#e0cf4a', '#36c7bb', '#3277a8', '#6e66fa'],
            data: this.getUsersFromLocations
        }
      ]
      return datasets
    }
  }
}
</script>


<style scoped>

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 > svg {
  color: rgb(190, 65, 71);
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: dashed 1px green; */
  /* margin-top: 50px; */
  
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: dashed 1px red; */
  padding: 40px;
  /* margin-top: 30px; */
  width: 100vw;
  
}

section h2{
  position: relative;
  padding: 20px 0 25px;
  display: flex;
  justify-content: center;
}
section h2::after{
  content: '';
  position: absolute;
  padding: 4px 25px;
  bottom: 10px;
  border-radius: 100px;
}
#donation-stats h2::after{
  background-color: rgb(233, 79, 85);
}
#user-stats h2::after{
  background-color: rgb(77, 129, 228);
}

.section-body{
  display: flex;
  justify-content: center;
  align-items: center;
}

#donation-stats,
#user-stats{
  background-color: rgb(238, 240, 241);
  padding: 10px 10px;
}




.card {
  padding: 35px;
  color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: 10px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0px 3px 10px 1px rgb(0, 0, 0, 0.25);
  transition: 0.4s;
}
.card:hover{
  transform: scale(1.03);
}

.card h3{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card span{
  font-size: 3em;
  font-weight: bold;
  margin-top: 20px;
}

.donations-card {
  background: linear-gradient(120deg, rgba(242,126,108,0.8) 9%, rgba(240,79,85,0.8) 81%);
}
.users-card {
  background: linear-gradient(120deg, rgba(108,183,242,0.8) 9%, rgba(79,120,240,0.8) 81%);
}


.chart{
  /* background: rgb(240, 231, 231); */
  box-shadow: 0px 1px 10px 0px rgb(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  border: solid 3px transparent;
  background-color: white;
  transition: 0.4s;
}


#donation-stats .chart:hover{
  border: solid 3px rgba(243, 59, 65, 0.32);
  box-shadow: 0px 1px 10px 0px rgba(243, 59, 65, 0.32);
}

#user-stats .chart:hover{
  border: solid 3px rgba(86, 133, 235, 0.404);
  box-shadow: 0px 1px 10px 0px rgba(86, 133, 235, 0.404);
}

.top-users{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
}

.top-users ol,
.top-users ol li{
  width: 100%;
  margin: 20px 0;
}

.top-users .name{
  padding: 0 50px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: 25px 0;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 15px 8px;
}

tr:nth-child(even) {
  background-color: #eceef3;
}

@media only screen and (max-width: 800px) {
  .main-content {
    flex-direction: column;
  }
}

</style>
