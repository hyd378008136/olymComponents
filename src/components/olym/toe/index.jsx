import React, {Component} from "react";
import Text from '../text'
import Tooltip from '../tooltip'

const splitStr = "$$$";
class Toe extends Component {
    constructor(props) {
        super(props)
    }

    calcStringPixelsCount = (str, strFontSize) => {
        // 字符串字符个数
        const stringCharsCount = str.length;

        // 字符串像素个数
        let stringPixelsCount = 0;

        // JS 创建HTML元素：span
        let elementPixelsLengthRuler = document.createElement("span");
        if(strFontSize){
            elementPixelsLengthRuler.style.fontSize = strFontSize;  // 设置span的fontsize
        }
        elementPixelsLengthRuler.style.visibility = "hidden";  // 设置span不可见
        elementPixelsLengthRuler.style.display = "inline-block";
        elementPixelsLengthRuler.style.wordBreak = "break-all !important";  // 打断单词

        // 添加span
        document.body.appendChild(elementPixelsLengthRuler);

        for (let i = 0; i < stringCharsCount; i++) {
            // 判断字符是否为空格，如果是用&nbsp;替代，原因如下：
            // 1）span计算单个空格字符（ ），其像素长度为0
            // 2）空格字符在字符串的开头或者结果，计算时会忽略字符串
            if (str[i] === " ") {
                elementPixelsLengthRuler.innerHTML = "&nbsp;";
            } else {
                elementPixelsLengthRuler.innerHTML = str[i];
            }

            stringPixelsCount += elementPixelsLengthRuler.offsetWidth;
        }

        return stringPixelsCount;
    };

    render() {
        let {value, width, style,...otherProps} = this.props;
        const px = this.calcStringPixelsCount(value);
        // const widthInt = width.split("px")[0];
        let widthInt;
        let widthStr;
        if(typeof width === 'string'){
            widthInt = width.split("px")[0];
            widthStr = width;
        }else if(typeof width === 'number'){
            widthInt = width;
            widthStr = width+"px";
        }else{
            throw new Error("Width能不能别乱传参数啊")
        }

        console.log(widthInt,widthStr)

        function splitToEnter(str, splitStr) {
            const ret = [];
            const arr = str.split(splitStr);
            arr.forEach(item => {
                ret.push(item)
                ret.push(<br/>)
            })

            ret.splice(-1, 1)
            return ret;
        }

        if (value && typeof value === 'string') {
            value = splitToEnter(value, splitStr)
        } else if (value && Array.isArray(value)) {
            value = splitToEnter(value.join(splitStr), splitStr)
        } else if (!value) {

        } else {
            throw new Error("Toe 组件只接收 String 或 Array格式数据!")
        }
        const textProps = {
            width:widthStr,
            ...otherProps
        }
        if (width && widthInt<px) {
            const className = "dpib toe";
            const {...styles} = {width:widthStr};
            return (<div>
                {value && value.map((v) => {
                    if (typeof v === "string") {
                        return (
                            <Tooltip title={v} placement="top" key={v}>
                                <span className={className} style={{...styles}}>{v}</span>
                            </Tooltip>
                        )
                    } else {
                        return v
                    }
                })}
            </div>)
        }

        return (
            <Text {...textProps} >{value}</Text>
        )
    }
}
Toe.split = splitStr;
export default Toe