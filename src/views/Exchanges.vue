<template>
  <div>
    <h2>Exchanges</h2>
    <b-table
      :fields="fields"
      :items="exchanges"
      @row-clicked="openTheModal"
      small
      fixed
    ></b-table>

    <ExchangeModal />
  </div>
</template>

<script>
import EventService from '@/services/EventService'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      fields: ['name', 'markets', 'last_updated', 'sessions_per_month'],
      exchanges: null,
      timer: ''
    }
  },
  created() {
    this.getExchanges()
    this.timer = setInterval(this.getExchanges, 7500)
  },
  methods: {
    getExchanges() {
      EventService.getExchanges().then(response => {
        this.exchanges = response.data
      })
    },
    openTheModal(record) {
      this.openModal(record.id)
      this.$bvModal.show('main-modal')
    },
    ...mapActions(['openModal'])
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped></style>
