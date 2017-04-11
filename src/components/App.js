import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import About from './About'
import Main from './Main'

const App = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/about" component={About} />
    </div>
  </HashRouter>
)

export default App
