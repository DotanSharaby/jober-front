<template>
    <section class="comp-job-preview flex space-between align-center">
        <router-link :to="jobEditUrl">
            <h3 class="semi profile-link" title="Edit Job">{{job.title}}</h3>
        </router-link>
        <div class="info flex space-between align-center">
            <p class="date">30.11.19</p>
            <p class="saved">12 users saved this job</p>
            <p class="applicants profile-link semi">3 applicants</p>
        </div>
    </section>
</template>

<script>
export default {
    props: { job: Object },
    computed: {
        jobEditUrl() {
            return `/job/edit/${this.job.owner._id}`;
        }
    }
}
</script>