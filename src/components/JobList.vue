<template>
  <section class="job-list">
      <JobPreview v-for="job in jobs" :key="job._id" :job="job"></JobPreview>
  </section>
</template>

<script>
import JobPreview from './JobPreview.vue'

export default {
  props: {jobs: Array},
  components: {
    JobPreview
  }
}
</script>
