<template>
  <v-dialog v-model="isOpen" width="1000" persistent >
    <v-card class="pa-10">
      <div align="center" class="text-h6">Add Events</div>
      <div class="text-h6">Name of Event</div>
      <div>
        <v-text-field outlined v-model="events.event_name"></v-text-field>
      </div>
      <div class="text-h6">Start and End Date</div>
      <div>
        <v-menu
          ref="eventDate"
          v-model="eventDate"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              outlined
              label="Date"
              persistent-hint
              v-bind="attrs"
              @blur="date = date"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            range
         
          ></v-date-picker>
        </v-menu>
      </div>
      <div class="text-h6">Venue</div>
      <div>
        <v-text-field outlined v-model="events.venue"></v-text-field>
      </div>
      <div class="text-h6">Description</div>
      <div>
        <v-textarea outlined v-model="events.descriptions"></v-textarea>
      </div>
      <v-col>
        <span class="pt-2 pr-10 pb-10"><b>Upload Image</b></span>

        <div class="hover_pointer pt-10">
          <img
            @click="$refs.file.click()"
            :src="img_holder"
            alt="item_.js"
            height="150"
            class="mb-0"
          />
        </div>
      </v-col>
      <v-col class="d-none">
        <input
          style="display: none"
          type="file"
          id="fileInput"
          ref="file"
          accept="image/png, image/jpeg"
          @change="onFileUpload"
        />
      </v-col>

      <v-card-actions>
        <v-row align="center">
          <v-col align="end">
            <v-btn color="red" text @click="cancel"> Cancel </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              text
              @click="addEvents"
              :loading="buttonLoad"
            >
              Save
            </v-btn>
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
      events:[],
      date:[],
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