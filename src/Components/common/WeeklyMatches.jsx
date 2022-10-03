
const WeeklyMatches = ({partido}) => {

  const {id, deporte, nombreCampeonato, estado, local, visitante} = partido

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{deporte}</td>
        <td className="p-3">{nombreCampeonato}</td>
        <td className="p-3">
            <p><span className="text-gray-800 uppercase font-bold">Local: </span>{local}</p>
            <p><span className="text-gray-800 uppercase font-bold">Visitante: </span>{visitante}</p>
        </td>
        <td className="p-3">{estado}</td>       
    </tr>
  )
}
export default WeeklyMatches