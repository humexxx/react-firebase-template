import { Route, Switch, Redirect } from 'react-router'
import Home from './Home'
import routes from './routes'
import { SnackbarProvider } from 'notistack'
import { AuthProvider, useAuth } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import Dashboard from './Dashboard'
import Details from './Details'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import {
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Tooltip
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import clsx from 'clsx'
import { Profile } from './Profile'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    }
  })
)

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Switch>
          <Route exact={true} path={routes.signin} component={Home} />
          <PrivateRoute path={routes.dashboard} component={AdminRoutes} />
          <Redirect to={routes.dashboard} />
        </Switch>
      </AuthProvider>
    </SnackbarProvider>
  )
}

const AdminRoutes = (props: any) => {
  console.log(props)
  const classes = useStyles()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <>
      <AppBar
        open={open}
        toggleOpen={() => setOpen(!open)}
        title='Segrupex'
        backTo={
          props.location.pathname !== routes.dashboard ? routes.dashboard : ''
        }
        actions={
          <Tooltip title='Salir'>
            <IconButton color='inherit' onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <Sidebar open={open} toggleOpen={() => setOpen(!open)} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div>
          <Wrapper>
            <Switch>
              <Route
                exact={true}
                path={routes.dashboard}
                component={Dashboard}
              />
              <Route path={routes.details} component={Details} />
              <Route path={routes.profile} exact={true} component={Profile} />
              <Redirect to={routes.dashboard} />
            </Switch>
          </Wrapper>
        </div>
      </main>
    </>
  )
}

export default App
