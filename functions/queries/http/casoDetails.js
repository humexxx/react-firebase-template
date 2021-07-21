const functions = require("firebase-functions")
const createPool = require("../../db")

exports.casoDetails = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) throw new Error("Sin autenticar")
    const pool = await createPool()
    const response = await pool.request().query(
      `select [Diagnostico]
      ,[Procedimiento]
      ,[Notas Médicas]
    from [Caso]
    join [Factura de Medicos] on [Factura de Medicos].CasoID = [Caso].CasoID
    where MedicosID = '${data.factura_id}'`
    )
    return { response: response.recordsets[0] }
  } catch (err) {
    return { error: err }
  }
})
