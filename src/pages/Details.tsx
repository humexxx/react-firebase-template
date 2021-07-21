import { LinearProgress, Typography } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import functions from '../firebase/functions'
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
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import FilterListIcon from '@material-ui/icons/FilterList'

interface IAbonoFactura {
  AbonoMedicoID: number
  Recibo: string
  Fecha: Date
  Ajustes: string | null
  'Abono en colones': string
}

interface IDetallesCaso {
  Diagnostico: string
  Procedimiento: string
  'Notas Médicas': string
}

interface HeadCell {
  id: keyof IAbonoFactura
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'Recibo',
    numeric: false,
    label: 'Recibo'
  },
  { id: 'Fecha', numeric: false, label: 'Fecha' },
  { id: 'Ajustes', numeric: true, label: 'Ajuste' },
  { id: 'Abono en colones', numeric: true, label: 'Monto' }
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

const Details: React.FC<any> = ({ match }) => {
  const factura_id = match.params.factura_id
  const [detalles, setDetalles] = useState<IDetallesCaso | undefined>(undefined)
  const [abonos, setAbonos] = useState<IAbonoFactura[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async (factura_id: string) => {
      const getDetalles = functions.httpsCallable('queries-casoDetails')
      const getAbonos = functions.httpsCallable('queries-abonosFactura')

      const {
        data: { response: detalles }
      } = await getDetalles({ factura_id: factura_id })
      const {
        data: { response: abonos }
      } = await getAbonos({ factura_id: factura_id })

      setDetalles(detalles[0] as IDetallesCaso)
      setAbonos(abonos)
      setLoading(false)
    }
    fetchData(factura_id)
  }, [factura_id])

  return (
    <>
      <Typography paragraph variant='h5'>
        Registro de Abonos
      </Typography>
      <Box mt={3} mb={5}>
        {detalles?.Diagnostico && (
          <Typography paragraph>
            <b>Caso:</b> {detalles.Diagnostico}
          </Typography>
        )}
        {detalles?.Procedimiento && (
          <Typography paragraph>
            <b>Procedimiento:</b> {detalles.Procedimiento}
          </Typography>
        )}
      </Box>
      <EnhancedTable rows={abonos} isLoading={loading} />
      <Box mt={3} mb={5}>
        {detalles?.['Notas Médicas'] && (
          <Typography paragraph>
            <b>Notas médicas:</b> {detalles['Notas Médicas']}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Details

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IAbonoFactura
  ) => void
  order: Order
  orderBy: string
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof IAbonoFactura) => (event: React.MouseEvent<unknown>) => {
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
        Abonos
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
  rows: IAbonoFactura[]
  isLoading: boolean
}

export const EnhancedTable: React.FC<Props> = ({ rows, isLoading }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IAbonoFactura>('Fecha')

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IAbonoFactura
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
                    <TableRow hover key={row.Recibo}>
                      <TableCell>{row.Recibo}</TableCell>
                      <TableCell>
                        {new Date(row.Fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell align='right'>
                        {formatter.format(
                          parseFloat((row.Ajustes ? row.Ajustes : 0).toString())
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        {formatter.format(
                          parseFloat(row['Abono en colones'].toString())
                        )}
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
              <TableRow>
                <TableCell />
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>
                  {formatter.format(
                    rows.reduce(
                      (acc: number, row) =>
                        parseFloat((row.Ajustes ? row.Ajustes : 0).toString()) +
                        acc,
                      0
                    )
                  )}
                </TableCell>
                <TableCell align='right'>
                  {formatter.format(
                    rows.reduce(
                      (acc: number, row) =>
                        parseFloat(row['Abono en colones'].toString()) + acc,
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
