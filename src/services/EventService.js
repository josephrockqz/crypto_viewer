import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://api.coinpaprika.com/v1`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default {
  getCoinInfo(id) {
    return apiClient.get('/coins/' + id)
  },
  getOhlcv(id) {
    return apiClient.get('/coins/' + id + '/ohlcv/latest/')
  },
  getCoinTwitter(id) {
    return apiClient.get('/coins/' + id + '/twitter')
  },
  getExchanges() {
    return apiClient.get('/exchanges')
  },
  getExchangeById(id) {
    return apiClient.get('/exchanges/' + id)
  },
  getExchangeMarketsById(id) {
    return apiClient.get('/exchanges/' + id + '/markets')
  },
  getGlobal() {
    return apiClient.get('/global')
  },
  getCoins(perPage, page) {
    return apiClient.get('/coins?_limit=' + perPage + '&_page=' + page)
  },
  async getSearchResults(ele) {
    return apiClient.get('/search/?q=' + ele)
  }
}
