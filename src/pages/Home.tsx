import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { importData } from '../utils/importData'
import { useEffect } from 'react'
import landing from '../assets/images/landing.jpg'
const IMPORT_DATA = false

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { maxWidth: 720 },
    center: { display: 'flex', justifyContent: 'center' }
  })
)

const Home = () => {
  const classes = useStyles()

  useEffect(() => {
    if (IMPORT_DATA) importData()
  }, [])

  return (
    <>
      <AppBar
        title='Médicos'
        actions={
          <Button
            color='primary'
            size='small'
            component={Link}
            to={routes.signin}
            variant='contained'
          >
            Ingresar
          </Button>
        }
      />
      <Wrapper>
        <div className={classes.center}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Médicos'
                height='380'
                image={landing}
                title='Sistema de gestión de facturas de médicos'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Sistema de gestión de facturas de médicos
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  lacus turpis, porttitor finibus justo sollicitudin, faucibus
                  venenatis ligula. Fusce posuere euismod varius. Mauris porta,
                  ligula sed feugiat tristique, metus risus interdum mi,
                  interdum luctus purus magna vitae tellus. Maecenas nec tempor
                  ex. Cras fringilla commodo libero, id ultrices nulla venenatis
                  id. Aenean id metus nec enim porta rhoncus at nec nunc.
                  Aliquam lacus lectus, hendrerit eget fringilla sit amet,
                  vehicula at nunc. Donec suscipit dolor dolor, quis euismod
                  tellus vulputate sed.
                </Typography>
                <br />
                <Typography variant='body2' color='textSecondary' component='p'>
                  Vestibulum vel hendrerit mi, vel blandit dui. Nullam facilisis
                  tincidunt iaculis. Maecenas quis enim nec urna facilisis
                  pellentesque sed eget nibh. Fusce sit amet erat bibendum,
                  tincidunt lorem vitae, convallis dolor. Suspendisse gravida
                  augue eget purus semper dictum. Phasellus consectetur vehicula
                  gravida. Nam hendrerit egestas metus. Vestibulum maximus sem
                  eu erat placerat rutrum. Pellentesque vehicula vitae dolor a
                  mattis. Quisque libero dui, euismod ac eleifend id, imperdiet
                  sit amet ligula. Sed tristique, nibh at fermentum euismod, ex
                  dui vehicula mi, sit amet sodales ante lectus vitae eros.
                  Integer sed justo et justo facilisis finibus. Vivamus faucibus
                  ex id quam pretium rhoncus quis sit amet ante. In vitae
                  lacinia justo.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Wrapper>
    </>
  )
}

export default Home
