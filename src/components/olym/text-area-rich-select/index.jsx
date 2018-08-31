import React, {Component} from 'react';
import {Select, TextAreaSelect} from 'antd';
import './styles/index'
import PropTypes from 'prop-types'
import TextArea from "../text-area";

const Option = Select.Option;


//props selectKey 指定一个key的值填入input中
class TextAreaRichSelect extends Component {
    constructor(props) {
        super(props)
    }

    handleSelect = (value, option) => {
        const {dataBody, selectKey} = this.props;
        var index = option.props.index;
        let obj = dataBody[index - 1];
        if (obj) {
            this.props.onSelect && this.props.onSelect(obj[selectKey], option, obj);
        }
    }

    render() {
        const {dataHeader, dataBody, selectKey, notFoundContent = "not found", dropdownMatchSelectWidth = false, ...props} = this.props;
        const hasDataBody = dataBody && dataBody.length > 0;
        let dropdownHeadData = dataHeader,
            dropdownBodyData = hasDataBody ? dataBody : notFoundContent;
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

            var convertDuplicateToUnique = (array, key) => {
                let temp = {}
                array.forEach(item => {
                    temp[item[key]] = pushToList(temp[item[key]], item)
                    let length = temp[item[key]].length
                    if (length > 1) {
                        item[key] = temp[item[key]][length - 2][key] + ' '
                    }
                })
                return array
            }
        
            var pushToList = (item, value) => {
                if (item === undefined) {
                    item = []
                }
                item.push(value)
                return item
            }

            dropdownBodyData = convertDuplicateToUnique(dropdownBodyData, selectKey)

            return dropdownBodyData.map(function (val, index) {
                const parentVal = val;
                const _item = dropdownHeadData.map((val, i) => <p key={val.dataIndex}>{parentVal[val.dataIndex]}</p>);
                return <Option key={index} value={val[selectKey]}>{_item}</Option>
            })
        }

        return (
            <TextAreaSelect ref="input" {...props} dropdownMatchSelectWidth={dropdownMatchSelectWidth}
                    optionLabelProp={"value"} dropdownClassName={"rich-select"}
                    onSelect={this.handleSelect}>
                {dropdownHeadElement}
                {dropdownBodyElement}
            </TextAreaSelect>
        )
    }
}

TextAreaRichSelect.PropTypes = {
    dataBody: PropTypes.array,
    dataHeader: PropTypes.array,
    dropdwonMaxRows: PropTypes.number
}

TextAreaRichSelect.defaultProps = {
    selectKey: "value",
    disabled: false,
    scrollHeight: 32
};

export default TextAreaRichSelect;