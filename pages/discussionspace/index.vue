<template>
  <div>
      <discussionplace-hero/>
      <div>
          <discussionplace-form/>
      </div>
  </div>
</template>

<script>
import DiscussionplaceForm from '../../components/discussionplace/DiscussionplaceForm.vue'
import discussionplaceHero from '../../components/discussionplace/discussionplaceHero.vue'
export default {
  components: { discussionplaceHero, DiscussionplaceForm },

}
</script>

<style>

</style>