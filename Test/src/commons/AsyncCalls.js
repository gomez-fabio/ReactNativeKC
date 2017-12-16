import axios from 'axios'

export function fetchHousesList() {
  const fetchURL = '/casas'
  return axios.get(fetchURL)
}