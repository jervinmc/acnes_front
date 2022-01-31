<template>
  <div align="center" class="pa-10">
    <v-dialog v-model="approveConfirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Confirmation</div>
    <div align="center" class="pa-10">
        Are you sure you want to approve?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="approveConfirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="approve"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <events-add :isOpen="dialogAdd" :isAdd="isAdd" @cancel="dialogAdd=false" @refresh="eventsGetall" />
    <events-view v-if="dialogView" :isOpen="dialogView" @cancel="dialogView=false" :items="selectedItem" />
    <v-card elevation="2" width="900" class="pa-5">
      <v-row>
        <v-col class="pa-4" align-self="center" align="start">
          <span
            class="text-h5"
          >
            Event
          </span>
        </v-col>
        <v-col align="end" v-if="$route.name!='events-upcoming_events'">
          <div class="pt-5" v-if="($route.name=='events-community_events' && account_type=='Resident') || ($route.name=='events-official_events' && account_type=='Admin')">
              <v-btn
                @click="addItem"
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
              >
                Add Event
              </v-btn>
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search"  v-on:keyup.enter="searchData">
          </v-text-field>
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
          <v-card rounded-lg elevation="5" v-if="index.is_approved">
            <v-row class="pa-10">
              <v-col cols="auto">
                <v-img :src="index.image" width="200" height="200"></v-img>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="7" align="start">
                <div><b>{{formatDate(index.event_start_date)}}</b></div>
                <div><b>{{index.venue}}</b></div>
                <div><b>{{index.event_name}}</b></div>
                <div><b>{{index.descriptions}}</b></div>
                <div class="green--text"><b>Going {{index.no_going}}</b></div>
                <div><b>Interested: {{index.no_interested}}</b></div>
              </v-col>
            </v-row>
            <div class="pt-0 pb-5">
              <v-btn
                @click="viewEvent(index)"
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
            <div align="end" class="pa-10" v-if="account_type=='Admin' && event_type=='community_led_events'">
              <v-icon @click="approveEvent(index)" size="40" :color="index.is_approved ? 'green' : 'grey'">mdi-check</v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import EventsAdd from './EventsAdd.vue';
import EventsView from './EventsView.vue';
import moment from "moment";
export default {
  components: { EventsAdd, EventsView },
  created(){
    this.loadData()
  },
  data() {
    return {
      buttonLoad:false,
      dialogAdd: false,
      isAdd:false,
      events:[],
      isLoading:false,
      dialogView:false,
      selectedItem:[],
      account_type:'',
      approveConfirmation:false,
    };
  },
  props:['event_type'],
  methods:{
    formatDate(val){
      return moment(String(val)).format('YYYY-MM-DD HH:mm')
    },
    viewEvent(val){
      this.selectedItem = val
      this.dialogView=true
    },
    async approve(){
      this.buttonLoad=true
      const res = await this.$axios
        .patch(`/events/${this.selectedItem.id}/`, {"is_approved":true},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.loadData()
          this.approveConfirmation=false
          this.isLoading=false
          this.buttonLoad=false
        });
    },
    approveEvent(val){
      if(val.is_approved) return
      this.selectedItem=val
      this.approveConfirmation = true
    },
    loadData() {
      this.account_type = localStorage.getItem('account_type')
      this.eventsGetall();
    },
    async eventsGetall() {
       this.isLoading=true;
      if(this.event_type == 'upcoming_events'){
         const res = await this.$axios
        .get(`/upcoming/events/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.isLoading=false
        });
      }
      else if(this.event_type == 'official_events'){
         const res = await this.$axios
        .get(`/official/events/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.isLoading=false
        });
      }
      else if(this.event_type == 'community_led_events'){
         const res = await this.$axios
        .get(`/community/events/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.isLoading=false
        });
      }
     
     
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