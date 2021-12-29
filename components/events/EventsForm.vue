<template>
  <div align="center" class="pa-10">
    <events-add :isOpen="dialogAdd" :isAdd="isAdd" @cancel="dialogAdd=false" @refresh="eventsGetall" />
    <v-card elevation="2" width="1200" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span
            class="text-h4"
            style="cursor: pointer"
            @click="addItem"
          >
            CREATE AN EVENT
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search"  v-on:keyup.enter="searchData">
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
      <v-skeleton-loader
        v-if="isLoading"
        class="mx-auto"
        width="1200"
        type="card"
      ></v-skeleton-loader>
      <v-row v-else>
        <v-col cols="12" v-for="index in events" :key="index" class="pa-10">
          <v-card rounded-lg elevation="5">
            <v-row class="pa-10">
              <v-col cols="auto">
                <v-img :src="index.image" width="250"></v-img>
              </v-col>
              <v-col cols="2">
                <div>{{index.event_start_date}}</div>
                <div>{{index.venue}}</div>
                <div>{{index.event_name}}</div>
                <div>{{index.descriptions}}</div>
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
import EventsAdd from './EventsAdd.vue';
export default {
  components: { EventsAdd },
  created(){
    this.loadData()
  },
  data() {
    return {
      dialogAdd: false,
      isAdd:false,
      events:[],
      isLoading:false,
    };
  },
  methods:{
    loadData() {
      this.eventsGetall();
    },
    async eventsGetall() {
      this.isLoading=true;
      const res = await this.$axios
        .get(`/events/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.isLoading=false
        });
    },
    addItem(){
      this.dialogAdd = true
      this.isAdd=true
    },
    async searchData(){
      this.isLoading=true;
      const res = await this.$axios
        .get(`/marketplace?search=${this.search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.marketplace = res.data;
          this.isLoading=false
        });
    }
  }
};
</script>

<style>
</style>