import { type Shape, shapeType, type Point } from "../../assets/types/types"

const shape: Record<shapeType, Shape> = {
    [shapeType.O]: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 }
    ],
    [shapeType.I]: [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
    ],
    [shapeType.J]: [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 }
    ],
    [shapeType.L]: [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ],
    [shapeType.S]: [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 }
    ],
    [shapeType.T]: [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 }
    ],
    [shapeType.Z]: [
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ]
}
const creatShape = (): [Point[], shapeType] => {
    const randomShape = Math.floor(Math.random() * Object.keys(shape).length)
    return [shape[randomShape as shapeType], randomShape as shapeType]
}
export default creatShape