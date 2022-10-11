import { useLoaderData } from "react-router-dom"
import { getPartido, getResumen } from "../../../content/sources/dataFactoryServices"

export const loader = async  ({params}) => {
  const partido = await getPartido(params.id)
  const resumen = await getResumen(partido.canal)
  return {partido, resumen}
}

const DatafactoryView = () => {

  const { partido, resumen } = useLoaderData()
  console.log(resumen)
  const {id, canal, deporte, nombreCampeonato, estado, local, visitante} = partido


  return (
    <div>
      <p>Campeonato: {nombreCampeonato}</p>
      <p>Local: {local}</p>
      <p>Visitante: {visitante}</p>
      <p>Estado: {estado}</p>
    </div>
  )
}
export default DatafactoryView