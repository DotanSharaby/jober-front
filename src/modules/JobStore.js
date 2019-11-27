
import JobService from '../services/JobService'

export default ({
    strict: true,
    state: {
        jobs: []
    },
    mutations: {
        setJobs(state, { jobs }) {
            state.jobs = jobs
        },
        updateJob(state, { updatedJob }) {
            const idx = state.jobs.findIndex(job => job._id === updatedJob._id);
            state.jobs.splice(idx, 1, updatedJob);
        },
        addJob(state, { addedJob }) {
            state.jobs.unshift(addedJob);
        },
        removeJob(state, { jobId }) {
            const idx = state.jobs.findIndex(job => job._id === jobId);
            state.jobs.splice(idx, 1);
        }
    },
    getters: {
        jobsToShow(state) {
            return state.jobs
        },
    },
    actions: {
        async loadJobs(context) {
            const jobs = await JobService.query()
            context.commit({ type: 'setJobs', jobs })
            return jobs;
        },
        async saveJob(context, payload) {
            const addedJob = await JobService.save(payload.job)
            context.commit({ type: 'updateJob', addedJob })
        },
        async getJob(context, payload) {
            const job = await JobService.getById(payload.id)
            return job;
        }
    },
})