'use strict'

import React from 'react'

import NewsStore        from '../../stores/news'
import NewsActions      from '../../actions/news'

class NewsItem extends React.Component {
  static propTypes    = {
    url   : React.PropTypes.string.isRequired,
    title : React.PropTypes.string.isRequired
  }
  static defaultProps = {
    url   : '',
    title : ''
  }
  state               = this.props

  render() {
    return (
      <div>
        <a href={this.props.url}>{this.props.title}</a>
      </div>
    )
  }
}

class NewsList extends React.Component {
  static propTypes    = {
    news    : React.PropTypes.array.isRequired,
  }
  static defaultProps = {
    news    : []
  }
  state               = this.props

  render() {
    let newsList = this.props.news.map(function (newsItem) {
      return <li key={newsItem.id}><NewsItem url={newsItem.webUrl} title={newsItem.webTitle} /></li>
    })
    if (newsList.length === 0)
      return <p>Empty</p>
    return (
      <ul>
        {newsList}
      </ul>
    )
  }
}

class WidgetNews extends React.Component {
  static propTypes    = {
    news    : React.PropTypes.array,
    subject : React.PropTypes.string
  }
  static defaultProps = NewsStore.getState()
  state               = this.props

  componentDidMount() {
    NewsStore.addChangeListener(this._onChange)
    this.ticker = setInterval(this._tick, 1000 * 60 * 5) // every 5 minutes
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
    NewsStore.removeChangeListener(this._onChange)
  }

  _tick = () => {
    NewsActions.updateSubject(this.state.subject)
  }

  _onChange = () => {
    this.setState(NewsStore.getState())
  }

  _onChangeSubject = (e) => {
    this.setState({ subject : e.target.value})
  }

  render() {
    return (
      <div>
        <div>
          <h2><input type="text" onBlur={this._tick} onChange={this._onChangeSubject} value={this.state.subject} /></h2>
        </div>
        <div>
          <NewsList news={this.state.news} />
        </div>
      </div>
    )
  }
}

export default WidgetNews