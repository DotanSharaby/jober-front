

import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCb1UNDCLnAZOCRQOAd-0yoIU6fM9kSgxE`
var address;

async function getLoc() {
    try {
        const res = await axios({
            url: `${BASE_URL}`
        })
        console.log(res);
    } catch (err) {
        if (err.response.status === 401) {
            console.log('Error trying to get location');
        }
    }
}

export default {
    getLoc
}