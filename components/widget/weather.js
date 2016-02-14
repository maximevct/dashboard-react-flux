'use strict'

import React          from 'react'

import WeatherStore   from '../../stores/weather'
import WeatherActions from '../../actions/weather'

class WidgetWeather extends React.Component {
  static propTypes    = {}
  static defaultProps = {}
  state               = WeatherStore.getState()

  componentDidMount() {
    WeatherStore.addChangeListener(this._onChange)
    this.tick()
    this.ticker = setInterval(this.tick, 1000 * 60 * 10) // every 10 minutes
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    WeatherStore.removeChangeListener(this._onChange)
  }

  tick = () => {
    WeatherActions.get()
  }

  _onChange = () => {
    this.setState(WeatherStore.getState())
  }

  render() {
    return (
      <div>
        <p>Description : {this.state.weather.description} <img src={this.state.weather.icon} /></p>
        <p>Wind : {this.state.wind.speed} km/h</p>
        <p>Temp : {this.state.temp.current} °c</p>
        <p>sunrise : {this.state.sun.rise.toLocaleTimeString()}</p>
        <p>sunset : {this.state.sun.set.toLocaleTimeString()}</p>
      </div>
    )
  }
}

export default WidgetWeather