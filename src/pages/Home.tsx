import { Box, Typography, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import formErrorMessages from '../utils/formErrorMessages'

// import medicos from "../_data/medicos.json"
// import casos from "../_data/casos.json"
// import facturas from "../_data/facturas.json"
// import abonos from "../_data/abonos.json"
// import functions from "../firebase/functions"
// const IMPORT_DATA = false

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<{ name: string }>()

  // useEffect(() => {
  //   if (IMPORT_DATA) {
  //     const _medicos = medicos.filter((m) => m.medico)
  //     _medicos.forEach((m: any) => {
  //       if (m.medico.includes("("))
  //         m.medico = m.medico.split("(")[1].split(")")[0]
  //       m.user = m.medico
  //         .replaceAll(" ", "")
  //         .replaceAll(">", "")
  //         .replaceAll("<", "")
  //         .replaceAll("=", "")
  //         .replaceAll(".", "")
  //         .replaceAll(",", "")
  //         .replaceAll("\n", "")
  //         .replaceAll(":", "")
  //         .toLowerCase()
  //       m.facturas = facturas.filter((f) => f.medico_id === m.id)
  //       m.facturas.forEach((f: any) => {
  //         f.abonos = abonos.filter((a) => a.factura_id === f.id)
  //         f.caso = casos.find((c: any) => c.id === f.caso_id)
  //       })
  //     })

  //     console.log(_medicos.length)

  //     const importMedico = functions.httpsCallable("import-importMedico")
  //     ;(async () => {
  //       for (let i = 0; i < 25; i += 25) {
  //         const { data } = await importMedico(_medicos.slice(i, i + 10))
  //         if ((data as any).result.length) console.log(data)
  //       }
  //     })()
  //   }
  // }, [])

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
        {/* <form
          onSubmit={handleSubmit((vals) => {
            console.log(vals)
            reset()
          })}
        >
          <TextField
            label="Enter your name"
            variant="outlined"
            fullWidth
            {...register("name", {
              required: formErrorMessages.required,
            })}
            error={!!errors.name}
            helperText={errors.name?.message || " "}
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form> */}
      </Wrapper>
    </>
  )
}

export default Home
