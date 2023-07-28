//  ------------- static pages
// -------------------------------------------------
const express= require('express')
const app=express()
const port=3000

const path = require('path')
const publicDirectory =path.join(__dirname,'../public')

    app.use(express.static(publicDirectory))


// app.get('/',(req,res)=>{
//     res.send("hello world")

// })
// app.get('/service',(req,res)=>{
//     res.send({
//         titele:"medo",
//         name:"rezk"
//     })

// })

// ----------------- dynamic bages
// ----------------------------------
app.set('view engine', 'hbs');

const viewDirectory= path.join(__dirname,"../temp/views")
app.set('views', viewDirectory);

const hbs=require('hbs')
const partials =path.join(__dirname,"../temp/partials")
hbs.registerPartials(partials)
///////////////////////////////////////////////////////////

const country=process.argv[2]
const gecode=require('./data1/geocode')
const forecast = require('./data1/forecast')
gecode("egypt",(error,data)=>{
    console.log('ERROR',error)
    console.log('DATA',data)
    if(data){
        forecast(data.longtude,data.latitude,(error,data)=>{
            console.log("ERROR",error)
            console.log('DATA',data)
            app.get('/checkWeather',(req,res)=>{
            res.render('checkWeather', {
                loc: data.location,
                cont:data.countryx,
                cond:data.condition,
                icon:data.icon,
                temp:data.temp,
                winds:data.windSpead,
                pre:data.precipmm,
                pressure:data.pressuremb
                })
                
            })
        })
    }else{
        console.log('there is an error from your location please enter a correct country ...!!')
    }
    
})

app.get('/',(req,res)=>{
    res.render('index', {
        title:"welcome to our site",
        webname:"Rai weather",
        disc:"Stay ahead of the weather with our application",
        discx:"Get the latest weather updates and forecasts for your area.",
        title2:"introduction",
        desc2:"WeatherApp is a simple and reliable app that provides accurate and timely weather information for any location. You can check the current conditions, hourly forecasts, and alerts for severe weather. WeatherApp helps you plan your day and stay safe in any weather."
    })
})




app.listen(port,()=>{
    console.log(`example app listening on port ${port}`)
})

