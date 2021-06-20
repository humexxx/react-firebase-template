const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.retrieveUnsignedUsers = functions.https.onCall(
  async (data, context) => {
    const unsigned_users = []
    for (let user of data) {
      try {
        await admin.auth().getUserByEmail(`${user}@medicos.com`)
        continue
      } catch (e) {
        unsigned_users.push(user)
      }
    }

    return { result: unsigned_users }
  }
)
