const mssql = require("mssql")

const configuration = {
  connection_name: "medicos-de:us-central1:medicos",
  user: "sqlserver",
  password: "k25wjl8pd7ItHk6z",
  database: "medicos",
  server: "34.136.62.94",
}
const createPool = async () => {
  const config = { pool: {}, options: {} }
  config.user = configuration.user
  config.password = configuration.password
  config.database = configuration.database
  config.server = configuration.server
  config.options.trustServerCertificate = true

  return await mssql.connect(config)
}

module.exports = createPool
