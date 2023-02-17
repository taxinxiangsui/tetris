import type { Point } from "@/assets/types/types";
import { containerSize } from "@/container/config";
import container from "../container/container";

export default class MoveRule {
    static canMove(shape: Point[], targetPoint: Point): boolean {
        const { width, height } = containerSize
        const { x: targetX, y: targetY } = targetPoint
        for (const s of shape) {
            const x = s.x + targetX
            const y = s.y + targetY
            if (x < 0 || x === width || y === height) {
                return false
            }
            if (container.hasBlockAtPoint({ x, y })) {
                return false
            }
        }
        return true
    }
}