import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Home from './Home'
import routes from './routes'
import firebase from '../firebase'

const App = () => {
  // Subscribe to firebase auth
  useEffect(() => firebase.auth().onAuthStateChanged(resultUser => {}), [])

  return (
    <Switch>
      <Route exact={true} path={routes.home} children={<Home />} />
      {/* <Route exact={true} path={routes.signin} children={<Signin />} />
      <PrivateRoute
        exact={true}
        path={routes.dashboard}
        component={Dashboard}
      />
      <PrivateRoute path={routes.details} component={Details} /> */}
      <Redirect to={routes.home} />
    </Switch>
  )
}

export default App
