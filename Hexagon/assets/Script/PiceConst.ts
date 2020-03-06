const NEW_PICE_H:number = 28;
const NEW_PICE_W:number = 32;

export default class PiceConst
{
    public static COL_COUNT:number[] = [5,6,7,8,9,8,7,6,5];//每行格子数
    public static GRID_POS_Y:number[] = [4,3,2,1,0,-1,-2,-3,-4];//计算格子Y坐标用
    public static GRID_SPACEH:number = 28;
    public static GRID_SPACEV:number = 32.5;

    //新生成块的形状列表
    public static configLists = [
            //一个
            [cc.v2(0, 0)],
            //两个
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0)], //横摆
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5)], //斜摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5)], //斜摆2
            //三个
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0)], //横摆

            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5)], //横摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5)], //横摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5)], //堆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5)], //堆2

            [cc.v2(0, 0), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5)], //斜摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, NEW_PICE_W * 3)], //斜摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5), cc.v2(0, NEW_PICE_W * 3)], //斜摆3

            [cc.v2(0, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5)], //斜下摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, -NEW_PICE_W * 3)], //斜下摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(0, -NEW_PICE_W * 3)], //斜下摆3
            //四个
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0), cc.v2(NEW_PICE_H * 6, 0)], //横摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0), cc.v2(NEW_PICE_H * 5, NEW_PICE_W * 1.5)], //横摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0), cc.v2(NEW_PICE_H * 5, -NEW_PICE_W * 1.5)], //横摆3
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5)], //横摆4
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 4, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5)], //横摆5

            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H, NEW_PICE_W * 1.5)], //斜上摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, NEW_PICE_W * 3)], //斜上摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 4, NEW_PICE_W * 3)], //斜上摆3
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 5, NEW_PICE_W * 1.5)], //斜上摆4

            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5)], //斜下摆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, -NEW_PICE_W * 3)], //斜下摆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 4, -NEW_PICE_W * 3)], //斜下摆3
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 5, -NEW_PICE_W * 1.5)], //斜下摆4

            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(-NEW_PICE_H, -NEW_PICE_W * 1.5)], //下堆1
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(0, -NEW_PICE_W * 3)], //下堆2
            [cc.v2(0, 0), cc.v2(NEW_PICE_H * 2, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, -NEW_PICE_W * 3)], //下堆3

            [cc.v2(0, 0), cc.v2(NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(NEW_PICE_H * 2, -NEW_PICE_W * 3), cc.v2(NEW_PICE_H * 3, -NEW_PICE_W * 4.5)], //斜扛1
            [cc.v2(0, 0), cc.v2(-NEW_PICE_H, -NEW_PICE_W * 1.5), cc.v2(-NEW_PICE_H * 2, -NEW_PICE_W * 3), cc.v2(-NEW_PICE_H * 3, -NEW_PICE_W * 4.5)], //斜扛2

        ];

        public static DIS_LIST = [
            //一个方向
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15, 16, 17],
            [18, 19, 20, 21, 22, 23, 24, 25],
            [26, 27, 28, 29, 30, 31, 32, 33, 34],
            [35, 36, 37, 38, 39, 40, 41, 42],
            [43, 44, 45, 46, 47, 48, 49],
            [50, 51, 52, 53, 54, 55],
            [56, 57, 58, 59, 60],
        
            //另一个方向
            [26, 35, 43, 50, 56],
            [18, 27, 36, 44, 51, 57],
            [11, 19, 28, 37, 45, 52, 58],
            [5, 12, 20, 29, 38, 46, 53, 59],
            [0, 6, 13, 21, 30, 39, 47, 54, 60],
            [1, 7, 14, 22, 31, 40, 48, 55],
            [2, 8, 15, 23, 32, 41, 49],
            [3, 9, 16, 24, 33, 42],
            [4, 10, 17, 25, 34],
        
            //横向
            [0, 5, 11, 18, 26],
            [1, 6, 12, 19, 27, 35],
            [2, 7, 13, 20, 28, 36, 43],
            [3, 8, 14, 21, 29, 37, 44, 50],
            [4, 9, 15, 22, 30, 38, 45, 51, 56],
            [10, 16, 23, 31, 39, 46, 52, 57],
            [17, 24, 32, 40, 47, 53, 58],
            [25, 33, 41, 48, 54, 59],
            [34, 42, 49, 55, 60],
        ]

    /**
     * 根据循环参数获取当前格子实际坐标
     * @param i:内存列循环值
     * @param count:对应当前列的个数 
     * @param index:对应外层循环位置
     */
    public static getGridV2Pos(i,count,index)
    {
        let x = i * 56 + (1-count) * 28;
        let y = this.GRID_POS_Y[index] * 48.75;
        return cc.v2(x,y);
    }

    

}