<template>
  <div>
    <b-modal id="main-modal" size="lg" :title="modalInfo.name" scrollable>
      <b-table :fields="exchangeFields" :items="exchangeArray"></b-table>
      <div v-show="modalDescription != null">
        <h5>Description:</h5>
        <p>{{ modalDescription }}</p>
      </div>
      <div v-show="exchangeMarkets.data != null">
        <h5>Market Info:</h5>
        <b-table :fields="marketFields" :items="exchangeMarkets.data"></b-table>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      marketFields: ['pair', 'base_currency_name', 'fee_type', 'trust_score'],
      exchangeFields: [
        'id',
        'name',
        'website',
        'active',
        'reported_rank',
        'currencies',
        'confidence_score'
      ]
    }
  },
  computed: {
    exchangeArray() {
      return [
        {
          id: this.modalInfo.id,
          name: this.modalInfo.name,
          website: this.modalInfo.website,
          active: this.modalInfo.active,
          reported_rank: this.modalInfo.reported_rank,
          currencies: this.modalInfo.currencies,
          confidence_score: this.modalInfo.confidence_score
        }
      ]
    },
    ...mapState({
      modalInfo: 'modalInfo',
      modalDescription: 'modalDescription',
      exchangeMarkets: 'exchangeMarkets'
    })
  }
}
</script>

<style scoped></style>
