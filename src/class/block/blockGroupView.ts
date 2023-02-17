import { h, TransitionGroup } from "vue";
import type BlockGroup from "./blockGroup";
import BlockView from './blockView.vue'
export default class BlockGroupView {
    private _isShow: boolean = false
    get isShow() {
        return this._isShow
    }
    constructor(private _blockGroup: BlockGroup) { }
    show() {
        this._isShow = true
        return h(
            TransitionGroup,
            () => this._blockGroup.group.map(g =>
                h(
                    BlockView,
                    {
                        key: g.id,
                        id: g.id,
                        color: this._blockGroup.color,
                        size: this._blockGroup.size,
                        position: {
                            left: (g.point.x + this._blockGroup.point.x) * this._blockGroup.size + 'px',
                            top: (g.point.y + this._blockGroup.point.y) * this._blockGroup.size + 'px',
                        }
                    }
                )
            )
        )
    }
}