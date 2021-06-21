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
  { field: 'internal_id', headerName: 'Factura', width: 175 },
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

const Details: React.FC<any> = ({ match }) => {
  const factura_id = match.params.factura_id
  const caso_id = match.params.caso_id

  const value = useRecoilValue(sessionState)
  const { abonos } = useAbonos(value.user?.uid, factura_id)
  const { data, loading } = useFirestoreDocument('casos', caso_id)
  console.log(data)

  if (loading) return null

  return (
    <>
      <AppBar title='Abonos' backTo={routes.dashboard} />
      <Wrapper>
        <Typography paragraph variant='h5'>
          Detalles de factura
        </Typography>

        <Box mt={3} mb={5}>
          {data.caso && (
            <Typography paragraph>
              <b>Caso:</b> {data?.caso}
            </Typography>
          )}
          {data.procedimiento && (
            <Typography paragraph>
              <b>Procedimiento:</b> {data.procedimiento}
            </Typography>
          )}
          {data.notas_medicas && (
            <Typography paragraph>
              <b>Notas médicas:</b> {data.notas_medicas}
            </Typography>
          )}
        </Box>

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

export default Details
