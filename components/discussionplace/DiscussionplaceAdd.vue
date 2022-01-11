<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
  <v-form v-model="valid"
      ref="form"
      lazy-validation
      @submit.prevent="addDiscussions">
    <v-card class="pa-10">
      <div align="center" class="text-h6">Add Post</div>
      <div class="text-h6">Title</div>
      <div>
        <v-text-field :rules="standardRules"  outlined v-model="discussions.title"></v-text-field>
      </div>
      <div class="text-h6">Descriptions</div>
      <div>
        <v-textarea outlined v-model="discussions.descriptions"></v-textarea>
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
              type="submit"
          :disabled="!valid"
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
import validations from "@/utils/validations";
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
      ...validations,
      discussions: [],
      img_holder: "image_placeholder.png",
      image: "",
      url: "",
      buttonLoad: false,
      valid: false,
    };
  },
  methods: {
    async addDiscussions() {
      this.valid = this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("title", this.discussions.title);
        form_data.append("descriptions", this.discussions.descriptions);
        if (this.isAdd) {
          const response = await this.$axios
            .post("/discussions/", form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.$refs.form.reset()
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$emit("refresh");
            });
        } else {
          const response = await this.$axios
            .patch(`/discussions/${this.discussions.id}/`, form_data, {
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
      this.$refs.form.reset()
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>