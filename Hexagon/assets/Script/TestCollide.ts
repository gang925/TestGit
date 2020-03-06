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

/**
 * 测试碰撞数据
 */
@ccclass
export default class TestCollide extends cc.Component 
{


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    isInGrid:boolean = false;

    start () {

    }

    onCollisionEnter(other,self)
    {
        var otherAabb = other.world.aabb;   
        var selfAabb  = self.world.aabb;
        
        var otherPreAabb = other.world.aabb.clone() 
        var selfPreAabb = self.world.aabb.clone();

        cc.log(self.world.points);
        for (const key in otherPreAabb) {
            if (otherPreAabb.hasOwnProperty(key)) {
                cc.log("key--" + key + " ,"+"value--" + otherPreAabb[key]);
                
            }
        }
    }

    onCollisionStay(other,self)
    {
        var otherAabb = other.world.aabb.clone();   
        var selfAabb  = self.world.aabb.clone();
        let selfPos = cc.v2(selfAabb.x - 320 + 28,selfAabb.y - 480 - 47);
        let otherPos = cc.v2(otherAabb.x - 320 + 22,otherAabb.y - 480 - 47);
        // cc.log("self：" + (selfAabb.x - 320 + 22) + "_" + (selfAabb.y - 480 + 30));
        cc.log("other：" + (otherAabb.x - 320 + 22 + "_" + (otherAabb.y - 480 + 30)));
        // let dis = selfPos.sub(otherPos).mag();
        // // cc.log("相差：" + dis);
        // if(dis < 20)
        // {
        //     this.isInGrid = true;
        // }
        // else
        // {
        //     this.isInGrid = false;
        // }
        // cc.log(this.isInGrid);
    }
    onCollisionExit(other,self)
    {
        cc.log("exit");
    }
    // update (dt) {}
}
