import React, {Component} from 'react'
import InputNumber from '../../../src/components/olym/input-number'

class NumericInputDemo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}

	onChange = (value) => {
		this.setState({ value });
	}

	render() {
		return <InputNumber style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />;
	}
}

export default NumericInputDemo