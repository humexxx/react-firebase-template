import medicos from '../_data/medicos.json'
import casos from '../_data/casos.json'
import facturas from '../_data/facturas.json'
import abonos from '../_data/abonos.json'
import pacientes from '../_data/pacientes.json'
import functions from '../firebase/functions'

export const importData = () => {
  const _medicos = medicos.filter(m => m.Medico)
  _medicos.forEach(m => {
    m.facturas = facturas.filter(f => f.MedicoID === m.MedicoID)
    m.facturas.forEach(f => {
      f.abonos = abonos.filter(a => a.MedicosID === f.MedicosID)
      f.caso = casos.find(c => c.CasoID === f.CasoID)
      if (f.caso)
        f.pacienteEntity = pacientes.find(
          p => p.PacienteID === f.caso.PacienteID
        )
    })
  })

  console.log(_medicos)

  const importMedico = functions.httpsCallable('import-importData')
  ;(async () => {
    for (let i = 0; i < _medicos.length; i += 50) {
      console.log(`${i}-${i + 50} of ${_medicos.length}`)
      const { data } = await importMedico(_medicos.slice(i, i + 50))
      if (data.result.length) console.log(data)
    }
  })()
}
