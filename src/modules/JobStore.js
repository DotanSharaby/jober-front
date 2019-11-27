
import JobService from '../services/JobService'

export default ({
    strict: true,
    state: {
        jobs: []
    },
    mutations: {
        setJobs(state, { jobs }) {
            state.jobs = jobs;
        }
    },
    actions: {
        async loadJobs(context) {
            const jobs = await JobService.query()
            context.commit({ type: 'setJobs', jobs })
            return jobs;
        }
    },
})