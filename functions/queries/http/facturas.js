const functions = require("firebase-functions")
const createPool = require("../../db")

exports.facturas = functions.https.onCall(async (data, context) => {
  try {
    if (!context?.auth?.uid) throw new Error("Sin autenticar")
    const pool = await createPool()
    const response = await pool.request().query(
      `SELECT [MedicosID]
        ,[Factura]
        ,[Nombre_del_Asegurado]
        ,[Nombre del Seguro]
        ,[Fecha de Ingreso]
        ,[Factura de Medicos].[Cancelado]
        ,[Monto Total]
        FROM [Factura de Medicos]
        join [Caso] on [Caso].CasoID = [Factura de Medicos].CasoID
        join [Pacientes] on [Pacientes].[PacienteID] = [Caso].[PacienteID]
        join [Aseguradora] on [Aseguradora].SeguroID = [Pacientes].[SeguroID]
        where MedicoID = ${data.MedicoID}`
    )
    return { response: response.recordsets[0] }
  } catch (err) {
    return { error: err }
  }
})
