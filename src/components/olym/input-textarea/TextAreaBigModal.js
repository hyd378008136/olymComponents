/**
 * Created by Adon Wang on 2018/7/19.
 */
import React, {Component} from 'react'
import {Input, Modal} from 'antd'

class TextAreaBigModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bigValue: ''
		};
	}
	handleChange = (e) => {
		this.props.handleChange && this.props.handleChange(e)
	}
	render() {
		const { visible, onCancel, value, onOk, width, handleChange, ...otherProps} = this.props
		const modalOpts = {
			title : '编辑框',
			width : width || '800px',
			className: 'table-custom-column',
			maskClosable: false,
			visible,
			onCancel,
			onOk,
		}
		return (
			<Modal {...modalOpts}>
				<Input.TextArea {...otherProps} value={value}  onChange = { this.handleChange } autosize={{minRows: 10}}/>
			</Modal>
		)
	}
}

export default TextAreaBigModal