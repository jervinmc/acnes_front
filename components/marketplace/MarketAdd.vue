<template>
  <v-dialog v-model="isOpen" width="1000" persistent>
    <v-card class="pa-10">
      <div align="center" class="text-h6">Add Marketlist</div>
      <div class="text-h6">Name of Listing</div>
      <div>
        <v-text-field outlined v-model="marketplace.name"></v-text-field>
      </div>
      <div class="text-h6">Category</div>
      <div>
        <v-select
          outlined
          v-model="marketplace.category"
          :items="['Product', 'Service']"
        ></v-select>
      </div>
      <div class="text-h6">Price</div>
      <div>
        <v-text-field outlined v-model="marketplace.price"></v-text-field>
      </div>
      <div class="text-h6">Descriptions</div>
      <div>
        <v-textarea outlined v-model="marketplace.description"></v-textarea>
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
  data() {
    return {
        marketplace:[]
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style>
</style>