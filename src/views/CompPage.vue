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
    computed: {
        comp() {
            return this.$store.getters.getUserComp;
        },
        compJobs() {
            return this.$store.getters.getUserJobs;
        }
    },
    created() {
        this.$store.dispatch("loadJobs");
    },
    components: {
        CompJobList,
        CompChart
    }
}
</script>