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

<style scoped lang="scss">
.filter-container {
    width: 100%;
    height: 60px;
    margin-top: 10px;
    .filter-label {
        margin-right: 5px;
    }
    .input-wrapper {
        .search-icon {
            position: relative;
            left: calc(100% - 22px);
            top: 1px;
            opacity: 0.6;
        }
        input {
            font-size: 1.08em;
            padding: 7px;
            min-width: 250px;
            transition: 0.2s;
            background-color: transparent;
            border: 0;
            border-bottom: 1px solid #989898;
        }
    }
}
</style>