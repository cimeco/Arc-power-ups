import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { parseQueryString, sendMessage } from '../../../../util/powerups';
import { customDecodeURIComponent } from '../../../../util/helpers';

export const loader = async () => {

    sendMessage("ready", {
      height: document.documentElement.scrollHeight,
    });

    const parameters = Object.assign({ wait: 0 }, parseQueryString());
    const data = JSON.parse( decodeURIComponent(parameters.p) );
    const customfields = data.config.customfields

    return { customfields };
};

const CustomFieldsEdit = () => {
    const { customfields } = useLoaderData();
    const [text, setText] = useState(customDecodeURIComponent(customfields?.text));
    const [time, setTime] = useState(customDecodeURIComponent(customfields?.time));

    const saveData = (e) => {
        e.preventDefault();

        const customfields = {
            text,
            time
        }

        const ansCustomEmbed = {
        id: parseQueryString()['k'],
        url: 'https://dsj9tz56eff78.cloudfront.net/powerups/customfields/view',
        config: {
            customfields,
        },
        };
        sendMessage("data", ansCustomEmbed);
    }

  return (
    <form onSubmit={saveData} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="text" className="block mb-2 font-bold">
          Text:
        </label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-2 font-bold">
          Time:
        </label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
      >
        Guardar
      </button>
    </form>
  );
};

export default CustomFieldsEdit;
