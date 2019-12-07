<template>
    <section class="applicant-page">
        <ApplicantPreview v-for="(applicant, idx) in applicants" :key="idx" :applicant="applicant"></ApplicantPreview>
    </section>
</template>

<script>
import ApplicantPreview from '../components/ApplicantPreview'
export default {
    computed: {
        applicants() {
            var currJob = this.$store.getters.currJob
            if (currJob) return currJob.applicants;
            return null
        }
    },
    async created() {
        const id = this.$route.params.jobId;
        await this.$store.dispatch({ type: "loadCurrJob", id });
    },
    components: {
      ApplicantPreview
    }
}
</script>
