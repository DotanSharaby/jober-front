<template>
    <section @click="goToDetails" class="job-preview flex column space-between align-center">
        <h3 v-if="saved" class="star" @click.stop="toggleSave">⭐</h3>
        <div class="icons flex space-between align-center text-center">
            <h2 class="trash bold" @click.stop="removeJob">🗑</h2>
            <h2 @click.stop="toggleSave">❤</h2>
        </div>
        <img class="job-img" :src="job.img" />
        <div class="desc flex align-center column space-between">
            <div class="company flex space-around align-center">
                <img class="owner-logo" :src="job.owner.logoUrl" />
                <div class="details flex column align-center justify-center">
                    <h2 >{{job.owner.name}}</h2>
                    <h4 class="rating semi flex align-center">{{job.owner.rating}} <span>☆</span></h4>
                </div>
            </div>
            <p v-if="job.owner.rating>4.5" class="top-comp bold">Top Company</p>
            <div class="extra flex space-between align-center">
                <div class="job flex space-between column align-center">
                    <h4 class="semi">{{job.title}}</h4>
                    <p>{{job.loc.address}}</p>
                </div>
                <h4 :class="{ colored: match>70}">{{match}}% match</h4>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    props: { job: Object },
    data() {
        return {
            saved: false
        }
    },
    methods: {
        goToDetails() {
            this.$router.push(`/job/${this.job._id}`);
        },
        toggleSave() {
            this.saved = !this.saved;
        },
        removeJob() {
            this.$emit('removed', this.job._id)
        }
    },
    computed: {
        match() {
            return Math.floor(Math.random() * (100 - 50 + 1) + 50);
        }
    }

};
</script>
