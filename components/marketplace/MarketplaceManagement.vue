<template>
  <v-card elevation="5">
       <v-dialog v-model="deleteConfirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Confirmation</div>
    <div align="center" class="pa-10">
        Are you sure you want to delete this item?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="deleteConfirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="deleteAnnouncement"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
      <v-dialog v-model="editDialog" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Edit Marketplace</div>
      <div class="text-h6">Marketplace</div>
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
            <v-btn color="red" text @click="editDialog=false"> Cancel </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              text
              @click="editAnnouncement"
              :loading="buttonLoad"
            >
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Marketplace Management</b>
      </v-col>
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="users"
      :loading="isLoading"
    >
      <template v-slot:loading>
        <v-skeleton-loader
          v-for="n in 5"
          :key="n"
          type="list-item-avatar-two-line"
          class="my-2"
        ></v-skeleton-loader>
      </template>

      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="deleteItem(item)">
              <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #[`item.image`]="{ item }">
          <v-img :src="item.image" height="100" width="100"></v-img>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
        deleteConfirmation:false,
        img_holder:'',
      announcement:[],
      isLoading: false,
      users: [],
      editDialog:false,
      buttonLoad:false,
      selectedItem:[],
      image:'',
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Descriptions", value: "descriptions" },
        { text: "Price", value: "price" },
        { text: "Category", value: "category" },
        { text: "Image", value: "image" },
        { text: "Actions", value: "opt" },
        ``,
      ],
    };
  },
  methods: {
       async deleteAnnouncement(){
     this.buttonLoad=true
      this.$axios.delete(`/marketplace/${this.selectedItem.id}/`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.deleteConfirmation=false
          this.buttonLoad=false
          alert('Successfully Deleted!')
          this.loadData()
      })
    },
    deleteItem(val){
      this.selectedItem=val
      this.deleteConfirmation=true
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
     async editAnnouncement(){
         this.buttonLoad=true
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("title", this.announcement.title);
        form_data.append("descriptions", this.announcement.descriptions);
         await this.$axios.patch(`/announcement/${this.announcement.id}/`,form_data,{
             headers:{
                 Authorization:`Bearer ${localStorage.getItem('token')}`
             }
         })
         .then((res)=>{
             this.buttonLoad=false
             this.editDialog=false
             this.loadData()
         })
        //    this.buttonLoad=false
        //      this.editDialog=false
      },
      editItem(val){
          this.img_holder=val.image
          this.announcement=val
          this.editDialog=true
      },
    async status(data, status) {
      this.isLoading = true;
      const res = await this.$axios
        .patch(
          `/discussions/${data.id}/`,
          {
            is_active: status == "Deactivate" ? false : true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.loadData();
        });
    },
    loadData() {
      this.usermanagementGetall();
    },
    async usermanagementGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/marketplace/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.users = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>