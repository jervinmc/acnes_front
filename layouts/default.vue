<template>
  <v-app dark>
       <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list class="black--text mx-3">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="
            () => {
              settings_collapse = false;
              reports_collapse = false;
            }
          "
        >
          <v-list-item-icon>
            <v-icon class="black--text menu-icon" v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="black--text menu-item"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list class="black--text mx-3">
        <v-list-item @click="isOpenLogout=true">
          <v-list-item-icon>
            <v-icon class="black--text menu-icon">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="black--text menu-item"
            >
            Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <logout-dialog :isOpenLogout="isOpenLogout" @cancel="isOpenLogout=false"/>
    <v-app-bar
      hide-on-scroll
      color="transparent"
      v-if="$route.name != 'login' && $route.name != 'beta_updates' "
      :clipped-left="clipped"
      fixed
      elevation="0"
    >
      <v-row>
        <v-col cols="auto">
          <v-img src="./tree.png" height="50" width="50" contain></v-img>
        </v-col>
        <v-col align-self="center" class="white--text text-h6" >
          DOTCOM.MUNITREE
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('home')">Home</v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-toolbar-title class="px-4 white--text" v-on="on" v-bind="attrs" style="cursor:pointer">Events</v-toolbar-title>
        </template>
              <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>Upcoming Events</v-list-item-title>
          </v-list-item>
          <v-list-item @click="isOpenLogout=true">
            <v-list-item-title>Official Events</v-list-item-title>
          </v-list-item>
          <v-list-item @click="isOpenLogout=true">
            <v-list-item-title>Community-Led Events</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('discussionspace')">Discussion Space</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('marketplace')">Marketplace</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('reports')">Feedback and reports</v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
      <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
        </template>
              <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="route('usermanagement')" v-if="account_type!='Resident'">
            <v-list-item-title>Usermanagement</v-list-item-title> 
          </v-list-item>
          <v-list-item @click="isOpenLogout=true">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- <v-app-bar
      app
      color="black"
      v-if="$route.name != 'login' && $route.name != 'beta_updates'"
      :clipped-left="clipped"
      fixed
      elevation="0"
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"  />
      <div class="pl-5 white--text text-h6">
        A Friendly Community and Neighborhood Engagement System
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
      <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
        <img
          :src="profileImage"
          alt="John"
        >
      </v-avatar>
        </template>
              <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>My Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="isOpenLogout=true">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar> -->
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import LogoutDialog from '../components/custom/LogoutDialog.vue';
export default {
  components:{
    LogoutDialog
  },
  name: "DefaultLayout",
  created(){
    this.loadData()
  },
  data() {
    return {
      profileImage:'',
      isOpenLogout:false,
      clipped: false,
      drawer: false,
      account_type:'',
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-calendar-multiple",
          title: "Events",
          to: "/events_management",
        },
        {
          icon: "mdi-bullhorn",
          title: "Announcement",
          to: "/announcement",
        },
        {
          icon: "mdi-account-group",
          title: "Usermanagement",
          to: "/usermanagement",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods:{
    loadData(){
      this.account_type=localStorage.getItem('account_type')
      this.profileImage=localStorage.getItem('image')
    },
    goToProfile(){
      this.$router.push('/profile')
    },
    route(link){
      this.$router.push('/'+link)
    }
  }
};
</script>
