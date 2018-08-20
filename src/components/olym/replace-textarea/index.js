import React, {Component} from 'react'
import TextArea from '../input-textarea'
import PropTypes from 'prop-types'
/**
 * 将常见的不可见字符转换为普通的空格字符
 * @param str
 * @returns {*}
 */
function replaceInvisibleCharacter(str) {
    var returnValue;
    if(str){
        var space=" ";
        //排除掉 \r\n  \u000d\u000a
        var regEx = new RegExp("["+
            "\u0000-\u0009"+//：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
            "\u000B-\u000C"+//：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
            "\u000E-\u001F"+//：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
            "\u007F-\u00A0" +//：特殊 (Specials);
            "]","g");
        returnValue = str.replace(regEx, space);
    }else{
        returnValue="";
    }
    return returnValue;
}
// 全角转半角
function transformFullToHalf(str) {
    var returnValue="";
    if(str){
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i)==12288) {
                returnValue+= String.fromCharCode(str.charCodeAt(i)-12256);
                continue;
            }
            if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375){
                returnValue+= String.fromCharCode(str.charCodeAt(i)-65248);
            } else {
                returnValue+= String.fromCharCode(str.charCodeAt(i));
            }
        }
    }else {
        returnValue  = ''
    }
    return returnValue
}

class ReplaceTextArea extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    onChange = (e) => {
        let { value } = e.target;
        const {needReplace, needUppercase, needTransform} = this.props
        if(value && needTransform){
            value = transformFullToHalf(value)
        }
        if(needReplace){
            value = replaceInvisibleCharacter(value)
        }
        if(needUppercase){
            value = value.toUpperCase()
        }

        this.props.onChange(value);
    }

    render() {
        const {needReplace, needUppercase, needTransform, ...othetProps} = this.props

        return (
            <TextArea
                {...othetProps}
                onChange={this.onChange}
                // placeholder=""
                // maxLength="25"
            />
        )
    }
}

ReplaceTextArea.PropTypes = {
    needReplace: PropTypes.bool,
    needUppercase: PropTypes.bool,
    needTransform: PropTypes.bool,
}

ReplaceTextArea.defaultProps = {
    needReplace: true,
    needUppercase: true,
    needTransform: true,
}

export {
    ReplaceTextArea
}