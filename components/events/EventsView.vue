<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">{{items.event_name}}</div>
      <div align="center">
        <div class="text-h6">
          <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
            <img :src="items.users.image" alt="John" />
          </v-avatar>
        </div>
        <div>{{items.users.firstname}} {{items.users.lsatname}}</div>
        <div>{{items.users.email}}</div>
        <v-row>
          <v-col cols="6">
            <div class="pt-10">
          <v-img
            :src="items.image"
       
            height="300"
          ></v-img>
        </div>
          </v-col>
          <v-col cols="6">
            <div class="pt-10">
          <v-img
            :src="items.image1"
       
            height="300"
          ></v-img>
        </div>
          </v-col>
        </v-row>
        <div class="pt-5">
     
        </div>
        <div align="start" class="text-h5 pt-5">
          When: {{formatDate(items.event_start_date)}} - {{items.event_end_date}}
        </div>
        <div align="start" class="text-h5 pt-5">
          Where: {{items.venue}}
        </div>
        <div align="start" class="text-h5 pt-5">
          <v-row>
            <v-col cols="6"> Wanna Join? </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="pt-0">
                <v-btn
                  @click="addItem"
                  x-large
                  color="black"
                  width="200"
                  dark
                  outlined
                  height="40"
                >
                  Interested
                </v-btn>
              </div>
            </v-col>
            <v-col>
              <div class="pt-0">
                <v-btn
                  @click="going"
                  x-large
                  color="green"
                  width="200"
                  dark
                  outlined
                  height="40"
         
                >
                  Going
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <v-card-actions class="pt-10">
        <v-row align="center">
          <v-col align="end">
            <v-btn color="black" text @click="cancel"> Back </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";
export default {
 watch:{
    items() {
      this.discussions = this.items;
      this.img_holder = this.items.image;
    },
  },
  props: ["isOpen", "items", "isAdd"],
  data() {
    return {
      eventDate: false,
      events: [],
      date: [],
      discussions: [],
      img_holder: "image_placeholder.png",
      image: "",
      url: "",
      buttonLoad: false,
    };
  },
  methods: {
    async  checkGoing(){
       await this.$axios.post(`/going-user/`,{
           event_id:this.items.id,
           user_id:localStorage.getItem('id')
         },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
    },
     formatDate(val){
      return moment(String(val)).format('YYYY-MM-DD HH:mm')
    },
    async going(){
        await this.$axios.patch(`/events/${this.items.id}/`,{no_going:1+parseInt(this.items.no_going)},{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
     await this.$axios.post(`/going/`,{
           event_id:this.items.id,
           user_id:localStorage.getItem('id')
         },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
    },
    // parseDate(date) {
    //   if (!date) return null;

    //   const [month, day, year] = date.split("/");
    //   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    // },
    async addEvents() {
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("event_name", this.events.event_name);
        form_data.append("event_start_date", this.date[0]);
        form_data.append("event_end_date", this.date[1]);
        form_data.append("venue", this.events.venue);
        form_data.append("descriptions", this.events.descriptions);
        if (this.isAdd) {
          const response = await this.$axios
            .post("/events/", form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$emit("refresh");
            });
        } else {
          const response = await this.$axios
            .patch(`/events/${this.events.id}/`, form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$emit("refresh");
            });
        }
      } catch (error) {
        alert(error);
        this.buttonLoad = false;
      }
    },
    onFileUpload(e) {
      this.image = e;
      e = e.target.files[0];
      if (e["name"].length > 100) {
        alert("255 characters exceeded filename.");
        return;
      }
      try {
        if (e.size > 16000000) {
          alert("Only 15mb file can be accepted.");
          return;
        }
      } catch (error) {
        alert(error);
        return;
      }
      this.image = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder = URL.createObjectURL(e));
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>