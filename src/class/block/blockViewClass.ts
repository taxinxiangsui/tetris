import type { Point } from "@/assets/types/types";
import { blockSize, color } from "@/container/config";
import { h } from "vue";
import type Block from "./block";
import BlockView from './blockView.vue'
export default class BlockViewClass {
    get block() {
        return this._block
    }
    constructor(private _block: Block, point: Point) {
        this._block.point = point
    }
    show() {
        return h(
            BlockView,
            {
                id: this._block.id,
                color,
                size: blockSize,
                position: {
                    left: this._block.point.x * blockSize + 'px',
                    top: this._block.point.y * blockSize + 'px',
                }
            }
        )
    }
}