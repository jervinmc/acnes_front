<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Sign up</div>
      <div class="text-h6">Email</div>
      <div>
        <v-text-field outlined v-model="users.email"></v-text-field>
      </div>
      <div class="text-h6">Firstname</div>
      <div>
        <v-text-field outlined v-model="users.firstname"></v-text-field>
      </div>
      <div class="text-h6">Lastname</div>
      <div>
        <v-text-field outlined v-model="users.lastname"></v-text-field>
      </div>
      <div class="text-h6">Address</div>
      <div>
        <v-text-field outlined v-model="users.address"></v-text-field>
      </div>
      <div class="text-h6">Contact Number</div>
      <div>
        <v-text-field outlined v-model="users.contact_number"></v-text-field>
      </div>
      <div class="text-h6">User Type</div>
      <div>
        <v-select
          outlined
          v-model="users.account_type"
          :items="['Resident', 'Admin', 'Board of Directors', 'Community Personnel']"
        ></v-select>
      </div>
      <div class="text-h6">Descriptions</div>
      <div>
        <v-textarea outlined v-model="users.descriptions"></v-textarea>
      </div>
        <div class="text-h6">Password</div>
      <div>
        <v-text-field outlined v-model="users.password" type="password" ></v-text-field>
      </div>
       <div class="text-h6">Confirm Password</div>
      <div>
        <v-text-field outlined v-model="users.confirm_password" type="password"></v-text-field>
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
      <div class="center">
                <span class="red--text" style="font-size:12px">(You must accept the terms and conditions.)</span>
                <v-checkbox v-model="isCheckLabel" label="I have read and agree to DotCom.munitree's Rules and Regulations"></v-checkbox>
              </div>
            <a href="http://avida-settings-nuvali.centriforge.com/guidelines/rules?fbclid=IwAR2g8k5J6TmpClB5u_rUJTAU_ovJeFKwOGcW7stlVk6wpGLs5AWaj2ymEeo#:~:text=Owners%2Foccupants%20must%20avoid%20littering,Corp%20and%2For%20the%20Association" target="_blank">Terms and Conditions.</a>
         <div class="center">
                <span class="red--text" style="font-size:12px">(You must accept data privacy act.)</span>
                <v-checkbox v-model="isCheckLabel" label="I have read the terms and conditions."></v-checkbox>
              </div>
            <a href="https://www.privacy.gov.ph/data-privacy-act/?fbclid=IwAR05Gn8ZV9vWKVzK92uGvVyi8oZKZ8qOT41Jpr21FCo9JxpqQff7nuXi1LI" target="_blank">Visit Data Privacy</a>

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
      isReveal:false,
      img_holder: "image_placeholder.png",
      marketplace: [],
      image: "",
      url: "",
      users: [],
      buttonLoad: false,
      isCheckLabel:false,
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
      if(!this.isCheckLabel){
        alert('Please accept data privacy terms.')
        return
      }
      if(this.users.confirm_password!=this.users.password){
        alert('Password does not match!')
        return
      }
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("email", this.users.email);
        form_data.append("name", this.users.name);
        form_data.append("address", this.users.address);
        form_data.append("descriptions", this.users.descriptions);
        form_data.append("account_type", this.users.account_type);
        form_data.append("firstname", this.users.firstname);
        form_data.append("lastname", this.users.lastname);
        form_data.append("password", this.users.password);
        form_data.append("is_verified", false);
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