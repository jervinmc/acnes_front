<template>
  <div class="pa-16">
    <v-card elevation="5" class="pa-16">
      <div class="text-h5">Navara - Car MarketPlace</div>
      <div>Product</div>
      <div class="pt-16">
        <v-row class="pb-10">
          <v-col align="end">
            <v-avatar color="primary" size="56" v-on="on" v-bind="attrs">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-col>
          <v-col align-self="center" align="start"> Jervin Macalawa </v-col>
        </v-row>
      </div>
      <div class="green--text text-h4">Php 5000.50</div>
      <div class="mb-16">
        <v-btn color="deep-purple lighten-2" text @click="viewItem(key)">
          Pay now
        </v-btn>
      </div>
      <div class="text-h6 mb-3">Descriptions</div>
      <div>
        amet, consectetur adipiscing elit. Cras sodales elementum mi non
        hendrerit. Proin tempor facilisis felis nec ultrices. Duis nec ultrices
        neque. Proin semper ultricies turpis, vel faucibus velit sodales vitae.
        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos.
      </div>
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" height="500">

      </v-img>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>