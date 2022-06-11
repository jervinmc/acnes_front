<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="900" class="pa-5">
     <div style="height:500px" v-if="account_type=='Resident'">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSepqU_rhsX-JN2qC4AR0BRIqUA3uknJrFfxyiH1N5_BiWF0Ew/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Google Forms is Loading…</iframe>
    </div>
    <div style="height:500px" v-else-if="account_type!='System Admin'">
       <v-btn
          @click="view"
          x-large
          width="200"
          outlined
          height="40"
          :loading="isLoaded"
              >
                View Responses
              </v-btn>
    </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAdd: false,
      account_type:'',
    };
  },
  created(){
    this.loadData()
  },
  methods:{
    view(){
      window.location.href="https://docs.google.com/forms/d/1tGM_eS_CO609suQsOunviPQ3JhQ5VI0sq-dfAkfbFrw/edit#responses"
    },
    loadData(){
     
      this.account_type=localStorage.getItem('account_type')

    }
  }
};
</script>

<style>
</style>