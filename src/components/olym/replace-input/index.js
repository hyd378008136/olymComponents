/**
 * Created by Adon Wang on 2018/8/16.
 */
import React, {Component} from 'react'
import {Input as AtInput} from 'antd'
import PropTypes from 'prop-types'
import ReplaceTextArea from '../replace-text-area'
import {replaceInvisibleCharacter, transformFullToHalf} from '../util/replaceFunc'

class ReplaceInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleInputOnBlur = (e) => {
        let { value } = e.target;
        const {needReplace, needUppercase, needTransform} = this.props
        // const reg = /[\u4e00-\u9fa5]/g;
        // value =  value.replace(reg, "");
        if(value && needTransform){
            value = transformFullToHalf(value)
        }
        if(needReplace){
            value = replaceInvisibleCharacter(value)
        }
        if(needUppercase){
            value = value.toUpperCase()
        }
        e.target.value = value
        this.props.onChange && this.props.onChange(e);
    }
    render() {
        const {needReplace, needUppercase, needTransform, ...othetProps} = this.props
        return (
            <AtInput
                {...othetProps}
                onBlur={this.handleInputOnBlur}
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

ReplaceInput.Group = AtInput.Group;
ReplaceInput.Search = AtInput.Search;
ReplaceInput.TextArea = ReplaceTextArea

export default ReplaceInput