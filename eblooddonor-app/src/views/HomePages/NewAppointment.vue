<template>
  <div class="main">
    <BackButton></BackButton>

    <div class="appointment">
      <h1>
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        Schedule New Appointment
      </h1>
      <p>Set an appointment for your next blood donation.</p>

      <div class="info">
        <div class="city">
          <div v-if="isAuthenticated" class="input-label">
            <label style="font-weight: bold" for="city">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />Location:
            </label>
            <select v-model="location" class="select-location">
              <option disabled>Select Location</option>
              <option v-for="city in cities" :key="city">{{ city }}</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="isAuthenticated && hasAppointment" class="appointment-footer">
        <p class="hasAppointment">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
          You already have an appointment
        </p>
      </div>

      <div v-else-if="isAuthenticated" class="appointment-footer">
        <VueDatePicker v-model="date" :min-date="minDate" placeholder="Choose date" no-header />
        <button @click="setAppointment" class="apply-button">Set Appointment</button>
      </div>

      <div v-else class="appointment-footer">
        <p class="click-here">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
          Please <router-link to="/user/login">login</router-link> first in order to set an appointment!
        </p>
      </div>

      <hr v-if="isAuthenticated"/>

      <p v-if="isAuthenticated" class="click-here">
        To participate in an announcement
        <router-link to="/">click here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    VueDatePicker,
    BackButton,
  },
  data() {
    return {
      date: null,
      location: "Prishtinë"
    };
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'cities', 'userData', 'hasAppointment']),

    minDate(){
      var date = new Date()
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  },

  methods: {
    ...mapActions(['createAppointment', 'fetchUserData']),
    setAppointment(){
      var DateTime = `${this.date}T00:00:00.000Z`

      var newAppointment = {
        date: DateTime,
        location: this.location,
        status: "Pending",
        userId: this.userData.id
      }

      this.createAppointment(newAppointment).then(()=>{

         this.fetchUserData(this.userData.id).then(()=>{
            this.$router.push('/home')
          }).catch((error) => {
            throw error
          })

      }).catch((error) => {
        console.log(error)
      })
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.appointment {
  /* background: linear-gradient(120deg, rgb(231, 235, 238) 0%, rgb(229, 232, 235) 100%); */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  width: 100%;
  max-width: 750px;
  padding: 25px 0;
  margin: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  /* box-shadow: 0px 0px 13px 1px rgba(15, 15, 15, 0.35); */
}

.appointment > * {
  padding: 10px;
}

.appointment > p {
  /* border: dashed 1px red; */
  width: 100%;
  max-width: 550px;
  margin: 0px 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.info {
  display: flex;
  flex-direction: column;
}

.info > div {
  margin: 4px 0;
}

.appointment-footer {
  display: flex;
  /* border: dashed 1px red; */
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  margin: 0px 0 20px;
  background-color: rgb(255, 255, 255);
}

.apply-button {
  /* background-color: rgb(59, 89, 189); */
  background: linear-gradient(
    132deg,
    rgb(125, 80, 204) 0%,
    rgb(58, 101, 255) 100%
  );
  padding: 8px 25px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 11pt;
  transition: 0.8s;
}
.apply-button:hover {
  /* background-color: rgb(69, 111, 202); */
  background: linear-gradient(
    132deg,
    rgb(106, 62, 180) 0%,
    rgb(54, 92, 230) 100%
  );
  color: white;
  cursor: pointer;
}

svg {
  margin: 0 3px;
}

h1 svg {
  color: rgb(190, 65, 71);
}
.input-label {
  /* display: flex; */
  /* flex-direction: column; */
}
select {
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.15);
  padding: 12px 0;
  border-radius: 18px;
  border: none;
  font-size: 11pt;
  font-weight: bold;
  /* width: 96%; */
  text-align: center;
  color: rgb(35, 37, 39);
  /* cursor: pointer; */
  transition: 0.35s;
  margin: 10px 3px;
}
.select-location {
  background-color: rgb(189, 203, 236);
}
.select-location:hover {
  background-color: rgb(169, 180, 207);
  transition: 0.05s;
}

.appointment hr {
  width: 100%;
  max-width: 450px;
  margin: 25px 0;
  padding: 0;
  border: solid 1px rgba(37, 37, 37, 0.23);
}

.click-here {
  color: rgb(87, 87, 99);
}
.click-here a {
  color: rgb(61, 77, 214);
}
.click-here a:hover {
  color: rgb(42, 0, 192);
}
.click-here svg,
.hasAppointment svg{
  color: rgb(216, 131, 61);
}

.photo-show img {
  max-width: 550px;
  max-height: 550px;
}

#error {
  color: rgb(201, 63, 63);
  margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .photo-show img {
    width: 95vw;
  }
}
</style>
