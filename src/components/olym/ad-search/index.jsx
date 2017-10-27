import React,{Component} from "react";

import {FormLayout,Wrap,Panel} from 'olym'

import {Row,Col,Button,Input,Select,DatePicker,Menu, Dropdown, Icon,Popover,Checkbox } from 'antd'

const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

const FormItem = FormLayout.FormItem;

const selectWidth = 100;
const themeType = 'small';

class AdSearch extends Component{
    constructor(props) {
        super(props)


        // const searchCondition = props.searchCondition || [];
        // let searchConditionMap = {};
        // searchCondition.map((con)=>{
        //     searchConditionMap[con.id] = con.props
        // })
//console.log("searchConditionMap",searchConditionMap)
        this.state = {
            searchConditionMap:{},
            OtherConditionCheckedList:[],
            template:{}
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            const searchCondition = nextProps.searchCondition || [];
            let searchConditionMap = {};
            searchCondition.map((con)=>{
                searchConditionMap[con.id] = con.props
            })
            const templateSource = nextProps.templateSource || [];
            let template = {};
            templateSource.map((tem)=>{
                template[tem.id]=tem;
            })
            this.setState({
                searchConditionMap,template
            })
        }
    }
    //
    // componentWillUnmount(){
    //
    // }

    getElement = (props) =>{

        const {fieldCn,fieldEn,fieldType,...otherProps} = props;
        let fieldValue = props.fieldValue || "";

        if(fieldType === 'text'){
            //input
            const InputGen = () =><Input id={fieldEn} {...otherProps} {...this.state.searchConditionMap[fieldEn]} defaultValue={fieldValue}/>
            return (
                <FormItem label={fieldCn} >
                    <InputGen />
                </FormItem>
            )
        }else if(fieldType === 'select'){
            //单选框
            // console.log(props)
            //  const SelectGen = () =><Select id={fieldEn} dropdownMatchSelectWidth={false} {...otherProps} {...this.state.searchConditionMap[fieldEn]} size={themeType} placeholder='请选择' style={{width:selectWidth}} defaultValue={fieldValue}/>
            return(
                <FormItem label={fieldCn} labelWidth={this.getLabelWidth(fieldCn)}>
                    <Select id={fieldEn} dropdownMatchSelectWidth={false} {...otherProps} {...this.state.searchConditionMap[fieldEn]} size={themeType} placeholder='请选择' style={{width:selectWidth}} defaultValue={fieldValue}/>
                </FormItem>
            )
        }else if(fieldType === 'multi_select'){
            //多选框
            if(!fieldValue){
                fieldValue = [];
            }
            return(
                <FormItem label={fieldCn} labelWidth={this.getLabelWidth(fieldCn)}>
                    <Select id={fieldEn} {...otherProps} {...this.state.searchConditionMap[fieldEn]} children={this.state.searchConditionMap[fieldEn].children} defaultValue={fieldValue} multiple dropdownMatchSelectWidth={false} size={themeType} placeholder='请选择' style={{minWidth:selectWidth}}/>
                </FormItem>
            )
        }else if(fieldType === 'date'){
            //时间选择框
            return(
                <FormItem>
                    <DatePicker id={fieldEn} {...otherProps} {...this.state.searchConditionMap[fieldEn]}/>
                </FormItem>
            )
        }else if(fieldType === 'date_range'){
            //时间范围选择
            // console.log("date_range",fieldValue)
            let defaultValue = [];
            if(fieldValue && typeof fieldValue === 'string'){

                //TODO 临时解决方案
                defaultValue = fieldValue.split(" ~ ")
            }else{
                defaultValue = fieldValue
            }

            //console.log("defaultValue",defaultValue)
            const RangeGen = () =><RangePicker id={fieldEn} {...otherProps} defaultValue={defaultValue} format="yyyy-MM-dd" {...this.state.searchConditionMap[fieldEn]}/>
            return(
                <FormItem>
                    <RangeGen />
                </FormItem>
            )
        }
    }

    getStringLength = (str)=> {
        if (str == null) return 0;
        if (typeof str != "string"){
            str += "";
        }
        return str.replace(/[^\x00-\xff]/g,"01").length;
    }

