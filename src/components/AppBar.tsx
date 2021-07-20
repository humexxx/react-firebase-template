import { ReactNode } from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import {
  AppBar as MaterialAppBar,
  Box,
  Toolbar,
  Typography,
  useScrollTrigger,
  IconButton,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    }
  })
)

type Props = {
  title?: string
  actions?: ReactNode
  open: boolean
  toggleOpen: () => void
}

const AppBar: React.FC<Props> = ({ title, actions, open, toggleOpen }) => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 40
  })

  return (
    <MaterialAppBar
      elevation={trigger ? 4 : 0}
      position='static'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          edge='start'
          className={clsx(classes.menuButton, open && classes.hide)}
          onClick={toggleOpen}
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>
        <Box ml={3} flex='auto'>
          <Typography variant='h6'>{title}</Typography>
        </Box>
        {actions}
      </Toolbar>
    </MaterialAppBar>
  )
}

export default AppBar
