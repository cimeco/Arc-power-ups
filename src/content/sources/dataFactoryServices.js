import axios from 'axios';
import {xmlToJson} from '../../../util/helpers'
import * as iso88592 from 'iso-8859-2';

export const getPartidos = async () => {
    try {
        const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'   
    
        const response = await axios.request({
            method: 'GET',
            url: url,
            responseEncoding: 'binary'
          });
        let xmlString = iso88592.decode(response.data.toString('binary'));
        var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
        const result = xmlToJson(XmlNode)
        const partidos = result.fixture.partido
        
        const arrayPartidos = partidos.map( partido => {
            const {attributes, local, visitante} = partido
            const {id, canal, deporte, nombreCampeonato} = attributes
            const estado = partido.estado.attributes ? 'No Iniciado' : partido.estado

          return {
            id,
            canal,
            deporte,
            nombreCampeonato,
            estado,
            local,
            visitante
          }
        })        
        return arrayPartidos
    
    } catch (error) {
        console.log(error)
    }
}

export const getPartido = async (id) => {
    try {
        const partidos = await getPartidos()
        const partido = partidos.filter(partido => partido.id === id)        
        return partido[0]

    } catch (error) {
        console.log(error)
    }
}

export const getResumen = async (canal) => {
    try {
        const url = `https://feed.datafactory.la/?ppaass=L4V0z&canal=${canal}`

        const response = await axios.request({
            method: 'GET',
            url: url,
            responseEncoding: 'binary'
          });
        let xmlString = iso88592.decode(response.data.toString('binary'));
        var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
        const result = xmlToJson(XmlNode)   
        render()       
        return result.ficha

    } catch (error) {
        console.log(error)
    }
}

const sendMessage = function (action, data) {
    window.parent.postMessage(
        JSON.stringify({
            source: 'custom_embed',
            action,
            data,
            key: parseQueryString()['k']
        }),
        '*'
    )
}

const parseQueryString = function () {
    const params = location.search.split('?')[1] || ''
    const kv = params.split('&')
    return kv.reduce((result, item) => {
        const [key, value] = item.split('=')
        return Object.assign(result, {
            [key]: value
        })
    }, {})
}
const render = () => {
    // Show search results to user
    const template = document.getElementById('content_template').innerHTML
    const container = document.getElementById('search_content');
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const id = 'row-' + data[i].id;
        const html = template
            .replace('%title%', data[i].title)
            .replace("%image%", data[i].thumbnail_url)
            .replace("%item_id%", id);
        const element = document.createElement('div')
        container.appendChild(element)
        element.outerHTML = html
        document
            .getElementById(id)
            .addEventListener('click', handleClick(i))
    }
}

const handleClick = index => event => {
    const ansCustomEmbed = {
        id: data[index].id,
        url: data[index].url,
    }

    sendMessage('data', ansCustomEmbed)
}

window.onload = function () {
    const parameters = Object.assign(
        {
            wait: 0
        },
        parseQueryString()
    )
    // Emulate wait time
    setTimeout(function () {
        sendMessage('ready', {
            height: document.documentElement.scrollHeight
        })
    }, Number.parseInt(parameters.wait))

    getPartidos()
}