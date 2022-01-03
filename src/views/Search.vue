<template>
  <div class="header-down">
    <div v-show="isSearchLoaded">
      <h2 class="header-down">Search results for '{{ ele }}'</h2>
      <div v-if="cLength !== 0">
        <b-table
          :fields="searchFields"
          :items="searchResults.currencies"
          @row-clicked="goToCPage"
          caption-top
          ><template v-slot:table-caption
            >There are {{ cLength }} matching currencies:</template
          ></b-table
        >
      </div>
      <div v-if="cLength === 0" class="not-there">
        <template>There are no matching currencies</template>
      </div>
      <div v-if="eLength !== 0">
        <b-table
          :items="searchResults.exchanges"
          @row-clicked="openTheModal"
          caption-top
          ><template v-slot:table-caption
            >There are {{ eLength }} matching exchanges:</template
          ></b-table
        >
      </div>
      <div v-if="eLength === 0" class="not-there">
        <template>There are no matching exchanges</template>
      </div>
      <div v-if="pLength !== 0">
        <b-table :items="searchResults.people" caption-top
          ><template v-slot:table-caption
            >There are {{ pLength }} matching people:</template
          ></b-table
        >
      </div>
      <div v-if="pLength === 0" class="not-there">
        <template>There are no matching people</template>
      </div>
      <div v-if="tLength !== 0">
        <b-table :items="searchResults.tags" caption-top
          ><template v-slot:table-caption
            >There are {{ tLength }} matching tags:</template
          ></b-table
        >
      </div>
      <div v-if="tLength === 0" class="not-there">
        <template>There are no matching tags</template>
      </div>
    </div>

    <ExchangeModal />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EventService from '@/services/EventService'
import store from '@/store.js'

export default {
  props: {
    ele: {
      required: true
    }
  },
  data() {
    return {
      all: null,
      fields: ['name', 'symbol', 'rank', 'type'],
      matches: [],
      searchFields: ['name', 'symbol', 'rank', 'type'],
      searchResults: {
        currencies: null,
        exchanges: null,
        people: null,
        tags: null
      },
      cLength: null,
      eLength: null,
      pLength: null,
      tLength: null,
      searchAll: null
    }
  },
  created() {
    this.getSearchResults()
    this.waiting()
  },
  methods: {
    goToCPage(record) {
      store.dispatch('goToCoinPage', {
        id: record.id
      })
    },
    async getSearchResults() {
      EventService.getSearchResults(this.ele).then(response => {
        this.searchResults.currencies = response.data.currencies
        this.searchResults.exchanges = response.data.exchanges
        this.searchResults.people = response.data.people
        this.searchResults.tags = response.data.tags
        this.cLength = response.data.currencies.length
        this.eLength = response.data.exchanges.length
        this.pLength = response.data.people.length
        this.tLength = response.data.tags.length
      })
    },
    async waiting() {
      await this.getSearchResults()
      this.setTrue()
    },
    openTheModal(record) {
      this.openModal(record.id)
      this.$bvModal.show('main-modal')
    },
    ...mapActions(['setTrue', 'setFalse', 'goToCoinPage', 'openModal'])
  },
  computed: {
    ...mapState({
      isSearchLoaded: 'searchLoaded'
    })
  }
}
</script>

<style scoped>
.header-down {
  margin-bottom: 20px;
}
.not-there {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
