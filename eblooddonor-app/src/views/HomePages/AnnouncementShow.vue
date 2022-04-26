<template>
  <div class="main">
    <BackButton></BackButton>

    <div class="announcement">
      <h1>{{ announcement.title }}</h1>
      <p>{{ announcement.text }}</p>
      <div class="info">
        <div class="bloodtype">
          <font-awesome-icon :icon="['fas', 'droplet']" />
          <span style="font-weight: bold">Blood Type: </span>
          <span>{{ announcement.bloodtype }}</span>
        </div>
        <div class="city">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
          <span style="font-weight: bold">Location: </span>
          <span>{{ announcement.city }}</span>
        </div>
        <div class="participants">
          <font-awesome-icon :icon="['fas', 'users']" />
          <span style="font-weight: bold">Participants: </span>
          <span>{{ announcement.participants.length }}</span>
        </div>
      </div>
      <div class="announcement-footer">
        <VueDatePicker
          v-model="date"
          
          placeholder="Choose date"
          no-header
        />
        <button class="apply-button">
          Set Appointment
        </button>
      </div>
      
      <hr>

      <p class="click-here">To schedule a new appointment without participating in this announcement <router-link to="/home/appointment">click here</router-link></p>
      
    </div>
  </div>

</template>

<script>
import BackButton from '@/components/BackButton.vue'
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";

export default {
  components: {
    VueDatePicker,
    BackButton
  },
  data() {
    return {
      announcement: {
        _id: '1',
        title: 'Title1',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        bloodtype: 'B-',
        city: 'Prishtine',
        participants: ['user', 'user', 'user', 'user', 'user', 'user', 'user']
      },
      date: null
    };
  },
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
