import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { parseQueryString, sendMessage } from '../../../../util/powerups';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { customDecodeURIComponent } from '../../../../util/helpers';

export const loader = async () => {

  sendMessage("ready", {
    height: document.documentElement.scrollHeight,
  });

  const parameters = Object.assign({ wait: 0 }, parseQueryString());
  const data = JSON.parse( decodeURIComponent(parameters.p) );
  const liveblog = data.config.liveblog

  return { liveblog };
};

const LiveblogEdit = () => {
  registerLocale('es', es)
  const { liveblog } = useLoaderData();
  const [title, setTitle] = useState(customDecodeURIComponent(liveblog?.title))
  const [startDate, setStartDate] = useState(new Date(liveblog.date))

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')    // Reemplazar espacios en blanco con guiones
      .replace(/[^\w-]+/g, '') // Eliminar caracteres no alfanuméricos excepto guiones
      .replace(/--+/g, '-')    // Reemplazar múltiples guiones consecutivos por uno solo
      .replace(/^-+|-+$/g, ''); // Eliminar guiones al principio y al final
  };

  const saveData = (e) => {
    e.preventDefault();

    const titleSlug = slugify(title);
    const liveblog = {
      title: title,
      date: startDate,
      slug: titleSlug
    }

    const ansCustomEmbed = {
      id: parseQueryString()['k'],
      url: 'https://dsj9tz56eff78.cloudfront.net/powerups/liveblog/view',
      config: {
        liveblog,
      },
    };
    sendMessage("data", ansCustomEmbed);
  }

  useEffect(() => {
    sendMessage('ready', {height: document.documentElement.scrollHeight});
  }, []);

  return (
    <div className="w-full max-w-lg">
    <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={saveData}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Titulo
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Titulo"
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Fecha y hora
        </label>
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="dd/MM/yyyy h:mm aa"
          showTimeInput
          locale="es"
        />
      </div>
      <div className="flex items-center justify-between">
        <button disabled={!title} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Guardar
        </button>
      </div>
    </form>
  </div>
  )
}

export default LiveblogEdit