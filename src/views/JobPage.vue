<template>
    <section class="job-page">
        <JobFilter @set-filter="setFilter"></JobFilter>
        <router-link v-if="this.user" class="edit-link" to="/job/edit">Add a New Job</router-link>
        <JobList @updatedData="updateData" v-if="jobs" :jobs="jobs" :user="user" class="container"></JobList>
    </section>
</template>

<script>
import JobList from "../components/JobList.vue";
import JobFilter from '../components/JobFilter.vue';

export default {
    methods: {
        updateData(data) {
            if (data.job) this.$store.dispatch({ type: "updateJob", job: data.job })
            this.$store.dispatch({ type: "updateUser", user: data.user })
        },
        setFilter(filterBy) {
            this.$store.commit({ type: 'setFilter', filterBy });
        }
    },
    computed: {
        jobs() {
            return this.$store.getters.jobsToShow;
        },
        user() {
            return this.$store.getters.loggedinUser
        }
    },
    components: {
        JobList,
        JobFilter
    },
    created() {
        this.$store.dispatch("loadJobs");
    }
};
</script>

