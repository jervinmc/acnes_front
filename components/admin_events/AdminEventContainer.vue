<template>
  <v-card elevation="5">
       <v-dialog v-model="deleteConfirmation" width="500" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Confirmation</div>
    <div align="center" class="pa-10">
        Are you sure you want to delete this item?
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="deleteConfirmation=false"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text :loading="buttonLoad" @click="deleteAnnouncement"> Confirm </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Discussion Space Management</b>
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
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item, 'Deactivate')">
              <v-list-item-content>
                <v-list-item-title>Disapprove</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
             <v-list-item @click.stop="deleteItem(item)">
              <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
       
      <template #[`item.is_approved`]="{ item }">
       <div :class="item.is_approved ? 'green--text' : 'red--text'">
            {{item.is_approved ? 'Approved' : 'Not Yet Approved' }}
          </div>
      </template>
      <template #[`item.image`]="{ item }">
          <v-img :src="item.image" height="100" width="100"></v-img>
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
        selectedItem:[],
        deleteConfirmation:false,
      isLoading: false,
      users: [],
      buttonLoad:false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Event Name", value: "event_name" },
        { text: "Event Start Date", value: "event_start_date" },
        { text: "Event End Date", value: "event_end_date" },
        { text: "Venue", value: "venue" },
        { text: "Event Type", value: "event_type" },
        { text: "Descriptions", value: "descriptions" },
        { text: "Status", value: "is_approved" },
        { text: "Image", value: "image" },
        { text: "Actions", value: "opt" },
        ``,
      ],
    };
  },
  methods: {
         async deleteAnnouncement(){
     this.buttonLoad=true
      this.$axios.delete(`/events/${this.selectedItem.id}/`,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(()=>{
          this.deleteConfirmation=false
          this.buttonLoad=false
          alert('Successfully Deleted!')
          this.loadData()
      })
    },
       deleteItem(val){
      this.selectedItem=val
      this.deleteConfirmation=true
    },
    async status(data, status) {
      this.isLoading = true;
      alert(status)
      const res = await this.$axios
        .patch(
          `/events/${data.id}/`,
          {
            is_approved: status == "Deactivate" ? false : true,
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
        .get(`/events/`, {
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