<template>
    <div>
        <BackButton></BackButton>

        <div class="my-appointments">
            <h1><font-awesome-icon :icon="['fas', 'calendar-check']"></font-awesome-icon> My Appointments</h1>

            <table v-if="myAppointments.length > 0">
                <th>#</th>
                <th>Date</th>
                <th>Announcement</th>
                <th>Action</th>

                <tr>
                    <td>1</td>
                    <td>05/02/2022</td>
                    <td> 
                        <router-link to="/home/announcement" exact>
                            Title1 
                        </router-link>
                    </td>
                    <td>
                        <button>
                            <font-awesome-icon :icon="['fas', 'trash']"></font-awesome-icon>
                        </button>
                    </td>
                </tr>

                <!-- <tr>
                    <td>2</td>
                    <td>19/06/2022</td>
                    <td> 
                        <router-link to="/home/announcement" exact>
                            Title2
                        </router-link>
                    </td>
                    <td>
                        <button>
                            <font-awesome-icon :icon="['fas', 'trash']"></font-awesome-icon>
                        </button>
                    </td>
                </tr> -->
            </table>

            <div v-else class="no-appointments-message">
            
                <p>You don't have any appointments!</p>
                <router-link class="appoint-btn" to="/home/announcement">
                    <button>Set New Appointment</button>
                </router-link>
            </div>

            <hr>
            
            <router-link class="see-donations-btn" to="history">
                See donation history <font-awesome-icon :icon="['fas', 'clock-rotate-left']" />
            </router-link>
        </div>
    </div>
    
</template>

<script>
import BackButton from '@/components/BackButton.vue';
import {mapGetters, mapActions} from "vuex";

export default {
    components: {
        BackButton
    },
    data() {
        return {
            myAppointments: [
                {
                    date: '05/02/2022',
                    announcement: 'Title1',
                },
                {
                    date: '19/06/2022',
                    announcement: 'Title2',
                }
            ]
        }
    },

   computed: {
    ...mapGetters(["myappointments"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

   created() {
    this.updateMyAppointmentList();  
  },

   methods: {
    ...mapActions(["getUserAppointments", "deleteAppointment"]),

    updateMyAppointmentList(){
        this.getUserAppointments().then(()=>{
            this.appointments = this.getUserAppointments
        }).catch((error)=>{
            console.log(error)
        })
    },

   }
}

</script>

<style scoped>
h1 svg{
    color: rgb(190, 65, 71);
}

.my-appointments{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  max-width: 650px;
  margin: 20px;
}

table td, table th {
  border: 1px solid #ddd;
  padding: 20px 15px;
 
}

table tr:nth-child(even){background-color: #f3f3f7;}
table tr{
    transition: 0.35s;
}
table tr:hover {background-color: rgb(236, 236, 236);}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #7d91c9;
  color: white;
}

td a{
    color: rgb(55, 80, 221);
}

td button{
    border: none;
    margin: none;
    padding: none;
    background: transparent;
    cursor: pointer;
}

td button svg{
    font-size: 15pt;
}

.no-appointments-message{
    margin: 40px 20px;
}

.no-appointments-message a{
    text-decoration: none;
    color: #2c3e50c9;
    font-size: 11pt;
    margin: 0 20px;
    text-decoration: none;
}
.no-appointments-message a:hover{
    color: #2c3e50e7;
}

.no-appointments-message .appoint-btn{
     margin: 20px 0 8px;
}
.no-appointments-message button{
  background: linear-gradient(132deg, rgb(125, 80, 204) 0%, rgb(58, 101, 255) 100%);
  padding: 13px 25px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 11pt;
  transition: 0.8s;
}
.no-appointments-message button:hover{
  background: linear-gradient(132deg, rgb(106, 62, 180) 0%, rgb(54, 92, 230) 100%);
  color: white;
  cursor: pointer;
}

.no-appointments-message > p {
  color: #2c3e50c9;
  margin: 0 20px 15px;
}

 hr {
  width: 100%;
  max-width: 450px;
  margin: 8px 0;
  border: solid 1px rgba(37, 37, 37, 0.23); 
}

.see-donations-btn{
    /* text-decoration: none; */
    color: #33495e;
    margin: 20px;
    font-size: 15pt;
}
.see-donations-btn:hover{
    /* text-decoration: none; */
    color: #263442;
    margin: 20px;
    font-size: 15pt;
}
</style>