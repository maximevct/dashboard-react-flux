'use strict'

import React          from 'react'

import Widget         from '../widget/index';

import WidgetDate     from '../widget/date'
import WidgetNews     from '../widget/news'
import WidgetWeather  from '../widget/weather'

class Widgets extends React.Component {
  static propTypes    = {}
  static defaultProps = {}
  state               = {}

  render() {
    return (
      <ul>
        <li>
          <Widget
            title="Time"
            content={<WidgetDate />}
          />
        </li>
        <li>
          <Widget
            title="News"
            content={<WidgetNews />}
          />
        </li>
        <li>
          <Widget
            title="Weather"
            content={<WidgetWeather />}
          />
        </li>
      </ul>
    )
  }
}

export default Widgets