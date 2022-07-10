<template>
  <div class="main">
    <BackButton></BackButton>

    <div class="announcement">
      <h1>{{ announcement.title }}</h1>
      <p>{{ announcement.description }}</p>
      <div class="info">
        <div class="bloodtype">
          <font-awesome-icon :icon="['fas', 'droplet']" />
          <span style="font-weight: bold">Blood Type: </span>
          <span>{{ announcement.bloodtype }}</span>
        </div>
        <div class="city">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <span style="font-weight: bold">Location: </span>
          <span>{{ announcement.location }}</span>
        </div>
        <div class="participants">
          <font-awesome-icon :icon="['fas', 'users']" />
          <span style="font-weight: bold">Participants: </span>
          <span>{{ this.participants }}</span>
        </div>
      </div>

      <div v-if="isAuthenticated && hasAppointment" class="announcement-footer">
        <p class="hasAppointment">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
          You already have an appointment
        </p>
      </div>

      <div v-else-if="isAuthenticated" class="announcement-footer">
        <VueDatePicker
          v-model="date"

          :min-date="minDate"

          placeholder="Choose date"
          no-header
        />
        <button @click="setAppointment" class="apply-button">
          Set Appointment
        </button>
      </div>

      <div v-else class="announcement-footer">
        <p class="click-here">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']"/>
          Please <router-link to="/user/login">login</router-link> first in order to set an appointment!
        </p>
      </div>
      
      <hr v-if="isAuthenticated">

      <p v-if="isAuthenticated" class="click-here">To schedule a new appointment without participating in this announcement <router-link to="/home/appointment">click here</router-link></p>
      
    </div>
  </div>

</template>

<script>
import BackButton from '@/components/BackButton.vue'
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    VueDatePicker,
    BackButton
  },
  props: ['id'],
  data() {
    return {
      announcement: {
        id: '',
        title: '',
        text: '',
        bloodtype: '',
        location: '',
        participants: []
      },
      // announcement: {
      //   _id: '1',
      //   title: 'Title1',
      //   text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
      //   bloodtype: 'B-',
      //   city: 'Prishtine',
      //   participants: ['user', 'user', 'user', 'user', 'user', 'user', 'user']
      // },
      date: null
    };
  },

  created() {
    this.reset()

    this.getAnnouncement(this.id).then(() => {
      this.announcement = this.getCurrentAnnouncement
    }).catch((error) => {
      console.log(error)
    })
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentAnnouncement', 'hasAppointment', 'userData']),

    participants(){
      if(this.announcement.appointments) return this.announcement.appointments.length
      return 0
    },

    minDate(){
      var date = new Date()
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    }
  },

  methods: {
    ...mapActions(['getAnnouncement', 'createAppointment', "fetchUserData"]),
    reset(){
      this.announcement = {
        id: '',
        title: '',
        text: '',
        bloodtype: '',
        location: '',
        participants: []
      }
    },

    setAppointment(){
      //set appointment
       // var DateTime = today.toISOString()
      var DateTime = `${this.date}T00:00:00.000Z`;

      var newAppointment = {
        date: DateTime,
        location: this.announcement.location,
        status: "Pending",
        userId: this.userData.id,
        announcementId: this.announcement.id
      }
      this.createAppointment(newAppointment).then(()=>{
        this.fetchUserData(this.userData.id).then(()=>{
          this.$router.push('/home')
        }).catch((error)=>{
          throw error
        })
      }).catch((error)=>{
        console.log(error);
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

.announcement {
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

.announcement > * {
  padding: 10px;
}

.announcement > p {
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

.announcement-footer {
  display: flex;
  /* border: dashed 1px red; */
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
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

.announcement hr {
  width: 100%;
  max-width: 450px;
  margin: 25px 0;
  padding: 0;
  border: solid 1px rgba(37, 37, 37, 0.23); 
}

.click-here{
  color: rgb(87, 87, 99);
}
.click-here a{
  color: rgb(61, 77, 214);
  white-space:nowrap;
}
.click-here a:hover{
  color: rgb(104, 62, 255);
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
