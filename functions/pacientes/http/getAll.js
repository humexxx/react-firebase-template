const functions = require("firebase-functions")
const admin = require("firebase-admin")
const createPool = require("../../db")

exports.getAll = functions.https.onRequest(async (req, res) => {
  try {
    const pool = await createPool()
    const response = await pool.request().query(`SELECT * FROM Pacientes`)
    res.status(200).send({ response: response.recordset[0] })
  } catch (err) {
    res.status(500).send({ err })
  }
})
