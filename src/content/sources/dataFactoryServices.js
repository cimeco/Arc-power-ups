import {xmlToJson} from '../../../util/helpers'

export const getFixture = async () => {
    try {
        const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'   
    
        const response = await fetch(url);
        const xmlString = await response.text();
        var XmlNode = new DOMParser().parseFromString(xmlString, 'text/xml');
        const result = xmlToJson(XmlNode).fixture
        return result
        
    } catch (error) {
        console.log(error)
    }
   
}