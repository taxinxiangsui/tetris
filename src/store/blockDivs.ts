import type BlockViewClass from '@/class/block/blockViewClass'
import { reactive, ref } from 'vue'

const block_divs = reactive<Map<number, BlockViewClass>>(new Map())
export const integral = ref(0)
export const isGameOver = ref(false)
export default block_divs