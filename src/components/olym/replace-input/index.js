/**
 * Created by Adon Wang on 2018/8/16.
 */
import React, {Component} from 'react'
import {Input as AtInput} from 'antd'
import PropTypes from 'prop-types'
// import { ReplaceTextArea as TextArea } from 'olym'
import Group from '../../antd/input/Group';
import Search from '../../antd/input/Search';
import ReplaceTextArea from '../replace-text-area'

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
class ReplaceInput extends Component {
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
            <AtInput
                {...othetProps}
                onChange={this.onChange}
                // placeholder=""
                // maxLength="25"
            />
        )
    }
}
ReplaceInput.PropTypes = {
    needReplace: PropTypes.bool,
    needUppercase: PropTypes.bool,
    needTransform: PropTypes.bool,
}

ReplaceInput.defaultProps = {
    needReplace: true,
    needUppercase: true,
    needTransform: true,
}

ReplaceInput.Group = Group;
ReplaceInput.Search = Search;
ReplaceInput.TextArea = ReplaceTextArea

export default ReplaceInput