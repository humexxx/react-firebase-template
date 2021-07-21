const functions = require("firebase-functions")
const createPool = require("../../db")

exports.abonosFactura = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) throw new Error("Sin autenticar")
    const pool = await createPool()
    const response = await pool.request().query(
      `SELECT [AbonoMedicoID]
      ,[Abono en colones]
      ,[Ajustes]
      ,[Abonos medicos].[Fecha]
      ,[Recibo]
      FROM [Abonos medicos]
      join [Factura de Medicos] on [Factura de Medicos].MedicosID = [Abonos medicos].MedicosID
      where [Factura de Medicos].MedicosID =  ${data.factura_id}`
    )
    return {
      response: response.recordsets[0].map((a) => {
        a["Fecha"] = a["Fecha"].toString()
        return a
      }),
    }
  } catch (err) {
    return { error: err }
  }
})
