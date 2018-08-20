import React, {Component} from 'react'
import {ReplaceInput as Input} from '../../../src/components/olym/replace-input'
import {Form, Button, Select} from 'antd'
import {FormLayout} from 'olym'
const FormItem = FormLayout.FormItem

class InputDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    onChange = (value) => {
        this.setState({ value });
    }
    getValue = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            console.log('form',values)
            console.log('state',this.state.value)
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return <FormLayout>
            <Button onClick = {this.getValue}>取值</Button>
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
                        value={this.state.value}
                        onChange={this.onChange}
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
            />
        </FormLayout>;
    }
}

export default Form.create()(InputDemo)
