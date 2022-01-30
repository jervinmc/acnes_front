<template>
  <div>
       <div>
        <events-hero title="Official Events" />
        </div>
    <admin-event-container />
  </div>
</template>

<script>
import AdminEventContainer from '../../../components/admin_events/AdminEventContainer.vue'

export default {
  components: { AdminEventContainer },


}
</script>

<style>

</style>