<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-dialog v-model="openQrCode" width="350">
      <v-img :src="details.image_qr" height="350" width="350">

      </v-img>

    </v-dialog>
    <v-card class="pa-10">
      <div align="center" class="text-h6">{{details.users.firstname}}</div>
      <div align="center">
        <div class="text-h6">
          <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
            <img :src="details.users.image" alt="John" />
          </v-avatar>
        </div>
        <div>{{details.users.firstname}}</div>
        <div>{{details.users.email}}</div>
        <div class="pt-10">
          <v-img
            :src="details.image"
            contain
            height="300"
          ></v-img>
        </div>
        <div>
             {{details.name}}
        </div>
        <div class="pt-5">
        Php  {{details.price}}
     
        </div>
        <div align="start" class="text-h5 pt-5">
          <v-row>
            <v-col cols="6"> Purchase now? </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <div class="pt-0">
                <v-btn
                  @click="contactNow(details)"
                  x-large
                  color="black"
                  width="200"
                  dark
                  outlined
                  height="40"
                >
                  Chat with lister
                </v-btn>
              </div>
            </v-col>
             <v-col cols="auto">
              <div class="pt-0">
                <v-btn
                  @click="paymaya"
                  x-large
                  color="black"
                  width="220"
                  dark
                  outlined
                  height="40"
                >
                  Via Paymaya
                </v-btn>
              </div>
            </v-col>
            <!-- <v-col>
              <div class="pt-10">
                  <v-img
                    :src="details.image_qr"

                    height="100"
                  ></v-img>
                </div>
       
            </v-col> -->
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
  props: ["isOpen", "items", "isAdd","details"],
  watch: {
    items() {
      this.discussions = this.items;
      this.img_holder = this.items.image;
    },
  },
  data() {
    return {
      openQrCode:false,
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
    async paymaya(){
      const responses1 = this.$axios
          .post(
            `/buy-paymaya/`,
            {
              price: this.details.price,
              product: this.details.name,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((res) => {
                window.open(
            JSON.parse(res.data)['redirectUrl'],
            '_blank' // <- This is what makes it open in a new window.
          );
       
          })
    },  
    async contactNow(){

      const responses1 = this.$axios
          .post(
            `/channel/`,
            {
              customer_id: localStorage.getItem('id'),
              seller_id: this.details.user_id,
              channel:  Math.random().toString(36).slice(2),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then(() => {
        
            window.location.href="/messages"
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