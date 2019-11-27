

import HttpService from './HttpService'

export default {
    query,
    save,
    remove,
    getById
}

function query() {
    return HttpService.get('job');
}

function save(job) {
    if (job._id) {
        return HttpService.put(`job/${job._id}`, job);
    } else {
        return HttpService.post('job', job);
    }
}

function remove(jobId) {
    return HttpService.delete(`job/${jobId}`);
}

function getById(jobId) {
    return HttpService.get(`job/${jobId}`);
}

// function update(job) {
//     return HttpService.put(`job/${job._id}`, job);
// }

// function add(job) {
//     return HttpService.post('job', job);
// }