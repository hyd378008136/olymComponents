/**
 * Created by Adon Wang on 2018/8/16.
 */
import React, {Component} from 'react'
import {Input as AtInput} from 'antd'
import PropTypes from 'prop-types'
import ReplaceTextArea from '../replace-text-area'
import {handleOnBlur} from '../util/replaceFunc'

class ReplaceInput extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const _this = this
        const {needReplace, needUppercase, needTransform, ...othetProps} = this.props
        return (
            <AtInput
                {...othetProps}
                onBlur={(e) => handleOnBlur(e, _this)}
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