import React, {Component} from 'react'
import {Form, Button, Select} from 'antd'
import {FormLayout, ReplaceInput as Input} from 'olym'
const FormItem = FormLayout.FormItem

class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '',textAreaValue: '' };
    }

    onChange = (e) => {
        console.log('e',e)
        let { value } = e.target;
        this.setState({ value });
    }
    onTextAreaChange = (e) => {
        let { value } = e.target;
        this.setState({ textAreaValue: value });
    }
    getValue = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            console.log('form',values)
            console.log('state',this.state.value)
            console.log('state',this.state.textAreaValue)
        })
    }
    onBlur = (e) => {
        console.log(e)
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return <FormLayout>
            <Button onClick = {this.getValue}>取值1</Button>
            <FormItem helpPosition={"right"} label = 'replaceInput' labelWidth="8em">
                {getFieldDecorator('replaceInput', {
                    rules: [{
                        required: true,
                        message:'必填项'
                    }]
                })(
                    <Input
                        needReplace = {true}
                        needUppercase = {true}
                        needTransform = {true}
                        style={{ width: 120 }}
                    />
                )}
            </FormItem>
            <Input
                needReplace = {true}
                needUppercase = {true}
                needTransform = {true}
                style={{ width: 120 }}
                value={this.state.value}
                onChange={this.onChange}
                // onBlur = {this.onBlur}
            />
            <FormItem helpPosition={"right"} label = 'replaceTextArea' labelWidth="8em">
                {getFieldDecorator('replaceTextArea', {
                    rules: [{
                        required: true,
                        message:'必填项'
                    }]
                })(
                    <Input.TextArea
                        needReplace = {true}
                        needUppercase = {true}
                        needTransform = {true}
                        style={{ width: 120 }}
                    />
                )}
            </FormItem>
            <Input.TextArea
                // needBigModal = {false}
                needReplace = {true}
                needUppercase = {true}
                needTransform = {true}
                style={{ width: 120 }}
                value={this.state.textAreaValue}
                onChange={this.onTextAreaChange}
            />
        </FormLayout>;
    }
}

export default Form.create()(InputDemo)
