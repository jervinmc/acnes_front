<template>
    <div>
        <div>
            <events-hero/>
        </div>
        <div>
            <events-form/>
        </div>
    </div>
</template>

<script>
import EventsForm from '../../components/events/EventsForm.vue'
import EventsHero from '../../components/events/EventsHero.vue'
export default {
  components: { EventsHero, EventsForm },

}
</script>

<style>

</style>