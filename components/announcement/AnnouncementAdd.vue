<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Add Announcement</div>
      <div class="text-h6">Announcement</div>
      <div>
        <v-textarea outlined v-model="announcement.descriptions"></v-textarea>
      </div>
      <v-card-actions>
        <v-row align="center">
          <v-col align="end">
            <v-btn color="red" text @click="cancel"> Cancel </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              text
              @click="addAnnouncement"
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
  props: ["isOpen", "items","isAdd"],
  watch:{
      items(){  
          this.announcement=this.items
      }
  },
  data() {
    return {
      announcement: [],
      buttonLoad: false,
    };
  },
  methods: {
      async addAnnouncement() {
      this.buttonLoad=true
      try {
        let form_data = new FormData();
        form_data.append("descriptions", this.announcement.descriptions);
        if(this.isAdd){
          const response = await this.$axios
          .post("/announcement/", form_data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.buttonLoad=false
            this.$emit("cancel");
            this.$emit("refresh");
          });
        }
        else{
          const response = await this.$axios
          .patch(`/announcement/${this.announcement.id}/`, form_data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.buttonLoad=false
            this.$emit("cancel");
            this.$emit("refresh");
          });
        }
        
      } catch (error) {
        alert(error)
        this.buttonLoad=false
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