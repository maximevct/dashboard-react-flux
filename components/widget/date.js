'use strict'

import React from 'react'

class WidgetDate extends React.Component {
  static propTypes    = {
    date : React.PropTypes.object
  }
  static defaultProps = {
    date : new Date()
  }
  state               = {
    date : this.props.date
  }

  componentDidMount() {
    this.ticker = setInterval(this.tick, 500)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  tick = () => {
    this.setState({date : new Date()})
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.state.date.toLocaleDateString()}</p>
        </div>
        <div>
          <p>{this.state.date.toLocaleTimeString()}</p>
        </div>
      </div>
    )
  }
}

export default WidgetDate