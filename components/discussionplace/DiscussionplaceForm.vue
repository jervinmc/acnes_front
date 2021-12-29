<template>
  <div align="center" class="pa-10">
    <discussionplace-add :isOpen="dialogAdd" @refresh="discussionsGetall" @cancel="dialogAdd=false" :isAdd="isAdd" :items="selectedItem"/>
    <v-card elevation="2" width="1200" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span class="text-h4" style="cursor:pointer" @click="addItem"> CREATE A POST </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search" v-model="search" v-on:keyup.enter="searchData">
          </v-text-field>
        </v-col>
      </v-row>
      <v-chip-group
      active-class="deep-purple accent-4 white--text"
      class="pt-10"
      column
    >
      <v-chip v-for="index in 30" :key="index">Tag {{index}}</v-chip>
    </v-chip-group>
     <v-skeleton-loader
        v-if="isLoading"
        class="mx-auto"
        width="1200"
        type="card"
      ></v-skeleton-loader>
      <v-row v-else>
        <v-col v-for="index in discussions" :key="index" cols="4" class="pa-5">
          <v-card class="mx-auto my-12" max-width="374">
            <v-card-title>{{index.title}}</v-card-title>
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img
              height="250"
              :src="index.image"
            ></v-img>
            <v-card-text>
              <div>
                {{index.descriptions}}
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>Tags</v-card-title>

            <v-card-text>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="viewItem(index)">
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import DiscussionplaceAdd from './DiscussionplaceAdd.vue';
export default {
  created(){
    this.loadData()
  },
  data() {
    return {
      search:'',
      isAdd:false,
      dialogAdd: false,
      isLoading:false,
      discussions:[],
      selectedItem:'',
 
DiscussionplaceAdd   };
  },
  methods:{
    
    loadData() {
      this.discussionsGetall();
    },
    async discussionsGetall() {
      this.isLoading=true;
      const res = await this.$axios
        .get(`/discussions/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.discussions = res.data;
          this.isLoading=false
        });
    },
    async searchData(){
      this.isLoading=true;
      const res = await this.$axios
        .get(`/discussions?search=${this.search}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.discussions = res.data;
          this.isLoading=false
        });
    },
    addItem(){
      this.isAdd=true
      this.dialogAdd=true
    },
    viewItem(val){
      window.location.href="discussionspace/"+val.id
      // this.dialogAdd=true
      // this.isAdd=false
      // this.selectedItem=val
    },
  }
};
</script>

<style>
</style>