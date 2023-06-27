import React, { useEffect, useState } from 'react'
import { parseQueryString, sendMessage } from '../../../../util/powerups';

const CustomFieldsSearch = () => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const saveData = (e) => {
    e.preventDefault();

    const customfields = {
      text: text,
      time: time
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
  useEffect(() => {
    sendMessage("ready", {
      height: document.documentElement.scrollHeight,
    });
  }, []);

  return (
    <form onSubmit={saveData} className="max-w-sm mx-auto">
      <div className="mb-4">
        <label htmlFor="text" className="block mb-2 font-bold">
          Texto (nombres, título)
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
          Tiempo: (duración, tiempo en texto)
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
        Enviar
      </button>
    </form>
  );
};

export default CustomFieldsSearch;
