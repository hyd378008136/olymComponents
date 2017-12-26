import React,{Component} from "react";
import Text from '../text'
import Tooltip from '../tooltip'

const splitStr = "$$$";
class Toe extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        let {value,width,...otherProps} = this.props;
        function splitToEnter(str,splitStr) {
            const ret = [];
            const arr = str.split(splitStr);
            arr.forEach( item => {
                ret.push(item)
                ret.push(<br/>)
            })

            ret.splice(-1,1)
            return ret;
        }
        if(value && typeof value === 'string'){
            value = splitToEnter(value,splitStr)
        }else if(value && Array.isArray(value)){
            value = splitToEnter(value.join(splitStr),splitStr)
        }else if(!value){

        }else{
            throw new Error("Toe 组件只接收 String 或 Array格式数据!")
        }
        const textProps = {
            width,
            ...otherProps
        }
        if(width){
            const className = "dpib toe";
            const {...styles} = {width};
            return(<div>
                {value && value.map((v)=>{
                    if(typeof v === "string"){
                        return(
                            <Tooltip title={v} placement="top" key={v}>
                                <span className={className} style={{...styles}}>{v}</span>
                            </Tooltip>
                        )
                    }else{
                        return v
                    }
                })}
            </div>)
        }

        return(
            <Text {...textProps} >{value}</Text>
        )
    }
}
Toe.split = splitStr;
export default Toe