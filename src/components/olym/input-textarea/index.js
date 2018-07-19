import React, {Component} from 'react'
import {Input, Button, Form} from 'antd'
import TextAreaBigModal from './TextAreaBigModal'

class TextArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			value: ''
		};
	}
	handleChange = (e) => {
		// this.setState({
		// 	value: e.target.value
		// })
		this.props.onChange && this.props.onChange(e)
	}
	openModal = () => {
		this.setState({
			visible: true
		})
	}
	handleOk = (e, value) => {
		this.setState({
			visible: false,
		});
	}

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}
	render() {
		// console.log('props',this.props)
		const {visible} = this.state
		const {value, ...otherProps} = this.props
		const modalOpts = {
			visible,
			onCancel : this.handleCancel,
			value,
			onOk: this.handleOk,
			handleChange: this.handleChange
		}
		return (
			<div>
				<Button onClick = {this.openModal}>打开大的</Button>
				<Input.TextArea {...otherProps} value={value} onChange = {this.handleChange} />
				<TextAreaBigModal {...modalOpts}/>
			</div>
		)
	}
}

export default TextArea