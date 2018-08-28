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

    componentDidMount() {
		const {value} = this.props
		if(value){
			this.setState({
                bigValue: value
			})
		}
    }

    componentWillReceiveProps(nextProps) {
		if(nextProps.value !== this.props.value || nextProps.visible !== this.props.visible){
            const {value} = this.props
            this.setState({
                bigValue: value
            })
		}
    }
	handleChange = (e) => {
        this.setState({
            bigValue: e.target.value
        })
	}
    handleOk = () => {
		const {bigValue} = this.state
		this.props.onOk(bigValue)
	}
	render() {
		const {bigValue} = this.state
		const { visible, onCancel, value, onOk, width, handleChange, ...otherProps} = this.props
		const modalOpts = {
			title : '',
			width : width || '800px',
			className: 'table-custom-column big-textarea',
			maskClosable: false,
			visible,
			onCancel,
			onOk: this.handleOk
		}
		return (
			<Modal {...modalOpts}>
				<Input.TextArea {...otherProps} value={bigValue}  onChange = { this.handleChange } />
			</Modal>
		)
	}
}

export default TextAreaBigModal