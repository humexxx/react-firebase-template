const functions = require("firebase-functions")
const createPool = require("../../db")
const admin = require("firebase-admin")

function createUser(medico) {
  functions.logger.log(`Creating user for: ${medico.MedicoID}`)
  return admin.auth().createUser({
    email: `${medico.MedicoID}_medico@medicos.com`,
    password: "test1324",
    displayName: `${medico.Medico}`,
  })
}

const runtimeOpts = {
  timeoutSeconds: 540,
}

exports.migrate = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("0 0 * * 0,3")
  .timeZone("America/Costa_Rica")
  .onRun(async () => {
    const pool = await createPool()
    const response = await pool.request().query(
      `SELECT [MedicoID]
      ,[Medico]
      ,[Especialidad]
      ,[Institucion]
      ,[Empresa]
      ,[Codigo]
      ,[Direccion]
      ,[Telefono1]
      ,[Extension]
      ,[Telefono2]
      ,[Telefono3]
      ,[Fax]
      ,[Email]
      FROM [medicos].[dbo].[Medicos]`
    )

    const medicos = response.recordsets[0]
    for (let medico of medicos) {
      try {
        const snap = await admin
          .firestore()
          .collection("medicos")
          .where("MedicoID", "==", medico.MedicoID)
          .get()

        const uid = snap.empty
          ? (await createUser(medico)).uid
          : (await admin.auth().getUser(snap.docs[0].id)).uid

        await admin
          .firestore()
          .doc(`medicos/${uid}`)
          .set({
            uid,
            ...medico,
          })
      } catch (err) {
        functions.logger.log(err)
      }
    }

    return null
  })
