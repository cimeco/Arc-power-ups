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
  const billboard = data.config.billboard;

  return { billboard };
};

const BillboardView = () => {
  const { billboard } = useLoaderData();
  return (
    <div className="p-4">
      <div className="border p-4 mb-4 rounded shadow-md space-y-3">
        <p>
          <strong>Estreno:</strong> {billboard?.premiere}
        </p>
        <p>
          <strong>Origen:</strong> {customDecodeURIComponent(billboard?.origin)}
        </p>
        <p>
          <strong>Director:</strong>{" "}
          {customDecodeURIComponent(billboard?.director)}
        </p>
        <p>
          <strong>Genero:</strong>{" "}
          {customDecodeURIComponent(billboard?.genre)}
        </p>
        <p>
          <strong>Reparto:</strong> {customDecodeURIComponent(billboard?.cast)}
        </p>
        <p>
          <strong>Duración:</strong>{" "}
          {customDecodeURIComponent(billboard?.duration)}
        </p>
        <p>
          <strong>Clasificación:</strong>{" "}
          {customDecodeURIComponent(billboard?.rating)}
        </p>
        <div>
          <h3 className="font-bold">Funciones y horarios:</h3>
          {billboard.cinemas?.map((cinema, cinemaIndex) => (
            <div key={cinemaIndex} className="rounded-lg bg-white p-3 mt-2">
              <h4 className="font-medium">
                {customDecodeURIComponent(cinema.name)}
              </h4>
              <p>{customDecodeURIComponent(cinema.showtimes.join(", "))}</p>
              <p>{customDecodeURIComponent(cinema.ticketUrl)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillboardView;
