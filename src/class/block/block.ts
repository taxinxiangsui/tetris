import type { Point } from '@/assets/types/types'
import { containerSize } from '@/container/config'
import { reactive } from 'vue'
import container from '../container/container'
import type BlockViewClass from './blockViewClass'
let block_id: number = 0
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
    down() {
        const { width, height } = containerSize
        const { x, y } = this._point
        if (x < 0 || x === width || y === height) {
            return
        }
        if (container.hasBlockAtPoint({ x, y })) {
            return
        }
    }

}