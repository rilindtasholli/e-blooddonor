<template>
  <div class="main">
    <BackButton></BackButton>

    <div class="register">
      <div>
        <img
          src="../../assets/avatar-plus.png"
          class="profile-image"
          alt="profile icon"
        />
        <form @submit.prevent="handleSubmit">
          <div class="input-label">
            <label for="name"
              ><font-awesome-icon :icon="['fas', 'user']" /> First Name</label
            >
            <input
              type="text"
              name="name"
              v-model="form.fname"
              placeholder="Enter your first name"
              @click="removeErrorMessage()"
            />
          </div>

          <div class="input-label">
            <label for="name"
              ><font-awesome-icon :icon="['fas', 'user']" /> Last Name</label
            >
            <input
              type="text"
              name="name"
              v-model="form.lname"
              placeholder="Enter your last name"
              @click="removeErrorMessage()"
            />
          </div>
          

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
            <label for="bloodtype"
              ><font-awesome-icon :icon="['fas', 'droplet']" /> Blood
              Type</label
            >
            <select
              name="bloodtype"
              class="select-blood"
              v-model="form.bloodtype"
              @click="removeErrorMessage()"
            >
              <option disabled>Select blood type</option>
              <option v-for="bloodtype in bloodtypes" :key="bloodtype">{{ bloodtype }}</option>
            </select>
          </div>

          <div class="input-label">
            <label for="city"
              ><font-awesome-icon :icon="['fas', 'fa-home']" /> City</label
            >
            <select v-model="form.city" class="select-city"
            @click="removeErrorMessage()">
              <option disabled>Select City</option>
              <option v-for="city in cities" :key="city">{{ city }}</option>
            </select>
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

          <div class="input-label">
            <label for="passwordConfirm"
              ><font-awesome-icon :icon="['fas', 'key']" /> Confirm
              Password</label
            >
            <input
              type="password"
              name="passwordConfirm"
              v-model="form.passwordConfirm"
              placeholder="Confirm your password"
              @click="removeErrorMessage()"
            />
          </div>

          <button type="submit">Register</button>
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
import { mapActions, mapGetters } from "vuex";
import schema from '@/data/registerSchema'

export default {
  components: { BackButton },
  data() {
    return {
      form: {
        fname: "",
        lname: "",
        email: "",
        bloodtype: "O+",
        city: "Prishtinë",
        password: "",
        passwordConfirm: "",
      },
      showError: false,
      errorMessage: "",
    };
  },

  computed: {
    ...mapGetters(['cities', 'bloodtypes'])
  },

  methods: {
    ...mapActions(['Register']),

    async handleSubmit(){

      this.removeErrorMessage()

      var userData = {
        email: this.form.email,
        firstName: this.form.fname,
        lastName: this.form.lname,
        bloodType: this.form.bloodtype,
        location: this.form.city,
        password: this.form.password,
        confirmPassword: this.form.passwordConfirm
      }

      //console.log(userData)

      try{
        await schema.validateAsync(userData)
      }catch(error){
        this.errorMessage = error.message
        this.showError = true
        return
      }

      await this.Register(userData).then((response) => {
        console.log(response)
        this.$router.push('/user/login')
      }).catch((error) => {
        console.error(error);

        if(error.response && error.response.status && error.response.status == 500){
          this.errorMessage = (error.response.data && error.response.data.message) || "Internal Server Error"
        }else{
          this.errorMessage = error.message
        }

        this.showError = true
      })
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

.register{
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
    121deg,
    rgba(195, 89, 121, 1) 18%,
    rgba(235, 96, 96, 1) 100%
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
    121deg,
    rgba(186, 61, 99, 1) 18%,
    rgba(235, 73, 73, 1) 100%
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
select {
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  padding: 12px 0;
  border-radius: 18px;
  border: none;
  font-size: 14pt;
  font-weight: bold;
  width: 96%;
  text-align: center;
  color: rgb(35, 37, 39);
  /* cursor: pointer; */
  transition: 0.35s;
}

.select-blood {
  background-color: rgb(231, 159, 171);
}
.select-blood:hover {
  background-color: rgb(201, 140, 151);
  transition: 0.05s;
}

.select-city {
  background-color: rgb(189, 203, 236);
}
.select-city:hover {
  background-color: rgb(169, 180, 207);
  transition: 0.05s;
}

#error {
  color: rgb(201, 63, 63);
}
</style>
