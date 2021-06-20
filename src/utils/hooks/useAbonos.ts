import * as React from 'react'
import firestore from '../../firebase/firestore'

export const useAbonos = (
  uuid: string | undefined,
  factura_id: string | undefined
) => {
  const [abonos, setAbonos] = React.useState<any[]>([])

  React.useEffect(() => {
    let abonos$ = () => {}
    if (!uuid || !factura_id) return
    abonos$ = firestore
      .collection(`medicos/${uuid}/facturas/${factura_id}/abonos`)
      .onSnapshot((snap: any) => {
        let _abonos: any[] = []
        snap.forEach((doc: any) => _abonos.push({ id: doc.id, ...doc.data() }))
        setAbonos(_abonos)
      })

    return abonos$
  }, [uuid, factura_id])

  return { abonos }
}
