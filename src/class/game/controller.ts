import { blockSize, color } from "@/container/config"
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
    static stop() {
        clearInterval(this._timer)
        this.breakUpGroup(this.blockGroup)
        container.setBlockAtPoint(this.blockGroup)
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
    private static breakUpGroup(blockGroup: BlockGroup) {
        this._blockGroupViewRef.value = undefined
        for (const g of blockGroup.group) {
            const point = {
                x: this.blockGroup.point.x + g.point.x,
                y: this.blockGroup.point.y + g.point.y
            }
            g.viewer = new BlockViewClass(g, point)
            block_divs.set(g.id, g.viewer)
        }
    }
    private static cerateNewBlockGroup(blockGroupView: Ref<BlockGroupView | undefined>) {
        const [shape, shapeType] = creatShape()
        return new Promise((resolve) => {
            this.blockGroup = new BlockGroup(shape, shapeType, color, blockSize, { x: 5, y: 3 })
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