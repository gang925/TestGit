
const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component 
{

    @property(cc.Node)
    startBtn:cc.Node = null;

    @property(cc.AudioClip)
    bgm:cc.AudioClip = null;

    loadSuccess:boolean = true;

    resList = ["anims","fonts","pics"];

    onLoad()
    {
        cc.audioEngine.playMusic(this.bgm,true);

        // //预加载资源
        // // ResLoader.getInstance().loadRes(resList);
        // cc.log("加载开始");
        // let count = 0;
        // let self = this;
        // for (let index = 0; index < self.resList.length; index++) 
        // {
        //     cc.loader.loadResDir(self.resList[index],function(err,res)
        //     {
        //         if(res)count++;
        //         cc.log("load count" + count);
        //         if(count >= self.resList.length)
        //         {
        //             cc.log("预加载完成");
        //             self.loadSuccess = true;
        //         }
        //     });
        // }
    }

    start (){
        
    }

    startOnClick(evt,data)
    {
        if(this.loadSuccess)
        {
            cc.director.loadScene("Game");
        }
    }
}
