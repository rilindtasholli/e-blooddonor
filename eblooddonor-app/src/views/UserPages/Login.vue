<template>
  <div class="main">
    <BackButton></BackButton>

    <div class="login">
      <div>
        <img
          src="../../assets/avatar.png"
          class="profile-image"
          alt="profile icon"
        />
        <form @submit.prevent="handleSubmit">
          <div class="input-label">
            <label for="email"
              ><font-awesome-icon :icon="['fas', 'envelope']" /> Email</label
            >
            <input
              type="text"
              name="email"
              v-model="form.email"
              placeholder="Enter your email"
              @click="removeErrorMessage()"
            />
          </div>
          <div class="input-label">
            <label for="password"
              ><font-awesome-icon :icon="['fas', 'key']" /> Password</label
            >
            <input
              type="password"
              name="password"
              v-model="form.password"
              placeholder="Enter your password"
              @click="removeErrorMessage()"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    <p v-if="showError" id="error">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
      {{ this.errorMessage }}
    </p>
  </div>
</template>

<script>
import BackButton from "../../components/BackButton.vue";
import { mapActions } from "vuex";
import schema from '@/data/loginSchema'

export default {
  components: { BackButton },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false,
      errorMessage: "",
    };
  },
  
  methods: {
    ...mapActions(['Login']),

    async handleSubmit(){

      this.removeErrorMessage()

      var data = {
        email: this.form.email,
        password: this.form.password
      }

      try{
        await schema.validateAsync(data)
      }catch(error){
        this.errorMessage = error.message
        this.showError = true
        return
      }
      
      await this.Login(data).then(() => {
        this.removeErrorMessage()
        this.$router.push('/user/profile')
        location.reload(); 
      }).catch((error) => {
        console.error(error);

        if(error.response && error.response.data && error.response.data.status == 401) {
          this.errorMessage = "Wrong email or password"
        }else if(error.response && error.response.data && error.response.data.status == 500){
          this.errorMessage = error.response.data.message || "Internal Server Error"
        }else{
          this.errorMessage = error.message
        }

        this.showError = true
      });

    },

    removeErrorMessage(){
      this.errorMessage = ""
      this.showError = false
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login{
  margin-top: 25px;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px 0;
  background: linear-gradient(
    130deg,
    rgba(255, 74, 77, 1) 9%,
    rgba(48, 153, 255, 1) 100%
  );
}

.input-label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
}
label {
  /* padding: 12px 12px 12px 0; */
  display: inline-block;
  padding: 5px 0;
  font-size: 9pt;
  margin-left: 10px;
}
button[type="submit"] {
  background: linear-gradient(
    138deg,
    rgba(92, 169, 235, 1) 0%,
    rgba(148, 67, 240, 1) 100%
  );
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
  border: none;
  width: 100%;
  margin: 15px 0;
  font-size: 12pt;
}
button[type="submit"]:hover {
  background: linear-gradient(
    138deg,
    rgba(65, 152, 227, 1) 0%,
    rgba(124, 38, 222, 1) 100%
  );
}
input {
  /* margin: 5px; */
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  padding: 12px 18px;
  border-radius: 18px;
  border: none;
  font-size: 11pt;
}
#error {
  color: rgb(201, 63, 63);
}
</style>
