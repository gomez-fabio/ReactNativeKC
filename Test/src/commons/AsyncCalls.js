import axios from 'axios'

export function fetchHouseList() {
  return axios.get('http://146.185.137.85/got/web/casas')
}