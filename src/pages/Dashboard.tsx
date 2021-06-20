import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { useRecoilValue } from 'recoil'
import { sessionState } from '../state'
import useFirestoreDocument from '../utils/hooks/useFirestoreDocument'
import { useFacturas } from '../utils/hooks/useFacturas'
import { Box } from '@material-ui/core'

const columns: GridColDef[] = [
  { field: 'consecutivo', headerName: 'Consecutivo', width: 175 },
  {
    field: 'monto_dolares',
    headerName: 'Monto Dolares',
    width: 175,
    type: 'number'
  },
  {
    field: 'tc',
    headerName: 'TC',
    type: 'number',
    width: 175
  },
  {
    field: 'cancelado',
    headerName: 'Cancelado',
    width: 175
  },
  {
    field: 'monto_total',
    headerName: 'Monto Total',
    width: 175,
    type: 'number'
  }
]

const Dashboard: React.FC<any> = ({ history }) => {
  const value = useRecoilValue(sessionState)

  const { loading, data: medico } = useFirestoreDocument(
    'medicos',
    value.user?.uid as string
  )
  const { facturas } = useFacturas(value.user?.uid)

  if (loading) return null
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
            <b>Nombre:</b> {value.user?.displayName}
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
          onRowClick={row => {
            history.push(`abonos/${row.id}`)
          }}
        />
      </Wrapper>
    </>
  )
}

export default Dashboard
