import { reactive, type VNode } from 'vue'

const block_divs = reactive<Map<string, VNode>>(new Map())
export default block_divs