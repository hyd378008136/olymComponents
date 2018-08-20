import React, {Component} from 'react'
import { ReplaceTextArea as TextArea } from 'olym'
import {Form, Button, Select} from 'antd'
import {FormLayout} from 'olym'
const FormItem = FormLayout.FormItem

class ReplaceTextareaDemo extends React.Component {
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
        return (
            <FormLayout>
                <Button onClick = {this.getValue}>取值</Button>
                <FormItem helpPosition={"right"} label = 'replaceTextArea' labelWidth="8em">
                    {getFieldDecorator('replaceTextArea', {
                        rules: [{
                            required: true,
                            message:'必填项'
                        }]
                    })(
                        <TextArea
                            // value={this.state.value}
                            needReplace = {true}
                            needUppercase = {true}
                            needTransform = {true}
                            autosize={{minRows: 5, maxRows: 6}}
                            bigAutosize = {{minRows: 20}} // 大弹出框的行数
                            // onChange={this.onChange}
                        />
                    )}
                </FormItem>
                <TextArea
                    value={this.state.value}
                    needReplace = {true}
                    needUppercase = {true}
                    needTransform = {true}
                    autosize={{minRows: 5, maxRows: 6}}
                    bigAutosize = {{minRows: 20}} // 大弹出框的行数
                    onChange={this.onChange}
                />
            </FormLayout>
        )
    }
}

export default Form.create()(ReplaceTextareaDemo)
