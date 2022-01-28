<template>
  <div align="center">
    <profile-hero />
    <div style="background-image:url('./Background.png');background-repeat: repeat;">
        <edit-profile />
    </div>
  </div>
</template>

<script>
import EditProfile from '../../components/edit_profile/EditProfile.vue'
import ProfileHero from '../../components/profile/ProfileHero.vue'
export default {
  components: { ProfileHero, EditProfile },

}
</script>

<style>

</style>