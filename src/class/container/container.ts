import type { Point } from "@/assets/types/types";
import { containerSize } from "@/container/config";
import block_divs from "@/store/blockDivs";
import type BlockGroup from "../block/blockGroup";
class Container {
    private _curHeight: number = containerSize.height - 1
    private _coordinate: Map<string, number> = new Map()
    setBlockAtPoint(blockGroup: BlockGroup): number {
        const result: number[] = []
        for (const g of blockGroup.group) {
            const point = { x: g.point.x, y: g.point.y }
            this._curHeight = Math.min(this._curHeight, g.point.y)
            this._coordinate.set(JSON.stringify(point), g.id)
            const isRowFull = Array.from({ length: containerSize.width })
                .every((_, i) => this._coordinate.get(`{"x":${i},"y":${point.y}}`))
            if (isRowFull) {
                result.push(point.y)
            }
        }
        if (result.length) {
            this.reSetBlockAtPoint(result)
        }
        return result.length
    }
    hasBlockAtPoint(point: Point): boolean {
        const p = JSON.stringify(point)
        return this._coordinate.get(p) ? true : false
    }
    private reSetBlockAtPoint(result: number[]) {
        result.sort((a, b) => b - a)
        for (let h = 0; h < result.length; h++) {
            for (let w = 0; w < containerSize.width; w++) {
                const point = JSON.stringify({ x: w, y: result[h] })
                const id = this._coordinate.get(point)
                this._coordinate.delete(point)
                block_divs.delete(id as number)
            }
        }
        let bottom = result[0]
        let isRowEmpty = true
        for (let i = result[0] - 1; i >= this._curHeight; i--) {
            for (let w = 0; w < containerSize.width; w++) {
                const point = JSON.stringify({ x: w, y: i })
                const id = this._coordinate.get(point)
                while (id && block_divs.get(id)?.block.down(bottom)) { }
                if (id) {
                    isRowEmpty = false
                    this._coordinate.delete(point)
                    this._coordinate.set(JSON.stringify({ x: w, y: bottom }), id)
                }
            }
            if (!isRowEmpty) {
                bottom--
            }
            isRowEmpty = true
        }
        this._curHeight += result.length
    }
}
const container = new Container()

export default container
