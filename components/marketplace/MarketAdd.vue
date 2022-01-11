<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-form
      v-model="valid"
      ref="form"
      lazy-validation
      @submit.prevent="addMarketplace"
    >
      <v-card class="pa-10">
        <div align="center" class="text-h6">Add Marketlist</div>
        <div class="text-h6">Name of Listing</div>
        <div>
          <v-text-field
            outlined
            v-model="marketplace.name"
            :rules="standardRules"
          ></v-text-field>
        </div>
        <div class="text-h6">Category</div>
        <div>
          <v-select
            :rules="standardRules"
            outlined
            v-model="marketplace.category"
            :items="['Product', 'Service']"
          ></v-select>
        </div>
        <div class="text-h6">Price</div>
        <div>
          <v-text-field
            outlined
            v-model="marketplace.price"
            :rules="standardRules"
          ></v-text-field>
        </div>
        <div class="text-h6">Descriptions</div>
        <div>
          <v-textarea outlined v-model="marketplace.descriptions"></v-textarea>
        </div>
        <v-row>
          <v-col>
            <span class="pt-2 pr-10 pb-10"><b>Upload QR Code</b></span>

            <div class="hover_pointer pt-10">
              <img
                @click="$refs.fileqr.click()"
                :src="img_holder_qr"
                alt="item_.js"
                height="150"
                class="mb-0"
              />
            </div>
          </v-col>
        </v-row>
        <v-col class="d-none">
          <input
            style="display: none"
            type="file"
            id="fileInputQR"
            ref="fileqr"
            accept="image/png, image/jpeg"
            @change="onFileUploadQR"
          />
        </v-col>

        <v-row>
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
  props: ["isOpen", "items", "isAdd", "id"],
  watch: {
    items() {
      this.marketplace = this.items;
      this.img_holder = this.items.image;
    },
  },
  data() {
    return {
      ...validations,
      valid: false,
      img_holder: "image_placeholder.png",
      img_holder_qr: "image_placeholder.png",
      marketplace: [],
      image: "",
      image_qr: "",
      url: "",
      buttonLoad: false,
    };
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.$emit("cancel");
    },
    onFileUploadQR(e) {
      this.image_qr = e;
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
      this.image_qr = e;
      if (e == null) {
      } else {
        this.url, (this.img_holder_qr = URL.createObjectURL(e));
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
    async addMarketplace() {
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
        if (this.image_qr != null && this.image_qr != "") {
          form_data.append("image_qr", this.image_qr);
        }
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("user_email", localStorage.getItem("email"));
        form_data.append("name", this.marketplace.name);
        form_data.append("category", this.marketplace.category);
        form_data.append("price", this.marketplace.price);
        form_data.append("descriptions", this.marketplace.descriptions);

        if (this.isAdd) {
          const response = await this.$axios
            .post("/marketplace/", form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.$refs.form.reset();
              this.buttonLoad = false;
              this.$emit("cancel");
              this.$emit("refresh");
            });
        } else {
          const response = await this.$axios
            .patch(`/marketplace/${this.marketplace.id}/`, form_data, {
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
  },
};
</script>

<style>
</style>