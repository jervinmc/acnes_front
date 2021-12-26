<template>
  <v-dialog v-model="isOpenLogout" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Logout User</div>
    <div align="center" class="pa-10">
        Would you like to logout?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="cancel"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text @click="snackbar = false"> Logout </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["isOpenLogout"],
  methods:{
      cancel(){
          this.$emit("cancel")
      },
      logout(){
          localStorage.removeItem('access')
          window.location.href="login"
      }
  }
};
</script>

<style>
</style>