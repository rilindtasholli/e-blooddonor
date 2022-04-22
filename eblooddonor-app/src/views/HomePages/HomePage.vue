<template>
  <div class="main">
    <HomeHeader></HomeHeader>
    
    <div id="announcements-section">
      <h2><font-awesome-icon :icon="['fas', 'bullhorn']" /> Announcements</h2>

      <div v-if="this.announcements && this.announcements.length != 0">
        <div id="announcements">
            <AnnouncementCard
              v-for="announcement in announcements"
              :key="announcement._id"
              :announcement="announcement"
            />
          </div>
          
      </div>

      <div v-else>
        <h3><font-awesome-icon :icon="['fas', 'circle-exclamation']" /> There are no announcements!</h3>
      </div>
    </div>
    
   
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import AnnouncementCard from "@/components/AnnouncementCard.vue";

export default {
  name: "Home",
  components: {
    AnnouncementCard,
    HomeHeader
  },
  data(){
    return{
      announcements: [
        {
          _id: '1',
          title: 'Title1',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          bloodtype: 'B-',
          city: 'Prishtine',
          participants: ['user', 'user', 'user', 'user', 'user', 'user', 'user']
        },
        {
          _id: '2',
          title: 'Title2',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          bloodtype: 'O+',
          city: 'Prizren',
          participants: ['user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user' ,'user']
        },
        {
          _id: '3',
          title: 'Title3',
          text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
          bloodtype: 'A+',
          city: 'Ferizaj',
          participants: ['user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user', 'user' ,'user' ,'user' ,'user' ,'user']
        },
      ]
    }
  }
  
};
</script>

<style scoped>

#announcements-section{
  margin-top: 40px;
}
#announcements {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
}

#announcements-section svg{
  color: rgb(190, 65, 71);
}

ul{
  border: '2px solid red';
}

li {
  display: 'inline-block';
  border: '2px dotted green';
}
a {
    color: 'blue';
}

@media only screen and (max-width: 500px) {
  #announcements {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
  }
}
</style>

