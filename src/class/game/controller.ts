import { blockSize, color } from "@/container/config"
import type { Ref } from "vue"
import BlockGroup from "../block/blockGroup"
import BlockGroupView from "../block/blockGroupView"
import container from "../container/container"
import creatShape from "../core/creatShape"
import block_divs, { isGameOver } from '@/store/blockDivs'
import BlockViewClass from "../block/blockViewClass"
import { integral } from "@/store/blockDivs"
export default class Controller {
    private static delay: number = 600
    private static _timer?: number
    private static _blockGroup: BlockGroup
    private static _nextBlockGroup: BlockGroup
    private static _blockGroupViewRef: Ref<BlockGroupView | undefined>
    private static _nextBlockGroupViewRef: Ref<BlockGroupView | undefined>
    static start(blockGroupView: Ref<BlockGroupView | undefined>, nextBlockGroupView: Ref<BlockGroupView | undefined>) {
        integral.value = 0
        this._blockGroupViewRef = blockGroupView
        this._nextBlockGroupViewRef = nextBlockGroupView
        this.keydown()
        this.cteateBlockGroupHandler()
        this.cerateNewBlockGroup()
            .then(() => {
                this.beginToBottom()
            })
    }
    static goon() {
        this.beginToBottom()
    }
    static stop() {
        clearInterval(this._timer)
        if (this._blockGroup.point.y === 0) {
            return isGameOver.value = true
        }
        this.breakUpGroup()
        integral.value += container.setBlockAtPoint(this._blockGroup)
        this.delay = 600 - Math.floor(integral.value / 100) * 50
        this.cerateNewBlockGroup()
            .then(() => {
                this.beginToBottom()
            })
    }
    static gamePause() {
        clearInterval(this._timer)
    }
    private static beginToBottom() {
        clearInterval(this._timer)
        this._timer = setInterval(() => {
            this._blockGroup.move('down')
        }, this.delay)
    }
    private static breakUpGroup() {
        this._blockGroupViewRef.value = undefined
        for (const g of this._blockGroup.group) {
            const point = {
                x: this._blockGroup.point.x + g.point.x,
                y: this._blockGroup.point.y + g.point.y
            }
            g.viewer = new BlockViewClass(g, point)
            block_divs.set(g.id, g.viewer)
        }
    }
    private static cerateNewBlockGroup() {
        return new Promise((resolve) => {
            this._blockGroup = this._nextBlockGroup
            this._blockGroup.point = { x: 5, y: 0 }
            this._blockGroupViewRef.value = this._nextBlockGroupViewRef.value
            this.cteateBlockGroupHandler()
            resolve('')
        })
    }
    private static cteateBlockGroupHandler() {
        const [shape, shapeType] = creatShape()
        this._nextBlockGroup = new BlockGroup(shape, shapeType, color, blockSize, { x: 1, y: 2 })
        this._nextBlockGroup.viewer = new BlockGroupView(this._nextBlockGroup)
        this._nextBlockGroupViewRef.value = this._nextBlockGroup.viewer
    }
    private static keydown() {
        document.addEventListener('keydown', (e) => {
            const { key } = e
            if (this._blockGroup.viewer) {
                if (key === 'ArrowDown') {
                    this._blockGroup.move('bottom')
                } else if (key === 'ArrowLeft') {
                    this._blockGroup.move('left')
                } else if (key === 'ArrowRight') {
                    this._blockGroup.move('right')
                } else if (key === 'ArrowUp') {
                    this._blockGroup.rotate()
                }
            }
        })
    }
}