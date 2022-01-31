<template>
  <div align="center">
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
    <v-dialog v-model="editDiscussion" width="1000" persistent>
  <v-form v-model="valid"
      ref="form"
      lazy-validation
      @submit.prevent="addDiscussions">
    <v-card class="pa-10">
      <div align="center" class="text-h6">Edit Post</div>
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
    <v-dialog v-model="editMarket" width="1000" persistent>
    <v-form
      v-model="valid"
      ref="form"
      lazy-validation
      @submit.prevent="addMarketplace"
    >
      <v-card class="pa-10">
        <div align="center" class="text-h6">Edit Marketlist</div>
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
              <v-btn color="red" text @click="editMarket=false"> Cancel </v-btn>
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
    <div class="pa-16" style="max-width: 1200px">
      <v-card class="pa-16">
        <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
          <img :src="profileImage" alt="John" />
        </v-avatar>
        <div class="text-h6">{{ name }}</div>
        <div class="text-h6">{{ email }}</div>
        <div class="text-h6">Taguig</div>
        <!-- <div class="pt-10 text-h5">ABOUT ME</div>
        <div class="grey--text mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales
          elementum mi non hendrerit. Proin tempor facilisis felis nec ultrices.
          Duis nec ultrices neque. Proin semper ultricies turpis, vel faucibus
          velit sodales vitae. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos.
        </div> -->
        <v-divider class="pt"></v-divider>
        <div class="text-h5 pt-10" align="start">
          Discussion Space
        </div>
        <v-row>
          <v-col
            v-for="index in items_discussions"
            :key="index"
            cols="4"
            class="pa-5"
          >
            <v-card class="mx-auto my-12" max-width="374">
              <v-card-title>{{ index.title }}</v-card-title>
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-img height="150" :src="index.image"></v-img>
              <v-card-text>
                <div>
                  {{ index.descriptions }}
                </div>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              

              <v-card-actions>
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="viewItemDiscussion(index)"
                >
                  View
                </v-btn>
                <v-icon color="red" @click="deleteItem(index,'discussion')">
                  mdi-delete
                </v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
         <v-divider class="pt"></v-divider>
        <div class="text-h5 py-10" align="start">
          Events
        </div>
        <v-skeleton-loader
        v-if="isLoading"
        class="mx-auto"
        width="1200"
        type="card"
      ></v-skeleton-loader>
      <v-row v-else>
        <v-col cols="12" v-for="index in events" :key="index" class="pa-10">
          <v-card rounded-lg elevation="5">
            <v-row class="pa-10">
              <v-col cols="auto">
                <v-img :src="index.image" width="50"></v-img>
              </v-col>
              <v-col cols="2">
                <div>{{index.event_start_date}}</div>
                <div>{{index.venue}}</div>
                <div>{{index.event_name}}</div>
                <div>{{index.descriptions}}</div>
              </v-col>
            </v-row>
            <div class="pt-0 pb-5">
              <v-btn
                @click="dialogView=true"
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
              >
                View Event
              </v-btn>
              
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-h5 py-10" align="start">
          Marketplace
        </div>
      <v-skeleton-loader
        v-if="isLoading"
        class="mx-auto"
        width="1200"
        type="card"
      ></v-skeleton-loader>
        <v-row v-else>
          <v-col v-for="key in items_marketplace" :key="key" cols="4" class="pa-5">
          <v-card class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img height="250" :src="key.image"></v-img>
            <v-card-title>{{key.name}}</v-card-title>
            <v-card-text>
              <div>
                {{key.descriptions}}
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Php {{parseFloat((key.price)).toFixed(2)}}</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="viewItemMarket(key)"> View </v-btn>
               <v-icon color="red" @click="deleteItem(key,'marketplace')">
                  mdi-delete
                </v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script>
import validations from "@/utils/validations";
export default {
  data() {
    return {
      deleteConfirmation:false,
      items_discussions:[],
      ...validations,
      name: "",
      buttonLoad:false,
      valid:false,
      marketplace:[],
      email: "",
      address: "",
      discussions: [],
      img_holder_qr:'',
      img_holder:'',
      isLoading: false,
      events:[],
      items_marketplace:[],
      image_qr:'',
      marketplace:[],
      selectedItem:[],
      category:'',
      profileImage:'',
      editMarket:false,
      editDiscussion:false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
      async deleteAnnouncement(){
     this.buttonLoad=true
     if(this.category=='discussion'){
        this.$axios.delete(`/discussions/${this.selectedItem.id}/`,{
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
     }
     else{
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
     }
      
    },
     deleteItem(val,category){
      this.selectedItem=val
      this.category=category
      this.deleteConfirmation=true
    },
    async addDiscussions() {
      // this.valid = this.$refs.form.validate();
      // if (!this.valid) {
      //   return;
      // }
      this.buttonLoad = true;
      try {
        let form_data = new FormData();
        if (this.image != null && this.image != "") {
          form_data.append("image", this.image);
        }
        form_data.append("user_id", localStorage.getItem("id"));
        form_data.append("title", this.discussions.title);
        form_data.append("descriptions", this.discussions.descriptions)
          const response = await this.$axios
            .patch(`/discussions/${this.discussions.id}/`, form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.buttonLoad = false;
              this.editDiscussion=false
            });
        
      } catch (error) {
        alert(error);
        this.buttonLoad = false;
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
        form_data.append("name", this.marketplace.name);
        form_data.append("category", this.marketplace.category);
        form_data.append("price", this.marketplace.price);
        form_data.append("descriptions", this.marketplace.descriptions);
          const response = await this.$axios
            .patch(`/marketplace/${this.marketplace.id}/`, form_data, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              this.buttonLoad = false;
              this.editMarket=false
            });
        
      } catch (error) {
        alert(error);
        this.buttonLoad = false;
      }
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
    viewItemMarket(item){
      this.img_holder = item.image
      this.img_holder_qr=item.image_qr
      this.marketplace=item
      this.editMarket=true
    },
    viewItemDiscussion(item){
      this.img_holder = item.image
      this.discussions=item
      this.editDiscussion=true
    },
    loadData() {
      this.name = localStorage.getItem("firstname")+' '+localStorage.getItem("lastname");
      this.email = localStorage.getItem("email");
      this.address = localStorage.getItem("address");
      this.profileImage = localStorage.getItem("image");
      this.discussionsGetall();
      this.eventsGetall();
      this.marketplaceGetall();
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
          this.items_marketplace = res.data;
          this.isLoading = false;
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
          this.items_discussions = res.data;
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