<template>
  <v-card elevation="5">
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Events Management</b>
      </v-col>
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="events"
      :loading="isLoading"
    >
      <template v-slot:loading>
        <v-skeleton-loader
          v-for="n in 5"
          :key="n"
          type="list-item-avatar-two-line"
          class="my-2"
        ></v-skeleton-loader>
      </template>

      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="status(item, 'Approve')">
              <v-list-item-content>
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item, 'Disapprove')">
              <v-list-item-content>
                <v-list-item-title>Disapprove</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      isLoading: false,
      events: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Event Name", value: "event_name" },
        { text: "Event Start Date", value: "event_start_date" },
        { text: "Event End Date", value: "event_end_date" },
        { text: "venue", value: "venue" },
        { text: "descriptions", value: "descriptions" },
        { text: "is_approved", value: "is_approved" },
        { text: "Actions", value: "opt" },
        ,
      ],
    };
  },
  methods: {
    async status(data, status) {
      this.isLoading = true;
      const res = await this.$axios
        .patch(
          `/events/${data.id}/`,
          {
            is_approved: status != "Approve" ? false : true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.loadData();
        });
    },
    loadData() {
      this.eventsGetall();
    },
    async eventsGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/events/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.events = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>