import { useEffect, useState } from 'react'
import firestore from '../../firebase/firestore'

const useFirestoreDocument = (collectionPath: string, documentId: string) => {
  const [result, setResult] = useState<any>({
    loading: true
  })

  useEffect(
    () =>
      firestore
        .collection(collectionPath)
        .doc(documentId)
        .onSnapshot(
          result => {
            setResult({
              loading: false,
              data: {
                ...(result.data() as any),
                id: result.id
              },
              error: undefined
            })
          },
          error => {
            setResult({
              loading: false,
              error
            })
          }
        ),
    [collectionPath, documentId]
  )

  return result
}

export default useFirestoreDocument
