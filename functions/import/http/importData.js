const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.importData = functions.https.onCall(async (data, context) => {
  const users_with_errors = []
  for (let _medico of data) {
    try {
      const { facturas, MedicoID, ...rest } = _medico

      const _user = await admin
        .auth()
        .getUserByEmail(`${MedicoID}_medico@medicos.com`)

      await admin
        .firestore()
        .doc(`medicos/${_user.uid}`)
        .set({
          uid: _user.uid,
          MedicoID,
          ...rest,
        })

      for (let _factura of facturas) {
        const { abonos, ...factura_rest } = _factura

        const factura = await admin
          .firestore()
          .collection(`medicos/${_user.uid}/facturas`)
          .add({
            ...factura_rest,
          })

        for (let _abono of abonos) {
          await admin
            .firestore()
            .collection(`medicos/${_user.uid}/facturas/${factura.id}/abonos`)
            .add({
              ..._abono,
            })
        }
      }
    } catch (err) {
      users_with_errors.push({ error: err, object: _medico })
    }
  }

  return { result: users_with_errors }
})
