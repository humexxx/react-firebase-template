const functions = require("firebase-functions")
const createPool = require("../../db")

exports.getByMedicoID = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) throw new Error("Sin autenticar")
    const pool = await createPool()
    const response = await pool
      .request()
      .query(
        `SELECT * FROM [Factura de Medicos] where MedicoID = ${data.MedicoID}`
      )
    return { response: response.recordsets[0] }
  } catch (err) {
    return { error: err }
  }
})
