import React, {Component} from 'react';
import {Dropdown, Input, Select} from 'antd';
import './styles/index'

const Option = Select.Option;


//props selectKey 指定一个key的值填入input中
class RichSelect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: null,
        }
    }

    static propTypes = {
        dataBody: React.PropTypes.array,
        dataHead: React.PropTypes.object,
        dropdwonMaxRows: React.PropTypes.number
    }

    static defaultProps = {
        selectKey: "value",
        disabled: false,
        scrollHeight: 32
    }

    handleSelect = (value, option) => {
        const {dataBody, selectKey} = this.props;
        var index = option.props.index;
        let obj = dataBody[index];
        if (obj) {
            this.props.onSelect && this.props.onSelect(obj[selectKey], option, obj);
        }
    }

    render() {
        window.__this = this;
        const {dataHeader, dataBody, selectKey, style = {"width": "100%"}, notFoundContent, ...props} = this.props;
        const hasDataBody = dataBody && dataBody.length > 0;
        const dropdownHeadData = dataHeader,
            dropdownBodyData = hasDataBody ? dataBody : (notFoundContent || "not found");
        //console.log(dataHeader)
        // 拼接下拉框header部分结构
        const dropdownHeadElement = dropdownHeadData ? <Option key="title" disabled>{dropdownHeadData.map(val => <p
            key={val.dataIndex}>{val.title}</p>)}</Option> : '';
        const dropdownBodyElement = !hasDataBody ?
            <Option key="no-data" className="no-data" disabled><p colSpan="2">{dropdownBodyData}</p><p></p>
            </Option> : createBodyElement();

        //下拉框body部分
        function createBodyElement() {
            const isArray = dropdownBodyData instanceof Array;
            if (!isArray) {
                throw  new TypeError('RichSelect 组件的 dataBody 只接受 "Array" 格式的数据');
            }

            return dropdownBodyData.map(function (val, index) {
                // TODO unique key问题
                const parentVal = val;
                const _item = dropdownHeadData.map((val, i) => <p key={val.dataIndex}>{parentVal[val.dataIndex]}</p>);
                return <Option key={index} value={val[selectKey]}>{_item}</Option>//这里的key可以当value使用，不用再定义value
            })
        }

        // console.log("dropdownBodyElement", dropdownBodyElement);

        // var dropdwonMaxRows = props.dropdwonMaxRows || 8;
        // const dropdwonMaxHeight = (dropdwonMaxRows + 1) * this.props.scrollHeight;
        // const dropdownStyle = {maxHeight: dropdwonMaxHeight}

        return (
            <Select ref="input" {...props} dropdownMatchSelectWidth={false}
                    optionLabelProp={"value"} dropdownClassName={"rich-select"} style={style}
                    onSelect={this.handleSelect}>
                {dropdownHeadElement}
                {dropdownBodyElement}
            </Select>
        )
    }

}

export default RichSelect;