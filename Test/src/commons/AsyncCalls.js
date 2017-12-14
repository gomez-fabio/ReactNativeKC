import axios from 'axios'

export function fetchHousesList() {
    const fetchUrl = '/casas'
    return axios.get(fetchUrl)        
    .then((response) => {
        console.log("axios get response: ", response);
        const nuestraLista = response.data && response.data.records ? response.data.records : []
        return nuestraLista
        
    })
    .catch((error) => {
        console.log("axios get error: ", error);
        return []
    });
}