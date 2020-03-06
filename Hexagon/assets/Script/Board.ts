import PiceConst from "./PiceConst";

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
export default class Board extends cc.Component 
{
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Prefab)
    gridPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    tipPrefab:cc.Prefab = null;

    @property(cc.Prefab)
    boomEffPrefab:cc.Prefab = null;

    @property(cc.Node)
    newPiceNode:cc.Node = null;

    gridBoradList = [];
    tempPiceCount:number = 0;//每次临时存储放置的块的数量

    isDeleting:boolean = false;

    gameClass = null;

    curScore:number = 0;

    onLoad () 
    {
        //初始化格子
        this.initBoard();
        this.isDeleting = false;
        this.node.on("successDropDown",this.dropDownFun,this);
        this.gameClass = cc.find("Canvas").getComponent("Game");
    }

    initBoard()
    {
        //初始化新产生的块
        var indexCount = 0;
        let rowCount = PiceConst.COL_COUNT.length;
        for (let i = 0; i < rowCount; i++) 
        {  
            let col = PiceConst.COL_COUNT[i];
            for (let j = 0; j < col; j++)
            {
                let grid = cc.instantiate(this.gridPrefab);
                grid.setPosition(PiceConst.getGridV2Pos(j,col,i)); 
                // cc.log(grid.position.x + "_" +grid.position.y);
                grid.parent = this.node;
                grid.getComponent("Grid").index = indexCount;
                this.gridBoradList.push(grid);
                indexCount ++;
            }
        }
    }

    //收到成功放下事件
    dropDownFun(argument)
    {
        let self = this;
        self.addScore(self.tempPiceCount,true);

        let hasPiceList = [];
        for (let index = 0; index < self.gridBoradList.length; index++) 
        {
            let grid = self.gridBoradList[index];
            let gridClass = grid.getComponent("Grid");
            if(gridClass.hasPice)
            {
                hasPiceList.push(gridClass.index);
            }
        };
        hasPiceList.sort(function(a,b)
        {
            return a - b;
        });

        var xcList = [];
        for (let index = 0; index < PiceConst.DIS_LIST.length; index++)
        {
            let oneXcList = PiceConst.DIS_LIST[index];
            let intersectAry = self.get2AryIntersect(hasPiceList, oneXcList);
            if(intersectAry.length > 0)
            {
                let isXC = self.check2AryIsEqual(oneXcList, intersectAry);
                if(isXC)
                {
                    xcList.push(oneXcList);
                    // cc.audioEngine.playEffect(this.xiaochuSound)
                }
            }
        }
        var actionAry = [];//要执行消除的动画
        var count = 0;
        for (let index = 0; index < xcList.length; index++)
        {
            let oneList = xcList[index];
            for (var j = 0; j < oneList.length; j++) 
            {
                var xIndex = oneList[j];
                let curGrid = self.gridBoradList[xIndex];
                let curGridClass = curGrid.getComponent("Grid");
                actionAry.push(cc.callFunc(function(){
                    var xIndex = arguments[1][0]
                    var count = arguments[1][1]
                    var effNode = cc.instantiate(this.boomEffPrefab)
                    this.gridBoradList[xIndex].addChild(effNode);                   
                }, self, [xIndex, count]))

                actionAry.push(cc.callFunc(function()
                {
                    var xIndex = arguments[1]
                    curGridClass.hasPice = null;
                    var picePrefab = curGrid.getChildByName("picePrefab");
                    if (!picePrefab) {
                        return//防止没有这个方块的时候
                    }
                    //FKNode.removeFromParent()

                    // FKNode.cascadeOpacity = true
                    //这个假方块变大并且渐隐掉
                    picePrefab.runAction(cc.sequence(
                        cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)),
                        cc.removeSelf(true)
                    ))
                    
                }, this, xIndex))

                actionAry.push(cc.delayTime(0.1))
                count++;
            }
        }

        if (actionAry.length > 0) 
        {
            actionAry.push(cc.callFunc(function()
            {
                self.isDeleting = false;
                this.checkIsLose();
            }, self))

            self.isDeleting = true;
            var action = cc.sequence(actionAry);
            self.node.runAction(action);

            //加分
            self.addScore(count,false);
        }
    }

    get2AryIntersect(ary1,ary2)
    {
        let intersectAry = []
        for (let i = 0; i < ary1.length; i++) 
        {
            for (let j = 0; j < ary2.length; j++)
            {
                if(ary2[j] == ary1[i])
                {
                    intersectAry.push(ary2[j]);
                }
            }
        }
        return intersectAry;
    }

    //检查两个数组是否相等
    check2AryIsEqual(ary1,ary2)
    {
        for (var i = 0; i < ary1.length; i++)
        {
            if(ary2[i] != ary1[i])
            {
                return false;
            }
        }
        return true;
    }

    //加分，是放下/消除
    addScore(score,isDrop)
    {
        let node = cc.find("Canvas/score/scoreText");
        let socreLabel = node.getComponent(cc.Label);

        let nowScore = Number(socreLabel.string) + this.getAddScoreCal(score,isDrop);
        socreLabel.string = nowScore + "";
        this.curScore = nowScore;

        // 加分飘字
        var tipNode = cc.instantiate(this.tipPrefab);
        tipNode.color = cc.color(211, 70, 50, 255)
        var label = tipNode.getComponent(cc.Label)
        label.string = "+" + this.getAddScoreCal(this.tempPiceCount, true);
        this.node.addChild(tipNode)
    }

    //加分计算公式
    getAddScoreCal(xcCount,isDrop)
    {
        let x = xcCount + 1;
        return isDrop ? x : 2*x*x;
    }

    getCurScore()
    {
        return this.curScore;
    }

    checkIsLose()
    {
        if(this.isDeleting)return;
        let newPiceClass = this.newPiceNode.getComponent("NewPices");
        if(newPiceClass.checkAllClose())
        {
            this.gameClass.node.emit("GameOver");
        }

    }

    start () {

    }

    onDestroy()
    {
        this.node.off("successDropDown",this.dropDownFun,this);
    }

    // update (dt) {}
}
