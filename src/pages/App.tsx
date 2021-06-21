import { useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Signin from './Signin'
import Home from './Home'
import routes from './routes'
import { useSetRecoilState } from 'recoil'
import { sessionState } from '../state'
import firebase from '../firebase'
import PrivateRoute from '../components/PrivateRoute'
import Dashboard from './Dashboard'
import Details from './Details'

const App = () => {
  const setSession = useSetRecoilState(sessionState)

  // Subscribe to firebase auth
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(resultUser => {
        setSession({
          isAuthenticating: false,
          user: resultUser && {
            uid: resultUser.uid,
            email: resultUser.email,
            displayName: resultUser.displayName
          }
        })
      }),
    [setSession]
  )

  return (
    <Switch>
      <Route exact={true} path={routes.signin} children={<Signin />} />
      <Route exact={true} path={routes.home} children={<Home />} />
      <PrivateRoute
        exact={true}
        path={routes.dashboard}
        component={Dashboard}
      />
      <PrivateRoute path={routes.details} component={Details} />
      <Redirect to={routes.home} />
    </Switch>
  )
}

export default App
