<template>
  <div id="app">
    <Header></Header>
    <Sidebar></Sidebar>
    <main>
      <router-view></router-view>
    </main>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',
  components: {
    Navbar,
    Header,
    Sidebar
  }
}
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
main{
  margin: 80px 0;
  padding: 25px 0;
}
</style>
