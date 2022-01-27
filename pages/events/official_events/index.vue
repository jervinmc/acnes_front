<template>
    <div>
        <div>
        <events-hero title="Official Events" />
        </div>
        <div style="background-image:url('/Background.png');background-repeat: repeat;">
            <events-form event_type="official_events" />
        </div>
    </div>
</template>

<script>
import EventsForm from '../../../components/events/EventsForm.vue'
import EventsHero from '../../../components/events/EventsHero.vue'

export default {
  components: { EventsHero, EventsForm },


}
</script>

<style>

</style>