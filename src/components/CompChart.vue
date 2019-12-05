

<script>
import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: { jobs: Array },
    computed: {
        jobTitles() {
            return this.jobs.map(job => job.title)
        },
        applicantsDatas() {
            return this.jobs.map(job => {
                if (!job.applicants) return 0
                return job.applicants.length;
            })
        },
        savesDatas() {
            return this.jobs.map(job => {
                if (!job.saves) return 0
                return job.saves;
            })
        }
    },
    mounted() {
        this.renderChart({
            labels: this.jobTitles,
            maintainAspectRatio:false,
            datasets: [
                {
                    label: 'Applicants',
                    backgroundColor: '#3fc1c9',
                    data: this.applicantsDatas
                },
                {
                    label: 'Saves',
                    backgroundColor: '#678b9d',
                    data: this.savesDatas.concat([0, 5])
                }
            ]
        })
    }
}
</script>