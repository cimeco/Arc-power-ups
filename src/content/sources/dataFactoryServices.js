import localforage from 'localforage';
import {xmlToJson} from '../../../util/helpers'

export const getPartidos = async () => {
    try {
        const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'   
    
        const response = await fetch(url);
        const xmlString = await response.text();
        var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
        const result = xmlToJson(XmlNode)
        
        const arrayPartidos = result.fixture.partido.map( partido => {
          const objeto = {
            id: partido.attributes.id,
            canal: partido.attributes.canal,
            deporte: partido.attributes.deporte,
            nombreCampeonato: partido.attributes.nombreCampeonato,
            estado: partido.estado.attributes ? 'No Iniciado' : partido.estado,
            local: partido.local,
            visitante: partido.visitante
          }
          return objeto
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

        const response = await fetch(url);
        const xmlString = await response.text();
        var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
        const result = xmlToJson(XmlNode)

        return result

    } catch (error) {
        console.log(error)
    }
}
