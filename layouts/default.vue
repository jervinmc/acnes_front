<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar
      color="transparent"
      v-if="$route.name != 'login'"
      :clipped-left="clipped"
      fixed
      elevation="0"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-spacer></v-spacer>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('home')">Home</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('events')">Events</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('discussionplace')">Discussion Place</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('marketplace')">Marketplace</v-toolbar-title>
      <v-toolbar-title class="px-4 white--text" style="cursor:pointer" @click="route('reports')">Feedback and reports</v-toolbar-title>
      <v-avatar color="primary" size="56">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
    </v-app-bar>
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
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods:{
    route(link){
      window.location.href=link
    }
  }
};
</script>
