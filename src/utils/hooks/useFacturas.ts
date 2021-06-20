import * as React from 'react'
import firestore from '../../firebase/firestore'

export const useFacturas = (uuid: string | undefined) => {
  const [facturas, setFacturas] = React.useState<any[]>([])

  React.useEffect(() => {
    let facturas$ = () => {}
    if (!uuid) return
    facturas$ = firestore
      .collection(`medicos/${uuid}/facturas`)
      .onSnapshot((snap: any) => {
        let _facturas: any[] = []
        snap.forEach((doc: any) =>
          _facturas.push({ id: doc.id, ...doc.data() })
        )
        setFacturas(_facturas)
      })

    return facturas$
  }, [uuid])

  return { facturas }
}
