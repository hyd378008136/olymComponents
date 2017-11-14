import React,{Component} from "react";

import {Input, Button, Row, Col, Modal, Message, Icon,Affix,Checkbox,Popover} from 'antd';
import {Table, FormLayout, Split, Wrap, Panel,Tag,DatePicker, Select} from 'olym'

import CustomTopLine from './CustomTopLine';
import CustomFootLine from './CustomFootLine';

const FormItem = FormLayout.FormItem;
const RangePicker = DatePicker.RangePicker;
const selectWidth = 100;
const themeType = 'small';
const Option = Select.Option;

class AdSearch extends Component{

    constructor(props) {
        super(props)
        const data = this.initData(props);
        const template = this.initTemplate(props);
        let templateNames = {};
        for(let id in template){
            templateNames[template[id].templateName] = id
        }
        let selectedTemplateName;
        this.state = {
            data,
            extraConditionCheckedList:[],
            template,
            templateNames,
            selectedTemplateName
        };
    }

    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
        if(this.props.templateSource && nextProps.templateSource && this.props.templateSource.length !== nextProps.templateSource.length){
            const template = this.initTemplate(nextProps);
            let templateNames = {};
            for(let id in template){
                templateNames[template[id].templateName] = id
            }
            this.setState({
                template,templateNames
            })
        }
    }

    initData = (props) =>{
        const {extraCondition,defaultCondition} = props
        if(extraCondition && !extraCondition instanceof Array){
            throw  new TypeError('AdSearch 组件的 extraCondition 只接受 "Array" 格式的数据');
        }
        if(!defaultCondition instanceof Array){
            throw  new TypeError('AdSearch 组件的 defaultCondition 只接受 "Array" 格式的数据');
        }
        let data = {};
        defaultCondition.map(({id,props})=>{
            if(Array.isArray(props)){
                props.map((p)=>{
                    data[p.fieldEn] = p.fieldValue;
                })
            }else{
                data[props.fieldEn] = props.fieldValue;
            }
        });
        extraCondition && extraCondition.map(({id,props})=>{
            if(Array.isArray(props)){
                props.map((p)=>{
                    data[p.fieldEn] = p.fieldValue;
                })
            }else{
                data[props.fieldEn] = props.fieldValue;
            }
        });
        return data
    }

    initTemplate = (props) =>{
        console.log(props)
        const {templateSource} = props
        if(templateSource && !templateSource instanceof Array){
            throw  new TypeError('AdSearch 组件的 extraCondition 只接受 "Array" 格式的数据');
        }
        let data = {};
        templateSource && templateSource.map((temp)=>{
            data[temp.id] = temp
        })
        return data;
    };

    onArraySelect = (value,option) =>{
        this.setState({
            arrSelectValue:value
        })
        this.props.onArraySelect && this.props.onArraySelect(value,option)
    };

    onElementValueChange = (e) =>{
        console.log(e)
        let data = this.state.data;
        if(e.target){
            const {id,value} = e.target;
            data[id] = value;
        }
        this.setState({data})
    };

    onElementSelectChange = (value,id) =>{
        let data = this.state.data;
        data[id] = value
        this.setState({data})
    };

    onElementDateChange = (id,dates,dateStrings) =>{
        console.log(id,dates,dateStrings)
        let data = this.state.data;
        data[id] = dates;
        this.setState({data})
    };

    getLabelWidth = (labelName) => {
        if(!labelName) {
            return null;
        }
        const length = Math.floor(this.getStringLength(labelName)/2);
        if(length <= 2) {
            return '2em'
        } else if(length >= 8) {
            return '8em'
        } else {
            return length+'em';
        }
    };

    getStringLength = (str)=> {
        if (!str) return 0;
        if (typeof str !== "string"){
            str += "";
        }
        return str.replace(/[^\x00-\xff]/g,"01").length;
    }

    creatElement = (props) =>{
        const {fieldCn,fieldEn,fieldType,...otherProps} = props;
        let fieldValue = props.fieldValue || "";

        if(fieldType === 'text'){
            //input
            const inputProps = {
                ...otherProps,
                id : fieldEn,
                value : this.state.data[fieldEn],
                onChange : this.onElementValueChange,
                size : themeType,
            }
            return (
                <FormItem label={fieldCn} key={fieldEn}>
                    <Input {...inputProps}/>
                </FormItem>
            )
        }else if(fieldType === 'select'){
            //单选框
            const selectProps = {
                ...otherProps,
                id : fieldEn,
                dropdownMatchSelectWidth : false,
                size : themeType,
                placeholder : '请选择',
                value : this.state.data[fieldEn],
                onChange : this.onElementSelectChange,
            }
            return(
                <FormItem label={fieldCn} labelWidth={this.getLabelWidth(fieldCn)} key={fieldEn}>
                    <Select style={{width:selectWidth}} {...selectProps}/>
                </FormItem>
            )
        }else if(fieldType === 'multi_select'){
            //多选框
            if(!fieldValue){
                fieldValue = [];
            }
            const selectProps = {
                ...otherProps,
                id : fieldEn,
                dropdownMatchSelectWidth : false,
                size : themeType,
                placeholder : '请选择',
                value : this.state.data[fieldEn],
                onChange : this.onElementSelectChange,
                mode : "multiple",
            }
            return(
                <FormItem label={fieldCn} labelWidth={this.getLabelWidth(fieldCn)} key={fieldEn}>
                    <Select style={{minWidth:selectWidth}} {...selectProps}/>
                </FormItem>
            )
        }else if(fieldType === 'date'){
            //时间选择框
            const dateProps = {
                ...otherProps,
                id : fieldEn,
                value : this.state.data[fieldEn],
                onChange : this.onElementDateChange,
            }
            return(
                <FormItem key={fieldEn}>
                    <DatePicker {...dateProps}/>
                </FormItem>
            )
        }else if(fieldType === 'date_range'){
            //时间范围选择

            const dateProps = {
                format:"YYYY-MM-DD",
                ...otherProps,
                id : fieldEn,
                value : this.state.data[fieldEn],
                onChange : this.onElementDateChange,
            }
            return(
                <FormItem key={fieldEn}>
                    <RangePicker {...dateProps}/>
                </FormItem>
            )
        }
    }

    creatDefaultCondition = (defaultCondition,extraCondition) =>{
        let children = [];
        defaultCondition && defaultCondition.map((con)=>{
            const {props,id} = con
            if(props){
                if(Array.isArray(props)){
                    const arrSelectValue = this.state.arrSelectValue || props[0].fieldEn;
                    let selectDefaultValue = "";
                    let options = [];
                    let selectedArrayValue;
                    props.map((prop)=>{
                        const {fieldCn,fieldEn,fieldType,...otherProps} = prop;
                        if(fieldEn === arrSelectValue){
                            selectDefaultValue = fieldCn;
                            selectedArrayValue = this.creatElement(prop)
                        }
                        const optionProp = {fieldType,...otherProps}
                        options.push(<Option key={id} value={fieldEn} name={id} {...optionProp}>{fieldCn}</Option>)
                    });

                    const SelectGen = () =><Select defaultValue={selectDefaultValue} children={options} dropdownMatchSelectWidth={false} onSelect={this.onArraySelect} size={themeType} />
                    children.push(<FormItem key={id}><SelectGen/></FormItem>)
                    if(selectedArrayValue){
                        children.push(selectedArrayValue)
                    }
                }else{
                    children.push(this.creatElement(props))
                }
            }
        });
        if(extraCondition && extraCondition.length>0){
            children.push(<FormItem key="extra"><Popover title={<span>其他条件</span>} content={this.getOtherConditionContent(extraCondition)} placement="bottom" trigger="click"><a>+条件<Icon type="down" size={themeType}/></a></Popover></FormItem>)
        }
        return children;
    };

    getOtherConditionContent = (oc) =>{
        let children = [];
        oc.map((con)=>{
            let checked = false;
            const propname = `${con.id}checked`;
            children.push(<FormItem key={con.id}><Checkbox id={con.id} checked={this.state[propname]||false} onChange={this.onExtraConditionChecked}>{con.props.fieldCn}</Checkbox></FormItem>)
        });


        return (
            <Wrap style={{width:500}}>
                <Panel>
                    <FormLayout key="ocContent" children={children} inline inputSize={themeType}/>
                </Panel>
            </Wrap>
        )
    };

    onExtraConditionChecked = (e) =>{
        let {extraConditionCheckedList,data} = this.state;
        if(e.target.checked){
            extraConditionCheckedList.push(e.target.id)
        }else{
            extraConditionCheckedList = extraConditionCheckedList.filter(item => item !== e.target.id)
            data[e.target.id] = e.target.value;
        }
        const propname = `${e.target.id}checked`;
        this.setState({
            [propname]:e.target.checked,
            extraConditionCheckedList,
            data
        })
    };

    onReset = () =>{
        const extraConditionCheckedList = this.state.extraConditionCheckedList;
        extraConditionCheckedList.map((con)=>{
            const propname = `${con}checked`;
            this.setState({
                [propname]:false
            })
        })
        const data = this.initData(this.props);
        let selectedTemplateName;
        this.setState({
            selectedTemplateName,
            arrSelectValue:"",
            extraConditionCheckedList:[],
            data
        })
        this.props.onReSet();
    };


    onTemplateNameChange = (e) =>{
        const templateName = e.target.value
        const templateNames = this.state.templateNames;
        let templateId = this.state.selectedTemplateId;
        if(templateNames[templateName]){
            templateId = templateNames[templateName].id;
        }else{
            templateId = -1;
        }
        this.setState({
            templateName,templateId
        })
    }


    getSaveMySearchContent = (onSaveMySearch) =>{
        let templateName = this.state.templateName || "";
        let templateId = this.state.templateId;
        const templateNames = this.state.templateNames;
        // function onChange(e) {
        //     templateName = e.target.value
        //     if(templateNames[templateName]){
        //         templateId = templateNames[templateName].id;
        //     }else{
        //         templateId = -1;
        //     }
        // }

        //条件列表只返回选中的其他条件
        // let conditionList = this.state.OtherConditionCheckedList;
        // const checkedConditionList = this.clearDefaultCondition(conditionList,this.props.defaultCondition)
        // this.clearDefaultCondition(conditionList,this.props.defaultCondition);

        const conditions = this.props.defaultCondition.concat(this.props.extraCondition);
        const inputProps = {
            id:"templateName",
            placeholder:"请输入模板名",
            onChange:this.onTemplateNameChange,
            value:this.state.templateName
        };
        if(this.props.templateNameMaxLength){
            inputProps.max = this.props.templateNameMaxLength
        }
        return(
            <Wrap>
                <Panel>
                    <FormLayout inline inputSize={themeType} key="template">
                        <FormItem label="名称">
                            <Input {...inputProps}/>
                        </FormItem>
                        <FormItem>
                            <Button children="保存" size={themeType} onClick={()=>{onSaveMySearch(templateName,templateId,this.state.data,conditions)}}/>
                        </FormItem>
                    </FormLayout>
                </Panel>
            </Wrap>
        )
    };

    getExtraConditionChildren = (oc) =>{
        let children = [];
        const extraConditionCheckedList = this.state.extraConditionCheckedList;

        if(extraConditionCheckedList.length>0){
            const _oc = {};
            oc.map((con)=>{
                _oc[con.id]=con;
            });
            extraConditionCheckedList.map((ocId)=>{
                const condition = _oc[ocId];
                if(condition){
                    children.push(this.creatElement(condition.props))
                }
            })
        }
        return children;
    };

    getTemplateChildren = (templateSource) =>{
        let children = [];
        templateSource.map((tem)=>{
            const {id,templateName} = tem;
            let del;
            if(this.props.onDeleteMySearch){
                del = (<a onClick={(event)=>{
                    this.props.onDeleteMySearch(tem)
                    event.stopPropagation();
                }} className="selected_del"><Icon type="cross" style={{float:'right',paddingTop:3}}/></a>);
            }

            children.push(<Option key={id} value={templateName}>{templateName}{del}</Option>)
        });
        const props = {
            onSelect:this.onTemplateSelect,
            size:themeType,
            placeholder:"我的查询",
            dropdownMatchSelectWidth:false,
            value:this.state.selectedTemplateName
        }
        return (<FormItem key="templateChildren"><Select {...props} style={{width:selectWidth}}>{children}</Select></FormItem>)
    };

    onTemplateSelect = (value) =>{
        console.log(value)
        let {templateNames,template,data,arrSelectValue} = this.state;
        const id = templateNames[value]
        const templateData = template[id];
        let {advancedcondition} = templateData;

        if(typeof advancedcondition === 'string'){
            advancedcondition = JSON.parse(advancedcondition)
        }

        let extraConditionCheckedList = [];
        let list = [];
        const {defaultCondition} = this.props;
        defaultCondition.map((con)=>{
            if(Array.isArray(con.props)){
                con.props.map((c)=>{
                    list.push(c.fieldEn)
                })
            }
        });

        advancedcondition.map((adc)=>{
            if(list.indexOf(adc.fieldEn)>-1){
                arrSelectValue = adc.fieldEn
            }
            const id = adc.fieldEn;
            const fv = adc.fieldValue;
            data[id] = fv;
            const propname = `${id}checked`;
            extraConditionCheckedList.push(id)
            this.setState({
                [propname]:true
            })
        });
        this.setState({
            selectedTemplateName:value,
            selectedTemplateId:id,
            templateName:value,
            data,
            arrSelectValue,
            extraConditionCheckedList
        })
        this.props.onArraySelect && this.props.onArraySelect(arrSelectValue)
    }

    render(){
        const {customTopLine,customFootLine,extraCondition,defaultCondition,onSearch,onReSet,onSaveMySearch,templateSource,...otherProps} = this.props;
        const {data} = this.state;
        let defaultConditionChildren = this.creatDefaultCondition(defaultCondition,extraCondition);
        if(onSearch){
            defaultConditionChildren.push(<FormItem key="onSearch"><Button children="查询" size={themeType} onClick={()=>onSearch({data})}/></FormItem>);
        }
        if(onReSet){
            defaultConditionChildren.push(<FormItem key="onReSet"><Button children="重置" size={themeType} onClick={()=>this.onReset()}/></FormItem>);
        }
        if(onSaveMySearch){
            defaultConditionChildren.push(<FormItem key="onSaveMySearch"><Popover placement="bottom" trigger="click" content={this.getSaveMySearchContent(onSaveMySearch)}><Button children="存入我的查询" size={themeType}/></Popover></FormItem>);
        }
        if(templateSource && Array.isArray(templateSource) && templateSource.length>0){
            defaultConditionChildren.push(this.getTemplateChildren(templateSource))
        }

        const extraConditionChildren = this.getExtraConditionChildren(extraCondition);
        return(
            <Wrap>
                <Panel>
                    {customTopLine && <FormLayout key="customTopLine">
                        <CustomTopLine content={customTopLine}/>
                    </FormLayout>}
                    <FormLayout key="defaultConditionChildren" children={defaultConditionChildren} inline inputSize={themeType}/>
                    <FormLayout key="extraConditionChildren" children={extraConditionChildren} inline inputSize={themeType}/>
                    {customFootLine && <FormLayout key="customFootLine">
                        <CustomFootLine content={customFootLine}/>
                    </FormLayout>}
                </Panel>
            </Wrap>
        )
    }
}
export default AdSearch