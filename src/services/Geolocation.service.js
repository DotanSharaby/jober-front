

import Axios from 'axios';
var axios = Axios.create({
    withCredentials: true
});

// var address = '';
var BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=Raanana&key=AIzaSyCb1UNDCLnAZOCRQOAd-0yoIU6fM9kSgxE`

async function getLoc(val) {
    var address = val
    console.log(address);
    try {
        const res = await axios({
            url: `${BASE_URL}`,
            method: 'GET',
        })
        console.log(res);
        debugger;
    } catch (err) {
        debugger;
        if (err.response.status === 401) {
            console.log('Error trying to get location');
        }
    }
}

export default {
    getLoc
}