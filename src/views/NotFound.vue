<template>
  <div>
    <h2 class="downer">The page was not found</h2>
    <router-link :to="{ name: 'landing' }">Back to Home Page</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.downer {
  margin-bottom: 40px;
}
</style>
