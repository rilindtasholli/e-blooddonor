<template>
  <div id="home-header-section">
    <div id="home-header">
      <font-awesome-icon :icon="['fas', 'face-smile']"></font-awesome-icon>
      <div class="home-header-top">
        <h1>Welcome back, <strong>Filan</strong></h1>
        <p>You don't have any appointments!</p>
      </div>

      <div class="home-header-bottom">
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
</template>

<script>
export default {
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
  },
};
</script>

<style scoped>
#home-header-section {
  background: linear-gradient(
    120deg,
    rgba(240, 209, 209, 1) 9%,
    rgba(208, 204, 233, 1) 95%
  );
  margin-top: -40px;
  padding: 60px 0 0;
}

#home-header-section .wave {
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

#home-header > svg {
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
</style>
