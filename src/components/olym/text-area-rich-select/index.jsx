import React, {Component} from 'react';
import {Select, TextAreaSelect} from 'antd';
import './styles/index'
import PropTypes from 'prop-types'
import { convertDuplicateToUnique } from '../util/arrayUtils';

const Option = Select.Option;

class TextAreaRichSelect extends Component {
    constructor(props) {
        super(props)
    }

    handleSelect = (value, option) => {
        const { dataBody, selectKey } = this.props;
        var index = option.props.index;
        let obj = dataBody[index - 1];
        if (obj) {
            this.props.onSelect && this.props.onSelect(obj[selectKey], option, obj);
        }
    }

    getDropDownHeadElement = () => {
        let dataHeader = this.props.dataHeader;
        if (dataHeader) {
            return (
                <Option key="title" disabled>
                    {dataHeader.map(item => <p key={item.dataIndex}>{item.title}</p>)}
                </Option>
            );
        }
        return '';
    }

    getDropDownBodyElement = () => {
        let dataBody = this.props.dataBody;
        if (dataBody && dataBody.length > 0) {
            let selectKey = this.props.selectKey;
            dataBody = convertDuplicateToUnique(dataBody, selectKey);
            return dataBody.map(item => {
                const value = this.props.dataHeader.map(item2 => <p key={item2.dataIndex}>{item[item2.dataIndex]}</p>);
                return <Option key={item[selectKey]}>{value}</Option>;
            })
        } else {
            return (
                <Option key="no-data" className="no-data" disabled>
                    <p colSpan="2">{this.props.notFoundContent}</p><p></p>
                </Option>
            )
        }
    }

    render() {
        const { dataHeader, dataBody, selectKey, notFoundContent, ...props } = this.props;
        return (
            <TextAreaSelect
                {...props}
                optionLabelProp={"value"}
                dropdownClassName={"rich-select"}
                onSelect={this.handleSelect}>
                {this.getDropDownHeadElement()}
                {this.getDropDownBodyElement()}
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
    scrollHeight: 32,
    dropdownMatchSelectWidth: false,
    notFoundContent: 'not found',
};

export default TextAreaRichSelect;