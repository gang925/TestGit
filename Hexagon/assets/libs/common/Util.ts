export default class Utils
{


    /**
     * 根据两个数返回他们之间的整数值
     * @param min 
     * @param max 
     */
    public static randomInt(min,max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * 求两个数的余数
     * @param x 
     * @param y 
     */
    public static mathFmod(x,y)
    {
        var temp = Math.floor(x/y);
        return x - y * temp;
    }

    //检查是不是n位数字，不足补全
    setNumberLength(num,length)
    {
        num = num.toString();
        while (num.length<length){
            num='0'+ num;
        }
        return num;
    }

    /**
     * 按00:00:00时分秒格式返回时间
     * @param num 
     */
    timeFormat(num)
    {
        var hour = this.setNumberLength(Math.floor(num/3600) ,2);
        num = num%3600;
        var min = this.setNumberLength(Math.floor(num/60),2);
        var sec = this.setNumberLength(num%60,2);
        return hour+":"+min+":"+sec;
    }

    getFixHW()
    {
        let frameSize = cc.view.getFrameSize();
        let isFitW = (frameSize.width / frameSize.height) < (750 / 1334);
        return isFitW;
    }
}