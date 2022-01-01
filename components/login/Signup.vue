<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Sign up</div>
      <div class="text-h6">Email</div>
      <div>
        <v-text-field outlined v-model="users.email"></v-text-field>
      </div>
      <div class="text-h6">Name</div>
      <div>
        <v-text-field outlined v-model="users.name"></v-text-field>
      </div>
      <div class="text-h6">Password</div>
      <div>
        <v-text-field outlined v-model="users.password"></v-text-field>
      </div>
      <div class="text-h6">Address</div>
      <div>
        <v-text-field outlined v-model="users.address"></v-text-field>
      </div>
      <div class="text-h6">User Type</div>
      <div>
        <v-select
          outlined
          v-model="users.account_type"
          :items="['Resident', 'Admin']"
        ></v-select>
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
              @click="addMarketplace"
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
  props: ["isOpen"],
  watch: {
    items() {
      this.marketplace = this.items;
      this.img_holder = this.items.image;
    },
  },
  data() {
    return {
      img_holder: "image_placeholder.png",
      marketplace: [],
      image: "",
      url: "",
      users: [],
      buttonLoad: false,
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
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
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("email", this.users.email);
        form_data.append("name", this.users.name);
        form_data.append("address", this.users.address);
        form_data.append("account_type", this.users.account_type);
        form_data.append("password", this.users.password);
        form_data.append("groups", 1);
        form_data.append("is_superuser",this.users.account_type!='Resident' ? true : false);
        const response = await this.$axios
          .post("signup/", form_data)
          .then(() => {
            this.buttonLoad = false;
            this.$emit("cancel");
            this.$emit("refresh");
          });
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