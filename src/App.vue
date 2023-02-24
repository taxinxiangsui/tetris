<template>
  <div class="tetris">
    <div class="game">
      <div>
        <div class="container"
          :style="{ width: containerSize.width * blockSize + 'px', height: containerSize.height * blockSize + 'px' }">
          <template v-if="blockGroupView">
            <component :is="blockGroupView.show()"></component>
          </template>
          <template v-for="item in block_divs" :key="item[0]">
            <component :is="item[1].show()"></component>
          </template>
          <template v-if="isGameOver">
            <div class="mask">
              <span>Game Over</span>
            </div>
          </template>
        </div>
        <div style="display: grid;margin-top: 20px;grid-template-columns: repeat(3,1fr);column-gap: 10px;">
          <button @click="game_start">开始游戏</button>
          <button @click="game_pause">暂停</button>
          <button @click="game_continue">继续游戏</button>
        </div>
      </div>
      <div class="tip">
        <span>下一个方块</span>
        <template v-if="nextBlockGroupView">
          <component :is="nextBlockGroupView.show()"></component>
        </template>
        <div class="grade">积分：
          <p style="margin-top: 10px;">{{ integral }}</p>
        </div>
        <p style="margin-top: 200px;">规则：</p>
        <div class="rule">
          <div class="top">↑</div>
          <div class="left">←</div>
          <div class="bottom">↓</div>
          <div class="right">→</div>
        </div>
        <p style="margin-top: 10px;">↑：变换</p>
        <p style="margin-top: 10px;">←：向左</p>
        <p style="margin-top: 10px;">↓：向右</p>
        <p style="margin-top: 10px;">→：向下</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type BlockGroupView from './class/block/blockGroupView'
import Controller from './class/game/controller'
import { blockSize, containerSize } from './container/config'
import block_divs, { integral, isGameOver } from '@/store/blockDivs'
const blockGroupView = ref<BlockGroupView>()
const nextBlockGroupView = ref<BlockGroupView>()
const game_start = () => {
  Controller.start(blockGroupView, nextBlockGroupView)
}
const game_pause = () => {
  Controller.gamePause()
}
const game_continue = () => {
  Controller.goon()
}
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.tetris {
  margin: 20px 300px;

  .game {
    padding: 30px;
    border-radius: 30px;
    background: linear-gradient(to bottom, rgb(235, 187, 98), rgb(231, 116, 116), skyblue);
    width: 650px;
    display: flex;

    button {
      height: 40px;
      border-radius: 10px;
      border: none;
      outline: none;
      user-select: none;

      &:hover {
        outline: 2px solid rgb(73, 175, 82);
      }

      &:active {
        background-color: rgb(225, 223, 223);
      }
    }

    .container {
      position: relative;
      background-color: black;
      overflow: hidden;

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-weight: 600;

        span {
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(to right, rgb(240, 101, 66), purple);
        }

      }
    }
  }

  .tip {
    position: relative;
    margin: 0 auto;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 3px;

    .grade {
      margin-top: 200px;
    }

    .rule {
      margin-top: 20px;
      font-size: 12px;

      color: rgb(98, 96, 96);
      display: grid;
      grid-auto-rows: 40px;
      grid-auto-columns: 40px;
      column-gap: 5px;
      row-gap: 5px;
      grid-template-areas:
        ". t ."
        "l b r";

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #fff;
      }

      .top {
        grid-area: t;
      }

      .left {
        grid-area: l;
      }

      .bottom {
        grid-area: b;
      }

      .right {
        grid-area: r;
      }
    }
  }
}
</style>