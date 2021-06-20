import * as React from 'react'
import { Redirect, Route } from 'react-router'
import routes from '../../pages/routes'
import { useRecoilValue } from 'recoil'
import { sessionState } from '../../state'

const PrivateRoute = ({ component, ...rest }: any) => {
  const result = useRecoilValue(sessionState)
  if (result.isAuthenticating) return null
  const routeComponent = (props: any) =>
    result.user ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: routes.signin }} />
    )
  return <Route {...rest} render={routeComponent} />
}

export default PrivateRoute
