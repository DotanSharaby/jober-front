<template>
    <section class="job-list flex space-around align-center">
        <JobPreview @removed="removeJob" v-for="job in jobs" :key="job._id" :job="job"></JobPreview>
    </section>
</template>

<script>
import JobPreview from './JobPreview.vue'

export default {
    props: { jobs: Array },
    methods: {
        removeJob(jobId) {
            this.$emit('removed', jobId)
        }
    },
    components: {
        JobPreview
    }
}
</script>
