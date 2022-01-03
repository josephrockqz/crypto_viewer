import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import EventService from './services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchLoaded: false,
    coin_id: null,
    modalInfo: {
      id: null,
      name: null,
      website: null,
      active: null,
      reported_rank: null,
      currencies: null,
      confidence_score: null
    },
    modalDescription: null,
    exchangeMarkets: {
      type: Array,
      data: null
    }
  },
  mutations: {
    SET_TRUE(state) {
      state.searchLoaded = true
    },
    SET_FALSE(state) {
      state.searchLoaded = false
    },
    PUSH_COIN_PAGE(state, id) {
      state.coin_id = id
      router.push('/coin/' + id)
    },
    SET_MODAL_INFO(state, info) {
      state.modalInfo.id = info.id
      state.modalInfo.name = info.name
      state.modalInfo.website = info.website
      state.modalInfo.active = info.active
      state.modalInfo.reported_rank = info.reported_rank
      state.modalInfo.currencies = info.currencies
      state.modalInfo.confidence_score = info.confidence_score
    },
    SET_MODAL_DESC(state, info) {
      if (info != '') {
        state.modalDescription = info
      }
    },
    SET_EXCHANGE_MARKETS(state, info) {
      state.exchangeMarkets.data = info
    }
  },
  actions: {
    setTrue({ commit }) {
      commit('SET_TRUE')
    },
    setFalse({ commit }) {
      commit('SET_FALSE')
    },
    goToCoinPage({ commit }, id) {
      commit('PUSH_COIN_PAGE', id.id)
    },
    openModal({ commit }, id) {
      commit('SET_MODAL_DESC', null)
      commit('SET_EXCHANGE_MARKETS', null)
      EventService.getExchangeById(id).then(response => {
        commit('SET_MODAL_INFO', response.data)
        commit('SET_MODAL_DESC', response.data.description)
      })
      EventService.getExchangeMarketsById(id).then(response => {
        if (response.data.length !== 0) {
          commit('SET_EXCHANGE_MARKETS', response.data)
        }
      })
    }
  }
})
