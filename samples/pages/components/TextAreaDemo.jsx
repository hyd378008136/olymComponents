import React, {Component} from 'react'
import TextArea from '../../../src/components/olym/input-textarea'
import TextAreaSelect from '../../../src/components/antd/text-area-select'
import {Form, Button, Select} from 'antd'
import {FormLayout} from 'olym'
const FormItem = FormLayout.FormItem
const Option = Select.Option;
let id = 0;
let _selectTimeOut = null;

class TextAreaDemo extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '', dataList: [] };
	}
	getValue = () => {
		this.props.form.validateFieldsAndScroll((errors, values) => {
			console.log(values)
		})
	}
	getPopupContainer = () => document.getElementById('pop-up')
	handleSearch = (value) => {
		if (_selectTimeOut) {
			clearTimeout(_selectTimeOut)
			_selectTimeOut = null
		}
		const fake = () => {
			let _dataList = []
			for (let i = 0; i < 10; i++){
				_dataList.push('test'+ i + id)
			}
			id++
			this.setState({
				dataList: _dataList
			})
		}
		_selectTimeOut = setTimeout(fake, 300);
	}
	render() {
		const {getFieldDecorator} = this.props.form
		return (
			<FormLayout>
				<div id="pop-up"> </div>
				<Button onClick = {this.getValue}>取值</Button>

				<FormItem helpPosition={"right"} label = '输入框 demo' labelWidth="8em">
					{getFieldDecorator('TextAreaDemo', {
						rules: [{
							required: true,
							max: 9,
							message:'最长9'
						}]
					})(<TextArea
						autosize={{minRows: 5, maxRows: 6}}
						bigAutosize = {{minRows: 20}} // 大弹出框的行数
					/>)}
				</FormItem>
				<FormItem helpPosition={"bottom"} label = 'textareaselect' labelWidth="8em">
					{getFieldDecorator('TextAreaSelectDemo', {
						rules: [{
							required: true,
							max: 9,
							message:'最长9'
						}]
					})(
						<TextAreaSelect
							mode="combobox"
							allowclear
							style={{ width: 200 }}
							placeholder="Select a person"
							// optionFilterProp="children"
							// onChange={handleChange}
							// onFocus={handleFocus}
							// onBlur={handleBlur}
							showSearch={true}
							// onFirstFocus={this.handleSearch}
							onSearch={this.handleSearch}
							getPopupContainer={this.getPopupContainer}
							filterOption={false}
							// filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							{
								this.state.dataList.map((item) => <Option ket={item} value={item}>{item}</Option>)
							}
						</TextAreaSelect>
					)}
				</FormItem>
			</FormLayout>
		)
	}
}

export default Form.create()(TextAreaDemo)