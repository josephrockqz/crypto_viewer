<template>
  <div>
    <div>
      <h2>{{ id }} information</h2>
      <b-table :items="stuff1" stacked></b-table>
    </div>
    <div>
      <h2 class="headergang">{{ id }} OHLCV</h2>
      <b-table :items="ohlcv" stacked></b-table>
    </div>
    <div>
      <h2>Twitter feed</h2>
      <div v-for="tweet in twitter" :key="tweet.status_id" class="tweet">
        <div class="top-part">
          <img :src="tweet.user_image_link" alt="User Image" />
          <span class="username">{{ tweet.user_name }}</span>
          <span class="date">{{ tweet.date | date }}</span>
        </div>
        <p class="status">{{ tweet.status }}</p>
        <span>Retweets: {{ tweet.retweet_count }}</span> |
        <span>Likes: {{ tweet.like_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      fields: ['id', 'name', 'symbol', 'rank', 'is_new', 'is_active', 'type'],
      data: {
        id: null,
        name: null,
        symbol: null,
        rank: null,
        is_new: null,
        is_active: null,
        type: null
      },
      ohlcv: null,
      twitter: [],
      timer: ''
    }
  },
  methods: {
    getCoinInfo() {
      EventService.getCoinInfo(this.id).then(response => {
        this.data.id = response.data['id']
        this.data.name = response.data['name']
        this.data.symbol = response.data['symbol']
        this.data.rank = response.data['rank']
        this.data.is_new = response.data['is_new']
        this.data.is_active = response.data['is_active']
        this.data.type = response.data['type']
      })
    },
    getOhlcv() {
      EventService.getOhlcv(this.id).then(response => {
        this.ohlcv = response.data
      })
    },
    getCoinTwitter() {
      EventService.getCoinTwitter(this.id).then(response => {
        this.twitter = response.data
      })
    }
  },
  created() {
    this.getCoinInfo()
    this.getOhlcv()
    this.getCoinTwitter()
    this.timer = setInterval(this.getCoinTwitter, 15000)
  },
  computed: {
    stuff1() {
      return [
        {
          id: this.data.id,
          name: this.data.name,
          symbol: this.data.symbol,
          rank: this.data.rank,
          is_new: this.data.is_new,
          is_active: this.data.is_active,
          type: this.data.type
        }
      ]
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style>
.headergang {
  margin-top: 35px;
}
.tweet {
  width: 800px;
  border-top: 2px solid #39b982;
  border-left: 2px solid #39b982;
  border-right: 2px solid #39b982;
  margin: 0 auto;
}
.username {
  margin-left: 15px;
  margin-right: 20px;
}
.status {
  width: 350px;
  margin-left: 220px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.top-part {
  margin-top: 5px;
}
</style>
