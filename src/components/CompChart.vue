

<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: { jobs: Array },

    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: [this.jobs[0].title, this.jobs[1].title],
            datasets: [
                {
                    label: 'Applicants',
                    backgroundColor: '#3fc1c9',
                    data: [5, 7]
                },
                {
                    label: 'Saves',
                    backgroundColor: '#678b9d',
                    data: [10, 12].concat([0, 15])
                }
            ]
        })
    }
}
</script>