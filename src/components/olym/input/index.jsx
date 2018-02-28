import React, {Component} from "react";
import {Input as AntdInput} from 'antd'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render () {
    const {value, addonAfterWithValue, addonBeforeWithValue, ...otherProps} = this.props;
    let inputProps = {
      value,
      ...otherProps
    };
    if (value && addonAfterWithValue) {
      inputProps.addonAfter = addonAfterWithValue
    }
    if (value && addonBeforeWithValue) {
      inputProps.addonBefore = addonBeforeWithValue
    }
    return (
      <AntdInput {...inputProps}/>
    )
  }
}
Input.Group = AntdInput.Group;
Input.Search = AntdInput.Search;
Input.TextArea = AntdInput.TextArea;
export default Input