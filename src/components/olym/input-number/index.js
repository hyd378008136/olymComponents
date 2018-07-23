import React, {Component} from 'react'
import {Input} from 'antd'

class InputNumber extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	onChange = (e) => {
		let { value } = e.target;
		if(value === '.'){
			value = '0.'
		}
		const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
		if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
			this.props.onChange(value);
		}
	}

	onBlur = () => {
		const { value, onBlur, onChange } = this.props;
		if (value.charAt(value.length - 1) === '.' || value === '-') {
			onChange({ value: value.slice(0, -1) });
		}
		if (onBlur) {
			onBlur();
		}
	}

	render() {
		return (
			<Input
				{...this.props}
				onChange={this.onChange}
				onBlur={this.onBlur}
				// placeholder=""
				// maxLength="25"
			/>
		)
	}
}

export default InputNumber;