import Utils from "../libs/common/Util";
import PiceConst from "./PiceConst";
import Borad from "./Board";

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
export default class NewPices extends cc.Component {

    @property(cc.Prefab)
    picePrefab:cc.Prefab = null;

    @property([cc.Node])
    newPices:cc.Node[] = [];

    @property([cc.SpriteFrame])
    colorAry:cc.SpriteFrame[] = [];

    @property(cc.AudioClip)
    drag1:cc.AudioClip = null;

    @property(cc.AudioClip)
    drag2:cc.AudioClip = null;

    @property(cc.AudioClip)
    canotDrop1:cc.AudioClip;

    @property(cc.AudioClip)
    canotDrop2:cc.AudioClip = null;

    @property(cc.AudioClip)
    success1:cc.AudioClip = null;

    @property(cc.AudioClip)
    success2:cc.AudioClip = null;

    @property(cc.AudioClip)
    success3:cc.AudioClip = null;


    @property(cc.Node)
    borad:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    boardClass:Borad = null;

    checkGridList:Array<cc.Node> = [];
    checkPiceList:Array<cc.Node> = [];

    piceNodePosAry:Array<cc.Vec2> = [];
    onLoad () 
    {
        this.boardClass = this.borad.getComponent("Board");
        //初始化新生成的形状
        this.initPices();
    }

    //初始化新块
    initPices()
    {
        let count = this.newPices.length;
        for (let index = 0; index < count; index++)
        {
            let newPiceNode = this.newPices[index];
            let piceCon = this.createPice();
            piceCon.parent = newPiceNode;
            this.piceNodePosAry.push(newPiceNode.position);
            this.addTouchEvent(newPiceNode);
        }
    }

