import React from 'react'
import { Redirect, Route, IndexRoute, Router, browserHistory } from 'react-router'
import DashboardShowContainer from '../containers/DashboardShowContainer'
import GameMainContainer from '../containers/GameMainContainer'



const App = (props) => {
  return (

    <div>
        <Router history={browserHistory}>
          <Redirect from='/' to='/dashboards'/>
          <Route path='/'>
            <Route path='/dashboards' component={DashboardShowContainer}/>
            <Route path='/game' component={GameMainContainer}/>
          </Route>
        </Router>
    </div>

  )

}

export default App
