<template>
  <div align="center" class="pa-10">
     <v-dialog v-model="isOpenDelete" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Delete</div>
    <div align="center" class="pa-10">
        Would you like to delete this item?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="isOpenDelete=false" > Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="deleteItem"> Delete </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <market-add @refresh="loadData" :isOpen="dialogAdd" @cancel="dialogAdd = false" :items="selectedItem" :isAdd="isAdd" />
    <market-view :isOpen="dialogView" @cancel="dialogView = false" :details="selectedProduct"  />
    <v-card elevation="2" width="900" class="pa-5">
      <v-row>
        <v-col class="pa-4" align-self="center" align="start">
          <span
            class="text-h5"
          >
            Market Place
          </span>
        </v-col>
        <v-col align="end" >
          <div class="pt-5">
              <v-btn
                @click="addItem"
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
              >
                Add Listing
              </v-btn>
            </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search" v-on:keyup.enter="searchData" v-model="search">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <!-- eslint-disable -->
        <v-skeleton-loader
        v-if="isLoading"
        class="mx-auto"
        width="1200"
        type="card"
      ></v-skeleton-loader>
        <v-col v-else v-for="(key,index) in marketplace" :key="key" cols="4" class="pa-5">
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
              <!-- <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14" 
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row> -->
              <div>
                {{key.descriptions}}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Php {{parseFloat((key.price)).toFixed(2)}}</v-card-title>
            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="viewItem(key)"> View </v-btn>
              <v-icon v-if="account_type=='Admin'" @click="selectDeleteItem(key)" color="red">mdi-delete</v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MarketAdd from "./MarketAdd.vue";
import MarketView from './MarketView.vue';
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      dialogAdd: false,
      marketplace: [],
      isLoading:false,
      isOpenDelete:false,
      buttonLoading:false,
      search:'',
      account_type:'',
      id:'',
      selectedItem:{},
      dialogView:false,
      selectedProduct:{"image":"","descriptions":"","name":"","users":""},
      isAdd:true,
    };
  },
  components: { MarketAdd, MarketView },
  methods: {
  selectDeleteItem(item){
    this.id=item.id
    this.isOpenDelete=true
  },
  async  deleteItem(){
      this.buttonLoading=true
        await this.$axios.delete(`/marketplace/${this.id}/`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(()=>{
            alert('Successfully Deleted')
            this.buttonLoading=false
            this.isOpenDelete=false
            this.marketplaceGetall()
        })
    },
    addItem(){
      this.dialogAdd=true
      this.isAdd=true
    },
    viewItem(val){
      this.dialogView=true;
      this.selectedProduct = val;
      // this.dialogAdd=true
      // this.isAdd=false
      // this.selectedItem=val
    },
    loadData() {
      this.account_type=localStorage.getItem('account_type')
      this.marketplaceGetall();
    },
    async marketplaceGetall() {
      this.isLoading=true;
      const res = await this.$axios
        .get(`/marketplace/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.marketplace = res.data;
          this.isLoading=false
        });
    },
    async searchData(){
      this.isLoading=true;
      const res = await this.$axios
        .get(`/marketplace?search=${this.search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.marketplace = res.data;
          this.isLoading=false
        });
    }
  },
};
</script>

<style>
</style>