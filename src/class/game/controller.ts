import type { Point } from "@/assets/types/types"
import { blockSize } from "@/container/config"
import type { Ref } from "vue"
import BlockGroup from "../block/blockGroup"
import BlockGroupView from "../block/blockGroupView"
import container from "../container/container"
import creatShape from "../core/creatShape"
import block_divs from '@/store/blockDivs'
import BlockViewClass from "../block/blockViewClass"

export default class Controller {
    private static _isGameOver: boolean = false
    private static _timer?: number
    private static blockGroup: BlockGroup
    private static _blockGroupViewRef: Ref<BlockGroupView | undefined>
    static get isGameOver() {
        return this._isGameOver
    }
    static start(blockGroupView: Ref<BlockGroupView | undefined>) {
        this._blockGroupViewRef = blockGroupView
        this.keydown()
        this.cerateNewBlockGroup(blockGroupView)
            .then(() => {
                this.beginToBottom()
            })
    }
    static goon() {
        this.beginToBottom()
    }
    static stop(shape: Point[], point: Point) {
        clearInterval(this._timer)
        this.breakUpGroup(this.blockGroup)
        const result = container.setBlockAtPoint(shape, point)
        // if (result.length) {
        //     for (let i = 0; i < this._blockArr.length; i++) {
        //         const hasResidue = this._blockArr[i].remove(result)
        //         if (!hasResidue) {
        //             this._blockArr.splice(i, 1)
        //             i--
        //         }
        //     }
        // }
        this.cerateNewBlockGroup(this._blockGroupViewRef)
            .then(() => {
                this.beginToBottom()
            })
    }
    static gameOver() {
        clearInterval(this._timer)
    }
    private static beginToBottom() {
        clearInterval(this._timer)
        this._timer = setInterval(() => {
            this.blockGroup.move('down')
        }, 600)
    }
    static createColor() {
        const color = ['#fff', 'skyblue', 'green', 'red']
        return color[Math.floor(Math.random() * 4)]
    }
    private static breakUpGroup(blockGroup: BlockGroup) {
        for (const g of blockGroup.group) {
            g.viewer = new BlockViewClass(g)
            const point = {
                x: this.blockGroup.point.x + g.point.x,
                y: this.blockGroup.point.y + g.point.y
            }
            block_divs.set(JSON.stringify(point), g.viewer.show(this.blockGroup.color, point))
        }
    }
    private static cerateNewBlockGroup(blockGroupView: Ref<BlockGroupView | undefined>) {
        const [shape, shapeType] = creatShape()
        return new Promise((resolve) => {
            this.blockGroup = new BlockGroup(shape, shapeType, this.createColor(), blockSize, { x: 5, y: 3 })
            this.blockGroup.viewer = new BlockGroupView(this.blockGroup)
            blockGroupView.value = this.blockGroup.viewer
            resolve('')
        })
    }
    private static keydown() {
        document.addEventListener('keyup', (e) => {
            const { key } = e
            if (this.blockGroup.viewer) {
                if (key === 'ArrowDown') {
                    this.blockGroup.move('bottom')
                } else if (key === 'ArrowLeft') {
                    this.blockGroup.move('left')
                } else if (key === 'ArrowRight') {
                    this.blockGroup.move('right')
                } else if (key === 'ArrowUp') {
                    this.blockGroup.rotate()
                }
            }
        })
    }
}