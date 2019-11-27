<template>
  <section class="job-preview">
    Got here!
  </section>
</template>

<script>

export default {
  props: {job: Object},
  methods: {
    goToDetails() {
      this.$router.push(`/job/details/${this.job._id}`);
    }
  }

};
</script>
