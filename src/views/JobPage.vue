<template>
    <section class="job-page">
        <JobList v-if="jobs" :jobs="jobs"></JobList>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";

export default {
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

