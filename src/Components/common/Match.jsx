import { sendMessage, parseQueryString } from '../../../util/powerups'
import { getResumen } from '../../content/services/dataFactoryServices';

const Match = ({partido}) => {

  const {deporte, nombreCampeonato, estado, local, visitante, canal} = partido

  const loaderResumen = async () => {
    const resumen = await getResumen(canal)

    const arrayEquipo = resumen.fichapartido.equipo.map(equipo => {
      return equipo.attributes
    })

    const partidoResumen = {
      ...partido,
      attributes: resumen.fichapartido.attributes,
      equipo: arrayEquipo
    }

    enviarDatos(partidoResumen)
  }

  const enviarDatos = (partido) => {
    const ansCustomEmbed = {
      id: parseQueryString()['k'],
      url: 'https://dsj9tz56eff78.cloudfront.net/powerups/datafactory/view',
      config: {
        partido,
      },
    };
    console.log(ansCustomEmbed)
    sendMessage("data", ansCustomEmbed);
  }

  const handleClick = () => {
    loaderResumen()
  };

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{deporte}</td>
        <td className="p-3">{nombreCampeonato}</td>
        <td className="p-3">
          <p><span className="text-gray-800 uppercase font-bold">Local: </span>{typeof local === "string" ? local : ""}</p>
          <p><span className="text-gray-800 uppercase font-bold">Visitante: </span>{typeof visitante === "string" ? visitante : ""}</p>
      </td>
        <td className="p-3">{estado}</td>
        <td className="p-3">
          <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 block w-full text-white text-xs p-2 font-bold uppercase mt-3"
              onClick={handleClick}
          >Ver</button>
        </td>
    </tr>
  )
}
export default Match