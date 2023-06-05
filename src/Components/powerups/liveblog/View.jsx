import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";

export const loader = async () => {

  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse( decodeURIComponent(parameters.p) );
  const liveblog = data.config.liveblog

  return { liveblog };
};

const LiveblogView = () => {
  const {liveblog} = useLoaderData();
  const formatter = new Intl.DateTimeFormat('es-MX',{
    weekday:'long',
    month:'long',
    year:'numeric',
    day:'numeric',
    hour:'numeric',
    minute:'numeric'
  })

  return (
    <div>
      <p>Titulo: {liveblog.title}</p>
      <p>Fecha: {formatter.format(new Date(liveblog.date))}</p>
    </div>
  );
};
export default LiveblogView;
