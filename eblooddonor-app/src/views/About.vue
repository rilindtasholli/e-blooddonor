<template>
  <div>
    <div class="main">
      <h1><font-awesome-icon :icon="['fas', 'info-circle']" /> About</h1>
      <div class="main-content">
        <div id="slider" class="slidesS">
          <ul id="slideWrap">
            <li><img src="../assets/1.png" alt="" /></li>
            <li><img src="../assets/2.png" alt="" /></li>
            <li><img src="../assets/3.png" alt="" /></li>
            <li><img src="../assets/4.png" alt="" /></li>
            <li><img src="../assets/5.png" alt="" /></li>
          </ul>
          <a id="prev" href="#"></a>
          <a id="next" href="#"></a>
        </div>
        <div class="textarea">
          <img class="logo" src="../assets/logo-text.png" alt="" />
          <p>
            Ne besojmë se krijimi i një aplikacioni siç është E-BloodDonor është
            i domosdoshëm për një shoqëri në të cilën jetojmë. Qellimi ynë është
            që të zbusim vdekshmërinë nga rastet e humbjës së gjakut. Jemi të
            emocionuar që të ju ndihmojmë në udhetimin tonë!
          </p>
        </div>
      </div>
      <div class="team">
        <h2>Our Team</h2>
        <div class="members">
          <div class="member">
            <img src="../assets/altina.jpg" alt="" />
            <h3 class="name">Altina Salihu</h3>
          </div>
          <div class="member">
            <img src="../assets/rilind.png" alt="" />
            <h3 class="name">Rilind Tasholli</h3>
          </div>
          <div class="member">
            <img src="../assets/besarti.jpg" alt="" />
            <h3 class="name">Besart Ibishi</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

svg {
  color: rgb(190, 65, 71);
}
.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: dashed 1px green; */
}
.textarea {
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  /* border: dashed 1px red; */
}

.textarea .logo {
  width: 130px;
  padding: 20px 0;
}
.textarea p {
  max-width: 450px;
  font-size: 14pt;
  letter-spacing: 1px;
}

.card {
  margin: 20px;
  width: 450px;
  height: 55%;
  /* position: absolute; */
  border-radius: 20px;
  box-shadow: 2px 5px 10px 2px rgba(177, 150, 150, 0.856);
}

.team {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 50px 0;
  background: rgb(214, 200, 201);
  box-shadow: 0 3px 10px 2px rgba(95, 82, 82, 0.452);
}

.members {
  display: flex;
  justify-content: center;
  width: 100%;
}

.member {
  /* border: dashed 1px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.member img {
  width: 130px;
  padding: 15px;
  margin: 5px 0;
  border-radius: 50%;
  background-color: rgb(151, 162, 199);
}

.name {
  font-size: 11pt;
  margin: 5px 0;
}
#slider {
  position: relative;
  width: 450px;
  height: auto;
  margin: 50px 0 20px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  border-radius: 10%;
}

#slider ul {
  position: relative;
  list-style: none;
  height: 100%;
  width: 10000%;
  padding: 0;
  margin: 0;
  transition: all 750ms ease;
  left: 0;
}

#slider ul li {
  position: relative;
  height: 100%;
  float: left;
}

#slider ul li img {
  width: 450px;
  height: auto;
}

@media only screen and (max-width: 800px) {
  .main-content {
    flex-direction: column;
  }
}

@media only screen and (max-width: 600px) {
  .main-content {
    flex-direction: column;
  }

  #slider {
    max-width: 90vw;
  }

  #slider ul li img {
    max-width: 90vw;
  }

  .card {
    width: 80vw;
    order: 2;
  }

  .members {
    flex-direction: column;
  }
}
</style>
