'use strict';
const data = require('./data/weather.json')

const { request, response } = require('express');

const express = require('express')

const server = express();

const PORT = process.env.PORT;

//local host 3001
// const PORT = 3001;

server.listen(PORT, () => {
    console.log(`listing on PORT ${PORT}`)
})

////////////////////////////////////////////////

// https://class07-local-server.herokuapp.com/getWeather?cityName=amman


server.get('/getWeather', (req, res) => {

    let city = req.query.cityName;

    let wetherInfo = data.find((item) => {
        if (item.city_name.toLocaleLowerCase() === city.toLocaleLowerCase()) {
            return item
        }
    })
    let finalData = wetherInfo.data.map(element => {
        return { description: `Low of ${element.low_temp}, high of ${element.max_temp} with ${element.weather.description}`, date: element.valid_date }

    })
    res.send(finalData)
})
///////////////////////////////////////////////

server.get('/test', (request, response) => {
    response.status(200).send('all woring ... for now')
})

// this should always be in the last line
server.get('*', (req, res) => {
    res.status(404).send('error')
})
