<template>
    <section class="comp-page" v-if="comp && compJobs">
        <div class="title flex align-center center justify-center">
            <h1 class="text-center bold">{{comp.name}}</h1>
        </div>
        <div class="content flex space-between">
            <div class="flex column"></div>
            <CompJobList :jobs="compJobs" v-if="compJobs"></CompJobList>
            <CompChart :jobs="compJobs" class="comp-chart" v-if="compJobs"></CompChart>
        </div>
    </section>
</template>

<script>
import CompJobList from '../components/CompJobList'
import CompChart from '../components/CompChart'

export default {
    data() {
        return {
            user: null,
            jobs: []
        }
    },
    computed: {
        comp() {
            return this.$store.getters.userComp;
        },
        compJobs() {
            return this.$store.getters.userJobs;
        }
    },
    created() {
        this.user = this.$store.getters.loggedinUser
        if (!this.user) this.$router.go(-1);
        this.$store.dispatch("loadJobs");
        this.jobs = this.$store.getters.userPostedJobs
        if (!this.jobs.length) this.$router.go(-1);
    },
    components: {
        CompJobList,
        CompChart
    }
}
</script>