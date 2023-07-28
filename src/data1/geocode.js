const request =require('request')
const gecode=(address,callback)=>{
const geocodeUrl ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicmFpamluYXNkZjIwMCIsImEiOiJjbGtkMzgxMDMwYWxkM2twZG50ZTR5ZHlkIn0.cCsfLSaGE8eKL9LHEWvsuw"
request({url:geocodeUrl,json:true},(error,response)=>{
    if(error){
        callback("cant connect to mapbox service",undefined)
    }else if (response.body.message){
        callback(response.body.message,undefined)
    }else if (response.body.features.length==0){
        callback("cant access your location ",undefined)
    }else{
        callback(undefined,{
            longtude:response.body.features[0].center[0],
            latitude:response.body.features[0].center[1]
        })
    }
})
}
module.exports=gecode;