    getLabelWidth = (labelName) => {
        if(labelName == null || labelName == '') {
            return null;
        } else {
            const length = Math.floor(this.getStringLength(labelName)/2);
            if(length <= 2) {
                return '2em'
            } else if(length >= 8) {
                return '8em'
            } else {
                return length+'em';
            }
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
                const advancedconditionObj = this.getAdvancedconditionObj();
                if(Array.isArray(props)){
                    const arrSelectValue = this.state.arrSelectValue || props[0].fieldEn;
                    let selectDefaultValue = "";
                    const options = props.map((prop)=>{
                        const {fieldCn,fieldEn,fieldType,...otherProps} = prop;
                        if(fieldEn === arrSelectValue){
                            selectDefaultValue = fieldCn
                        }
                        const optionProp = {fieldType,...otherProps}
                        return <Option value={fieldEn} {...optionProp}>{fieldCn}</Option>
                    })
                    //console.log("selectDefaultValue",selectDefaultValue)
                    const SelectGen = () =><Select defaultValue={selectDefaultValue} children={options} dropdownMatchSelectWidth={false} onSelect={this.onArraySelect} size={themeType} />
                    children.push(<FormItem><SelectGen/></FormItem>)
                    props.map((prop)=>{
                        if(prop.fieldEn === arrSelectValue){
                            children.push(this.getElement(advancedconditionObj?advancedconditionObj[arrSelectValue]||prop:prop))
                        }
                    })
                }else{
                    children.push(this.getElement(advancedconditionObj?advancedconditionObj[props.fieldEn]||props:props))
                }
            }
        })
        if(oc.length>0){
            children.push(<FormItem><Popover title={<span>其他条件</span>} content={this.getOtherConditionContent(oc)} placement="bottom" trigger="click"><a>+条件<Icon type="down" size={themeType}/></a></Popover></FormItem>)
        }

        return children;
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

    getAdvancedconditionObj = () =>{
        if(!this.state.template || !this.state.selectedTemplateId){
            return;
        }
        const template = this.state.template[this.state.selectedTemplateId];
        // console.log("template",template)
        let advancedcondition;
        if(typeof template.advancedcondition === 'string'){
            advancedcondition = JSON.parse(template.advancedcondition)
        }else{
            advancedcondition = template.advancedcondition
        }
        let advancedconditionObj = {};
        advancedcondition.map((con)=>{
            advancedconditionObj[con.fieldEn]=con;
        })
        return advancedconditionObj;
    }

    getOtherConditionChildren = (oc) =>{
        let children = [];
        const OtherConditionCheckedList = this.state.OtherConditionCheckedList;

        if(OtherConditionCheckedList.length>0){
            const _oc = {};
            oc.map((con)=>{
                _oc[con.id]=con;
            })
            const advancedconditionObj = this.getAdvancedconditionObj();
            OtherConditionCheckedList.forEach((ocId)=>{
                const condition = _oc[ocId];
                if(condition){
                    //  console.log("condition",condition)
                    children.push(this.getElement(advancedconditionObj?(advancedconditionObj[ocId]||condition.props):condition.props))
                }
            })
        }
        return children
    }

    getOtherConditionContent = (oc) =>{
        let children = [];

        const selectedTemplate = this.state.selectedTemplate;
        let template;
        let advancedcondition;
        let advancedconditionObj;
        if(selectedTemplate){
            template = this.state.template[selectedTemplate]
            if(typeof template.advancedcondition === 'string'){
                advancedcondition = JSON.parse(template.advancedcondition)
            }else{
                advancedcondition = template.advancedcondition
            }
            advancedconditionObj = {};
            advancedcondition.map((con)=>{
                advancedconditionObj[con.fieldEn]=con;
            })
        }
        oc.map((con)=>{
            let checked = false;
            if(advancedconditionObj && advancedconditionObj[con.id]){
                checked = true;
            }
            children.push(<FormItem><Checkbox id={con.id} defaultChecked={checked} onChange={this.onOtherConditionChecked}>{con.props.fieldCn}</Checkbox></FormItem>)
        })
        return (
            <Wrap>
                <Panel>
                    <FormLayout key="ocContent" children={children} inline inputSize={themeType}>
                    </FormLayout>
                </Panel>
            </Wrap>
        )
    }

    getTemplateChildren = (templateSource) =>{
        let children = [];
        templateSource.map((tem)=>{
            const {id,templateName} = tem;
            let del;
            if(this.props.onDeleteMySearch){
                del = (<a onClick={(event)=>{
                    this.props.onDeleteMySearch(tem)
                    event.stopPropagation();
                }}><Icon type="cross" /></a>);
            }
            children.push(<Option key={id} value={id}>{templateName}{del}</Option>)
        })
        const value = this.state.selectedTemplateName || "";
        const props = {
            onSelect:this.onTemplateSelect,
            size:themeType,
            placeholder:"我的查询",
            dropdownMatchSelectWidth:false,
        }
        if(value){
            props.value = value
        }
        return (<FormItem><Select {...props} style={{width:selectWidth}}>{children}</Select></FormItem>)
    }

    onTemplateSelect = (value, option) =>{
        const templateMap = this.state.template;
        const template = templateMap[value];
        let {advancedcondition,businessType,templateName} = template
        // console.log(template)
        if(typeof advancedcondition === 'string'){
            advancedcondition = JSON.parse(advancedcondition)
        }
        let OtherConditionCheckedList = [];
        const {defaultCondition} = this.props;
        let {searchConditionMap,arrSelectValue} = this.state;
        let list = [];
        defaultCondition.map((con)=>{
            if(Array.isArray(searchConditionMap[con])){
                searchConditionMap[con].map((c)=>{
                    list.push(c.fieldEn)
                })
            }
        })
        advancedcondition.map((con)=>{
            if(list.indexOf(con.fieldEn)>-1){
                arrSelectValue = con.fieldEn
            }
            OtherConditionCheckedList.push(con.fieldEn)
        })
        this.setState({
            arrSelectValue,
            selectedTemplate:value,
            selectedTemplateName:templateName,
            selectedTemplateId:template.id,
            OtherConditionCheckedList
        })
    }

    getSaveMySearchContent = (onSaveMySearch) =>{
        let templateName = this.state.selectedTemplateName || "";
        let templateId = this.state.selectedTemplateId;
        function onChange(e) {
            templateName = e.target.value
            templateId = -1;
        }

        // const conditionList = Array.from(new Set(this.state.OtherConditionCheckedList.concat(this.props.defaultCondition)));
        //条件列表只返回选中的其他条件
        const conditionList = this.state.OtherConditionCheckedList;
        return(
            <Wrap>
                <Panel>
                    <FormLayout inline inputSize={themeType}>
                        <FormItem label="名称">
                            <Input placeholder="请输入模板名" onChange={onChange} defaultValue={templateName}/>
                        </FormItem>
                        <FormItem>
                            <Button children="保存" size={themeType} onClick={()=>{onSaveMySearch(templateName,conditionList,templateId)}}/>
                        </FormItem>
                    </FormLayout>
                </Panel>
            </Wrap>
        )
    }

    getTopButtonChildren = (topButton) =>{
        let children = [];
        topButton.map(({props})=>{
            const {displayName,...otherProps} = props;
            children.push(<FormItem><Button children={displayName} size={themeType} {...otherProps}/></FormItem>)
        })
        return children;
    }

    render(){
        const {topButton,searchCondition,defaultCondition,templateSource,onSearch,onReSet,onSaveMySearch} = this.props;
        let dc = [];
        let oc = [];
        searchCondition.map((con)=>{
            if(defaultCondition.indexOf(con.id)>-1){
                dc.push(con)
            }else{
                oc.push(con)
            }
        })
        let topButtonChildren = this.getTopButtonChildren(topButton)
        let defaultConditionChildren = this.getDConChildren(dc,oc);
        if(onSearch){
            defaultConditionChildren.push(<FormItem><Button children="查询" size={themeType} onClick={()=>onSearch()}/></FormItem>);
        }
        if(onReSet){
            defaultConditionChildren.push(<FormItem><Button children="重置" size={themeType} onClick={()=>onReSet()}/></FormItem>);
        }
        if(onSaveMySearch){
            defaultConditionChildren.push(<FormItem><Popover placement="bottom" trigger="click" content={this.getSaveMySearchContent(onSaveMySearch)}><Button children="存入我的查询" size={themeType}/></Popover></FormItem>);
        }
        if(templateSource && Array.isArray(templateSource) && templateSource.length>0){
            defaultConditionChildren.push(this.getTemplateChildren(templateSource))
        }

        const otherConditionChildren = this.getOtherConditionChildren(oc);
        return(
            <Wrap>
                <Panel>
                    <FormLayout key="topButton" children={topButtonChildren} inline inputSize={themeType}/>
                    <FormLayout key="defaultCondition" children={defaultConditionChildren} inline inputSize={themeType}/>
                    <FormLayout key="otherCondition" children={otherConditionChildren} inputSize={themeType} inline/>
                </Panel>
            </Wrap>
        )
    }
}

export default AdSearch;