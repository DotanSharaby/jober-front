<template>
    <section class="filter-container flex justify-center align-center">
        <!-- <label class="filter-label">Search:</label> -->
        <div class="input-wrapper">
            <font-awesome-icon class="search-icon" :icon="['fas', 'search']"></font-awesome-icon>
            <input
                type="text"
                :placeholder="Placeholders"
                v-model.trim="filterBy"
                @input="setFilter"
            />
        </div>
    </section>
</template>

<script>
export default {
    name: "JobFilter",
    data() {
        return {
            filterBy: ""
        };
    },
    methods: {
        setFilter() {
            this.$emit("set-filter", this.filterBy);
        }
    },
    computed: {
        Placeholders() {
            const options = [
                "Tel Aviv",
                "Frontend Developer",
                "Wixer",
                "Googloo",
                "Backend Developer"
            ];
            return 'Try: "' + options[Math.floor(options.length * Math.random())] + '"';
        }
    }
};
</script>