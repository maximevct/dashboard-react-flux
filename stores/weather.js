'use strict'

import Request            from 'request'
import FluxStore          from './FluxStore'
import AppDispatcher      from '../dispatcher/AppDispatcher'
import {WeatherConstants} from '../constants/constants'

import WeatherActions     from '../actions/weather'

let _weatherState;
let _weatherAPI = {
  url      : 'http://api.openweathermap.org/data/2.5/weather',
  units    : 'metric',
  token    : 'cb574cd3d5dede987b5bbda6055bf604',
  location : {
    lon : -1.43,
    lat : 46.67
  }
}

function initialState() {
  _weatherState = {
    weather : {
      description : '',
      icon        : ''
    },
    wind : {
      speed : 0
    },
    temp : {
      current : 0
    },
    sun : {
      rise : new Date(0),
      set  : new Date(0)
    }
  }
}

function getWeather(done) {
  Request({
    url : _weatherAPI.url,
    qs  : {
      lat   : _weatherAPI.location.lat,
      lon   : _weatherAPI.location.lon,
      units : _weatherAPI.units,
      appid : _weatherAPI.token
    }
  }, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      let bodyJSON = JSON.parse(body)
      _weatherState.weather.description = bodyJSON.weather[0].description
      _weatherState.weather.icon        = 'http://openweathermap.org/img/w/' + bodyJSON.weather[0].icon + '.png'
      _weatherState.wind.speed          = bodyJSON.wind.speed * 3.6
      _weatherState.temp.current        = bodyJSON.main.temp
      _weatherState.sun.rise            = new Date(bodyJSON.sys.sunrise * 1000)
      _weatherState.sun.set             = new Date(bodyJSON.sys.sunset * 1000)
    }
    done()
  })
}

class WeatherStore extends FluxStore {
  constructor() {
    super()
    initialState()
  }

  getState() {
    return _weatherState
  }
}

let weatherStoreInstance = new WeatherStore()

weatherStoreInstance.dispatchToken = AppDispatcher.register(action => {
  var cb = function () {
    weatherStoreInstance.emitChange()
  }

  switch (action.type) {
    case WeatherConstants.GET_WEATHER:
      getWeather(cb)

    default:
      return
  }

  weatherStoreInstance.emitChange()
})

export default weatherStoreInstance