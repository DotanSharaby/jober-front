<template>
    <section class="job-page">
        <router-link class="edit-link" to="/job/edit">Add a New Job</router-link>
        <JobList @removed="removeJob" v-if="jobs" :jobs="jobs"></JobList>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";

export default {
    methods: {
        removeJob(jobId) {
            this.$store.commit('removeJob', { jobId });
        }
    },
    computed: {
        jobs() {
            return this.$store.getters.jobsToShow;
        }
    },
    created() {
        this.$store.dispatch("loadJobs");
    },
    components: {
        JobList
    }
};
</script>

