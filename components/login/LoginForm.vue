<template>
  <div>
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
    <v-card width="450" class="rounded-lg py-5" elevation="15">
      <div class="pa-5">
        <div
          class="pb-10 pt-0 black--text"
          style="font-size: 27px"
          align="center"
        >
          <b>Login</b>
        </div>
        <v-row>
          <v-col>
            <div align="start" class="black--text"><b>Username</b></div>
            <v-text-field
              rounded
              @keyup.enter="login"
              v-model="email"
              outlined
              dense
            ></v-text-field>
            <div align="start" class="black--text"><b>Password</b></div>
            <v-text-field
              rounded
              @keyup.enter="login"
              type="password"
              v-model="password"
              outlined
              dense
            ></v-text-field>
            <div class="pt-5">
              <v-btn
                @click="login"
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
                :loading="isLoaded"
              >
                Sign In
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import * as qs from 'qs'
export default {
  data() {
    return {
      snackbar: false,
      email: null,
      password: null,
      isLoaded: false,
    };
  },
  methods: {
    async login() {
      // window.location.href="/dashboard"
      // return
      this.isLoaded=true
      var credentials = {
        email: this.email,
        password: this.password,
      };
      try {
        var response =await this.$axios.post("auth/login/",credentials)
        console.log(response)
        localStorage.setItem("token", response.data.access);
        window.location.href = "/home";
        this.isLoaded = false;
        
      } catch (error) {
        alert(error);
        this.snackbar = true;
        this.isLoaded = false;
      }
    },
  },
};
</script>

<style>
</style>