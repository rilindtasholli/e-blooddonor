<template>
    <div>
        <div id="nav">
            <router-link to="/home"><font-awesome-icon :icon="['fas', 'home']" /><span>Home</span></router-link>
            <img src="../assets/logo.png" class="nav-logo">
            <router-link to="/user"><font-awesome-icon :icon="['fas', 'user']" /><span>Profile</span></router-link>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
#nav {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-top: 20px;
    background: linear-gradient(0deg, rgba(255,255,255,1) 59%, rgba(255,255,255,0.8379552504595589) 74%, rgba(255,255,255,0.6782913849133403) 83%, rgba(255,255,255,0) 100%);
}

#nav a {
  font-weight: bold;
  color: #1e2933;
  width: 100%;
  height: 100%;
  background-color: rgb(196, 196, 196);
  padding: 20px 0;
  text-decoration: none;
  font-size: 18pt;
  transition: 0.5s;
}
#nav a:hover{
  background-color: rgb(168, 167, 167);
  transition: 0.2s;
}

#nav a:first-child {
  border-radius: 0 35px 0 0;
}
#nav a:last-child {
  border-radius: 35px 0 0 0;
}

#nav a.router-link-active {
  background-color: rgba(185, 35, 48, 0.932);
  color: white;
}

#nav svg{
    margin: 0 5px;
}

.nav-logo{
    width: 65px;
    margin-bottom: 12px;
}

@media only screen and (max-width: 600px) {
  span{
    display: none;
  }

  #nav a {
    padding: 15px 0;
    font-size: 25pt;
  }
}
</style>
