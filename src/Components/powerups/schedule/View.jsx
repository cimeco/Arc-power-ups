import React from "react";
import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {
  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse(decodeURIComponent(parameters.p));
  const schedule = data.config.schedule;

  return { schedule };
};

const formatFrequency = (frequency) => {
  switch (frequency) {
    case "P1D":
      return "Diario";
    case "P1W":
      return "Semanal";
    case "P1M":
      return "Mensual";
    case "P1Y":
      return "Anual";
    default:
      return "No especificada";
  }
}

const ScheduleView = () => {
  const { schedule } = useLoaderData();
  return (
    <div className="p-4">
      <h1 className="bold text-2xl mb-4 ml-2">Agenda</h1>

      <div className="border p-4 mb-4 rounded shadow-md space-y-3">
        <p>
          <strong>Desde:</strong> {schedule?.startDate}
        </p>
        <p>
          <strong>Hasta:</strong> {schedule?.endDate}
        </p>
        <p>
          <strong>Lugar:</strong> {customDecodeURIComponent(schedule?.location)}
        </p>
        <p>
          <strong>Dirección:</strong> {customDecodeURIComponent(schedule?.address)}
        </p>
        <p>
          <strong>Tipo de evento:</strong> {customDecodeURIComponent(schedule?.typeEvent)}
        </p>
        <p>
          <strong>Frecuencia de repetición:</strong> {formatFrequency(schedule?.repeatFrequency)}
        </p>
        <p>
          <strong>Precio desde:</strong> {customDecodeURIComponent(schedule?.priceFrom)}
        </p>
        <p>
          <strong>Precio hasta:</strong> {customDecodeURIComponent(schedule?.priceTo)}
        </p>
        <p>
          <strong>Clasificación:</strong> {customDecodeURIComponent(schedule?.rating)}
        </p>
        <div>
          <h3 className="font-bold">Funciones y horarios:</h3>
          {schedule.events?.map((event, eventIndex) => (
            <div key={eventIndex} className="rounded-lg bg-white p-3 mt-2">
              <h4 className="font-medium">
                {customDecodeURIComponent(event.date)}
              </h4>
              <p>{customDecodeURIComponent(event.showtimes.join(", "))}</p>
              <p>{customDecodeURIComponent(event.ticketUrl)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
