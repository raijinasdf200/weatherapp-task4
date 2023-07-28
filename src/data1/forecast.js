const request =require('request')
const forecast=(longtude,latitude,callback)=>{
const url ="http://api.weatherapi.com/v1/current.json?key=f0c358b12b804adbb18113854231807&q="+longtude+","+latitude
request({url,json:true},(error,response)=>{
    if(error){
        callback("cant connect to whather service",undefined)
    } else if (response.body.error) {
        console.log(response.body.error.message)
    } else {
        callback(undefined,{

            location:   response.body.location.name,
            countryx:response.body.location.country,
            condition: response.body.current.condition.text,
            icon: response.body.current.condition.icon,
            temp: response.body.current.temp_c,
            windSpead:response.body.current.wind_kph,
            precipmm:response.body.current.precip_mm,
            pressuremb:response.body.current.pressure_mb
        }
)}
})
}
module.exports=forecast;