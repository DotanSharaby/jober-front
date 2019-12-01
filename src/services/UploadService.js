export default {
    upload
}

const CLOUD_NAME = 'dvbqwqxqs';
const PRESET_NAME = 'ockqw801';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

function upload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', PRESET_NAME);
    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            return res
        })
        .catch(err => console.error(err))
}