import type BlockViewClass from '@/class/block/blockViewClass'
import { reactive } from 'vue'

const block_divs = reactive<Map<number, BlockViewClass>>(new Map())
export default block_divs