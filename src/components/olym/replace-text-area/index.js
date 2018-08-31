import React, {Component} from 'react'
import TextArea from '../text-area'
import PropTypes from 'prop-types'
import {handleOnBlur} from '../util/replaceFunc'

class ReplaceTextArea extends Component {
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
        const _this = this
        const {needReplace, needUppercase, needTransform, ...othetProps} = this.props
        return (
            <TextArea
                {...othetProps}
                onBlur={(e) => handleOnBlur(e, _this)}
                // onChange={this.onChange}
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

export default ReplaceTextArea