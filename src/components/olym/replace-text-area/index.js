import React, {Component} from 'react'
import TextArea from '../text-area'
import PropTypes from 'prop-types'
import {handleOnBlur, setPropsValue} from '../util/replaceFunc'
import isEqual from 'lodash.isequal';

class ReplaceTextArea extends Component {
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
        const {
            needReplace,
            needUppercase,
            needTransform,
            onFocus,
            onChange,
            ...otherProps
        } = this.props
        return (<TextArea
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

ReplaceTextArea.PropTypes = {
    needReplace: PropTypes.bool,
    needUppercase: PropTypes.bool,
    needTransform: PropTypes.bool
}

ReplaceTextArea.defaultProps = {
    needReplace: true,
    needUppercase: true,
    needTransform: true
}

export default ReplaceTextArea