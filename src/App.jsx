import React from 'react'
import MyComponent from './MyComponent'
import PageEmployees from './PageEmployees'
import PageAddEmployee from './PageAddEmployee'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

const App = () => (
  <Router >
    <Switch>
      <Route exact path="/">
        <PageEmployees/>
      </Route>
      <Route path="/new">
        <PageAddEmployee/>
      </Route>
    </Switch>
  </Router>
)

export default App