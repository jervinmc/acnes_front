<template>
  <v-card elevation="5">
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Usermanagement</b>
      </v-col>
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="users"
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
            <v-list-item @click.stop="status(item, 'Activate')">
              <v-list-item-content>
                <v-list-item-title>Activate</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item, 'Deactivate')">
              <v-list-item-content>
                <v-list-item-title>Deactivate</v-list-item-title>
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
      users: [],
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Address", value: "address" },
        { text: "Account Type", value: "account_type" },
        { text: "email", value: "email" },
        { text: "Is Active", value: "is_active" },
        { text: "Actions", value: "opt" },
        ``,
      ],
    };
  },
  methods: {
    async status(data, status) {
      this.isLoading = true;
      const res = await this.$axios
        .patch(
          `/users/user/${data.id}/`,
          {
            is_active: status == "Deactivate" ? false : true,
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
      this.usermanagementGetall();
    },
    async usermanagementGetall() {
      this.isLoading = true;
      const res = await this.$axios
        .get(`/users/user/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.users = res.data;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>