const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.importMedico = functions.https.onCall(async (data, context) => {
  const users_with_errors = []
  for (let _medico of data) {
    try {
      const { facturas, user, medico: name, id: medico_id, ...rest } = _medico

      try {
        const _user = await admin
          .auth()
          .getUserByEmail(`${medico_id}_medico@medicos.com`)
        await admin.auth().deleteUser(_user.uid)
      } catch (e) {}

      const new_user = await admin.auth().createUser({
        email: `${medico_id}_medico@medicos.com`,
        password: "test1234",
        displayName: name,
      })

      await admin
        .firestore()
        .doc(`medicos/${new_user.uid}`)
        .set({
          internal_id: medico_id,
          uid: new_user.uid,
          nombre: name,
          ...rest,
        })

      for (let _factura of facturas) {
        const {
          id: factura_id,
          abonos,
          caso: _caso,
          ...factura_rest
        } = _factura
        const { id: caso_id, ...caso_rest } = _caso

        await admin
          .firestore()
          .doc(`casos/${caso_id}`)
          .set({
            internal_id: caso_id,
            ...caso_rest,
          })

        const factura = await admin
          .firestore()
          .collection(`medicos/${new_user.uid}/facturas`)
          .add({
            internal_id: factura_id,
            ...factura_rest,
          })

        for (let _abono of abonos) {
          const { id: abono_id, ...abono_rest } = _abono
          await admin
            .firestore()
            .collection(`medicos/${new_user.uid}/facturas/${factura.id}/abonos`)
            .add({
              internal_id: abono_id,
              ...abono_rest,
            })
        }
      }
    } catch (err) {
      users_with_errors.push({ error: err, ..._medico })
    }
  }

  return { result: users_with_errors }
})
