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
    
    <Pagination></Pagination>
   
  </div>

</template>

<script>
import HomeHeader from "@/components/HomeHeader.vue";
import AnnouncementCard from "@/components/AnnouncementCard.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    AnnouncementCard,
    HomeHeader,
    Pagination
  },
  data(){
    return{
      announcements: [],
    }
  },

  created(){
    this.fetchAnnouncements()

    if(this.isAuthenticated){
      this.fetchUserData(this.userData.id)
    }
  },

  computed: {
    ...mapGetters(['getAnnouncements', 'isAuthenticated', 'userData']),

    page(){
      return parseInt(this.$route.query.page) || 1
    }
  },

  watch: {
    $route() {
      this.fetchAnnouncements()
    }
  },

  methods: {
    ...mapActions(['getAllAnnouncements', 'fetchUserData']),
    
    fetchAnnouncements(){
       this.getAllAnnouncements(this.page).then(() => {
        console.log('announcements fetched successfuly')
        this.announcements = this.getAnnouncements;
      }).catch((error) => {
        console.log(error)
      })
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

