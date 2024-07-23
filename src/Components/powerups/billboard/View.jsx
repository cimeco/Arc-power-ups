import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {
  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse(decodeURIComponent(parameters.p));
  const movies = data.config.movies;

  return { movies };
};

const BillboardView = () => {
  return (
    <div>
    </div>
  );
};
export default BillboardView;
