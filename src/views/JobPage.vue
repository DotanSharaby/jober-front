<template>
    <section class="job-page">
        <router-link class="edit-link" to="/job/edit">Add a New Job</router-link>
        <JobList @removed="removeJob" @updated="updateJob" v-if="jobs" :jobs="jobs"></JobList>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";

export default {
    methods: {
        removeJob(jobId) {
            this.$store.commit('removeJob', { jobId });
        },
        updateJob(job) {
            this.$store.dispatch({type: "saveJob", job})
            this.$store.commit('removeJob', { jobId: job._id });
        }
    },
    computed: {
        jobs() {
            return this.$store.getters.jobsToShow;
        }
    },
    components: {
        JobList
    }
};
</script>

