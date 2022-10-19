import { sendMessage, parseQueryString } from '../../../util/powerups'

const Match = ({partido}) => {

  const {deporte, nombreCampeonato, estado, local, visitante} = partido

  const handleClick = () => {
    const ansCustomEmbed = {
      id: parseQueryString()['k'],
      url: 'https://dsj9tz56eff78.cloudfront.net/powerups/datafactory/view',
      config: {
        partido
      },
    };
    sendMessage("data", ansCustomEmbed);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
        <td className="p-3">{deporte}</td>
        <td className="p-3">{nombreCampeonato}</td>
        <td className="p-3">
            <p><span className="text-gray-800 uppercase font-bold">Local: </span>{local}</p>
            <p><span className="text-gray-800 uppercase font-bold">Visitante: </span>{visitante}</p>
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