import { useState, useEffect } from "react"
import WeeklyMatches from '../../common/WeeklyMatches'
import {xmlToJson} from '../../../../util/helpers'



const DatafactorySearch = () => {

  const [partidos, setParidos] = useState([])

  useEffect(() => {  
    const getFixture = async () => {
      try {
          const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'   
      
          const response = await fetch(url);
          const xmlString = await response.text();
          var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
          const result = xmlToJson(XmlNode)
          
          const arrayPartidos = result.fixture.partido.map( partido => {
            const objeto = {
              id: partido.attributes.id,
              deporte: partido.attributes.deporte,
              nombreCampeonato: partido.attributes.nombreCampeonato,
              estado: partido.estado,
              local: partido.local,
              visitante: partido.visitante
            }
            return objeto
          })
          
          // console.log(arrayPartidos)
          setParidos(arrayPartidos)
          
          
      } catch (error) {
          console.log(error)
      }
    }

    getFixture()
  }, [])


  console.log(partidos)
  return (
    <div className="text-center">
      <h1 className="font-black text-4xl text-blue-900">Partidos</h1>

      <p className="mt-3">Power Up Partidos Semanales</p>

      <table className="bg-white w-full mt-5 table-auto shadow">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Deporte</th>
            <th className="p-2">Campeonato</th>
            <th className="p-2">Partido</th>
            <th className="p-2">Estado</th>
            {/* <th className="p-2">Acciones</th> */}
          </tr>
        </thead>
        <tbody>
          {partidos.map((partido) => (
            <WeeklyMatches
                key={partido.id}
                partido={partido}

            />
            
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DatafactorySearch