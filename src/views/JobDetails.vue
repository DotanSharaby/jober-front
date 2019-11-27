<template>
  <section v-if="job" class="job-details">
    <section class="flex">
      <div class="avatar">
        <img :src="logoUrl" alt />
      </div>
    </section>
    <pre>{{job}}</pre>
  </section>
</template>

<script>
import JobService from "@/services/JobService";

export default {
  data() {
    return {
      job: null
    };
  },
  computed: {
    logoUrl() {
      return this.job.owner.logoUrl;
    }
  },
  async created() {
    const id = this.$route.params.id;
    const job = await JobService.getById(id);
    this.job = job;
  }
};
</script>

<style>
</style>