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
		};
	}

	openModal = () => {
		this.setState({
			visible: true
		})
	}

	handleOk = (value) => {
        this.setState({
            visible: false,
        },() => this.props.onChange && this.props.onChange(value));
    }

	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}

	render() {
		// console.log('props',this.props)
		const {visible} = this.state
		const {bigAutoSize, needBigModal,value, ...otherProps} = this.props
		const modalOpts = {
			visible,
			onCancel : this.handleCancel,
			value,
			onOk: this.handleOk,
            autosize : {
                maxRows: 20,
                ...bigAutoSize,
			}
        }
		return (
			<span>
				<Input.TextArea
					onDoubleClick = {needBigModal ? this.openModal : null}
					{...otherProps}
					value={value}
				/>
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