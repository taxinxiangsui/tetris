import type { Point } from "@/assets/types/types";
import { blockSize } from "@/container/config";
import { h } from "vue";
import type Block from "./block";
import BlockView from './blockView.vue'
export default class BlockViewClass {
    get block() {
        return this._block
    }
    constructor(private _block: Block) { }
    show(color: string, point: Point) {
        return h(
            BlockView,
            {
                id: this._block.id,
                color,
                size: blockSize,
                position: {
                    left: point.x * blockSize + 'px',
                    top: point.y * blockSize + 'px',
                }
            }
        )
    }
}