<template>
    <section class="job-page">
        <JobFilter @set-filter="setFilter"></JobFilter>
        <router-link class="edit-link" to="/job/edit">Add a New Job</router-link>
        <JobList @removed="removeJob" @updated="updateJob" v-if="jobs" :jobs="jobs"></JobList>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";
import JobFilter from '../components/JobFilter.vue';

export default {
    methods: {
        removeJob(jobId) {
            this.$store.commit('removeJob', { jobId });
        },
        updateJob(job) {
            this.$store.dispatch({type: "saveJob", job})
            this.$store.commit('removeJob', { jobId: job._id });
        },
        setFilter(filterBy) {
            this.$store.commit({type:'setFilter', filterBy});
        }
    },
    computed: {
        jobs() {
            return this.$store.getters.jobsToShow;
        }
    },
    components: {
        JobList,
        JobFilter
    }
};
</script>

