<template>
  <div>
      <discussionplace-hero />
        <div>
          <discussion-containter />
        </div>
  </div>
</template>

<script>
import discussionplaceHero from '../../components/discussionplace/discussionplaceHero.vue'
import DiscussionContainter from '../../components/discussionspace_admin/DiscussionContainter.vue'
export default {
  components: { discussionplaceHero, DiscussionContainter },

}
</script>

<style>

</style>