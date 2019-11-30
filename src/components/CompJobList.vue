<template>
    <section class="comp-job-list">
        <CompJobPreview v-for="job in jobs" :key="job._id" :job="job"></CompJobPreview>
    </section>
</template>

<script>
import CompJobPreview from './CompJobPreview'

export default {
    props: { jobs: Array },
    components: {
        CompJobPreview
    }
}
</script>