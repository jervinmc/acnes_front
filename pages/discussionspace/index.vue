<template>
  <div v-if="account_type!='Admin'">
      <discussionplace-hero/>
      <div style="background-image:url('./Background.png');background-repeat: repeat;">
          <discussionplace-form/>
      </div>
  </div>
  <div v-else>
      <discussionplace-hero/>
      <div style="background-image:url('./Background.png');background-repeat: repeat;">
          <discussion-admin-container />
      </div>
  </div>
</template>

<script>
import DiscussionAdminContainer from '../../components/discussionplace/DiscussionAdminContainer.vue'
import DiscussionplaceForm from '../../components/discussionplace/DiscussionplaceForm.vue'
import discussionplaceHero from '../../components/discussionplace/discussionplaceHero.vue'
export default {
  components: { discussionplaceHero, DiscussionplaceForm, DiscussionAdminContainer },
  created(){
    this.loadData()
  },
  methods:{
    loadData(){
      this.account_type=localStorage.getItem('account_type')
    },
  },
  data(){
    return {
      account_type:'',
    }
  },
}
</script>

<style>

</style>