    //随机创建一个新的块
    createPice():cc.Node
    {
        let piceCon = new cc.Node("piceCon");
        let randomIndex = Utils.randomInt(0,PiceConst.configLists.length - 1);
        let posList = PiceConst.configLists[randomIndex];
        let randomColor = Utils.randomInt(1,4);
        let count = 0;
        let sumX = 0;
        let sumY = 0;
        let sumW = 0;//总宽度
        let sumH = 0;//总高度
        for (let index = 0; index < posList.length; index++) 
        {
            count ++;
            let pos = posList[index];
            let pice = cc.instantiate(this.picePrefab);
            let colorSprite:cc.Sprite = pice.getChildByName("colorSp").getComponent(cc.Sprite);
            colorSprite.spriteFrame = this.colorAry[randomColor];
            pice.setPosition(pos);
            sumX += pos.x;
            sumY += pos.y;
            pice.parent = piceCon;
        }
        // cc.log(piceCon.getContentSize().width);
        // let trueX = -sumX/count + w * (1 - 0.7)/2;
        piceCon.setScale(0.7);
        piceCon.setPosition(-sumX/count,-sumY/count);
        return piceCon;
    }

    
    //监听事件处理
    addTouchEvent(piceNode)
    {
        piceNode.on(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        piceNode.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        piceNode.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancelOrEnd,this);
        piceNode.on(cc.Node.EventType.TOUCH_END,this.touchCancelOrEnd,this);
    }
    removeEvent(piceNode)
    {
        piceNode.off(cc.Node.EventType.TOUCH_START,this.touchStart,this)
        piceNode.off(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        piceNode.off(cc.Node.EventType.TOUCH_CANCEL,this.touchCancelOrEnd,this);
        piceNode.off(cc.Node.EventType.TOUCH_END,this.touchCancelOrEnd,this);
    }

    touchStart(evt)
    {
        let piceNode = evt.currentTarget;
        let upH:number = 50;
        let pice = piceNode.getChildByName("piceCon");
        piceNode.y += upH;
        pice.setScale(1);
        // cc.audioEngine.playEffect(this.drag1,false);
    }
    touchMove(evt)
    {
        let piceNode = evt.currentTarget;
        let delta = evt.touch.getDelta();
        piceNode.x += delta.x;
        piceNode.y += delta.y;

        this.checkGridCollide(piceNode);
        this.changeColor(this.checkCanDrop(piceNode));
    }
    touchCancelOrEnd(evt)
    {
        let piceNode = evt.currentTarget;
        this.dropDownFun(piceNode);
    }
   

    /**
     * 碰撞检测
     * @param piceNode 拖拽的块
     */
    checkGridCollide(piceNode)
    {
        this.checkGridList = [];
        this.checkPiceList = [];

        let piceList = piceNode.children[0].children;//当前拖拽的形状
        for (let index = 0; index < piceList.length; index++) 
        {
            let pice = piceList[index];
            let picePos = pice.position.add(piceNode.children[0].position).add(piceNode.position).add(this.node.position);
            let grid = this.checkPosFun(picePos);
            if(grid)//找到了可以放入的格子
            {
                this.checkGridList.push(grid);
                this.checkPiceList.push(pice);
            }
        }
    }

    checkPosFun(pos)
    {
        let len = 27;//设置碰撞距离
        let boardList = this.boardClass.gridBoradList;
        for (let index = 0; index < boardList.length; index++) 
        {
            let grid = boardList[index];
            let gridClass = grid.getComponent("Grid");
            let dis = grid.position.add(grid.parent.position).sub(pos).mag();
            if(dis <= len && !gridClass.hasPice)
            {
                return grid;
            }
        }
        return null;
    }

    /**
     * 检测是否能放下
     * @param piceNode 拖拽的块
     */
    checkCanDrop(piceNode)
    {
        //没找到或者或者有块超出格子了
        let piceCon = piceNode.getChildByName("piceCon")
        if(this.checkGridList.length == 0 || this.checkGridList.length != piceCon.children.length)
        {
            return false;
        }
        for (let index = 0; index < this.checkGridList.length; index++) 
        {
            let gridClass = this.checkGridList[index].getComponent("Grid");
            if(gridClass.hasPice)return false;
        }
        return true;
    }

    /**
     * 是否变换颜色
     * @param piceNode 拖拽的块
     */
    changeColor(isChange)
    {
        let boardList = this.boardClass.gridBoradList;
        for (let i = 0; i < boardList.length; i++) 
        {
            let gridClass = boardList[i].getComponent("Grid");
            gridClass.changeState(false);
        }
        if(isChange)
        {
            
            for (let j = 0; j < this.checkGridList.length; j++) 
            {
                let dropGridClass = this.checkGridList[j].getComponent("Grid");
                dropGridClass.changeState(isChange);
            }
        }
    }

    /**
     * 取消或者放下处理
     * 1：如果取消，则直接移回不处理
     * 2：放下：a:不能放：移回去；b:能放，设置放置逻辑，派发事件通知棋盘处理（消除或者失败逻辑）
     */
    dropDownFun(piceNode)
    {
        if(!this.checkCanDrop(piceNode))
        {
            this.moveBack(piceNode);
            cc.audioEngine.playEffect(this.canotDrop1,false);
            return;
        }

        for (let index = 0; index < this.checkPiceList.length; index++) 
        {
            let pice = this.checkPiceList[index];
            let grid = this.checkGridList[index];
            pice.setPosition(0,0);
            pice.parent = grid;
            grid.getComponent("Grid").hasPice = true;
        }

        //对棋盘派发事件
        this.boardClass.tempPiceCount = this.checkPiceList.length;
        this.boardClass.node.emit("successDropDown");

        //从新生成一个块
        piceNode.removeAllChildren();
        this.removeEvent(piceNode);
        let piceCon = this.createPice();
        piceCon.parent = piceNode;
        this.moveBack(piceNode);
        this.addTouchEvent(piceNode);

        let ranC = Utils.randomInt(1,3);
        cc.audioEngine.playEffect(this["Success" + ranC],false);

        this.boardClass.checkIsLose();
    } 

    moveBack(piceNode)
    {
        this.checkGridList = [];
        this.checkPiceList = [];
        this.changeColor(false);

        let pice = piceNode.getChildByName("piceCon");
        let index = this.newPices.indexOf(piceNode);
        pice.setScale(0.7);
        piceNode.setPosition(this.piceNodePosAry[index]);
    }

    //检测是否所有新块都无法放入
    checkAllClose()
    {
        let canDrop:boolean = false;
        for(let index = 0; index < this.newPices.length; index++)
        {
            let newPiceNode = this.newPices[index];
            if(this.checkOneCanDrop(newPiceNode))
            {
                canDrop = true;
            }
        }
        return canDrop;
    }
    //判断某个新出的能否放入
    checkOneCanDrop(piceNode)
    {
        let canDropPosCount = 0;//在格子棋盘中所能放下的位置个数
        let piceList = piceNode.getChildByName("piceCon").children;
        let boardList = this.boardClass.gridBoradList;
        for (let i = 0; i < boardList.length; i++) //这一层的遍历是以格子为主，遍历到每个位置
        {
            let gridClass = boardList[i].getComponent("Grid");   
            let count = 1;
            if(!gridClass.hasPice)
            {
                for (let j = 0; j < piceList.length; j++) //这里同放入时候逻辑一样，以新块为主
                {
                    let pice = piceList[j];
                    let picePos = pice.position.add(piceNode.children[0].position).add(piceNode.position).add(this.node.position);
                    let findGrid = this.checkPosFun(picePos);
                    if(findGrid)
                    {
                        count ++;
                    }
                }
            }   
            if(count == piceList.length)
            {
                canDropPosCount ++;
            }
        }
        
        return canDropPosCount > 0;
    }

    start () {

    }

    // update (dt) {}
}
