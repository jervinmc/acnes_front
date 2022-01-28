<template>
  <div align="center">
    <div class="pa-16" style="max-width: 1200px">
      <v-card class="pa-16">
        <v-row>
          <v-col cols="12">
            <div align="start">
              <div>Firstname</div>
              <v-text-field
                :rules="standardRules"
                outlined
                v-model="users.firstname"
              ></v-text-field>
            </div>
            <div align="start">
              <div>Lastname</div>
              <v-text-field
                :rules="standardRules"
                outlined
                v-model="users.lastname"
              ></v-text-field>
            </div>
            <div align="start">
              <div>Address</div>
              <v-text-field
                :rules="standardRules"
                outlined
                v-model="users.address"
              ></v-text-field>
            </div>
            <div align="start">
              <div>Contact Number</div>
              <v-text-field
                :rules="standardRules"
                outlined
                v-model="users.contact_number"
              ></v-text-field>
            </div>
            <div>
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
            </div>
            <div>
              <v-row align="center">
                <v-col align="center">
                  <v-btn color="red" text @click="cancel"> Cancel </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    color="success"
                    text
                    @click="editUser"
                    :loading="buttonLoad"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      users:[],
      email: "",
      address: "",
      buttonLoad:false,
      discussions: [],
      isLoading: false,
      events: [],
      image:'',
      marketplace: [],
      profileImage: "",
      img_holder:''
    };
  },
  created() {
    this.loadData();
  },
  methods: {
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
    cancel(){
      window.location.href="/profile"
    },
    loadData() {
      this.name =
        localStorage.getItem("firstname") +
        " " +
        localStorage.getItem("lastname");
      this.email = localStorage.getItem("email");
      this.address = localStorage.getItem("address");
      this.profileImage = localStorage.getItem("image");
      
      this.users.firstname=localStorage.getItem("firstname")
      this.users.lastname=localStorage.getItem("lastname")
      this.users.address=localStorage.getItem("address")
      this.users.contact_number=localStorage.getItem("contact_number")
      this.users.id=localStorage.getItem("id")
      this.img_holder = localStorage.getItem('image')
      //   this.discussionsGetall();
      //   this.eventsGetall();
      //   this.marketplaceGetall();
    },
    async marketplaceGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/marketplace/userid/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.marketplace = res.data;
          this.isLoading = false;
        });
    },
   async editUser(){
      this.buttonLoad = true;

      let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("firstname", this.users.firstname);
        form_data.append("lastname", this.users.lastname);
        form_data.append("address", this.users.address);
        form_data.append("contact_number", this.users.contact_number)
          const response = await this.$axios
            .patch(`/users/user/${localStorage.getItem('id')}/`, form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.buttonLoad = false;
              localStorage.setItem('firstname',res.data.firstname)
           localStorage.setItem('lastname',res.data.lastname)
            localStorage.setItem('address',res.data.address)
             localStorage.setItem('contact_number',res.data.contact_number)
             localStorage.setItem('image',res.data.image)
            });
      
   },
    async discussionsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/discussions/userid/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.discussions = res.data;
          this.isLoading = false;
        });
    },
    async eventsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/events/userid/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.events = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>