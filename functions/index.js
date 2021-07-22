require("cors")({ origin: true })
const admin = require("firebase-admin")

admin.initializeApp()

exports.pacientes = require("./pacientes/index")
exports.facturas = require("./facturas/index")
exports.queries = require("./queries/index")
exports.schedule = require("./schedule/index")
