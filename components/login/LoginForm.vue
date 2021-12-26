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
      // this.isLoaded=true
      var credentials = {
        email: this.email,
        password: this.password,
      };
      try {
        // var data = qs.stringify({
        //   grant_type: "client_credentials",
        // });
        // alert(data)
        // var config = {
        //   method: "post",
        //   url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        //   headers: {
        //     Authorization:
        //       "Basic QWZoa1BDVUZubXlvZnV3TjNPU2ljTzdaODNnS29YbERVbWJhN21laDNHZXd2QjZlQzFuUTc0SnJNQ1NBTnBZeVV1ZHlqRXZaQm9kYS01cS06RUZtREUweVdxcW95VE42THVMZ0Y3V24wajJpWkdxOGdTa1NPR3phTmxmSEtaeTJ1cGwyRmticmlGbGdrNTVfU0dtRlN2SVZnbVZmOWNYZGs=",
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     Cookie:
        //       "cookie_prefs=P%3D1%2CF%3D1%2Ctype%3Dimplicit; enforce_policy=ccpa; ts=vreXpYrS%3D1734306076%26vteXpYrS%3D1639637099%26vt%3Dc1e12b5717dac1200018c0cefffffb00%26vr%3Dc1e12b5717dac1200018c0cefffffaff; ts_c=vr%3Dc1e12b5717dac1200018c0cefffffaff%26vt%3Dc1e12b5717dac1200018c0cefffffb00",
        //   },
        //   data:data
        // };
        // this.$axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // return;
        localStorage.setItem("token", response.data.access);
        this.isLoaded = false;
        window.location.href = "/dashboard";
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