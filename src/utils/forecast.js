const request = require('postman-request');

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=45a7bc0b42d7f417b9bce2a9c102357e&query='+latitude+','+longitude+'&units=m';
    
    // request({url:url , json:true}, (err,res) => {
    request({url , json:true}, (err,{ body }) => {
        if(err){
            callback('Unable to connect',undefined);
        }else if(body.error){
            callback('Unable to find location, Try another search',undefined);
        }else{

            // callback(undefined,{
            //     temperature : body.current.temperature,
            //     feelslike : body.current.feelslike
            // })
            callback(undefined,{ 

                forecast : body.current.weather_descriptions[0]+", It is currently " +body.current.temperature +" degrees out. It feels lie "+body.current.feelslike +" degrees out",
            
            })
            // console.log(res.body);
        }  
    })
}

module.exports = forecast;