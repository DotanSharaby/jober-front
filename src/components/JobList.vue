<template>
    <section class="job-list">
        <JobPreview @archived="archiveJob" @updated="updateJob" v-for="job in jobs" :key="job._id" :job="job" :user="user"></JobPreview>
    </section>
</template>

<script>
import JobPreview from './JobPreview.vue'

export default {
    props: { jobs: Array, user: Object },
    methods: {
        archiveJob(jobId) {
            this.$emit('archived', jobId)
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
