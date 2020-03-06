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
export default class TipMovie extends cc.Component {



    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.node.setPosition(0,0);
        this.node.runAction(cc.sequence(
                            cc.spawn(cc.fadeOut(1),cc.moveBy(1,cc.v2(0,100))),  
                            cc.removeSelf(true)
                            ));                         
    }

    start () {

    }

    // update (dt) {}
}
