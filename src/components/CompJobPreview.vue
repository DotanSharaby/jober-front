<template>
    <section class="comp-job-preview flex space-between align-center">
        <router-link :to="jobEditUrl">
            <h3 class="semi profile-link" title="Edit Job">{{job.title}}</h3>
        </router-link>
        <div class="flex space-between align-center">
            <p class="date">{{job.createdAt}}</p>
            <p class="saved">{{saves}} saves</p>
            <p class="applicants profile-link semi">{{applicants}} applicants</p>
        </div>
    </section>
</template>

<script>
export default {
    props: { job: Object },
    computed: {
        jobEditUrl() {
            return `/job/edit/${this.job.owner._id}`;
        },
        applicants() {
            if (!this.job.applicants) return 0;
            return this.job.applicants.length
        },
        saves() {
            if (!this.job.saves) return 0;
            return this.job.saves
        }
    }
}
</script>