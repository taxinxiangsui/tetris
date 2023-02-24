import { reactive } from 'vue'
import type BlockViewClass from './blockViewClass'
let block_id: number = 1
export default class Block {
    private _point = reactive<{ x: number, y: number }>({
        x: 0,
        y: 0
    })
    private _id: number = block_id
    private _viewer?: BlockViewClass
    constructor() {
        block_id++
    }
    set viewer(v) {
        this._viewer = v
    }
    get viewer() {
        return this._viewer
    }
    get id() {
        return this._id
    }
    get point() {
        const p = { ...this._point }
        return p
    }
    set point(p) {
        this._point.x = p.x
        this._point.y = p.y
    }
    down(maxDownHeight: number) {
        const { y } = this._point
        if (y + 1 > maxDownHeight) {
            return false
        }
        this._point.y++
        return true
    }
}