const cors = require("cors")({ origin: true })
const admin = require("firebase-admin")

admin.initializeApp()

exports.import = require("./import/index")