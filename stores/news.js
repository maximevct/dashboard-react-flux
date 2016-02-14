'use strict'

import Request          from 'request'
import FluxStore        from './FluxStore'
import AppDispatcher    from '../dispatcher/AppDispatcher'
import {NewsConstants}  from '../constants/constants'

import NewsActions      from '../actions/news'

let _newsState;
let _newsAPI = {
  url   : 'http://content.guardianapis.com/search',
  token : 'test'
}

function initialState() {
  _newsState = {
    news    : [],
    subject : ''
  }
}

function updateSubject(newSubject, done) {
  _newsState.subject = newSubject
  Request({
    url : _newsAPI.url,
    qs  : {
      q         : _newsState.subject,
      'api-key' : _newsAPI.token
    }
  }, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      let bodyJSON = JSON.parse(body)
      _newsState.news = bodyJSON.response.results
    }
    done()
  })
}

class NewsStore extends FluxStore {
  constructor() {
    super()
    initialState()
  }

  getState() {
    return _newsState
  }
}

let newsStoreInstance = new NewsStore()

newsStoreInstance.dispatchToken = AppDispatcher.register(action => {
  var cb = function () {
    newsStoreInstance.emitChange()
  }

  switch (action.type) {
    case NewsConstants.UPDATE_SUBJECT:
      updateSubject(action.data.subject, cb)
      break

    default:
      return
  }
})

export default newsStoreInstance