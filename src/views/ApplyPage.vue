<template>
    <section class="apply-page">
        <ApplyPreview v-for="(apply, idx) in applies" :key="idx" :apply="apply"></ApplyPreview>
    </section>
</template>

<script>
import ApplyPreview from '../components/ApplyPreview'
export default {
    computed: {
        applies() {
            var currJob = this.$store.getters.currJob
            if (currJob) return currJob.applies;
            return null
        }
    },
    async created() {
        const id = this.$route.params.jobId;
        await this.$store.dispatch({ type: "loadCurrJob", id });
    },
    components: {
      ApplyPreview
    }
}
</script>
