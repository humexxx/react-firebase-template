const functions = require("firebase-functions")
const admin = require("firebase-admin")
const db = admin.firestore()

exports.import_data = functions.https.onCall(async (data, context) => {
  try {
    functions.logger.log(data)
    return { result: true }
  } catch (err) {
    return { error: err.message }
  }
})
