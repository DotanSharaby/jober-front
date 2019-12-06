<template>
    <section class="job-list">
        <JobPreview @updatedData="updateData" v-for="job in jobs" :key="job._id" :job="job" :user="user"></JobPreview>
    </section>
</template>

<script>
import JobPreview from './JobPreview.vue'

export default {
    props: { jobs: Array, user: Object },
    methods: {
        updateData(data) {
            this.$emit('updatedData', data)
        }
    },
    components: {
        JobPreview,
    }
}
</script>
