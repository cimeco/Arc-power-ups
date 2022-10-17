import Match from "../../common/Match";
import { useLoaderData } from "react-router-dom";
import { getPartidos } from "../../../content/sources/dataFactoryServices";
import { useEffect } from "react";
import { sendMessage } from "../../../../util/powerups/DataFactory/indexSearch";

export const loader = async () => {
  const partidos = await getPartidos();
  sendMessage("ready", {
        height: document.documentElement.scrollHeight,
      });
  return { partidos };
};

const DatafactorySearch = () => {
  //Prueba
  // useEffect(() => {
  //   sendMessage("ready", {
  //     height: document.documentElement.scrollHeight,
  //   });
  // }, []);  

  //Fin prueba

  const { partidos } = useLoaderData();

  return (
    <div className="text-center">
      <h1 className="font-black text-4xl text-blue-900">Partidos</h1>

      <p className="mt-3">Power Up Partidos Semanales</p>

      {partidos && partidos.length > 0 ? (
        <table className="bg-white w-full mt-5 table-auto shadow">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Deporte</th>
              <th className="p-2">Campeonato</th>
              <th className="p-2">Partido</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {partidos.map((partido) => (
              <Match key={partido.id} partido={partido} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-12 text-2xl font-bold">No hay partidos para mostrar</p>
      )}
    </div>
  );
};
export default DatafactorySearch;
