<template>
  <div align="center">
    <div class="pa-16" style="max-width: 1200px">
      <v-card class="pa-16">
        <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
          <img :src="profileImage" alt="John" />
        </v-avatar>
        <div class="text-h6">{{ name }}</div>
        <div class="text-h6">{{ email }}</div>
        <div class="text-h6">Taguig</div>
        <div class="pt-10 text-h5">ABOUT ME</div>
        <div class="grey--text mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales
          elementum mi non hendrerit. Proin tempor facilisis felis nec ultrices.
          Duis nec ultrices neque. Proin semper ultricies turpis, vel faucibus
          velit sodales vitae. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos.
        </div>
        <v-divider class="pt"></v-divider>
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
      events:[],
      marketplace:[],
      profileImage:''
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.name = localStorage.getItem("firstname")+' '+localStorage.getItem("lastname");
      this.email = localStorage.getItem("email");
      this.address = localStorage.getItem("address");
      this.profileImage = localStorage.getItem("image");
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