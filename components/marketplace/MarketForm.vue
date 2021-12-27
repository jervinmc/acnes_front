<template>
  <div align="center" class="pa-10">
    <market-add @refresh="loadData" :isOpen="dialogAdd" @cancel="dialogAdd = false" :items="selectedItem" :isAdd="isAdd" />
    <v-card elevation="2" width="1200" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span
            class="text-h4"
            style="cursor: pointer"
            @click="addItem"
          >
            CREATE A LISTING
          </span>
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
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MarketAdd from "./MarketAdd.vue";
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      dialogAdd: false,
      marketplace: [],
      isLoading:false,
      search:'',
      selectedItem:{}
    };
  },
  components: { MarketAdd },
  methods: {
    addItem(){
      this.dialogAdd=true
      this.isAdd=true
    },
    viewItem(val){
      this.dialogAdd=true
      this.isAdd=false
      this.selectedItem=val
    },
    loadData() {
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