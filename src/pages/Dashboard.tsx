import { LinearProgress, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import functions from '../firebase/functions'
import firestore from '../firebase/firestore'
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'

interface IFactura {
  MedicosID: number
  Factura: string
  Nombre_del_Asegurado: string
  'Nombre del Seguro': string
  'Fecha de Ingreso': string
  Cancelado: boolean
  'Monto Total': string
}

interface HeadCell {
  id: keyof IFactura
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'Factura',
    numeric: false,
    label: 'ID'
  },
  { id: 'Nombre_del_Asegurado', numeric: false, label: 'Paciente' },
  { id: 'Nombre del Seguro', numeric: false, label: 'Seguro' },
  { id: 'Fecha de Ingreso', numeric: false, label: 'Ingreso' },
  { id: 'Cancelado', numeric: false, label: 'Cancelado' },
  { id: 'Monto Total', numeric: true, label: 'Monto' }
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const Dashboard: React.FC<any> = ({ history }) => {
  const { currentUser } = useAuth()
  const [medico, setMedico] = useState<any>({})
  const [facturas, setFacturas] = useState<IFactura[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (uuid: string) => {
      const snap = await firestore.doc(`medicos/${uuid}`).get()
      const medico = snap.data() as { MedicoID: string }
      const getFacturas = functions.httpsCallable('queries-facturas')
      const {
        data: { response: facturas }
      } = await getFacturas({ MedicoID: medico?.MedicoID })

      setFacturas(facturas)
      setMedico(medico)
      setLoading(false)
    }
    if (currentUser.uid) fetchData(currentUser.uid)
  }, [currentUser.uid])

  const handleOnRowClick = (id: number) => history.push(`/details/${id}`)

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
      <EnhancedTable
        rows={facturas}
        onRowClick={handleOnRowClick}
        isLoading={loading}
      />
    </>
  )
}

export default Dashboard

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IFactura
  ) => void
  order: Order
  orderBy: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof IFactura) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    title: {
      flex: '1 1 100%'
    }
  })
)

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles()

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Facturas
      </Typography>
      <Tooltip title='Filter list'>
        <IconButton aria-label='filter list' disabled>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    }
  })
)

type Props = {
  rows: IFactura[]
  onRowClick: (id: number) => void
  isLoading: boolean
}

export const EnhancedTable: React.FC<Props> = ({
  rows,
  onRowClick,
  isLoading
}) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] =
    React.useState<keyof IFactura>('Fecha de Ingreso')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IFactura
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isLoading && <LinearProgress />}
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='facturas'
            aria-label='facturas table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows as any, getComparator(order, orderBy)).map(
                row => {
                  return (
                    <TableRow
                      hover
                      key={row.MedicosID}
                      style={{ cursor: 'pointer' }}
                      onClick={() => onRowClick(row.MedicosID as number)}
                    >
                      <TableCell>{row.Factura}</TableCell>
                      <TableCell>{row.Nombre_del_Asegurado}</TableCell>
                      <TableCell>{row['Nombre del Seguro']}</TableCell>
                      <TableCell>{row['Fecha de Ingreso']}</TableCell>
                      <TableCell>
                        {row.Cancelado ? (
                          <Chip
                            style={{
                              backgroundColor: '#42ba96',
                              color: 'white'
                            }}
                            label='Cancelado'
                          />
                        ) : (
                          <Chip
                            style={{
                              backgroundColor: '#df4759',
                              color: 'white'
                            }}
                            label='Sin Cancelar'
                          />
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        {formatter.format(
                          parseFloat(row['Monto Total'].toString())
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
              <TableRow>
                <TableCell colSpan={4} />
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>
                  {formatter.format(
                    rows.reduce(
                      (acc: number, row) =>
                        parseFloat(row['Monto Total'].toString()) + acc,
                      0
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
