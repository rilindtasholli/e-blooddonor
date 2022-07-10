<template>
  <div>
    
      <div v-if="isAuthenticated" class="header-authenticated">
        <div class="home-header">
          <font-awesome-icon :icon="['fas', 'face-smile']"></font-awesome-icon>
          <div class="home-header-top">
            <h1>Welcome back, <strong>{{ userData.firstName }}</strong></h1>

            <p v-if="!hasAppointment">You don't have any appointments!</p>

            <div v-else class="user-appointment">
              <p>{{ this.daysLeftMessage }} <router-link to="/user/appointments">View</router-link></p>
            </div>
          </div>

          <div v-if="!hasAppointment" class="home-header-bottom">
            <router-link class="appoint-btn" to="/home/appointment">
              <button>Set New Appointment</button>
            </router-link>

            <hr />
            <p>or</p>
            <a href="#announcements"
              >set an appointment from announcements below
              <font-awesome-icon :icon="['fas', 'angle-down']"
            /></a>
          </div>
        </div>
        <!-- <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fill-opacity="1" d="M0,128L80,133.3C160,139,320,149,480,165.3C640,181,800,203,960,192C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg> -->
        <!-- <img class="wave" src="../assets/wave.svg"> -->
        <div class="wave"></div>
      </div>

    <div v-else class="header-not-authenticated">
      <div class="shadow-overlay"></div>
      <div class="header-content">
        <div class="main-content">
            <span>Donate blood</span>
            <span>Make a difference</span>
            <span class="highlight-text">Save a life.</span>
            <div class="buttons">
              <router-link class="donate-btn" to="/home/appointment">Donate</router-link>
              <router-link class="about-btn" to="/contact">Contact</router-link>
            </div>
        </div>
    
        <div class="illustration">
          <img src="../assets/medicine.svg">
        </div>
      </div>
      
    </div>

  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters(['isAuthenticated', 'userData', 'hasAppointment', 'userAppointments']),

    daysLeftMessage(){
      var today = new Date()
      today.setHours(0,0,0,0)
      var appointmentDate = new Date(this.userAppointments[0].date)
      
      const diffTime = Math.abs(appointmentDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if(diffDays > 1){
        return `You have an appointment in ${diffDays} days (${appointmentDate.toDateString()})`
      }else if(diffDays == 1){
        return `You have an appointment tomorrow (${appointmentDate.toDateString()})`
      }else{
        return `You have an appointment today (${appointmentDate.toDateString()})`
      }
    }
  },
  
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  }
  

};
</script>

<style scoped>

.header-not-authenticated{
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 75vh;
  margin-top: -35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.header-content{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  /* border: dashed 1px green; */
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.main-content span{
  color: white;
  font-size: 35pt;
  padding: 0px 13px;
}

.main-content .highlight-text{
  font-weight: bold;
  background: linear-gradient(120deg, rgba(242,108,108,0.63) 9%, rgba(135,120,226,0.63) 81%);
  padding: 5px 15px;
  border-radius: 20px 0;
  letter-spacing: 2px;
}

.main-content .buttons{
  margin: 35px 0 0 10px;
}
.main-content .buttons a{
  color: white;
  text-decoration: none;
  padding: 11px 25px;
  border: solid 2px white;
  border-radius: 25px;
  margin-right: 10px;
}

.main-content .buttons .donate-btn{
  background-color: #e93b44;
  border: solid 2px #e64048;
  padding: 11px 35px;
  transition: 0.3s;
}
.main-content .buttons .donate-btn:hover{
  background-color: #b82f36;
  border: solid 2px #ca3840;
}

.main-content .buttons .about-btn{
  transition: 0.3s;
}
.main-content .buttons .about-btn:hover{
  /* background-color: #d6373f; */
  color: rgb(205, 199, 252);
  border: solid 2px #5140e6;
}

.illustration{
  display: flex;
  justify-content: center;
}
.illustration img{
  width: 450px;
}


.shadow-overlay{
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
}


/*---------------- Authenticated ----------------*/
.header-authenticated {
  background: linear-gradient(
    120deg,
    rgba(240, 209, 209, 1) 9%,
    rgba(208, 204, 233, 1) 95%
  );
  margin-top: -40px;
  padding: 60px 0 0;
}

.header-authenticated .wave {
  margin-top: -4vw;
  background-image: url("../assets/wave.svg");
  background-repeat: none;
  background-size: cover;
  background-position: center top;
  width: 100%;
  height: 10vw;
  min-height: 150px;
  /* border: solid 1px red; */
}

.home-header > svg {
  color: white;
  font-size: 50pt;
  margin: 8px 0;
  filter: drop-shadow(0px 0px 3px rgba(36, 35, 35, 0.35));
}

/* #home-header{
  padding-top: 100px;
} */
.home-header-top > h1 {
  margin: 0 20px;
}
.home-header-top > p {
  margin: 8px 20px;
}

.home-header-top .user-appointment{
  /* border: dashed 1px red; */
  margin: 20px 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.user-appointment p{
  /* border: solid 1px rgba(255, 255, 255, 0.411); */
  border-radius: 11px;
  padding: 20px 25px;
  background: linear-gradient(138deg, rgb(212, 195, 231) 0% ,rgb(181, 205, 228) 100%);
  box-shadow: 0px 0px 15px 2px rgba(255, 255, 255, 0.30);
}
.user-appointment p > a{
  margin: 0 5px;
}

.user-appointment a{
  color: rgba(19, 95, 172, 0.788);
  transition: 0.3s;
}
.user-appointment a:hover{
  color: rgba(2, 36, 73, 0.788);
}

.home-header-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-header-bottom a {
  text-decoration: none;
  color: #2c3e50c9;
  font-size: 11pt;
  margin: 0 20px;
  text-decoration: none;
}
.home-header-bottom a:hover {
  color: #2c3e50e7;
}

.home-header-bottom .appoint-btn {
  margin: 20px 0 8px;
}
.home-header-bottom button {
  background: linear-gradient(
    132deg,
    rgb(125, 80, 204) 0%,
    rgb(58, 101, 255) 100%
  );
  padding: 13px 25px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 11pt;
  transition: 0.8s;
}
.home-header-bottom button:hover {
  background: linear-gradient(
    132deg,
    rgb(106, 62, 180) 0%,
    rgb(54, 92, 230) 100%
  );
  color: white;
  cursor: pointer;
}

.home-header-bottom > p {
  color: #2c3e50c9;
  font-size: 11pt;
  margin: 0 20px 15px;
}

.home-header-bottom > hr {
  width: 100%;
  max-width: 250px;
  margin: 8px 0;
  border: solid 1px rgba(252, 252, 252, 0.5);
}

@media only screen and (max-width: 900px) {
 .header-content{
   flex-direction: column;
  
 }
 .main-content{
   order: 2;
    margin: 50px 0;
 }
 .illustration img{
   width: 50vw;
 }
}

@media only screen and (max-width: 600px) {
 .illustration img{
   width: 80vw;
 }
 .main-content span{
  font-size: 10vw;
}
}
</style>
