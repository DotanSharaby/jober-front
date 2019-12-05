<template>
    <section class="comp-page">
        <div class="title flex align-center center justify-center">
            <h1 class="text-center bold">{{user.username}}</h1>
        </div>
        <div class="content flex space-between">
            <div class="flex column"></div>
            <CompJobList :jobs="jobs"></CompJobList>
            <CompChart :jobs="jobs" class="comp-chart"></CompChart>
        </div>
    </section>
</template>

<script>
import CompJobList from '../components/CompJobList'
import CompChart from '../components/CompChart'

export default {
    computed: {
        jobs() {
            return this.$store.getters.userPostedJobs;
        },
        user() {
            return this.$store.getters.loggedinUser
        }
    },
    created() {
        if (!this.user || !this.jobs) {
            this.$router.go(-1)
        }
    },
    components: {
        CompJobList,
        CompChart
    }
}
</script>