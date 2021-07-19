import * as React from 'react'
import { Redirect, Route } from 'react-router'
import routes from '../../pages/routes'

const PrivateRoute = ({ component, ...rest }: any) => {
  const result = { user: null }
  const routeComponent = (props: any) =>
    result.user ? (
      React.createElement(component, { ...props, user: result.user })
    ) : (
      <Redirect to={{ pathname: routes.home }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default PrivateRoute
