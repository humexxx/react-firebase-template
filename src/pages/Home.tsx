import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import formErrorMessages from '../utils/formErrorMessages'

import medicos from '../_data/medicos.json'
import casos from '../_data/casos.json'
import facturas from '../_data/facturas.json'
import abonos from '../_data/abonos.json'

import functions from '../firebase/functions'

const IMPORT_DATA = true

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string }>()

  const _medicos = medicos.filter(m => m.medico)
  _medicos.forEach((m: any) => {
    m.user = m.medico.replaceAll(' ', '.').toLowerCase()
    m.facturas = facturas.filter(f => f.medico_id === m.id)
    m.facturas.forEach((f: any) => {
      f.abonos = abonos.filter(a => a.factura_id === f.id)
      f.caso = casos.find((c: any) => c.id === f.caso_id)
    })
  })

  useEffect(() => {
    if (IMPORT_DATA) {
      const importData = functions.httpsCallable('import-import_data')
      importData(_medicos)
    }
  }, [])

  return (
    <>
      <AppBar
        title='fullstrapp'
        actions={
          <Button
            color='primary'
            size='small'
            component={Link}
            to={routes.signin}
            variant='contained'
          >
            Sign In
          </Button>
        }
      />
      <Wrapper>
        <Typography paragraph variant='h5'>
          Welcome to your new app Hume!
        </Typography>

        <Typography paragraph variant='h5'>
          Don't forget to configure your firebase settings in{' '}
          <code>/src/firebase/firebase.ts</code>
        </Typography>

        <Box mt={6}>
          <Typography paragraph>
            This is an example form using react-hook-form
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit(vals => {
            console.log(vals)
            reset()
          })}
        >
          <TextField
            label='Enter your name'
            variant='outlined'
            fullWidth
            {...register('name', {
              required: formErrorMessages.required
            })}
            error={!!errors.name}
            helperText={errors.name?.message || ' '}
          />
          <Button type='submit' color='primary'>
            Submit
          </Button>
        </form>
      </Wrapper>
    </>
  )
}

export default Home
