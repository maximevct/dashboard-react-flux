'use strict'

import AppDispatcher from '../dispatcher/AppDispatcher'
import {NewsConstants} from '../constants/constants'

class NewsActions {
  updateSubject(newSubject) {
    AppDispatcher.dispatch({
      actionType: NewsConstants.UPDATE_SUBJECT,
      data: { subject : newSubject }
    })
  }
}

export default new NewsActions()