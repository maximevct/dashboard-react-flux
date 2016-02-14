'use strict'

import React      from 'react'
import { render } from 'react-dom'

import Widgets    from './components/widgets/index'

render(
  <div>
    <h1>Hello world</h1>
    <Widgets />
  </div>,
  document.getElementById('content')
)