import React,{Component} from "react";

import {FormLayout,Wrap,Panel} from 'olym'

import {Row,Col,Button,Input,Select,DatePicker,Menu, Dropdown, Icon,Popover,Checkbox } from 'antd'

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const FormItem = FormLayout.FormItem;

class AdSearch extends Component{
    constructor(props) {
        super(props)
        this.state = {
            OtherConditionCheckedList:[]
        };
    }

    getElement = (props) =>{
        console.log(props)
        const {fieldCn,fieldEn,fieldType,...otherProps} = props;
        if(fieldType === 'text'){
            //input
            return (
                <FormItem label={fieldCn} >
                    <Input id={fieldEn} {...otherProps}/>
                </FormItem>
            )
        }else if(fieldType === 'select'){
            //单选框
            return(
                <FormItem label={fieldCn}>
                    <Select id={fieldEn} dropdownMatchSelectWidth={false} {...otherProps} />
                </FormItem>
            )
        }else if(fieldType === 'multi_select'){
            //多选框
            return(
                <FormItem label={fieldCn}>
                    <Select id={fieldEn} {...otherProps} multiple dropdownMatchSelectWidth={false}/>
                </FormItem>
            )
        }else if(fieldType === 'date'){
            //时间选择框
            return(
                <FormItem>
                    <DatePicker id={fieldEn} {...otherProps} />
                </FormItem>
            )
        }else if(fieldType === 'date_range'){
            //时间范围选择
            return(
                <FormItem>
                    <RangePicker id={fieldEn} {...otherProps} />
                </FormItem>
            )
        }
    }

    onArraySelect = (value,option) =>{
        this.setState({
            arrSelectValue:value
        })
    }

    getDConChildren = (dc,oc) =>{
        let children = [];
        dc.map((con)=>{
            const {props} = con;
            if(props){
                if(Array.isArray(props)){
                    const options = props.map((prop)=>{
                        const {fieldCn,fieldEn,fieldType,...otherProps} = prop;
                        const optionProp = {fieldType,...otherProps}
                        return <Option value={fieldEn} {...optionProp}>{fieldCn}</Option>
                    })
                    children.push(<FormItem><Select defaultValue={props[0].fieldCn} children={options} dropdownMatchSelectWidth={false} onSelect={this.onArraySelect}/></FormItem>)
                    const arrSelectValue = this.state.arrSelectValue || props[0].fieldEn;
                    props.map((prop)=>{
                        if(prop.fieldEn === arrSelectValue){
                            children.push(this.getElement(prop))
                        }
                    })
                }else{
                    children.push(this.getElement(props))
                }
            }
        })
        if(oc.length>0){
            // const ocMenu = this.getOtherConditionMenu(oc);
            // children.push(<Dropdown overlay={ocMenu} trigger={['click']}><a>+条件<Icon type="down" /></a></Dropdown>);
            children.push(<FormItem><Popover title={<span>其他条件</span>} content={this.getOtherConditionContent(oc)} placement="bottom" trigger="click"><a>+条件<Icon type="down" size="small"/></a></Popover></FormItem>)
        }

        children.push(<FormItem><Button children="查询" size="small"/></FormItem>)
        children.push(<FormItem><Button children="重置" size="small"/></FormItem>)
        children.push(<FormItem><Button children="存入我的查询" size="small"/></FormItem>)
        return children;
    }

    getOtherConditionMenu = (oc) =>{
        let children = [];
        oc.map((con)=>{
            children.push(<Menu.Item key={con.id}><a>{con.props.fieldCn}</a></Menu.Item>)
        })
        console.log("children",children)
        return (
            <Menu >
                {children}
            </Menu>
        )
    }

    onOtherConditionChecked = (e) =>{
        let OtherConditionCheckedList = this.state.OtherConditionCheckedList;
        if(e.target.checked){
            OtherConditionCheckedList.push(e.target.id)
        }else{
            OtherConditionCheckedList = OtherConditionCheckedList.filter(item => item !== e.target.id)
        }
        this.setState({
            OtherConditionCheckedList
        })
    }

    getOtherConditionChildren = (oc) =>{
        let children = [];
        const OtherConditionCheckedList = this.state.OtherConditionCheckedList;
        if(OtherConditionCheckedList.length>0){
            // oc.map((con)=>{
            //     if(OtherConditionCheckedList.indexOf(con.id)>-1){
            //         children.push(this.getElement(con.props))
            //     }
            // })
            const _oc = {};
            oc.map((con)=>{
                _oc[con.id]=con;
            })
            // console.log(_oc)
            OtherConditionCheckedList.forEach((ocId)=>{
                const condition = _oc[ocId];
                // console.log(condition)
                if(condition){
                    children.push(this.getElement(condition.props))
                }
            })
        }
        return children
    }

    getOtherConditionContent = (oc) =>{
        let children = [];
        oc.map((con)=>{
            children.push(<FormItem><Checkbox id={con.id} onChange={this.onOtherConditionChecked}>{con.props.fieldCn}</Checkbox></FormItem>)
        })
        return (
            <Wrap>
                <Panel>
                    <FormLayout key="ocContent" children={children} inline inputSize="small">
                    </FormLayout>
                </Panel>
            </Wrap>
        )
    }

    render(){
        const {searchCondition,defaultCondition,data} = this.props;
        // console.log(searchCondition,defaultCondition)
        let dc = [];
        let oc = [];
        searchCondition.map((con)=>{
            if(defaultCondition.indexOf(con.id)>-1){
                dc.push(con)
            }else{
                oc.push(con)
            }
        })
        // console.log(dc,oc)
        const defaultConditionChildren = this.getDConChildren(dc,oc);
        const otherConditionChildren = this.getOtherConditionChildren(oc);
        return(
            <Wrap>
                <Panel>
                    <FormLayout key="defaultCondition" children={defaultConditionChildren} inline inputSize="small"/>
                    <FormLayout key="otherCondition" children={otherConditionChildren} inputSize="small" inline/>
                </Panel>
            </Wrap>
        )
    }
}

export default AdSearch;