<template>
  <div>
    <input
      v-model="message"
      class="searchbar"
      type="search"
      placeholder="Search"
      @keyup.enter="search"
    />
    <h3 class="global-market">
      <span class="lil-span">Market Cap: </span><span>{{ global.cap }}</span
      ><span class="divide"> | </span>
      <span class="lil-span">24-Hour Volume: </span>
      <span>{{ global.twoFourVolume }}</span
      ><span class="divide"> | </span>
      <span class="lil-span">Total Cryptocurrencies: </span
      ><span>{{ global.totalCrypto }}</span>
    </h3>
    <div class="paginators">
      <template v-if="page != 1">
        <router-link :to="{ name: 'landing', query: { page: page - 1 } }"
          >Prev Page
        </router-link>
        <template v-if="hasNextPage"> | </template>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'landing', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </div>
    <b-table
      small
      fixed
      hover
      :fields="fields"
      :items="coins"
      :per-page="perPage"
      :current-page="page"
      @row-clicked="goToCPage"
      class="table"
    ></b-table>
    <div class="paginators">
      <template v-if="page != 1">
        <router-link :to="{ name: 'landing', query: { page: page - 1 } }"
          >Prev Page
        </router-link>
        <template v-if="hasNextPage"> | </template>
      </template>
      <router-link
        v-if="hasNextPage"
        :to="{ name: 'landing', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import store from '@/store.js'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      perPage: 100,
      fields: ['name', 'symbol', 'rank', 'type'],
      coins: null,
      global: {
        cap: null,
        twoFourVolume: null,
        totalCrypto: null
      },
      timer: '',
      id: this.$route.params.id,
      message: ''
    }
  },
  created() {
    this.getGlobal()
    this.getCoins()
    this.timer = setInterval(this.getGlobal, 7500)
  },
  methods: {
    goToCPage(record) {
      store.dispatch('goToCoinPage', {
        id: record.id
      })
    },
    getGlobal() {
      EventService.getGlobal().then(response => {
        this.global.twoFourVolume = response.data.volume_24h_usd
        this.global.cap = response.data.market_cap_usd
      })
    },
    getCoins(perPage, page) {
      EventService.getCoins(perPage, page).then(response => {
        this.global.totalCrypto = response.data.length
        this.coins = response.data
      })
    },
    search() {
      this.$store.state.searchLoaded = false
      this.$router.push('/search/' + this.message)
    },
    ...mapActions(['goToCoinPage'])
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.global.totalCrypto > this.page * this.perPage
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.searchbar {
  margin-bottom: 25px;
}
.paginators {
  margin-top: 10px;
  margin-bottom: 10px;
}
.lil-span {
  font-size: 20px;
  color: grey;
}
.divide {
  color: #39b982;
}
</style>
