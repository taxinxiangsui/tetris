import type { Point } from "@/assets/types/types";
import { containerSize } from "@/container/config";
import block_divs from "@/store/blockDivs";
import type { VNode } from "vue";
class Container {
    private _coordinate: Map<string, boolean> = new Map()
    setBlockAtPoint(shape: Point[], centerPoint: Point): number[] {
        const result: number[] = []
        for (const s of shape) {
            const point = { x: s.x + centerPoint.x, y: s.y + centerPoint.y }
            this._coordinate.set(JSON.stringify(point), true)
            const isRowFull = Array.from({ length: containerSize.width })
                .every((_, i) => this._coordinate.get(`{"x":${i},"y":${point.y}}`))
            if (isRowFull) {
                result.push(point.y)
            }
        }
        if (result.length) {
            this.reSetBlockAtPoint(result)
        }
        return result
    }
    hasBlockAtPoint(point: Point): boolean {
        const p = JSON.stringify(point)
        return this._coordinate.get(p) ?? false
    }
    private reSetBlockAtPoint(result: number[]) {
        for (let h = 0; h < result.length; h++) {
            for (let w = 0; w < containerSize.width; w++) {
                let point
                block_divs.delete(`{"x":${w},"y":${result[h]}}`)
                if (h !== result.length - 1) {
                    if (!result.includes(h + 1)) {

                    }
                }

            }
        }
        // const newCoordinate = Array.from(this._coordinate.entries())
        //     .filter(v => v[1] && JSON.parse(v[0]).y < result[0])

        // // newCoordinate.reduce((previous,current)=>)
        // for (const p of newCoordinate) {
        //     const newP = `{"x":${JSON.parse(p[0]).x},"y":${JSON.parse(p[0]).y + result.length}}`
        //     this._coordinate.set(p[0], false)
        //     this._coordinate.set(newP, true)
        // }
    }
}
const container = new Container()

export default container