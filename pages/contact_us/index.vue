<template>
  <div>
      <div>
          <contact-hero />
      </div>
      <div>
          <contact-form />
      </div>
  </div>
</template>

<script>
import ContactForm from '../../components/contact_us/ContactForm.vue'
import ContactHero from '../../components/contact_us/ContactHero.vue'
export default {
  components: { ContactHero, ContactForm },

}
</script>

<style>

</style>