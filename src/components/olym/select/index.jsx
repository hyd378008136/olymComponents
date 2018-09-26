import React, { Component } from "react";

import { Select as AntdSelect } from 'antd'

class Select extends Component {
	constructor(props) {
		super(props)
		this.state = {};
	}

	onChange = (value) => {
		if (!value) {
			if (this.props.onSelect) {
				this.props.onSelect('', {});
			}
		}
		if (this.props.onChange) {
			this.props.onChange(value, this.props.id);
		}
	}

	render() {
		const { id, onChange, ...otherProps } = this.props;
		const props = {
			id,
			...otherProps
		};
		if (onChange) {
			props.onChange = (value) => onChange(value, id)
		}
		return (
			<AntdSelect {...props} />
		)
	}
}
Select.Option = AntdSelect.Option
Select.OptGroup = AntdSelect.OptGroup;
export default Select