export default {
    makeId,
    upload

}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function upload(ev) {
    debugger;

    const CLOUD_NAME = 'dvbqwqxqs'
    const PRESET_NAME = 'ockqw801'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`

    const formData = new FormData();
    if (!ev.target) formData.append('file', ev)
    else formData.append('file', ev.target.files[0])
    formData.append('upload_preset', PRESET_NAME);

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => console.error(err))
}