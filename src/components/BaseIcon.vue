<template>
  <div class="greendiv">
    <svg
      class="icon"
      :width="width"
      :height="height"
      :fill="color"
      :stroke="stroke"
    >
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#command' }" />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 48,
      height: 48,
      stroke: '#39b982',
      color: 'white'
    }
  }
}
</script>

<style scoped>
.icon {
  position: absolute;
  right: 10px;
}
</style>
