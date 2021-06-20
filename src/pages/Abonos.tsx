import { Typography } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'
import { useRecoilValue } from 'recoil'
import { sessionState } from '../state'
import useFirestoreDocument from '../utils/hooks/useFirestoreDocument'
import { useAbonos } from '../utils/hooks/useAbonos'
import { Box } from '@material-ui/core'

const columns: GridColDef[] = [
  { field: 'consecutivo', headerName: 'Consecutivo', width: 175 },
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 175
  },
  {
    field: 'abono_colones',
    headerName: 'Abono Colones',
    width: 175,
    type: 'number'
  },
  {
    field: 'abono_dolares',
    headerName: 'Abono Dolares',
    width: 175,
    type: 'number'
  },
  {
    field: 'ajuste',
    headerName: 'Ajuste',
    width: 175,
    type: 'number'
  }
]

const Abonos: React.FC<any> = ({ match }) => {
  const factura_id = match.params.id
  const value = useRecoilValue(sessionState)
  const { abonos } = useAbonos(value.user?.uid, factura_id)
  const { loading } = useFirestoreDocument('medicos', value.user?.uid as string)

  if (loading) return null

  return (
    <>
      <AppBar title='Abonos' backTo={routes.dashboard} />
      <Wrapper>
        <Typography paragraph variant='h5'>
          Abonos de factura
        </Typography>

        <Box mb={5}></Box>

        <DataGrid
          autoHeight={true}
          rows={abonos}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick={true}
        />
      </Wrapper>
    </>
  )
}

export default Abonos
