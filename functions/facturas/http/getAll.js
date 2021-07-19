const functions = require("firebase-functions")
const createPool = require("../../db")

exports.getAll = functions.https.onCall(async (_, context) => {
  try {
    if (!context?.auth?.uid) throw new Error("Sin autenticar")
    const pool = await createPool()
    const response = await pool
      .request()
      .query(`SELECT * FROM [Factura de Medicos]`)
    return { response: response.recordset[0] }
  } catch (err) {
    return { error: err }
  }
})
