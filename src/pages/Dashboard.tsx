import { Typography } from '@material-ui/core'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import { Box } from '@material-ui/core'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import functions from '../firebase/functions'
import firestore from '../firebase/firestore'

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

const Dashboard: React.FC<any> = ({ history }) => {
  const { currentUser } = useAuth()
  const [medico, setMedico] = useState<any>({})
  const [facturas, setFacturas] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async (uuid: string) => {
      const snap = await firestore.doc(`medicos/${uuid}`).get()
      const medico = snap.data() as { MedicoID: string }
      const getFacturas = functions.httpsCallable('facturas-getByMedicoID')
      const {
        data: { response: facturas }
      } = await getFacturas({ MedicoID: medico?.MedicoID })

      setFacturas(facturas)
      setMedico(medico)
    }
    if (currentUser.uid) fetchData(currentUser.uid)
  }, [currentUser.uid])

  const _facturas = facturas.map((factura: any, idx: number) => {
    factura.id = idx
    factura.paciente_name = factura.pacienteEntity?.ContactFirstName
    factura.fecha_ingreso = factura.caso && factura.caso['Fecha de Ingreso']
    factura.seguro_name =
      factura.aseguradoraEntity &&
      factura.aseguradoraEntity['Nombre del Seguro']
    factura.isCancelado = factura.Cancelado ? 'Cancelado' : 'Sin cancelar'
    return factura
  })

  return (
    <>
      <Typography paragraph variant='h5'>
        Registro de facturas
      </Typography>
      <Box mt={3} mb={5}>
        <Typography paragraph>
          <b>Nombre:</b> {currentUser.displayName}
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
        rows={_facturas}
        columns={columns}
        pageSize={5}
        onRowClick={e => {
          history.push(`details/${e.id}`)
        }}
      />
    </>
  )
}

export default Dashboard
