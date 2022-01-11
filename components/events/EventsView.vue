<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Event Title</div>
      <div align="center">
        <div class="text-h6">
          <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </div>
        <div>Juan Dela Cruz</div>
        <div>john_paolo_zenarosa@dlsu.edu.ph</div>
        <div class="pt-10">
          <v-img
            src="./main_background.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(0,0,0,.9)"
            height="300"
          ></v-img>
        </div>
        <div class="pt-5">
          An open-area modern house inspired by Japanese elements. Comes with
          its own swimming pool, furniture decorations, fireplace, and armor
          stands.
        </div>
        <div align="start" class="text-h5 pt-5">
          When: 2020-10-10 - 2020-11-10
        </div>
        <div align="start" class="text-h5 pt-5">
          Where: Taguig
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
                  @click="addItem"
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
export default {
  props: ["isOpen", "items", "isAdd"],
  watch: {
    items() {
      this.discussions = this.items;
      this.img_holder = this.items.image;
    },
  },
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