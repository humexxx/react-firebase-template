import {
  IconButton,
  makeStyles,
  createStyles,
  Theme,
  Drawer,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import routes from '../pages/routes'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
    }
  })
)

const navigators = [
  {
    name: 'Perfil',
    icon: <PersonIcon />,
    route: routes.profile
  },
  {
    name: 'Tablero',
    icon: <DashboardIcon />,
    route: routes.dashboard
  }
]

type Props = {
  open: boolean
  toggleOpen: () => void
}

const Sidebar: React.FC<Props> = ({ open, toggleOpen }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleOpen}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {navigators.map(navigator => (
          <ListItem
            button
            key={navigator.name}
            component={Link}
            to={navigator.route}
          >
            <ListItemIcon>{navigator.icon}</ListItemIcon>
            <ListItemText primary={navigator.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
