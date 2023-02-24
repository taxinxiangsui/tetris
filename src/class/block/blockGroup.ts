import { shapeType, type Point } from "@/assets/types/types";
import { reactive } from "vue";
import Controller from "../game/controller";
import MoveRule from "../rules/BlockMoveRule";
import Block from "./block";
import type BlockGroupView from "./blockGroupView";

type Direction = 'left' | 'right' | 'bottom' | 'down'
const isPoint = (obj: any): obj is Point => {
    if (typeof obj === 'object') {
        return true
    }
    return false
}
export default class BlockGroup {
    private _group: Block[] = []
    private _viewer?: BlockGroupView
    private CP_reactive = reactive({
        x: 0,
        y: 0
    })
    private _canMove: boolean = true
    set point(p) {
        this.CP_reactive.x = p.x
        this.CP_reactive.y = p.y
    }
    get point() {
        return { ...this.CP_reactive }
    }
    set group(g) {
        this._group = g
    }
    get group() {
        return this._group
    }
    set viewer(v) {
        this._viewer = v
    }
    get viewer() {
        return this._viewer
    }
    get size() {
        return this._size
    }
    set shape(s: Point[]) {
        this._shape = s
    }
    constructor(
        private _shape: Point[],
        private _shapeType: shapeType,
        public color: string,
        private _size: number,
        private _originalCenterPoint: Point
    ) {
        for (const s of this._shape) {
            const block = new Block()
            block.point = {
                x: s.x,
                y: s.y
            }
            this._group.push(block)
        }
        this.CP_reactive.x = this._originalCenterPoint.x
        this.CP_reactive.y = this._originalCenterPoint.y
    }
    move(pointOrDirection: Point | Direction) {
        if (!this._canMove) {
            return
        }
        if (isPoint(pointOrDirection)) {
            if (MoveRule.canMove(this._shape, pointOrDirection)) {
                this.CP_reactive.x = pointOrDirection.x
                this.CP_reactive.y = pointOrDirection.y
            }
        } else {
            const direction = pointOrDirection
            if (direction === 'left' && MoveRule.canMove(this._shape, { x: this.CP_reactive.x - 1, y: this.CP_reactive.y })) {
                this.CP_reactive.x -= 1
            } else if (direction === 'right' && MoveRule.canMove(this._shape, { x: this.CP_reactive.x + 1, y: this.CP_reactive.y })) {
                this.CP_reactive.x += 1
            } else if (direction === 'down' && MoveRule.canMove(this._shape, { x: this.CP_reactive.x, y: this.CP_reactive.y + 1 })) {
                this.CP_reactive.y += 1
            } else if (direction === 'bottom') {
                while (this._canMove) {
                    this.move('down')
                }
            } else if (direction === 'down' && !MoveRule.canMove(this._shape, { x: this.CP_reactive.x, y: this.CP_reactive.y + 1 })) {
                Controller.stop()
                this._canMove = false
            }
        }
    }
    rotate() {
        if (this._shapeType === shapeType.O) {
            return
        }
        if (this._shapeType === shapeType.S || this._shapeType === shapeType.I || this._shapeType === shapeType.Z) {
            this.halfRotate()
        } else {
            this.rotateHandle('anticlockwise')
        }

    }
    onlyDown(num: number) {
        this.CP_reactive.y += num
    }
    private rotateHandle(direction: 'clockwise' | 'anticlockwise') {
        const getPoint = (p: Point): Point => {
            if (direction === 'clockwise') {
                return {
                    x: - p.y,
                    y: p.x
                }
            } else {
                return {
                    x: p.y,
                    y: -p.x
                }
            }
        }
        const newShape: Point[] = this._group.map(g => getPoint(g.point))
        if (MoveRule.canMove(newShape, this.CP_reactive)) {
            this._group.forEach(g => {
                g.point = getPoint(g.point)
            })
            this._shape = newShape
        }
    }
    private _isRotate: boolean = false
    private halfRotate() {
        this._isRotate = !this._isRotate
        if (this._isRotate) {
            this.rotateHandle('anticlockwise')
        } else {
            this.rotateHandle('clockwise')
        }
    }
}