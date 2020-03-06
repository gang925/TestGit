import PiceConst from "./PiceConst";
import Utils from "../libs/common/Util";
import LogSystem from "../libs/common/LogSystem";

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
export default class Game extends cc.Component {

    @property(cc.Node)
    maxScore: cc.Node = null;

    @property(cc.Node)
    score: cc.Node = null;

    @property(cc.Node)
    returnBtn: cc.Node = null;

    @property(cc.Node)
    loseNode:cc.Node = null;

    @property(cc.Node)
    board:cc.Node = null;

    /**
    * 测试完整数组写法
    @property({
        type: [cc.Node], // type 同样写成数组，提高代码可读性
        tooltip: "newPices",
    })
    testAry:cc.Node[] = []; 
    */
    

    onLoad () 
    {
        // MemoryDetector.showMemoryStatus();
        //初始化分数
        let maxLabel = this.maxScore.getComponent(cc.Label);
        maxLabel.string = cc.sys.localStorage.getItem("maxScore") || 0;

        let curLabel = this.score.getComponent(cc.Label);
        curLabel.string = "0";
       
        let collManager = cc.director.getCollisionManager();
        collManager.enabled = true;
        // collManager.enabledDebugDraw = true;

        this.node.on("GameOver",this.gameOver,this);

        LogSystem.warn(1111);
    } 

    start () 
    {

    }

    onReturnClick()
    {
        cc.director.loadScene("Game");
    }

    gameOver()
    {
        this.loseNode.active = true;
        let loseAction = cc.sequence(cc.scaleTo(0.5,1.5),
                                     cc.fadeIn(1));
        this.loseNode.runAction(loseAction);

        let boardClass = this.board.getComponent("Board");
        let oldScore = cc.sys.localStorage.getItem("maxScore");
        if(oldScore < boardClass.getCurScore())
        {
            cc.sys.localStorage.setItem("score", boardClass.getCurScore());
            let maxLabel = this.maxScore.getComponent(cc.Label);
            maxLabel.string = cc.sys.localStorage.getItem("maxScore") || 0;

        }
    }

    onDestroy()
    {
        this.node.off("GameOver",this.gameOver,this);
    }

    // update (dt) {}
}
