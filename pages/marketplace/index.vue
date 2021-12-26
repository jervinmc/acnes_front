<template>
    <div>
        <hero/>
        <div >
            <market-form/>
        </div>
    </div>
</template>

<script>
import hero from '../../components/marketplace/hero.vue'
import MarketForm from '../../components/marketplace/MarketForm.vue'
export default {
  components: { hero, MarketForm },

}
</script>

<style>

</style>