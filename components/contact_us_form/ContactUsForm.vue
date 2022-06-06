<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="900" class="pa-5">
        <div align="center" >
            <div class="text-h5">
                 <b>Building Permit</b>
            </div>
            <div>
                Download Building Permit Form
            </div>
            <div>
                Building Permit Submission Google Forms Link
            </div>
        </div>
        <v-divider></v-divider>
        <div>
        <div class="text-h5 pt-5">
                 <b>Feedback and Suggestions</b>
            </div>
            <div>
                Download Feedback and Suggestions
            </div>
            <div>
                Feedback and Suggestions Google Forms Link
            </div>
        </div>
         <v-divider></v-divider>
        <div>
        <div class="text-h5 pt-5">
                 <b>Incident Report</b>
            </div>
            <div>
                Download Incident Report
            </div>
            <div>
                Incident Report Google Forms Link
            </div>
        </div>
         <v-divider></v-divider>
        <div>
        <div class="text-h5 pt-5">
                 <b>Report A Resident</b>
            </div>
            <div>
                Download Report Resident Form
            </div>
            <div>
                Report Resident Submission Google Forms Link
            </div>
        </div>
          <v-divider></v-divider>
        <div>
        <div class="text-h5 pt-5">
                 <b>Complaints</b>
            </div>
            <div>
                Download Complaints
            </div>
            <div>
                Complaints Google Forms Link
            </div>
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