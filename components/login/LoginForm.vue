<template>
  <div>
    <signup :isOpen="dialogSignup" @cancel="dialogSignup=false"  />
    <v-snackbar
      top
      absolute
      bottom
      color="error"
      outlined
      centered
      v-model="snackbar"
    >
      Wrong Credentials
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card width="450" class="rounded-lg py-5 pt-16" style="margin-top:200px" color="#1c2833
" elevation="15">
    <v-img src="./tree.png" height="300" width="250">

    </v-img>
      <div class="pa-5">
        <div
          class="pb-5 pt-0 white--text"
          style="font-size: 27px"
          align="center"

        >
          <b>DOT COM.MUNITREE</b>
        </div>
        <v-row>
          <v-col>
            <div align="start" class="white--text"><b>Username</b></div>
            <v-text-field
            color="transparent"
            background-color="transparent"
              rounded
              @keyup.enter="login"
              v-model="email"
              outlined
              dark
              dense
            ></v-text-field>
            <div align="start" class="white--text"><b>Password</b></div>
            <v-text-field
              rounded
              color="transparent"
            background-color="transparent"
              @keyup.enter="login"
              type="password"
              v-model="password"
              outlined
              dense
              dark
            ></v-text-field>
            <div class="pt-5">
              <v-btn
                @click="login"
                x-large
                color="white"
                width="200"
                dark
                outlined
                height="40"
                :loading="isLoaded"
              >
                Sign In
              </v-btn>
            </div>
            <div class="pt-5">
              <v-btn
                @click="dialogSignup=true"
                x-large
                color="white"
                width="200"
                dark
                outlined
                height="40"
              >
                Sign Up
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>
<script>
import Signup from './Signup.vue';
export default {
  components: { Signup },
  data() {
    return {
      snackbar: false,
      email: null,
      password: null,
      isLoaded: false,
      dialogSignup:false
    };
  },
  methods: {
    async login() {
      this.isLoaded = true;
      var credentials = {
        email: this.email,
        password: this.password,
      };
      try {
        var response = await this.$axios
          .post("auth/login/", credentials)
          .then((response) => {
            localStorage.setItem("token", response.data.access);
            const users = this.$axios
              .get(`/users/details/`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((users) => {
                localStorage.setItem("id", users.data.id);
                localStorage.setItem("email", users.data.email);
                localStorage.setItem("name", users.data.name);
                localStorage.setItem("firstname", users.data.firstname);
                localStorage.setItem("contact_number", users.data.contact_number);
                localStorage.setItem("lastname", users.data.lastname);
                localStorage.setItem("image", users.data.image);
                localStorage.setItem("account_type",users.data.account_type)
                if(users.data.account_type=='Board of Directors' || users.data.account_type=='Community Personnel' || users.data.account_type=='Admin' ) window.location.href = "/home";
                if(users.data.is_superuser) window.location.href = "/home";
                else window.location.href = "/home";
              });
          });

        this.isLoaded = false;
      } catch (error) {
        this.snackbar = true;
        this.isLoaded = false;
      }
    },
  },
};
</script>

<style>
</style>