<template>
  <div>
    <div>
      <announcement-hero/>
    </div>
      <div align="center" class="py-15" style="background-image:url('./Background.png');background-repeat: repeat;">
        <announcement/>
      </div>


  </div>
</template>

<script>
import Announcement from '../../components/home/Announcement.vue';
import AnnouncementHero from '../../components/home/AnnouncementHero.vue';
import LoginForm from '../../components/login/LoginForm.vue';

export default {
  components: { LoginForm, Announcement, AnnouncementHero },

};
</script>
<style>
</style>