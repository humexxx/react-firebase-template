import { Box, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { importData } from '../utils/importData'
import { useEffect } from 'react'
const IMPORT_DATA = false

const Home = () => {
  useEffect(() => {
    if (IMPORT_DATA) importData()
  }, [])

  return (
    <>
      <AppBar
        title='Medicos'
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
        <Typography paragraph variant='h5'>
          Aplicación de médicos
        </Typography>

        <Box mt={6}>
          <Typography paragraph>
            Más información sobre la aplicación aquí
          </Typography>
        </Box>
      </Wrapper>
    </>
  )
}

export default Home
