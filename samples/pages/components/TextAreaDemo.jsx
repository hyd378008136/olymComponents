import React, {Component} from 'react'
import TextArea from '../../../src/components/olym/input-textarea'
import {Form, Button} from 'antd'
import {FormLayout} from 'olym'
const FormItem = FormLayout.FormItem

class TextAreaDemo extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}
	getValue = () => {
		this.props.form.validateFieldsAndScroll((errors, values) => {
			console.log(values)
		})
	}
	render() {
		const {getFieldDecorator} = this.props.form
		return (
			<div>
				<Button onClick = {this.getValue}>取值</Button>

				<FormItem helpPosition={"right"} >
					{getFieldDecorator('TextAreaDemo', {
					})(<TextArea autosize={{minRows: 5, maxRows: 6}}/>)}
				</FormItem>
			</div>
		)
	}
}

export default Form.create()(TextAreaDemo)