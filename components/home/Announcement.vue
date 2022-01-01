<template>
  <v-card elevation="5" width="700" class="pa-16">
    <div align="center" class="text-h5 pa-5">Announcements</div>
      <div align="center"> 
        {{ announcement.length!=0 ? announcement[index].descriptions : 'Data will be displated here.' }}
      </div>

    <v-chip-group
      active-class="deep-purple accent-4 white--text"
      class="pt-10"
      column
    >
      <v-chip>Tag 1</v-chip>

      <v-chip>Tag 2</v-chip>

      <v-chip>Tag 3</v-chip>

      <v-chip>Tag 4</v-chip>
    </v-chip-group>
    <v-row class="pa-5">
      <v-col align="start">
        <div>
          <v-icon> mdi-arrow-left </v-icon>
        </div>
      </v-col>
      <v-col align="end">
        <div>
          <v-icon> mdi-arrow-right </v-icon>
        </div>
      </v-col>
    </v-row>
    <div class="pt-15">
      <v-btn x-large color="black" width="200" dark outlined height="40">
        View more
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      announcement: [],
      isLoading: false,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.announcementGetall();
    },
    async announcementGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/announcement/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.announcement = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>