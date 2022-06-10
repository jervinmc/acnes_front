<template>
  <v-card elevation="5" width="1000" class="pa-10">
    <v-dialog v-model="deleteConfirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Confirmation</div>
    <div align="center" class="pa-10">
        Are you sure you want to delete this item?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="deleteConfirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="deleteAnnouncement"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <announcement-add
      :isOpen="dialogAdd"
      :isAdd="isAdd"
      @cancel="dialogAdd = false"
      @refresh="announcementGetall"
    />
    <div class="mb-10">
      <v-btn
        v-if="this.account_type=='System Admin'"
        x-large
        color="black"
        width="200"
        @click="dialogAdd = true"
        outlined
        height="40"
        :loading="isLoaded"
      >
        Add Announcement
      </v-btn>
    </div>
    <div  class="pa-5" v-for="item in announcement" :key="item">
      <v-card width="700" color="#2d3638" class="pa-5" >
      <v-row>
        <v-col cols="6">
          <v-img :src="item.image" height="300"> </v-img>
        </v-col>
        <v-col align="center">
          <div class="white--text text-h5 mb-10">
            <b>{{item.title}}</b>
          </div>
          <div class="white--text">
           {{item.descriptions}}
          </div>
            <v-col>
              <div class="pt-5">
            <v-btn
              @click="login"
              x-large
              color="white"
              width="200"
              dark
              outlined
              height="40"
              :loading="isLoaded"
            >
              View More
            </v-btn>
          </div>
          <div>
            <v-col align-self="center" v-if="account_type=='System Admin'">
              <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
            </v-col>
          </div>
            </v-col>
        </v-col>
      </v-row>
    </v-card>
    </div>
  </v-card>
</template>

<script>
import AnnouncementAdd from "../announcement/AnnouncementAdd.vue";
export default {
  components: { AnnouncementAdd },
  data() {
    return {
      deleteConfirmation:false,
      isAdd: true,
      dialogAdd: false,
      index: 0,
      announcement: [],
      isLoading: false,
      selectedItem:{},
      buttonLoad:false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
   async deleteAnnouncement(){
     this.buttonLoad=true
      this.$axios.delete(`/announcement/${this.selectedItem.id}/`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.deleteConfirmation=false
          this.buttonLoad=false
          alert('Successfully Deleted!')
      })
    },
    deleteItem(val){
      this.selectedItem=val
      this.deleteConfirmation=true
    },
    loadData() {
      this.account_type = localStorage.getItem("account_type");
      this.announcementGetall();
    },
    async announcementGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/announcement/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.announcement = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>