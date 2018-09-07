/*
 * Copyright (c) 2017.<http://cargogm.com/>. All Rights Reserved.
 */

import React, {Component} from "react";
import {FormLayout, Panel, RichSelect, Split, Wrap} from 'olym'
import {
    Affix,
    Button,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Icon,
    Input,
    Menu,
    Message,
    Modal,
    Popconfirm,
    Row,
    Select,
    Table
} from "antd";
import { replaceWrapper } from 'olym';

const FormItem = FormLayout.FormItem;

const dataBody = [
    {
        index: "1", type: "海运出口"
    },
    {
        index: "2", type: "海运进口"
    },
    {
        index: "3", type: "空运出口"
    },
    {
        index: "4", type: "空运进口"
    },
    {
        index: "5", type: "出口陆运"
    },
    {
        index: "6", type: "进口陆运"
    },
    {
        index: "7", type: "出口报关"
    },
    {
        index: "8", type: "进口报关"
    },
    {
        index: "9", type: "铁路运输"
    },
    {
        index: "10", type: "海运拼箱"
    },
    {
        index: "11", type: "空运拼票"
    },
    {
        index: "12", type: "空运拼票0"
    },
    {
        index: "13", type: "空运拼票1"
    }, {
        index: "14", type: "空运拼票2"
    }

];

const dataHead = [
    {
        dataIndex: "index", title: "序号"
    }, {
        dataIndex: "type", title: "类型"
    }
]

class RichSelectSample extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fetchCombox2List: []
        };
    }

    componentDidMount() {
        window.__this = this;
    }

    fetchCombox2 = (value) => {
        var _this = this;
        setTimeout(function () {
            var fetchCombox2List = ['gmail.com', 'yahoo.com', 'outlook.com'].map((domain, index) => {
                const email = `${value}@${domain}`;
                return {
                    index: index, type: email
                };
            });
            _this.setState({fetchCombox2List})
        }, 1000)
    }


    render() {

        const {getFieldDecorator, setFieldsValue} = this.props.form;

        return (
            <FormLayout inputSize="small">
                <Panel gray noMargin>
                    <Row gutter={0}>
                        <Col span={4}>
                            <FormItem label="" labelWidtd={"5em"}>
                                combobox 数据固定
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem label="combobox1" labelWidth={"6em"}>
                                {getFieldDecorator('combobox1', {initialValue: "海运进口"})(
                                    replaceWrapper(<RichSelect
                                    dataBody={dataBody}
                                    dataHeader={dataHead}
                                    selectKey="type"
                                    onSelect={(value, option, obj) => {
                                        console.log("combobox1下拉框+onSelect", value, option, obj);
                                    }}
                                    onChange={(value) => { setFieldsValue({ 'combobox1': { value} }) }}
                                    mode={"combobox"}
                                    filterOption={(inputValue, option) => {
                                        var arr = option.props.children.some((e, i) => (e.props.children.indexOf(inputValue) > -1))
                                        return arr;
                                    }}
                                />, { valueKeyFromEvent: 'toString' }))}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={0}>
                        <Col span={4}>
                            <FormItem label="" labelWidtd={"5em"}>
                                combobox ajax
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem label="combobox2" labelWidth={"6em"}>
                                {getFieldDecorator('combobox2', {initialValue: "海运进口"})(<RichSelect
                                    dataBody={this.state.fetchCombox2List}
                                    dataHeader={dataHead}
                                    selectKey="type"
                                    onSelect={(value, option, obj) => {
                                        console.log("combobox2下拉框+onSelect", value, option, obj);
                                    }}
                                    mode={"combobox"}
                                    onSearch={this.fetchCombox2}
                                    onFirstFocus={this.fetchCombox2}
                                    filterOption={false}
                                />)}
                            </FormItem>
                        </Col>
                    </Row>


                    <Row gutter={0}>
                        <Col span={4}>
                            <FormItem label="" labelWidtd={"5em"}>
                                select 数据固定
                            </FormItem>
                        </Col>
                        <Col span={20}>
                            <FormItem label="select1" labelWidth={"6em"}>
                                {getFieldDecorator('select1', {initialValue: "海运进口"})(<RichSelect
                                    dataBody={dataBody}
                                    dataHeader={dataHead}
                                    selectKey="type"
                                    onSelect={(value, option, obj) => {
                                        console.log("select1下拉框+onSelect", value, option, obj);
                                    }}
                                    mode={""}
                                    showSearch={true}
                                    filterOption={(inputValue, option) => {
                                        var arr = option.props.children.some((e, i) => (e.props.children.indexOf(inputValue) > -1))
                                        return arr;
                                    }}
                                    notFoundContent=""
                                />)}
                            </FormItem>
                        </Col>
                    </Row>
                </Panel>
            </FormLayout>
        )
    }
}

export default Form.create({})(RichSelectSample);
