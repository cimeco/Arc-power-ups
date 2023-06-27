import { useLoaderData } from "react-router-dom";
import { sendMessage, parseQueryString } from "../../../../util/powerups";
import { customDecodeURIComponent } from "../../../../util/helpers";

export const loader = async () => {

  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse( decodeURIComponent(parameters.p) );
  const customfields = data.config.customfields

  return { customfields };
};

const CustomFieldsView = () => {
  const {customfields} = useLoaderData();

  return (
    <div>
      <p className="text-base font-semibold">Text: {customDecodeURIComponent(customfields.text)}</p>
      <p className="text-base font-semibold">Time: {customDecodeURIComponent(customfields.time)}</p>
    </div>
  );
};
export default CustomFieldsView;
