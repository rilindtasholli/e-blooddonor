<template>
    <div>
        <BackButton></BackButton>

        <div class="my-donations">
            <h1><font-awesome-icon :icon="['fas', 'clock-rotate-left']"></font-awesome-icon> Donation History</h1>

            <hr>
            
             <!-- <div v-if="donationHistory.length > 0"> -->
            <div class="donation-history">
                <div v-for="donation in donationHistory" :key="donation.id" class="donation">
                    <div class="time-stamp">
                        <div class="line"></div>
                        <div class="circle">
                            <font-awesome-icon :icon="['fas', 'droplet']"></font-awesome-icon>
                        </div>
                    </div>

                    <div class="info">
                        <span class="date">{{convertToDate(donation.date)}}</span>
                        <span class="location">
                            <font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon>
                            {{donation.location}}
                        </span>
                    </div>
                </div>
                <div v-if="!donationHistory || donationHistory.length < 1" class="no-donations">
                    <div class="time-stamp">
                        <div class="line"></div>
                        <div class="circle"></div>
                    </div>

                    <div class="info">
                        <span class="date">You haven't donated yet.</span>
                    </div>
                </div>

                <div class="created">
                    <div class="time-stamp">
                        <div class="circle"></div>
                    </div>

                    <div class="info">
                        <span class="date">{{convertToDate(accountCreated)}}</span>
                        <span class="account-created">
                            <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                            Created account
                        </span>
                    </div>
                </div>
            </div>
<!-- 
            <div v-else class="no-appointments-message">
            
                <p>You don't have any appointments!</p>
                <router-link class="appoint-btn" to="/home/announcement">
                    <button>Set New Appointment</button>
                </router-link>
            </div> -->

            <hr>
            
            <router-link class="see-donations-btn" to="appointments">
                See appointments <font-awesome-icon :icon="['fas', 'calendar-check']" />
            </router-link>
        </div>
    </div>
    
</template>

<script>
import BackButton from '@/components/BackButton.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        BackButton
    },
    data() {
        return {
            donationHistory: [
                {
                    id: '1',
                    date: '11 Oct, 2022',
                    location: 'Ferizaj',
                },
                {
                    id: '2',
                    date: '7 July, 2022',
                    location: 'Prishtine',
                },
                {
                    id: '2',
                    date: '10 May, 2022',
                    location: 'Prishtine',
                },
                {
                    id: '2',
                    date: '5 Jan, 2022',
                    location: 'Prishtine',
                },
            ],
            accountCreated: '10 Dec, 2021'
        }
    },

    created(){
        this.donationHistory = this.userDonations
        this.accountCreated = this.userData.createdDate
    },

    computed: {
        ...mapGetters(['userDonations', 'userData'])
    },

    methods: {
      
        convertToDate(isoStringDate){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var date = new Date(isoStringDate)
            return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
        }
    }
}

</script>

<style scoped>
h1 svg{
    color: rgb(190, 65, 71);
}

.my-donations{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.donation-history{
    /* border: solid 1px rgb(204, 143, 143); */
    margin-top: 20px;
}

.donation,
.created,
.no-donations{
    /* border: dashed 1px blue; */
    display: flex;
}

.time-stamp{
    position: relative;
    width: 50px;
    min-height: 80px;
    /* border: dashed 1px green; */
    display: flex;
    justify-content: center;
}

.time-stamp .circle,
.time-stamp .line{
    position: absolute;
}

.donation .time-stamp .circle{
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dd2d3c;
    border-radius: 50%;
    border: solid 5px white;
}
.donation .time-stamp .circle svg{
    color: white;
}
.time-stamp .line{
    width: 2px;
    height: 100%;
    background-color: #585a61;
}

.created .time-stamp .circle{
    padding: 7px;
    background-color: #505163;
    border-radius: 50%;
    border: solid 5px white;
}

.no-donations .time-stamp .circle{
    padding: 5px;
    background-color: #505163;
    border-radius: 50%;
    border: solid 8px white;
}

.donation .info,
.created .info,
.no-donations .info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.info .date{
    padding: 3px 0 7px;
    font-weight: bold;
    color: #505163;
}
.donation .info .date{
     padding-top: 9px;
    color: #dd2d3c;
}

.info .location,
.info .account-created{
    font-size: 11pt;
    color: #575763;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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