<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="900" class="pa-5">
    <div style="height:500px">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSepqU_rhsX-JN2qC4AR0BRIqUA3uknJrFfxyiH1N5_BiWF0Ew/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Google Forms is Loading…</iframe>
    </div>
      <!-- <v-row>
        <v-col class="pa-5">
          <span
            class="text-h4"
            style="cursor: pointer"
            @click="dialogAdd = true"
          >
            Reports Form
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <div align="start">
                Name(Optional):
            </div>
            <div>
                <v-text-field outlined placeholder="Ex:Juan Delacruz"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <div align="start">
                Descriptions
            </div>
            <div>
                <v-textarea outlined>

                </v-textarea>
            </div>
        </v-col>
        
      </v-row>
      <div class="pt-5" >
              <v-btn
                @click="feedback"
                x-large
                width="200"
                outlined
                height="40"
                :loading="isLoaded"
              >
                Feedback
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
    };
  },
  methods:{
    feedback(){
      window.location.href="https://docs.google.com/forms/d/e/1FAIpQLSfTLNWTsRAlZhpqzf5_3Ua8zUuDgIeOLZBEZYqC-x_YQqpe2Q/viewform?embedded=true"
    }
  }
};
</script>

<style>
</style>