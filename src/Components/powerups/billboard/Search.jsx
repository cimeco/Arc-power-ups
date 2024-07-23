import React, { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { parseQueryString, sendMessage } from "../../../../util/powerups";
import "react-datepicker/dist/react-datepicker.css";

const BillboardSearch = () => {
  registerLocale("es", es);

  const sendData = () => {
    const billboard = {}
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
    <div className="w-full flex">
      <form className="rounded px-8 pt-6 pb-8 mb-4 w-1/2" onSubmit={sendData}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre de la película
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Título"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillboardSearch;
