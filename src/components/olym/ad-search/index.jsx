import React,{Component} from "react";

import {Input, Button, Row, Col, Modal, Message, Icon,Affix,Checkbox,Popover,message, Cascader} from 'antd';
import {Table, FormLayout, Split, Wrap, Panel,Tag,DatePicker, Select} from 'olym'

import CustomTopLine from './CustomTopLine';
import CustomFootLine from './CustomFootLine';
import isEqual from 'lodash.isequal';
import _ from 'lodash';

const FormItem = FormLayout.FormItem;
const RangePicker = DatePicker.RangePicker;
const selectWidth = 100;
const themeType = 'small';
const Option = Select.Option;

class AdSearch extends Component{

  constructor(props) {
    super(props)
    const {data,dcList,ocMap} = this.initData(props);
    const template = this.initTemplate(props);
    let templateNames = {};
    for(let id in template){
      templateNames[template[id].templateName] = id
    }
    console.log(data,dcList,ocMap)
    let selectedTemplateName;
    this.state = {
      data,
      dcList,
      ocMap,
      // extraConditionCheckedList:[],
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
    if(this.props.extraCondition && nextProps.extraCondition && !isEqual(this.props.extraCondition, nextProps.extraCondition)){
      const {data,dcList,ocMap} = this.initData(nextProps);
      this.setState({
        // data,
        // dcList,
        ocMap,
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
    let dcList = [];
    let ocMap = {};
    let _this = this
    defaultCondition.map(({id,props})=>{
      if(Array.isArray(props)){
        props.map((p)=>{
          data[p.fieldEn] = p.fieldValue;
          dcList.push(p.fieldEn)
        })
      }else{
        data[props.fieldEn] = props.fieldValue;
        dcList.push(props.fieldEn)
      }
    });
    extraCondition && extraCondition.map(({id,props})=>{
      if(Array.isArray(props)){
        props.map((p)=>{
          data[p.fieldEn] = p.fieldValue;
          ocMap[p.fieldEn] = p;
          _this.addDefaultReflectMap(p, ocMap[p.fieldEn])
        })
      }else{
        data[props.fieldEn] = props.fieldValue;
        ocMap[props.fieldEn] = props;
        _this.addDefaultReflectMap(props, ocMap[props.fieldEn])
      }
    });
    console.log("ocMap",ocMap)
    return {data,dcList,ocMap}
  }

  addDefaultReflectMap = (props, field) => {
    let { fieldType, children } = props
    if (fieldType === "select" || fieldType === "multi_select") {
      let map = new Map()
      children.map(child => {
        map.set(child.key || child.props.value, child.props.children)
      })
      if (field && field.reflectMap === undefined)
        field.reflectMap = map
    }
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

  onElementDateChange = (dates, dateStrings, id, index) =>{
    console.log(id,dates,dateStrings)
    let {data} = this.state;
    if (index || index === 0) {
      id = _.dropRight(id.split('_')).join('_');
      data[id][index] = dates
    } else {
      data[id] = dates;
    }
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
    const {fieldCn, fieldEn, fieldType, divide, ...otherProps} = props;
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
      if (divide) {
        // 两段式
        const startDateProps = {
          format: "YYYY-MM-DD",
          ...otherProps,
          id : `${fieldEn}_0`,
          value : this.state.data[fieldEn][0],
          onChange : (dates, dateStrings, id) => this.onElementDateChange(dates, dateStrings, id, 0),
        }
        const endDateProps = {
          format: "YYYY-MM-DD",
          ...otherProps,
          id : `${fieldEn}_1`,
          value : this.state.data[fieldEn][1],
          onChange : (dates, dateStrings, id) => this.onElementDateChange(dates, dateStrings, id, 1),
        }
        return (
          _.concat(
            <FormItem key={`${fieldEn}_0`}>
              <DatePicker {...startDateProps}/>
            </FormItem>,
            <FormItem key={`${fieldEn}_0.5`}>
              <span>——</span>
            </FormItem>,
            <FormItem key={`${fieldEn}_1`}>
              <DatePicker {...endDateProps}/>
            </FormItem>
          )
        )
      } else {
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
  }

  //跟上面那个方法差不多 创建 条件按 的那个搜索框，目前只支持单选和输入框
  creatExtraSearchValueField = (props) =>{
    const {fieldCn,fieldEn,fieldType,reflectMap,...otherProps} = props;
    // let fieldValue = props.fieldValue || "";

    if(fieldType === "select" || fieldType === "multi_select"){
      const selectProps = {
        ...otherProps,
        id : fieldEn,
        dropdownMatchSelectWidth : false,
        size : themeType,
        placeholder : '请选择',
        value : this.state.extraSearchValue,
        onSelect : this.onExtraSearchValueSelect,
      };
      if (selectProps.mode && selectProps.mode === 'combobox'){
        selectProps.onChange = this.onExtraSearchValueChange
      }
      return(
        <FormItem key="extraSearchValue">
          <Select style={{width:selectWidth}} {...selectProps}/>
        </FormItem>
      )
    } else if (fieldType === 'cascader') {
      const cascaderProps = {
        ...otherProps,
        id: fieldEn,
        value: this.state.extraSearchValue,
        onChange: this.onExtraSearchValueChange
      };
      return (
        <FormItem key="extraSearchValue">
          <Cascader {...cascaderProps}/>
        </FormItem>
      )
    }else{
      return (
        <FormItem key="extraSearchValue">
          <Input onChange={this.onExtraSearchValueChange} value={this.state.extraSearchValue} onPressEnter={this.onSearch}/>
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
            // children.push(selectedArrayValue)
            children = _.concat(children, selectedArrayValue)
          }
        }else{
          // children.push(this.creatElement(props))
          children = _.concat(children, this.creatElement(props))
        }
      }
    });
    if(extraCondition && extraCondition.length>0){
      // children.push(<FormItem key="extra"><Popover title={<span>其他条件</span>} content={this.getOtherConditionContent(extraCondition)} placement="bottom" trigger="click"><a>+条件<Icon type="down" size={themeType}/></a></Popover></FormItem>)
      children.push(<FormItem key="extra" label="条件按">
        <Select size="small" dropdownMatchSelectWidth={false}
                placeholder="条件筛选" style={{minWidth:80}}
                onSelect={this.onExtraConditionSelect}
                value={this.state.extraCondition}
        >
          {extraCondition.map(({props})=>{
            return <Option name={props.fieldEn} key={props.fieldEn}>{props.fieldCn}</Option>
          })}
        </Select>
      </FormItem>)
      const extraPropsId = this.state.extraCondition;
      let extraProps = {};
      if(extraPropsId){
        extraProps = this.state.ocMap[extraPropsId];
      }
      console.log("extraProps",extraProps)
      // children.push(this.creatExtraSearchValueField(extraProps))
      children = _.concat(children, this.creatExtraSearchValueField(extraProps))
    }
    return children;
  };

  onExtraConditionSelect = (value,option) =>{
    this.setState({
      extraCondition:value
    })
  };

  onExtraSearchValueChange = (e) =>{
    let value;
    if(e.target){
      value = e.target.value;
    }else{
      value = e;
    }
    this.setState({
      extraSearchValue:value
    })
  };

  onExtraSearchValueSelect = (value) =>{
    new Promise((resolve,reject)=>{
      resolve(this.onExtraSearchValueChange(value))
    }).then(()=>{
      this.onSearch()
    })

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

  onTemplateSave = (templateName, templateId, data, conditions, onSaveMySearch) => {
    let name = templateName.trim()
    if (name === '') {
      Message.error('请输入模版名');
      return
    } else if (name.length > 50) {
      Message.error('模版名长度不要超过50');
      return
    }
    onSaveMySearch(name, templateId, data, conditions)
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
              < Button children = "保存"
                       size = {
                         themeType
                       }
                       onClick = {
                         () => {
                           this.onTemplateSave(templateName, templateId, this.state.data, conditions, onSaveMySearch)
                         }
                       }
              />
            </FormItem>
          </FormLayout>
        </Panel>
      </Wrap>
    )
  };

  getExtraConditionChildren = () =>{
    let children = [];
    const {data,dcList,ocMap} = this.state;
    let temp = [];
    function pushValue(key,value){
      const {fieldCn,reflectMap} = ocMap[key];
      let v;
      if(reflectMap){
        v = '';
        if (Array.isArray(value)) {
          v = reflectMap.get(_.last(value)) || _.last(value)
        } else {
          v = reflectMap.get(value) || value
        }
      }else{
        v = value
      }
      const str = fieldCn+"："+v;
      temp.push({key,str,v})
    }
    for(let key in data){
      if(data[key] && dcList.indexOf(key) === -1 && ocMap[key]){
        console.log(key, ocMap)
        const value = data[key];
        const {fieldCn} = ocMap[key]
        if(fieldCn){
          if(Array.isArray(value)){
            value.map((v)=>{
              // const str = fieldCn+"："+v
              // temp.push({key,str,v})
              pushValue(key,v)

            })
          }else if(typeof value === 'string'){
            // const str = fieldCn+"："+value
            // temp.push({key,str,value})
            pushValue(key,value)
          }

        }
      }
    }
    temp.map(({key,str,v},index)=>{
      children.push(<FormItem key={key+v}>
        <Tag closable onClose={(e)=>this.onTagClose(key,v)}>{str}</Tag>
      </FormItem>)
    })
    if(this.props.onSaveMySearch && temp.length>0){
      children.push(<FormItem key="onSaveMySearch"><Popover placement="bottom" trigger="click" content={this.getSaveMySearchContent(this.props.onSaveMySearch)}><Button children="保存条件" size={themeType}/></Popover></FormItem>);
    }
    return children;
  };

  onTagClose = (key,v) =>{
    // console.log(key,v)
    let {data,ocMap} = this.state;
    let targetList = data[key];
    const newList = targetList.filter((item)=>{
      const {reflectMap} = ocMap[key];
      if(reflectMap){
        const value = reflectMap.get(item) || item
        return value !== v;
      }else{
        return item !== v;
      }
    })
    // console.log(newList);
    data[key] = newList;
    this.doSearch(data);
    this.setState({
      data
    })
  };

  doSearch = (data) =>{
    this.props.onSearch && this.props.onSearch({data})
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
        }} className="selected_del"><Icon type="cross" style={{paddingTop:3}}/></a>);
      }
      // console.log(tem)
      children.push(<Option key={id} value={templateName} style={{display:'flex'}}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow:'ellipsis'}}>{templateName}</span>
					{del}
				</Option>)
    });
    const props = {
      onSelect:this.onTemplateSelect,
      size:themeType,
      placeholder:"我的查询",
      dropdownMatchSelectWidth:false,
      value:this.state.selectedTemplateName,
      dropdownMenuStyle: {'max-width': '120px'}
    }
    return (<FormItem key="templateChildren"><Select {...props} style={{width:selectWidth}}>{children}</Select></FormItem>)
  };

  onTemplateSelect = (value) =>{
    console.log(value)
    let {templateNames,template,arrSelectValue} = this.state;
    const id = templateNames[value]
    const templateData = template[id];
    let {advancedcondition} = templateData;

    if(typeof advancedcondition === 'string'){
      advancedcondition = JSON.parse(advancedcondition)
    }

    // let extraConditionCheckedList = [];
    let list = [];
    const {defaultCondition} = this.props;
    defaultCondition.map((con)=>{
      if(Array.isArray(con.props)){
        con.props.map((c)=>{
          list.push(c.fieldEn)
        })
      }
    });
    let data = {}
    advancedcondition.map((adc)=>{
      if(list.indexOf(adc.fieldEn)>-1){
        arrSelectValue = adc.fieldEn
      }
      const id = adc.fieldEn;
      const fv = adc.fieldValue;
      data[id] = fv;
      // const propname = `${id}checked`;
      // extraConditionCheckedList.push(id)
      // this.setState({
      //     [propname]:true
      // })
    });
    this.setState({
      selectedTemplateName:value,
      selectedTemplateId:id,
      templateName:value,
      data,
      arrSelectValue,
      // extraConditionCheckedList
    })
    this.props.onArraySelect && this.props.onArraySelect(arrSelectValue)
    this.doSearch(data)
  };

  onSearch = () =>{
    let {data,extraCondition,extraSearchValue} = this.state;
    let needSearch = true;
    extraSearchValue = typeof extraSearchValue === 'string' ? extraSearchValue.trim() : extraSearchValue
    //组装查询条件，并且清空查询条件，如果只选了条件而没有输入则不清空
    if(extraCondition && extraSearchValue){
      if(data[extraCondition]){
        let value = data[extraCondition];
        if(Array.isArray(value)){
          if(value.indexOf(extraSearchValue) === -1){
            value.push(extraSearchValue);
          }else{
            needSearch = false;
          }
          data[extraCondition] = value;
        }else{
          let list = [value];
          if(value !== extraSearchValue){
            list.push(extraSearchValue);
          }else{
            needSearch = false;
          }
          data[extraCondition] = list;
        }
      }else{
        data[extraCondition] = [extraSearchValue];
      }
      extraCondition=undefined
      extraSearchValue=''
    }

    if(!needSearch){
      message.warn("已存在相同的搜索条件",3)
    }
    needSearch && this.doSearch(data);
    console.log(data,extraCondition,extraSearchValue)
    this.setState({
      data,
      extraCondition,
      extraSearchValue
    })
  }

  render(){
    const {customTopLine,customFootLine,extraCondition,defaultCondition,onSearch,onSaveMySearch,templateSource,...otherProps} = this.props;
    const {data} = this.state;
    let defaultConditionChildren = this.creatDefaultCondition(defaultCondition,extraCondition);
    if(onSearch){
      defaultConditionChildren.push(<FormItem key="onSearch"><Button children="查询" size={themeType} onClick={this.onSearch}/></FormItem>);
    }
    // if(onReSet){
    //     defaultConditionChildren.push(<FormItem key="onReSet"><Button children="重置" size={themeType} onClick={()=>this.onReset()}/></FormItem>);
    // }

    if(templateSource && Array.isArray(templateSource) && templateSource.length>0){
      defaultConditionChildren.push(this.getTemplateChildren(templateSource))
    }

    const extraConditionChildren = this.getExtraConditionChildren();
    const ex = () =>{
      if(extraConditionChildren.length >0){
        return(
          <Row>
            <Col span={1}>
              <FormItem label="搜索条件" key="con"/>
            </Col>
            <Col span={23}>
              <div style={{paddingLeft:15}}>{extraConditionChildren}</div>
            </Col>
          </Row>
        )
      }
    }
    return(
      <Wrap>
        <Panel>
          {customTopLine && <FormLayout key="customTopLine">
            <CustomTopLine content={customTopLine}/>
          </FormLayout>}
          <FormLayout key="defaultConditionChildren" children={defaultConditionChildren} inline inputSize={themeType}/>
          <FormLayout key="extraConditionChildren" inline inputSize={themeType} children={ex()}>
          </FormLayout>
          {customFootLine && <FormLayout key="customFootLine">
            <CustomFootLine content={customFootLine}/>
          </FormLayout>}
        </Panel>
      </Wrap>
    )
  }
}
export default AdSearch