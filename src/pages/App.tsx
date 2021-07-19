import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Home from './Home'
import routes from './routes'
import firebase from '../firebase'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import Dashboard from './Dashboard'
import Details from './Details'

const App = () => {
  // Subscribe to firebase auth
  useEffect(() => firebase.auth().onAuthStateChanged(resultUser => {}), [])

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Switch>
          <Route exact={true} path={routes.signin} component={Home} />
          <PrivateRoute
            exact={true}
            path={routes.dashboard}
            component={Dashboard}
          />
          <PrivateRoute path={routes.details} component={Details} />
          <Redirect to={routes.dashboard} />
        </Switch>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
