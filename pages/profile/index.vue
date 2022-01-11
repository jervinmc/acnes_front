<template>
  <div>
    <profile-hero/>
    <div style="background-image:url('./Background.png');background-repeat: repeat;">
        <profile-container/>
    </div>
  </div>
</template>

<script>
import ProfileContainer from '../../components/profile/ProfileContainer.vue'
import ProfileHero from '../../components/profile/ProfileHero.vue'
export default {
  components: { ProfileHero, ProfileContainer },

}
</script>

<style>

</style>