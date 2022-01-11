<template>
    <div>
        <div>
            <reports-hero/>
        </div>
        <div style="background-image:url('./Background.png');background-repeat: repeat;">
            <reports-form/>
        </div>
    </div>
</template>

<script>
import ReportsForm from '../../components/reports/ReportsForm.vue'
import ReportsHero from '../../components/reports/ReportsHero.vue'
export default {
  components: { ReportsHero, ReportsForm },

}
</script>

<style>

</style>