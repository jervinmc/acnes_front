<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
    <div align="center" class="text-h6">Add Marketlist</div>
    <div class="text-h6">
        Name of Listing
    </div>
    <div>
        <v-text-field outlined ></v-text-field>
    </div>
    <div class="text-h6">
        Category
    </div>
    <div>
        <v-text-field outlined ></v-text-field>
    </div>
    <div class="text-h6">
        Price
    </div>
    <div>
        <v-text-field outlined ></v-text-field>
    </div>
    <div class="text-h6">
        Descriptions
    </div>
    <div>
        <v-textarea outlined></v-textarea>
    </div>
      <v-card-actions>
        <v-row align="center">
            <v-col align="end">
                <v-btn color="red" text @click="cancel"> Cancel </v-btn>
            </v-col>
            <v-col>
                <v-btn color="success" text @click="snackbar = false"> Save </v-btn>
            </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["isOpen"],
  methods:{
      cancel(){
          this.$emit("cancel")
      }
  }
};
</script>

<style>
</style>