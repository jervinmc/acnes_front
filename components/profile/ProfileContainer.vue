<template>
  <div align="center">
    <div class="pa-16" style="max-width: 1200px">
      <v-card class="pa-16">
        <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <div class="text-h6">{{ name }}</div>
        <div class="text-h6">{{ email }}</div>
        <div class="text-h6">Julugan 4 tanza cavite</div>
        <div class="pt-10 text-h5">ABOUT ME</div>
        <div class="grey--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales
          elementum mi non hendrerit. Proin tempor facilisis felis nec ultrices.
          Duis nec ultrices neque. Proin semper ultricies turpis, vel faucibus
          velit sodales vitae. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos.
        </div>
        <v-row>
          <v-col
            v-for="index in discussions"
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
              <v-img height="250" :src="index.image"></v-img>
              <v-card-text>
                <div>
                  {{ index.descriptions }}
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
                <v-btn
                  color="deep-purple lighten-2"
                  text
                  @click="viewItem(index)"
                >
                  View
                </v-btn>
              </v-card-actions>
            </v-card>
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
      email: "",
      address: "",
      discussions: [],
      isLoading: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
      this.address = localStorage.getItem("address");
      this.discussionsGetall();
    },
    async discussionsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/discussions/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.discussions = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>