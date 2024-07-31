import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { parseQueryString, sendMessage } from "../../../../util/powerups";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {
  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse(decodeURIComponent(parameters.p));
  const billboard = data.config.billboard;

  return { billboard };
};

const BillboardEdit = () => {
  registerLocale("es", es);
  const { billboard } = useLoaderData();
  const [premiere, setPremiere] = useState(billboard.premiere);
  const [origin, setOrigin] = useState(
    customDecodeURIComponent(billboard.origin)
  );
  const [director, setDirector] = useState(
    customDecodeURIComponent(billboard.director)
  );
  const [cast, setCast] = useState(customDecodeURIComponent(billboard.cast));
  const [duration, setDuration] = useState(
    customDecodeURIComponent(billboard.duration)
  );
  const [rating, setRating] = useState(
    customDecodeURIComponent(billboard.rating)
  );
  const [cinemas, setCinemas] = useState(billboard.cinemas);
  const [cinemaName, setCinemaName] = useState("");
  const [cinemaShowtimes, setCinemaShowtimes] = useState("");
  const [cinemaTicketUrl, setCinemaTicketUrl] = useState("");

  const handleAddCinema = (e) => {
    e.preventDefault();
    const newCinema = {
      name: customDecodeURIComponent(cinemaName),
      showtimes: customDecodeURIComponent(cinemaShowtimes).split(","),
      ticketUrl: cinemaTicketUrl,
    };
    setCinemas([...cinemas, newCinema]);
    setCinemaName("");
    setCinemaShowtimes("");
    setCinemaTicketUrl("");
  };

  const handleEditCinema = (index) => {
    const cinemaToEdit = cinemas[index];
    setCinemaName(cinemaToEdit.name);
    setCinemaShowtimes(cinemaToEdit.showtimes.join(","));
    setCinemaTicketUrl(cinemaToEdit.ticketUrl);
    handleDeleteCinema(index);
  };

  const handleDeleteCinema = (index) => {
    const updatedCinemas = cinemas.filter((_, i) => i !== index);
    setCinemas(updatedCinemas);
  };

  const saveData = (e) => {
    e.preventDefault();

    const decodedCinemas = cinemas.map((cinema) => ({
      name: customDecodeURIComponent(cinema.name),
      showtimes: cinema.showtimes.map((showtime) =>
        customDecodeURIComponent(showtime)
      ),
      ticketUrl: customDecodeURIComponent(cinema.ticketUrl),
    }));

    const billboard = {
      premiere,
      origin,
      director,
      cast,
      duration,
      cinemas: decodedCinemas,
      rating,
    };

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
    sendMessage("ready", { height: document.documentElement.scrollHeight });
  }, []);

  return (
    <div className="w-full">
      <form className="rounded mb-4 flex" onSubmit={(e) => e.preventDefault()}>
        <div className="w-1/2 p-2">
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
              value={director}
              onChange={(e) => setDirector(e.target.value)}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="rating"
            >
              Clasificación
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 p-2">
          <h3 className="font-bold">Funciones y horarios</h3>
          {cinemas?.map((cinema, index) => (
            <div key={index} className="rounded-lg bg-white p-3 mt-2">
              <h4 className="font-medium">
                {customDecodeURIComponent(cinema.name)}
              </h4>
              <p className="text-muted-foreground">
                {customDecodeURIComponent(cinema.showtimes.join(", "))}
              </p>
              <p className="text-muted-foreground">{cinema.ticketUrl}</p>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => handleEditCinema(index)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDeleteCinema(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cinemaName"
            >
              Nombre del lugar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cinemaName"
              type="text"
              placeholder="Nombre del lugar"
              value={cinemaName}
              onChange={(e) => setCinemaName(e.target.value)}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="cinemaShowtimes"
            >
              Horarios (separados por coma)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cinemaShowtimes"
              type="text"
              placeholder="Horarios (ej. 13:10, 15:10)"
              value={cinemaShowtimes}
              onChange={(e) => setCinemaShowtimes(e.target.value)}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="cinemaTicketUrl"
            >
              URL para compra de entradas
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cinemaTicketUrl"
              type="text"
              placeholder="URL para compra de entradas"
              value={cinemaTicketUrl}
              onChange={(e) => setCinemaTicketUrl(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              onClick={handleAddCinema}
            >
              Agregar lugar
            </button>
          </div>
          <div className="flex justify-end mt-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={saveData}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillboardEdit;
