import { useState, useEffect } from "react"
import WeeklyMatches from '../../common/WeeklyMatches'



const DatafactorySearch = () => {

  const [partidos, setParidos] = useState([])

  useEffect(() => {
    const consultarAPI = async () => {
        // const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'
        const url = '/src/content/sources/deportes.todos.agenda.diaadia.xml'
        
        // const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        // const respuesta = await fetch(url)
        // console.log(respuesta)
        // const resultado = await respuesta.text()
        // console.log(resultado)    

        fetch(url)
          .then(response => response.text())
          .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
          .then(data => setParidos(data.getElementsByTagName('partido')))
          
        
        
    }

    consultarAPI()
}, [])

  console.log(partidos)

  return (
    <div className="text-center">
      <h1 className="font-black text-4xl text-blue-900">Partidos</h1>

      <p className="mt-3">
        Power Up Partidos Semanales
      </p>

        <table className="bg-white w-full mt-5 table-auto shadow">
            <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="p-2">Deporte</th>
                    <th className="p-2">Campeonato</th>
                    <th className="p-2">Partido</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {partidos.map( partido => (
                    <WeeklyMatches
                        // key={cliente.id}
                        // cliente={cliente}
                        // handleEliminar={handleEliminar}
                    />
                ))}
            </tbody>

        </table>

    </div>
  )
}
export default DatafactorySearch