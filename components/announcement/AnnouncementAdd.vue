<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Add Announcement</div>
      <div class="text-h6">Announcement</div>
      <div>
        Title
      </div>
      <div>
        <v-text-field outlined v-model="announcement.title"></v-text-field>
      </div>
      <div>
        <v-textarea outlined v-model="announcement.descriptions"></v-textarea>
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
      image:null,
      img_holder: "image_placeholder.png",
      announcement: [],
      buttonLoad: false,
    };
  },
  methods: {
      async addAnnouncement() {
      this.buttonLoad=true
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("title", this.announcement.title);
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