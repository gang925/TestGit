// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Grid extends cc.Component {

    @property(cc.Node)
    light: cc.Node = null;

    @property
    hasPice:boolean = false;//当前格子是否有方块

    index:number = -1;//格子所在下标

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.hasPice = false;
    }

    changeState(isCanDrop)
    {
        this.light.active = isCanDrop;
    }

    // update (dt) {}
}
