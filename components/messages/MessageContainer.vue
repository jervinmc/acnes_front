<template>
  <div align="start">
       <v-dialog v-model="confirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Mark as sold</div>
    <div align="center" class="pa-10">
        Are you sure you want to set as sold?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="confirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" :loading="buttonLoad" text @click="confirm"> Confirm </v-btn>
            </v-col>
        </v-row>  
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-row>
      <v-col cols="auto">
        <v-card max-width="450" class="" >
          <v-skeleton-loader
              v-if="isLoading"
              class="mx-auto pt-10"
              width="300"
              type="card"
            ></v-skeleton-loader>
            <v-skeleton-loader
              v-if="isLoading"
              class="mx-auto pt-10"
              width="300"
              type="card"
            ></v-skeleton-loader>
          <v-list three-line>
            <template v-for="item in items">
              <v-list-item :key="item" @click="showChat(item)">
                <v-list-item-avatar>
                  <v-img :src="item.users.image"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    v-html="item.users.firstname"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    >A conversation between you and {{item.users.firstname}}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col v-if="channel!=''">
        <v-card elevation="5" >
          <v-toolbar color="cyan" dark>
            <v-toolbar-title>{{name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon @click="confirmation=true">mdi-handshake</v-icon>
            </v-btn>
          </v-toolbar>
             <v-skeleton-loader
              v-if="isLoadChat"
              class="mx-auto pt-10"
              width="300"
              type="card"
            ></v-skeleton-loader>
            <v-skeleton-loader
              v-if="isLoadChat"
              class="mx-auto pt-10"
              width="300"
              type="card"
            ></v-skeleton-loader>
         <div style="height:500px;overflow:scroll">
                <div :align="index.account_type!='Customer' ? 'end' : 'start'" class="pa-5" v-for="index in chatList" :key="index">
                     <v-chip  style="border-radius:15px;padding:25px;  color: #344557"
                                ><span>{{index.chat}}</span>
                </v-chip>
            </div>
         </div> 
          <div class="d-flex align-end">
            <v-row no-gutters>
                <v-col class="pa-0" cols="12">
                       <v-text-field
              outlined
              @keyup.enter="sendMessage"
              hide-details=""
              v-model="message"
              append-icon="mdi-send"
            ></v-text-field>
                </v-col>
            </v-row>

          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
export default {
  data() {
    return {
      isLoadChat:false,
      isLoading:false,
        buttonLoad:false,
        confirmation:false,
      items: [],
      chatList:[],
      name:'',
      channel:'',
      users:[],
      message:'',
      channel_id:''
    }
  },
  mounted() {
    this.listingGetall()
  },
  methods: {
   async  confirm(){
       this.buttonLoad=true
          const res = await this.$axios
        .delete(`/channel/${this.channel_id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
           const responses2 = this.$axios
          .post(`/transactions/`, {label:`Your transaction with ${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} is successful`,
              user_id: this.users.id,
              customer_name: `${this.users.firstname} ${this.users.lastname}`,
              customer_id: localStorage.getItem('id'),
              image: this.users.image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then(() => {
            //    window.location.href="/seller/messages"
            // this.buttonLoad=false
          })
             const responses1 = this.$axios
          .post(`/transactions/`, {label:`You set a transaction as mark as sold for ${this.users.firstname} ${this.users.lastname}`,
              user_id: localStorage.getItem('id'),
              customer_name: `${this.users.firstname} ${this.users.lastname}`,
              customer_id: this.users.id,
              image: this.users.image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then(() => {
                const responses13= this.$axios
          .post(`/sold/`, {
              user_id: localStorage.getItem('id'),
              customer_name: `${this.users.firstname} ${this.users.lastname}`,
              customer_id: this.users.id,
              image: this.users.image,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then(() => {
               window.location.href="/seller/messages"
            this.buttonLoad=false
          })
          })
           
        })
      },
    showChat(channel){
        console.log(channel)
        this.isLoadChat=true
        this.name=channel.users.firstname
        this.channel=channel.channel
        this.channel_id = channel.id
        this.users = channel.users
        const res =  this.$axios
        .post(`/chatgetall/`, {"channel":this.channel},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((rest) => {
            this.isLoadChat=false
            this.chatList=rest.data
        })
     
         var pusher = new Pusher('33efacb6a0d9c7baad00', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe(this.channel);
    channel.bind('my-test', function(data) {
        const res2 =  this.$axios
        .post(`/chatgetall/`, {"channel":this.channel},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((rest) => {
            this.chatList=rest.data
        })
    //  alert(data)
    },this);
    },
  async  sendMessage(){
         const res = await this.$axios
        .post(`/sendMessage/`, {"channel":this.channel,"message":this.message,"chat":this.message,"account_type":localStorage.getItem('account_type')},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
            
        })
        this.message=''
    },
    async listingGetall() {
      this.isLoading=true
      const res = await this.$axios
        .get(`/channel/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          this.isLoading=false
          console.log(res.data)
          this.items = res.data
        })
    },
  },
}
</script>

<style>
</style>