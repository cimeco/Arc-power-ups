import React, { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { parseQueryString, sendMessage } from "../../../../util/powerups";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {
  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse(decodeURIComponent(parameters.p));
  const { schedule } = data.config;

  return { schedule };
};

const ScheduleEdit = () => {
  const { schedule } = useLoaderData();
  registerLocale("es", es);
  const [startDate, setStartDate] = useState(schedule.startDate);
  const [endDate, setEndDate] = useState(schedule.endDate);
  const [location, setLocation] = useState(
    customDecodeURIComponent(schedule.location)
  );
  const [address, setAddress] = useState(
    customDecodeURIComponent(schedule.address)
  );
  const [repeatFrequency, setRepeatFrequency] = useState(
    schedule.repeatFrequency
  );
  const [durationHours, setDurationHours] = useState(schedule.durationHours);
  const [durationMinutes, setDurationMinutes] = useState(
    schedule.durationMinutes
  );
  const [typeEvent, setTypeEvent] = useState(
    customDecodeURIComponent(schedule.typeEvent)
  );
  const [priceFrom, setPriceFrom] = useState(
    customDecodeURIComponent(schedule.priceFrom)
  );
  const [priceTo, setPriceTo] = useState(
    customDecodeURIComponent(schedule.priceTo)
  );
  const [rating, setRating] = useState(schedule.rating);
  const [events, setEvents] = useState(
    schedule.events.map((event) => ({
      ...event,
      showtimes: event.showtimes.map((showtime) =>
        customDecodeURIComponent(showtime)
      ),
      ticketUrl: customDecodeURIComponent(event.ticketUrl),
    }))
  );
  const [eventDate, setEventDate] = useState("");
  const [eventShowtimes, setEventShowtimes] = useState("");
  const [eventTicketUrl, setEventTicketUrl] = useState("");

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      date: eventDate,
      showtimes: eventShowtimes.split(","),
      ticketUrl: eventTicketUrl,
    };
    setEvents([...events, newEvent]);
    setEventDate("");
    setEventShowtimes("");
    setEventTicketUrl("");
  };

  const handleEditEvent = (index) => {
    const eventToEdit = events[index];
    setEventDate(eventToEdit.date);
    setEventShowtimes(eventToEdit.showtimes.join(","));
    setEventTicketUrl(eventToEdit.ticketUrl);
    handleDeleteEvent(index);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const sendData = () => {
    const durationISO = `PT${durationHours ? `${durationHours}H` : ""}${
      durationMinutes ? `${durationMinutes}M` : ""
    }`;
    const schedule = {
      startDate,
      endDate,
      location,
      address,
      repeatFrequency,
      typeEvent,
      priceFrom,
      priceTo,
      rating,
      events,
      durationISO,
      durationHours,
      durationMinutes,
    };
    const ansCustomEmbed = {
      id: parseQueryString()["k"],
      url: "https://dsj9tz56eff78.cloudfront.net/powerups/schedule/view",
      config: {
        schedule,
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
      <h1 className="bold text-2xl mb-4 ml-2">Editar Agenda</h1>
      <form className="rounded mb-4 flex" onSubmit={(e) => e.preventDefault()}>
        <div className="w-1/2 p-2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startDate"
            >
              Desde
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              placeholder="Fecha de inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endDate"
            >
              Hasta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              placeholder="Fecha de finalización"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Lugar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Lugar"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="typeEvent"
            >
              Tipo de evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="typeEvent"
              type="text"
              placeholder="Comedia, teatro, etc"
              value={typeEvent}
              onChange={(e) => setTypeEvent(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="durationHours"
            >
              Duración (Horas y Minutos)
            </label>
            <div className="flex space-x-2">
              <input
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="durationHours"
                type="number"
                placeholder="Horas"
                value={durationHours}
                onChange={(e) => setDurationHours(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="durationMinutes"
                type="number"
                placeholder="Minutos"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="repeatFrequency"
            >
              Frecuencia con la que se repite
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="repeatFrequency"
              value={repeatFrequency}
              onChange={(e) => setRepeatFrequency(e.target.value)}
            >
              <option value="P1D">Diario</option>
              <option value="P1W">Semanal</option>
              <option value="P1M">Mensual</option>
              <option value="P1Y">Anual</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priceFrom"
            >
              Precio desde
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="priceFrom"
              type="number"
              placeholder="Precio mínimo"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priceTo"
            >
              Precio hasta
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="priceTo"
              type="number"
              placeholder="Precio máximo"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Nota: Si solo se completa "Precio desde", se mostrará como "Precio:"
            seguido del valor.
          </p>
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
              <option value="0">Sin clasificación</option>
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
          {events.map((event, index) => (
            <div key={index} className="rounded-lg bg-white p-3 mt-2">
              <h4 className="font-medium">{event.date}</h4>
              <p className="text-muted-foreground">
                {event.showtimes.join(", ")}
              </p>
              <p className="text-muted-foreground">{event.ticketUrl}</p>
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                onClick={() => handleEditEvent(index)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDeleteEvent(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <div className="mt-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventDate"
            >
              Fecha del evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventDate"
              type="date"
              placeholder="Fecha del evento"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="eventShowtimes"
            >
              Horarios (separados por coma)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventShowtimes"
              type="text"
              placeholder="Horarios (ej. 13:10, 15:10)"
              value={eventShowtimes}
              onChange={(e) => setEventShowtimes(e.target.value)}
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2 mt-2"
              htmlFor="eventTicketUrl"
            >
              URL para compra de entradas
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="eventTicketUrl"
              type="text"
              placeholder="URL para compra de entradas"
              value={eventTicketUrl}
              onChange={(e) => setEventTicketUrl(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              onClick={handleAddEvent}
            >
              Agregar evento
            </button>
            <div className="flex justify-end mt-3 mb-10">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={sendData}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScheduleEdit;
