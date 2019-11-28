<template>
    <section @click="goToDetails" class="job-preview flex column space-between align-center">
        <h3 v-if="msg">{{msg}}</h3>
        <div class="icons flex space-between align-center text-center">
            <h2 class="trash">🗑</h2>
            <h2>❤</h2>
        </div>
        <img class="job-img" :src="job.img" />
        <div class="desc flex align-center column space-between">
            <div class="company flex space-around align-center">
                <img class="owner-logo" :src="job.owner.logoUrl" />
                <div class="details flex column align-center justify-center">
                    <h2>{{job.owner.name}}</h2>
                    <h4>{{job.owner.rating}}☆</h4>
                </div>
            </div>
            <p v-if="job.owner.rating>4.5" class="top-comp">Top Company</p>
            <div class="extra flex space-between align-center">
                <div class="job flex space-between column align-center">
                    <h4>{{job.title}}</h4>
                    <p>{{job.loc.address}}</p>
                </div>
                <h4>83% match</h4>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: { job: Object },
    data() {
        return {
            msg: ''
        }
    },
    methods: {
        goToDetails() {
            this.$router.push(`/job/${this.job._id}`);
        },
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = '';
            }, 1500);
        }
    }

};
</script>
