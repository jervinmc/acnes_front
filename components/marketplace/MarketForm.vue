<template>
  <div align="center" class="pa-10">
    <market-add :isOpen="dialogAdd" @cancel="dialogAdd=false" />
    <v-card elevation="2" width="1200" class="pa-5">
      <v-row>
        <v-col class="pa-5">
          <span class="text-h4" style="cursor:pointer" @click="dialogAdd=true"> CREATE A LISTING </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-10">
          <v-text-field outlined rounded-lg placeholder="Search">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="index in 5" :key="index" cols="4" class="pa-5">
          <v-card class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">4.5 (413)</div>
              </v-row>

              <div class="my-4 text-subtitle-1">$ • Italian, Cafe</div>

              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tonight's availability</v-card-title>

            <v-card-text>
              <v-chip-group
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text>
                Reserve
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import MarketAdd from "./MarketAdd.vue";
export default {
  data() {
    return {
      dialogAdd: false,
    };
  },
  components: { MarketAdd },
};
</script>

<style>
</style>