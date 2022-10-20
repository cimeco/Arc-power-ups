import { getResumen } from "../../../content/services/dataFactoryServices";
import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";

export const loader = async () => {

  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse( decodeURIComponent(parameters.p) );
  const partido = data.config.partido   

  // const resumen = await getResumen(partido.canal); 


  return { partido };
};

const DatafactoryView = () => {  

  const { partido } = useLoaderData();
  // console.log(resumen)

  return (
    <div>
      <p>Campeonato: {partido.nombreCampeonato}</p>
      <p>Local: {partido.local}</p>
      <p>Visitante: {partido.visitante}</p>
      <p>Estado: {partido.estado}</p>
      
    </div>
  );
};
export default DatafactoryView;
