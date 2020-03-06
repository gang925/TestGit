export class UINodeContiner
{
    //所有节点的合集
    private _uiNodeMap:Map<string,cc.Node>;

    public constructor(nodeMap:Map<string,cc.Node>)
    {
        this._uiNodeMap = nodeMap;
    }

    //根据节点名字获取节点
    public getNode(name:string):cc.Node
    {
        return this._uiNodeMap.get(name);
    }

    //根据节点和组件名字获取组件对象
    public getComponent<T extends cc.Component>(name:string,com:{prototype:T}):T
    {
        let node = this.getNode(name);
        if(node)
        {
            return node.getComponent(com);
        }
        return null;
    }

    
}