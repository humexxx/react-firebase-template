import * as React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Redirect, Route } from 'react-router'
import routes from '../../pages/routes'

const PrivateRoute = ({ component, ...rest }: any) => {
  const { currentUser } = useAuth()
  const routeComponent = (props: any) =>
    currentUser ? (
      React.createElement(component, { ...props })
    ) : (
      <Redirect to={{ pathname: routes.signin }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default PrivateRoute
