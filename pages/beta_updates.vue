<template>
  <div>
    <div class="text-h5 pa-5">
      <b
        >BETA UPDATES : A Friendly Community and Neighborhood Engagement System
      </b>
    </div>
    <div class="pa-10">
      <div class="text-h6">December 26, 2021</div>
      <li>Market Place - UI</li>
      <li>Events - UI</li>
      <li>Profile - UI</li>
      <li>
        AWS - Accessing Instances for deployment of the frontend and backend
        also accessing RDS for the setup of SQL.
      </li>
      <li>Login - UI</li>
      <li>Reports - UI</li>
      <li>Discussion Space - UI</li>
      <li>Backend - Django testing Usermanagement for permissions.</li>
    </div>
    <div class="pa-10">
      <div class="text-h6">December 27, 2021</div>
      <li>Market Place - Add , Search, View.</li>
      <li>Discussion Space - Add and View.</li>
      <li>Login - Authorization with token, permissions.</li>
      <li>Profile dynamically view the specific user.</li>
      <li>
        AWS - Accessing S3 bucket for uploading of image and connectivity of SQL
        to the backend.
      </li>
      <li>
        Dockerized deployed project. Implemented to easily deploy the updates.
      </li>
    </div>
    <div class="pa-10">
      <div class="text-h6">December 29, 2021</div>
      <li>Events - Add, View</li>
      <li>Sign up</li>
      <li>Admin View</li>
      <li>Approval of new account users</li>
      <li>
        Usermanagement - Viewing
      </li>
      <li>
        Events Management - Viewing, Approval Function, Only Approved events will be shown on the resident's event page.
      </li>
      <li>
        Announcement Management - Viewing
      </li>
    </div>
    <div class="pa-10 text-h5">
      <b
        >PS: Other updates will be deployed again at 10pm of December 27,
        2021</b
      >
    </div>
    <v-data-table :headers="headers" :items="items" class="pa-10">
    </v-data-table>
    <div class="pl-10">
        PS: Listed from the table is only for the active sprint that can be deployed on or before december 30, 2021.
    </div>
    <!-- <div class="pa-10">
          <div class="text-h6">
            December 27 2021
          </div>
          <li>
              Market Place - Add, View , Search
          </li>
          <li>
              
          </li>
      </div> -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            headers: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" },
      ],
            items:[
                {
                "high":"View of Events",
                 "medium":"Changing font family","low":"Polishment of UI in Admin and Resident"},
                 {"high":"Can add multiple announcement on the admin side.","medium":"Can view profile.","low":"Can edit profile"},
                 {"high":"Testing Phase","medium":"Can show ongoing events.","low":"Fix profile preview separtely of every data."}]
        }
    }
};
</script>

<style>
</style>