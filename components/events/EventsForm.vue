<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="1200" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span
            class="text-h4"
            style="cursor: pointer"
            @click="dialogAdd = true"
          >
            CREATE AN EVENT
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="px-16">
        <v-col>
          <div class="text-h4">UP COMING EVENTS</div>
        </v-col>
        <v-col>
            <v-divider vertical></v-divider>
        </v-col>
        <v-col>
          <div class="text-h4">COMMUNITY-LED EVENTS</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" v-for="index in 5" :key="index" class="pa-10">
          <v-card rounded-lg elevation="5">
            <v-row class="pa-10">
              <v-col cols="auto">
                <v-img src="./main_background.jpg" width="250"></v-img>
              </v-col>
              <v-col cols="2">
                <div>Date Time</div>
                <div>Venue</div>
                <div>Title of Event</div>
                <div>Description</div>
              </v-col>
            </v-row>
            <div class="pt-0 pb-5">
              <v-btn
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
              >
                View Event
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
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
};
</script>

<style>
</style>