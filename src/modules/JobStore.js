import JobService from '../services/JobService'

export default {
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
        loadJobs(context) {
            return JobService.query()
                .then(jobs => context.commit({ type: 'setJobs', jobs }));
        },
        removeJob(context, { jobId }) {
            return JobService.remove(jobId)
                .then(() => context.commit({ type: 'removeJob', jobId }))
        },
        updateJob(context, { job }) {
            return JobService.update(job)
                .then(updatedJob => context.commit({ type: 'updateJob', updatedJob }))
        },
        addJob(context, { job }) {
            return JobService.add(job)
                .then(addedJob => context.commit({ type: 'addJob', addedJob }))
        }
    }
}
