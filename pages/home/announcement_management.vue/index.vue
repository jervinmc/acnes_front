<template>
  <div>
       <div>
           <announcement-hero />
    </div>
      <announcement-management />
  </div>
</template>

<script>
import AnnouncementHero from '../../../components/home/AnnouncementHero.vue'
import AnnouncementManagement from '../../../components/home/AnnouncementManagement.vue'
export default {
  components: { AnnouncementManagement,AnnouncementHero },

}
</script>

<style>

</style>