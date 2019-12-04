<template>
    <section class="job-list">
        <JobPreview @removed="removeJob" @updated="updateJob" v-for="job in jobs" :key="job._id" :job="job" :user="user"></JobPreview>
    </section>
</template>

<script>
import JobPreview from './JobPreview.vue'

export default {
    props: { jobs: Array, user: Object },
    methods: {
        removeJob(jobId) {
            this.$emit('removed', jobId)
        },
        updateJob(job) {
            this.$emit('updated', job)
        }
    },
    components: {
        JobPreview
    }
}
</script>
