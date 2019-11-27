<template>
    <section @click="goToDetails" class="job-preview flex column space-between align-center">
        <img class="job-img" :src="job.img" />
        <div class="details flex space-between align-center">
            <div class="main flex space-between">
                <img class="owner-logo" :src="job.owner.logoUrl" />
                <div class="job column flex align-center space-between">
                    <h2>{{job.owner.name}}</h2>
                    <h3>{{job.rating}}☆</h3>
                    <h4>{{job.title}}</h4>
                    <p>{{job.loc.address}}</p>
                </div>
            </div>
            <div class="extra flex space-between column align-center">
                <h3 v-if="job.rating > 4.5">Top Company</h3>
                <h4>83% match</h4>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: { job: Object },
    methods: {
        goToDetails() {
            this.$router.push(`/job/${this.job._id}`);
        }
    }

};
</script>
