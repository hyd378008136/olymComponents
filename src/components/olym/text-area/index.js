import React, {Component} from 'react'
import {Input, Button, Form} from 'antd'
import TextAreaBigModal from './TextAreaBigModal'
import PropTypes from 'prop-types'
import './style.less'

class TextArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			value: ''
		};
	}
	handleChange = (e, open) => {
		// this.setState({
		// 	value: e.target.value
		// })
		this.props.onChange && this.props.onChange(e, open)
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
		const {value, bigAutoSize, needBigModal, ...otherProps} = this.props
		const modalOpts = {
			visible,
			onCancel : this.handleCancel,
			value,
			onOk: this.handleOk,
			handleChange: this.handleChange,
            autosize : {
                maxRows: 20,
                ...bigAutoSize,
			}
        }
		return (
			<span>
				{/*<Button onClick = {this.openModal}>打开大的</Button>*/}
				<Input.TextArea onDoubleClick = {needBigModal ? this.openModal : null} {...otherProps} value={value} onChange = {this.handleChange} />
				<TextAreaBigModal {...modalOpts}/>
			</span>
		)
	}
}

TextArea.PropTypes = {
    bigAutoSize: PropTypes.object,
    needBigModal: PropTypes.bool,
}

TextArea.defaultProps = {
    bigAutoSize: {
    	minRows: 10,
        maxRows: 30,
    },
	needBigModal: true
};

export default TextArea