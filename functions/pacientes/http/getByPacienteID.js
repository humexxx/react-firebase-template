const functions = require("firebase-functions")
const admin = require("firebase-admin")
const createPool = require("../../db")

exports.getByPacienteID = functions.https.onRequest(async (req, res) => {
  try {
    const pacienteID = req.query.id
    const pool = await createPool()
    const response = await pool
      .request()
      .query(`SELECT * FROM Pacientes where PacienteID = ${pacienteID}`)
    res.status(200).send({ response: response.recordset[0] })
  } catch (err) {
    res.status(500).send({ err })
  }
})
