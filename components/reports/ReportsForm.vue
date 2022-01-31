<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="900" class="pa-5">
    <!-- <div style="height:350px">
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfTLNWTsRAlZhpqzf5_3Ua8zUuDgIeOLZBEZYqC-x_YQqpe2Q/viewform?embedded=true" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0">Google Forms is Loading…</iframe>
    </div> -->
    <div class="pt-5">
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