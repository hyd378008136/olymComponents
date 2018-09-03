/**
 * Created by Adon Wang on 2018/8/16.
 */
import React, {Component} from 'react'
import {Input as AtInput} from 'antd'
import PropTypes from 'prop-types'
import ReplaceTextArea from '../replace-text-area'
import {handleOnBlur,setPropsValue} from '../util/replaceFunc'
import isEqual from 'lodash.isequal';

class ReplaceInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null
        };
        this.isFocus = false;
    }
    componentDidMount() {
        setPropsValue(this.props.value, this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            setPropsValue(nextProps.value, this);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
            return false
        }
        return true
    }
    render() {
        const {needReplace, needUppercase, needTransform,onFocus, onChange,...otherProps} = this.props
        return (<AtInput
            {...otherProps}
            value={this.state.value}
            onChange={onChange}
            onBlur={(e) => handleOnBlur(e, this)}
            onFocus={() => {
            this.isFocus = true;
            onFocus && onFocus();
        }}/>)
    }
}
ReplaceInput.PropTypes = {
    needReplace: PropTypes.bool,
    needUppercase: PropTypes.bool,
    needTransform: PropTypes.bool
}

ReplaceInput.defaultProps = {
    needReplace: true,
    needUppercase: true,
    needTransform: true
}

ReplaceInput.Group = AtInput.Group;
ReplaceInput.Search = AtInput.Search;
ReplaceInput.TextArea = ReplaceTextArea

export default ReplaceInput