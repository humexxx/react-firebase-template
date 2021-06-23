import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import useFirestoreDocument from '../utils/hooks/useFirestoreDocument'
import { useFacturas } from '../utils/hooks/useFacturas'
import { Box } from '@material-ui/core'

const columns: GridColDef[] = [
  { field: 'Consecutivo', headerName: 'Consecutivo', width: 175 },
  {
    field: 'paciente_name',
    headerName: 'Paciente',
    width: 235
  },
  {
    field: 'seguro_name',
    headerName: 'Seguro',
    width: 235
  },
  {
    field: 'fecha_ingreso',
    headerName: 'Fecha Ingreso',
    width: 175
  },
  {
    field: 'isCancelado',
    headerName: 'Cancelado',
    width: 150
  },
  {
    field: 'Monto Total',
    headerName: 'Monto Total',
    width: 175,
    type: 'number'
  }
]

const Dashboard: React.FC<any> = ({ history, user }) => {
  const { facturas } = useFacturas(user.uid)
  const { loading, data: medico } = useFirestoreDocument(
    'medicos',
    user.uid as string
  )

  if (loading) return null

  facturas.forEach(f => {
    f.paciente_name = f.pacienteEntity?.ContactFirstName
    f.fecha_ingreso = f.caso && f.caso['Fecha de Ingreso']
    f.seguro_name =
      f.aseguradoraEntity && f.aseguradoraEntity['Nombre del Seguro']
    f.isCancelado = f.Cancelado ? 'Cancelado' : 'Sin cancelar'
  })
  console.log(facturas)

  return (
    <>
      <AppBar
        title='Tablero'
        actions={
          <Button
            color='primary'
            size='small'
            component={Link}
            to={routes.signin}
            variant='contained'
          >
            Salir
          </Button>
        }
      />
      <Wrapper>
        <Typography paragraph variant='h5'>
          Registro de facturas
        </Typography>

        <Box mt={3} mb={5}>
          <Typography paragraph>
            <b>Nombre:</b> {user.displayName}
          </Typography>
          {medico.institucion && (
            <Typography paragraph>
              <b>Institucion:</b> {medico.institucion}
            </Typography>
          )}
          {medico.especialidad && (
            <Typography paragraph>
              <b>Especialidad:</b> {medico.especialidad}
            </Typography>
          )}
        </Box>

        <DataGrid
          autoHeight={true}
          rows={facturas}
          columns={columns}
          pageSize={5}
          onRowClick={e => {
            history.push(`details/${e.id}`)
          }}
        />
      </Wrapper>
    </>
  )
}

export default Dashboard
