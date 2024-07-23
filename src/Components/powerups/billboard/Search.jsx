import React, { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { parseQueryString, sendMessage } from "../../../../util/powerups";
import "react-datepicker/dist/react-datepicker.css";

const BillboardSearch = () => {
  registerLocale("es", es);
  const [premiere, setPremiere] = useState();
  const [origin, setOrigin] = useState();
  const [cast, setCast] = useState();
  const [duration, setDuration] = useState();

  const sendData = () => {
    const billboard = {};
    const ansCustomEmbed = {
      id: parseQueryString()["k"],
      url: "https://dsj9tz56eff78.cloudfront.net/powerups/billboard/view",
      config: {
        billboard,
      },
    };
    sendMessage("data", ansCustomEmbed);
  };

  useEffect(() => {
    sendMessage("ready", {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <div className="w-full">
      <form className="rounded mb-4 flex" onSubmit={sendData}>
        <div className="w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="premier"
            >
              Estreno
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="premier"
              type="date"
              placeholder="Fecha de estreno"
              value={premiere}
              onChange={(e) => setPremiere(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="origin"
            >
              Origen
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="origin"
              type="text"
              placeholder="Origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="director"
            >
              Director
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="director"
              type="text"
              placeholder="Director"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cast"
            >
              Reparto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cast"
              type="text"
              placeholder="Reparto"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              Duración
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="text"
              placeholder="Duración"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
        <div className="w-1/2">
          <h3>Funciones y horarios</h3>
          <div>
            <h4 className="font-medium">Complejo Cinerama</h4>
            <p className="text-muted-foreground">13:10, 15:10, 17:10, 19:10, 21:20 y 23:20</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillboardSearch;
