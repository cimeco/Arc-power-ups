import { useEffect } from "react"


const DatafactorySearch = () => {


  useEffect(() => {
    const consultarAPI = async () => {
        const url = 'https://cdnmd.lavoz.com.ar/sites/default/files/Datafactory/deportes.todos.agenda.diaadia.xml'

        
        // const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        const respuesta = await fetch(url)
        console.log(respuesta)
        const resultado = await respuesta.json()
        console.log(resultado)

        // fetch(url)
        //   .then(function(resp){
        //     return resp.text()
        //   })
        //   .then(function(data){
        //     console.log(data)
        //   })


        // const arrayCriptos = resultado.Data.map( cripto => {

        //     const objeto = {
        //         id: cripto.CoinInfo.Name,
        //         nombre: cripto.CoinInfo.FullName
        //     }
        //     return objeto                
        // })

        // setCriptos(arrayCriptos)
    }

    consultarAPI()
}, [])

  return (
    <div>DatafactorySearch</div>
  )
}
export default DatafactorySearch