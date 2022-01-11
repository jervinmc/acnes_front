<template>
  <v-img src="./main_logo.jpeg" light >
    <v-sheet color="transparent" height="85vh" class="d-flex justify-center align-center">
      <div align="center">
          <login-form/>
      </div>
    </v-sheet>
  </v-img>
</template>

<script>
import LoginForm from '../../components/login/LoginForm.vue';

export default {
  components: { LoginForm },

};
</script>
<style>
</style>