<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-form ref="form">
      <v-card class="pa-10">
        <div align="center" class="text-h6">Add Events</div>
        <div class="text-h6">Name of Event</div>
        <div>
          <v-text-field outlined v-model="events.event_name"></v-text-field>
        </div>
        <div class="text-h6">Start Date</div>
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
            <v-date-picker v-model="date" no-title></v-date-picker>
          </v-menu>
        </div>
        <div class="text-h6">Start Time</div>
        <div>
          <v-menu
            class="pa-0"
            ref="startTime"
            v-model="startTime"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="start_time"
                outlined
                label="Start Time"
                persistent-hint
                v-bind="attrs"
                @blur="start_time = start_time"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="start_time" format="24hr"></v-time-picker>
          </v-menu>
        </div>
        <div class="text-h6">End Date</div>
        <div>
          <v-menu
            ref="eventDate1"
            v-model="eventDate1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date1"
                outlined
                label="Date"
                persistent-hint
                v-bind="attrs"
                @blur="date = date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date1" no-title></v-date-picker>
          </v-menu>
        </div>
        <div class="text-h6">End Time</div>
         <v-menu
            class="pa-0"
            ref="endTime"
            v-model="endTime"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="end_time"
                outlined
                label="Start Time"
                persistent-hint
                v-bind="attrs"
                @blur="end_time = end_time"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="end_time" format="24hr"></v-time-picker>
          </v-menu>
        <div class="text-h6">Venue</div>
        <div>
          <v-text-field outlined v-model="events.venue"></v-text-field>
        </div>
        <div class="text-h6">Description</div>
        <div>
          <v-textarea outlined v-model="events.descriptions"></v-textarea>
        </div>
          <v-row>
            <v-col>
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
            </v-col>
            <v-col>
              <v-col>
          <span class="pt-2 pr-10 pb-10"><b>Upload Image</b></span>

          <div class="hover_pointer pt-10">
            <img
              @click="$refs.file1.click()"
              :src="img_holder1"
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
            id="fileInput1"
            ref="file1"
            accept="image/png, image/jpeg"
            @change="onFileUpload1"
          />
        </v-col>
            </v-col>
          </v-row>

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
    </v-form>
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
  created() {
    this.loadData();
  },
  data() {
    return {
      image1:'',
      img_holder1:'/image_placeholder.png',
      end_time:'',
      endTime:false,
      start_time:'',
      startTime:false,
      eventDate1: false,
      account_type: "",
      eventDate: false,
      events: [],
      date: "",
      date1: "",
      discussions: [],
      img_holder: "/image_placeholder.png",
      image: "",
      url: "",
      buttonLoad: false,
    };
  },
  methods: {
   
    loadData() {
      this.account_type = localStorage.getItem("account_type");
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
        if (this.image1 != null && this.image1 != "") {
          form_data.append("image1", this.image1);
        }
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("event_name", this.events.event_name);
        form_data.append("event_start_date", this.date+" "+this.start_time);
        form_data.append("event_end_date", this.date1+" "+this.end_time);
        form_data.append("no_going", '0');
        form_data.append("no_intersted", '0');
        form_data.append("venue", this.events.venue);
        form_data.append(
          "is_approved",
          this.account_type == "Admin" ? true : false
        );
        form_data.append(
          "event_type",
          this.account_type == "Admin"
            ? "official_event"
            : "community_led_event"
        );
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
              this.$refs.form.reset();
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
    onFileUpload1(e) {
      this.image1 = e;
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
      this.image1 = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder1 = URL.createObjectURL(e));
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