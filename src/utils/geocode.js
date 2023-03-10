const request = require('postman-request');

const geoCode = (address,callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q='+ encodeURIComponent(address) +'&key=3bd7a0890f374251b18aaabc374429fc';

    // request({url : url , json : true} , (err,res) => {
    request({url, json : true} , (err,{body}) => {
        if(err){
            callback('Unable to connect to OpenCagedata',undefined);
        }else if(body.status.message != 'OK'){
            // callback('Unable to find location',{});
            callback('Unable to find location',undefined);
        }else{
            try{
                callback(undefined, {
                    longitude: body.results[0].geometry.lng,
                latitude: body.results[0].geometry.lat,
                location : body.results[0].formatted,
                })
            }catch(e){
                // callback("Please enter a valid address",{});// {} ahi aa na lkhyu hoy to func defined 6 tya arguments ma geocode(address, (err , {latitude,longitude,location} = {}) lkhvu pde
                callback("Please enter a valid address",undefined);
            }
        }
    })
}

module.exports = geoCode;