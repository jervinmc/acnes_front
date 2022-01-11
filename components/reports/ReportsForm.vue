<template>
  <div align="center" class="pa-10">
    <v-card elevation="2" width="900" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span
            class="text-h4"
            style="cursor: pointer"
            @click="dialogAdd = true"
          >
            Reports Form
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <div align="start">
                Name(Optional):
            </div>
            <div>
                <v-text-field outlined placeholder="Ex:Juan Delacruz"></v-text-field>
            </div>
        </v-col>
        <v-col cols="12">
            <div align="start">
                Descriptions
            </div>
            <div>
                <v-textarea outlined>

                </v-textarea>
            </div>
        </v-col>
        
      </v-row>
      <div class="pt-5" >
              <v-btn
                x-large
                color="black"
                width="200"
                dark
                outlined
                height="40"
              >
                Submit
              </v-btn>
            </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogAdd: false,
    };
  },
};
</script>

<style>
</style>