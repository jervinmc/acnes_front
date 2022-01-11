<template>
  <div>
    <div>
        <usermanagement-hero/>
    </div>
      <div style="background-image:url('./Background.png');background-repeat: repeat;">
        <usermanagement-container/>
      </div>
  </div>
</template>

<script>
import UsermanagementContainer from '../../components/usermanagement/UsermanagementContainer.vue'
import UsermanagementHero from '../../components/usermanagement/UsermanagementHero.vue'
export default {
  components: { UsermanagementHero },

}
</script>

<style>

</style>
UsermanagementContainer