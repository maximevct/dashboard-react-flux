'use strict'

import React from 'react'

class Widget extends React.Component {
  static propTypes    = {
    title : React.PropTypes.string,
    content : React.PropTypes.element.isRequired
  }
  static defaultProps = { title : 'Widget' }
  state               = {}

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>
          {this.props.content}
        </div>
      </div>
    )
  }
}

export default Widget