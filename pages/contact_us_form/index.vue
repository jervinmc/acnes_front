<template>
  <div>
      <div>
           <contact-us-form-hero />
      </div>
      <div>
          <contact-us-form />
      </div>
  </div>
</template>

<script>
import ContactForm from '../../components/contact_us/ContactForm.vue'
import ContactUsForm from '../../components/contact_us_form/ContactUsForm.vue'
import ContactUsFormHero from '../../components/contact_us_form/ContactUsFormHero.vue'
export default {
  components: { ContactForm, ContactUsFormHero, ContactUsForm },

}
</script>

<style>

</style>