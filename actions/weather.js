'use strict'

import AppDispatcher      from '../dispatcher/AppDispatcher'
import {WeatherConstants} from '../constants/constants'

class WeatherActions {
  get() {
    AppDispatcher.dispatch({
      actionType: WeatherConstants.GET_WEATHER,
      data: {}
    })
  }

}

export default new WeatherActions()