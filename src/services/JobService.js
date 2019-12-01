import HttpService from './HttpService'
import UtilService from './UtilService'

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
        job._id = UtilService.makeId();
        return HttpService.post('job', job);
    }
}

function remove(jobId) {
    return HttpService.delete(`job/${jobId}`);
}

function getById(jobId) {
    return HttpService.get(`job/${jobId}`);
}