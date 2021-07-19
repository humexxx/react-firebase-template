import { Box, Typography } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import routes from './routes'
import Wrapper from '../components/Wrapper'
import AppBar from '../components/AppBar'

const columns: GridColDef[] = [
  { field: 'COnsecutivo', headerName: 'Consecutivo', width: 250 },
  {
    field: 'Fecha',
    headerName: 'Fecha',
    width: 250
  },
  {
    field: 'Abono en colones',
    headerName: 'Abono',
    width: 250,
    type: 'number'
  },

  {
    field: 'Ajuste',
    headerName: 'Ajuste',
    width: 250,
    type: 'number'
  }
]

const Details: React.FC<any> = ({ match }) => {
  return null
  // const factura_id = match.params.factura_id

  // const value = useRecoilValue(sessionState)
  // const { abonos } = useAbonos(value.user?.uid, factura_id)
  // const { data, loading } = useFirestoreDocument(
  //   `medicos/${value.user?.uid}/facturas`,
  //   factura_id
  // )
  // console.log(data)

  // if (loading) return null

  // return (
  //   <>
  //     <AppBar title="Abonos" backTo={routes.dashboard} />
  //     <Wrapper>
  //       <Typography paragraph variant="h5">
  //         Detalles de factura
  //       </Typography>

  //       <Box mt={3} mb={5}>
  //         {data.caso.Diagnostico && (
  //           <Typography paragraph>
  //             <b>Caso:</b> {data.caso.Diagnostico}
  //           </Typography>
  //         )}
  //         {data.caso.Procedimiento && (
  //           <Typography paragraph>
  //             <b>Procedimiento:</b> {data.caso.Procedimiento}
  //           </Typography>
  //         )}
  //         {data.caso["Notas M�dicas"] && (
  //           <Typography paragraph>
  //             <b>Notas médicas:</b> {data.caso["Notas M�dicas"]}
  //           </Typography>
  //         )}
  //       </Box>

  //       <DataGrid
  //         autoHeight={true}
  //         rows={abonos}
  //         columns={columns}
  //         pageSize={5}
  //         disableSelectionOnClick={true}
  //       />
  //     </Wrapper>
  //   </>
  // )
}

export default Details
