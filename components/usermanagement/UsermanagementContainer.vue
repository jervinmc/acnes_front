<template>
  <v-card elevation="5">
    <v-dialog v-model="openCSV">
      <div>
        <v-data-table
          class="pa-5"
          :headers="headers"
          :items="items"
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
        </v-data-table>
      </div>
    </v-dialog>
    <user-add
      :isOpen="dialogAdd"
      @cancel="dialogAdd = false"
      @refresh="loadData"
      :items="selectedItem"
      :isAdd="isAdd"
    />
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Usermanagement</b>
        <div class="pt-5">
            <v-text-field placeholder="Search" v-model="searchUser" outlined> </v-text-field>
          </div>
      </v-col>
    </v-row>
    <v-data-table
      class="pa-5"
      :search="searchUser"
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
      <template #[`item.is_active`]="{ item }">
        <div :class="item.is_active ? 'green--text' : 'red--text'">
          {{ item.is_active ? "Verified" : "Unverified" }}
        </div>
      </template>
      <template #[`item.image_document`]="{ item }">
        <div>
          <v-img :src="item.image_document" height="150" width="150"></v-img>
        </div>
      </template>
      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="editItem(item)">
              <v-list-item-content>
                <v-list-item-title>View/Edit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
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
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-row>
      <v-col>
        <div class="text-h5 pa-10">
          <b> Uploaded File</b>
          <div class="pt-5">
            <v-text-field placeholder="Search" v-model="searchUploadedFile" outlined> </v-text-field>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-col align="end" class="pr-5">
          <div class="pt-5">
            <v-btn
              @click="$refs.file.click()"
              x-large
              color="black"
              width="200"
              dark
              outlined
              height="40"
            >
              Upload CSV
            </v-btn>
            <v-col>
              <input
                style="display: none"
                type="file"
                ref="file"
                accept=".xlsx, .xls, .csv"
                @change="parseExcelFile"
              />
            </v-col>
          </div>
        </v-col>
      </v-col>
    </v-row>

    <div>
      <div>
        <v-data-table
        :search="searchUploadedFile"
          class="pa-5"
          :headers="headers"
          :items="items"
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
        </v-data-table>
      </div>
    </div>
  </v-card>
</template>

<script>
import UserAdd from "./UserAdd.vue";
import * as XLSX from "xlsx/xlsx.mjs";
export default {
  components: { UserAdd },
  created() {
    this.loadData();
  },
  data() {
    return {
      searchUser:'',
      searchUploadedFile: "",
      isLoading: false,
      users: [],
      selectedItem: [],
      dialogAdd: false,
      isAdd: false,
      items: [],
      openCSV: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "First Name", value: "firstname" },
        { text: "Last Name", value: "lastname" },
        { text: "Address", value: "address" },
        { text: "Account Type", value: "account_type" },
        { text: "email", value: "email" },
        { text: "Status", value: "is_active" },
        { text: "Contact Number", value: "contact_number" },
        { text: "Image", value: "image_document" },
        { text: "Actions", value: "opt" },
      ],
    };
  },
  methods: {
    parseExcelFile(event) {
      const files = event.target.files,
        f = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        let sheetName = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[sheetName];
        const json_data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        this.items = json_data;

        // this.new_units = json_data;
        // this.cleanDataForApi(json_data);
      };
      reader.readAsArrayBuffer(f);
    },
    editItem(val) {
      this.selectedItem = val;
      this.dialogAdd = true;
      this.isAdd = false;
    },
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
          const res1 = this.$axios.post(
            `/approved-email/`,
            { email: data.email, status: status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

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