import moment from 'moment';

function compatible(value,format) {
    let _value;
    if(Array.isArray(value)){
        //只取前两位,并且在前两位都有值的情况下才显示日期
        // if(value[0] && value[1]){
        //     if(typeof value[0] === "string"){
        //         _value.push(moment(value[0],format))
        //     }else{
        //         _value.push(value[0])
        //     }
        //
        //     if(typeof value[1] === "string"){
        //         _value.push(moment(value[1],format))
        //     }else{
        //         _value.push(value[1])
        //     }
        // }
        let _value = [];
        value.map((v)=>{
            _value.push(compatible(v,format))
        })
        return _value
    }else{
        if(typeof value === 'string' && value){
            _value = moment(value,format)
        }else{
            _value = value
        }
        return _value;
    }

}

export default {
    compatible
}