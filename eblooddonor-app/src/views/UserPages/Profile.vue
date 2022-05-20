<template>
    <div class="main">

      <div class="profile">
        <div class="profile-header">
          <div class="header-top">
            
            <div class="qrcode-profile-edituser">
                <button class="qrcode-btn">
                    <img src="../../assets/qrcodeicon.png" alt="QR Code Icon">
                </button>
                
                <img class="profile-image" src="../../assets/avatar.png"  alt="profile icon"/>

                <button class="editUser-btn">
                    <font-awesome-icon :icon="['fas', 'user-pen']" />
                </button>
            </div>

            <div class="basic-info">
              <h2 class="name">{{ userData.fname }} {{ userData.lname }}</h2>
              
              <!-- <img src="../assets/star.png" style="background: linear-gradient(121deg, rgba(153,111,94,1) 0%, rgba(163,148,141,1) 50%, rgba(153,111,94,1) 100%); " class="account-level" /> -->
            </div>
            
            <span class="email">
                <font-awesome-icon :icon="['fas', 'envelope']" />
                {{ userData.email }}
            </span>
            <span class="city">
                <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                Prishtine
            </span>
          </div>
          <div class="header-bottom">
            <div class="blood-type">
              <span class="info-value">{{ userData.bloodtype }}</span>
              <span class="info-title">Blood Type</span>
            </div>
            <div class="donations">
              <span class="info-value">11</span>
              <span class="info-title">Donations</span>
            </div>
          </div>
        </div>

        <div class="profile-bottom">
           <button @click="Test()">
              <font-awesome-icon :icon="['fas', 'calendar-check']" />
              TEST
            </button>

          <router-link class="appointmentBtn" to="/user/appointments">
            <button >
              <font-awesome-icon :icon="['fas', 'calendar-check']" />
              Appointments
            </button>
          </router-link>

          <!-- <a href="#history"><font-awesome-icon :icon="['fas', 'medal']"/> Rewards</a> -->

          <router-link to="/user/history">
            <button>
                <font-awesome-icon :icon="['fas', 'clock-rotate-left']" /> History
            </button>
          </router-link>

        </div>
      </div>

      
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    Test(){
      this.$store.dispatch('Test')
    }
  },
  mounted(){
    if(!this.$store.getters.isAuthenticated){
      this.$router.back()
    }
  },
  
}

</script>

<style scoped>

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-top {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-profile-edituser{
    display: flex;
    align-items: center;
}

.qrcode-btn{
    border: none;
    padding: 0;
    margin: 0 40px;
    background-color: transparent;
    cursor: pointer;
}
.qrcode-btn img{
    width: 40px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px 0;
  background: linear-gradient(
    130deg,
    rgba(255, 74, 77, 1) 9%,
    rgba(48, 153, 255, 1) 100%
  );
}

.editUser-btn{
    border: none;
    padding: 0;
    margin: 0 40px;
    background-color: transparent;
    cursor: pointer;
}
.header-top .editUser-btn svg{
   font-size: 30px;
   color: rgb(54, 54, 54);
}

.name {
  color: #424e5e;
  font-size: 25pt;
}
.email,
.city {
  margin: 5px 0;
  opacity: 0.9;
}
.header-top svg {
  color: #2a72c9;
}


.account-level {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 6px;
  margin: 0 10px;
}

.basic-info {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.basic-info > * {
  margin: 0 3px;
}
.basic-info > .age {
  /* font-weight: 600; */
  color: rgb(87, 99, 116);
  font-size: 14pt;
}
.place {
  color: rgb(87, 99, 116);
  font-size: 13pt;
}

.header-bottom {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.blood-type,
.donations {
  /* border: dashed 1px green; */
  /* width: 120px;
  height: 85px; */
  padding: 22px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 8px;
}

.blood-type .info-value,
.donations .info-value {
  font-weight: 600;
  font-size: 18pt;
  padding: 5px 0;
  color: rgb(47, 49, 53);
}
.blood-type .info-title,
.donations .info-title {
  font-size: 10pt;
  color: rgb(61, 65, 73);
}

.blood-type {
  /* background-color: rgb(228, 181, 191); */
  background: linear-gradient(
    130deg,
    rgba(205, 128, 142, 1) 0%,
    rgba(255, 170, 170, 1) 100%
  );
}
.donations {
  /* background-color: rgb(178, 216, 223); */
  background: linear-gradient(
    130deg,
    rgba(156, 209, 217, 1) 0%,
    rgba(164, 185, 222, 1) 100%
  );
}

.profile-bottom {
  /* border: dashed 1px red; */
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-bottom button {
  /* border: dashed 1px green; */
  padding: 20px 0;
  width: 100%;
  max-width: 250px;
  margin: 7px 0;
  color: rgb(61, 77, 105);
  font-weight: 600;
  font-size: 14pt;
  text-decoration: none;
  background-color: rgb(233, 235, 240);
  border-radius: 6px;
  border: solid 1px rgba(128, 128, 128, 0.123);
  box-shadow: 1px 1px 3px 0px rgb(12, 12, 12, 0.2);
  cursor: pointer;
}
.profile-bottom button:hover {
  background-color: rgb(208, 210, 216);
}

a {
  width: 100%;
  max-width: 250px;
}


#error {
  color: rgb(201, 63, 63);
}
</style>
