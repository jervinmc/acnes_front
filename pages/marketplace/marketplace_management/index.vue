<template>
  <div>
      <div>
          <hero />
      </div>
      <marketplace-management />
  </div>
</template>

<script>
import Hero from '../../../components/marketplace/hero.vue'
import MarketplaceManagement from '../../../components/marketplace/MarketplaceManagement.vue'
export default {
  components: { MarketplaceManagement, Hero },

}
</script>

<style>

</style>