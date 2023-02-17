<template>
  <div class="container"
    :style="{ width: containerSize.width * blockSize + 'px', height: containerSize.height * blockSize + 'px' }">
    <template v-if="blockGroupView">
      <component :is="blockGroupView.show()"></component>
    </template>
    <template v-for="item in block_divs" :key="item[1].id">
      <component :is="item[1]"></component>
    </template>
  </div>
  <button @click="game_start">start</button>
  <button @click="game_stop">stop</button>
<button @click="game_suspend">suspend</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type BlockGroupView from './class/block/blockGroupView'
import Controller from './class/game/controller'
import { blockSize, containerSize } from './container/config'
import block_divs from '@/store/blockDivs'
const blockGroupView = ref<BlockGroupView>()
const game_start = () => {
  Controller.start(blockGroupView)
}
const game_stop = () => {
  Controller.gameOver()
}
const game_suspend = () => {
  Controller.goon()
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  position: relative;
  margin: 100px auto 0;
  background-color: black;
  // overflow: hidden;
}
</style>