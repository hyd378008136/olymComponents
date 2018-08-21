/*
 * Copyright (c) 2017.<http://cargogm.com/>. All Rights Reserved.
 */
import React, {Component} from "react";
import {
    Affix,
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Icon,
    Input,
    Layout,
    Menu,
    Message,
    Modal,
    Pagination,
    Popconfirm,
    Row,
    Select,
    Table,
    Tabs
} from "antd";
import {FormLayout, Panel, Split, Wrap} from "olym";
// import Wrap from "../../../src/components/olym/wrap/index";

const FormItem = FormLayout.FormItem;
// const FormItem = Form.Item;


const {Header, Content, Footer, Sider} = Layout;
const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];


class LayoutSample extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }


    componentDidMount() {
        window.__this = this;
        this.props.form.setFieldsValue({dataSource, a: {b: "b", c: {c: "ss"}}})
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render(text, data, index) {
                console.log(arguments);
                var id = "dataSource[" + index + "].name"
                return <FormItem>{getFieldDecorator(id)(<Input size="small"></Input>)}</FormItem>;
            }
        }, {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            render(text, data, index) {
                var id = "dataSource[" + index + "].age"
                return <FormItem>{getFieldDecorator(id)(<Input size="small"></Input>)}</FormItem>;
            }
        }, {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            render(text, data, index) {
                var id = "dataSource[" + index + "].address"
                return <FormItem>{getFieldDecorator(id)(<Input size="small"></Input>)}</FormItem>;
            }
        }];

        return (
            <Layout>
                	
                   
                <div style={{ 'margin-top': '200px' }}>
                    <FormLayout labelWidth="8em" inputSize={'small'}>
                        <FormItem label="test">
                            {getFieldDecorator("a.c.c")(<Input size="small"></Input>)}
                        </FormItem>
                        <FormItem label="test" labelWidth="10em">
                            {getFieldDecorator("a.c.c")(<Input size="small"></Input>)}
                        </FormItem>
                    </FormLayout>
                </div>
                <Header style={{
                    height: '100px',
                    position: 'fixed', width: '100%', padding: 0,
                    backgroundColor: '#FFFFFF',
                    "zIndex": 10
                }}>
                    <div style={{
                        "margin-bottom": "100px"
                    }}>
                        <Row style={{backgroundColor: '#15519d', height: 40, color: '#FFFFFF', fontSize: '1.3em'}}
                             type="flex" align="middle">
                            <Col span={24}>
                                业务详情</Col>
                        </Row>
                        <Row style={{backgroundColor: '#61a7c5', height: 50, marginTop: 10, display: 'flex'}}
                             justify="end" type="flex"
                             align="middle">
                            <Col span={8}>
                                <span>业务编号：xxxx</span>
                                <span>出运类型：xxxx</span>
                                <span>服务项：xxxx</span>
                            </Col>
                            <Col span={16} className="tar">
                             <span className="pr8">
                                <Button size="default" type="primary" key="exception" className='mt8'>登记异常</Button>
                                <Button size="default" type="primary" key="customer" className='mt8'>客户信息</Button>
                                <Button size="default" type="primary" key="output" className='mt8'>输出</Button>
                                <Button size="default" type="primary" key="log" className='mt8'>日志</Button>
                                <Button size="default" type="primary" key="save" className='mt8'>保存</Button>
                             </span>
                            </Col>
                        </Row>
                    </div>
                    {/*<Menu*/}
                    {/*theme="dark"*/}
                    {/*mode="horizontal"*/}
                    {/*defaultSelectedKeys={['2']}*/}
                    {/*style={{lineHeight: '64px'}}*/}
                    {/*>*/}
                    {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    {/*</Menu>*/}
                </Header>
                <Content style={{padding: '0', marginTop: 100}}>
                    {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                    {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    {/*<div style={{background: '#fff', padding: 24, minHeight: 380}}>Content</div>*/}

                    <Layout>
                        {/*<Sider width="150">*/}
                        {/*<Pagination simple style={{marginTop: 10}} current={1}*/}
                        {/*pageSize={10}*/}
                        {/*total={12}/>*/}

                        {/*</Sider>*/}
                        {/*<Layout style={{marginLeft: 150}}>*/}
                        {/*<Header style={{*/}
                        {/*height: '50px',*/}
                        {/*// position: 'fixed',*/}
                        {/*width: '100%',*/}
                        {/*padding: 0,*/}
                        {/*// zIndex: '1060'*/}
                        {/*}}>*/}
                        {/**/}
                        {/*</Header>*/}
                        <Content style={{"position": "static"}}>
                            <Wrap gray noMargin>
                                <Form>
                                    <Table dataSource={dataSource} columns={columns} showHeader={false} size={"small"}
                                           pagination={false}/>


                                    <Row gutter={0}>
                                        <Col span={24}>
                                            <FormItem label="111">
                                                {getFieldDecorator("a.b")(<Input size="small"></Input>)}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                    <Row gutter={0}>
                                        <Col span={24}>
                                            <FormItem label="111">
                                                {getFieldDecorator("a.c.c")(<Input size="small"></Input>)}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </Wrap>
                        </Content>
                        {/*</Layout>*/}
                    </Layout>
                </Content>
                {/*<Footer style={{textAlign: 'center'}}>*/}
                {/*Ant Design ©2016 Created by Ant UED*/}
                {/*</Footer>*/}
            </Layout>
        )
    }
}

export default Form.create({})(LayoutSample);