export interface Point {
    readonly x: number
    readonly y: number
}
type ShapeO = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
type ShapeI = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
type ShapeJ = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
type ShapeL = [{ x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
type ShapeS = [{ x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }]
type ShapeT = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }]
type ShapeZ = [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
export enum shapeType {
    O,
    I,
    J,
    L,
    S,
    T,
    Z,
}
export type Shape = ShapeO | ShapeI | ShapeJ | ShapeL | ShapeS | ShapeZ | ShapeT