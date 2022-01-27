<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">{{details.title}}</div>
      <div align="center">
        <div class="text-h6">
          <v-avatar color="primary" size="56">
            <img :src="details.users.image" alt="John" />
          </v-avatar>
        </div>
        <div>{{details.firstname}}</div>
        <div>{{details.users.email}}</div>
        <div class="pt-10">
          <v-img
            :src="details.image"
            height="300"
          ></v-img>
        </div>
        <div class="pt-5">
          {{details.descriptions}}
        </div>
        <div align="start" class="text-h5 pt-5">
          <v-row>
            <v-col cols="6"> Vote Now: </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="pt-0">
                <v-btn
                  x-large
                  color="red"
                  width="200"
                  dark
                  outlined
                  height="40"
                >
                  Downvote
                </v-btn>
              </div>
            </v-col>
            <v-col>
              <div class="pt-0">
                <v-btn
                  x-large
                  color="green"
                  width="200"
                  dark
                  outlined
                  height="40"
                >
                  Upvote
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="text-h6 pt-10">
        Comments
      </div>
      <v-divider></v-divider>
      <v-textarea outlined v-model="comments.comments"></v-textarea>
      <div>
        <v-col>
              <div class="pt-0">
                <v-btn
                  x-large
                  color="green"
                  width="200"
                  dark
                  outlined
                  :loading="buttonLoadComment"
                  height="40"
                  @click="addComments"
                >
                  Comment
                </v-btn>
              </div>
            </v-col>
      </div>

      <v-divider></v-divider>
      <div>
       <v-row v-for="item in comments_data" :key="item">
          <v-col cols="auto">
            <v-avatar color="primary" size="56">
            <img :src="details.users.image" alt="John" />
          </v-avatar>
          </v-col>
          <v-col align-self="center">
            <b>{{item.email}}</b>
            <div>
              {{item.comments}}
            </div>
          </v-col>
         </v-row>  
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
export default {
  props: ["isOpen", "items", "isAdd","details"],
  watch: {
  async  details() {
      // this.discussions = this.items;
      // this.img_holder = this.items.image;
      this.commentsGetall()
    },
  },
  data() {
    return {
      buttonLoadComment:false,
      comments:[],
      eventDate: false,
      events: [],
      date: [],
      discussions: [],
      img_holder: "image_placeholder.png",
      image: "",
      comments_data:[],
      url: "",
      buttonLoad: false,
    };
  },
  methods: {
  async  commentsGetall(){
      const res = await this.$axios
        .post(`/comments_discussion/`,{"id":this.details.id}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.comments_data = res.data;
          this.isLoading=false
        });

    },
     async addComments() {
      this.buttonLoadComment = true;
      try {
        let form_data = new FormData();
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("comments", this.comments.comments);
        form_data.append("email", localStorage.getItem("email"));
        form_data.append("discussion_id", this.details.id);
  
          const response = await this.$axios
            .post("/comments/", form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.commentsGetall()
              this.comments.comments =''
                this.buttonLoadComment = false;
            });
  
      } catch (error) {
        alert(error)
        this.commentsGetall()
        this.buttonLoadComment = false;
      }
    },
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