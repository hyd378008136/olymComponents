import React, { Component } from "react";

import {Button, Modal,Row,Col, OlymTable as ATable} from 'antd';

import CustomColumnsModal from './CustomColumnsModal'
import isEqual from 'lodash.isequal'
import $ from 'jquery'

import './style.css'
import '../styles/common.less'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            timeId: (new Date()).valueOf()
        };
    }

    componentDidMount = () => {
        this.setDragula();
    }

    //设置拖拽
    setDragula = () => {
        let { timeId } = this.state;
        $('#' + timeId + ' th,td').css({ position: 'relative' });
        for (let k = 0; k < $('#' + timeId + ' table').length; k++) {
            for (let i = 0; i < $('#' + timeId + ' table').eq(k).find('th').length; i++) {
                $('#' + timeId + ' table').eq(k).find('th').eq(i).append('<div dataIndex=' + i + ' tableIndex=' + k + ' class="druagle-border" style="width:0;height:100%;border-right:2px solid transparent;cursor:e-resize;position:absolute;right:0;top:0"></div>');   
            }
            for (let j = 0; j < $('#' + timeId + ' table').eq(k).find('tbody').find('tr').length; j++) {
                for(let x = 0; x < $('#' + timeId + ' table').eq(k).find('tbody').find('tr').eq(j).find('td').length; x++){
                    $('#' + timeId + ' table').eq(k).find('tbody').find('tr').eq(j).find('td').eq(x).append('<div dataIndex=' + x + ' tableIndex=' + k + ' class="druagle-border" style="width:0;height:100%;border-right:2px solid transparent;cursor:e-resize;position:absolute;right:0;top:0"></div>');
                }
            }
        }
        let isMoveStart = false;
        let oldX = 0;
        let oldWidth = 0;
        let oldTableWidth = 0;
        let selectIndex = 0;
        let tableIndex = 0;
        $('#' + timeId + ' th .druagle-border').on('mousedown', function () {
            isMoveStart = true;
            oldX = event.screenX;
            oldWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).find('th').eq($(this).attr('dataIndex')).width();
            selectIndex = $(this).attr('dataIndex');
            tableIndex = $(this).attr('tableIndex');
            oldTableWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).width();
            $('#' + timeId + ' col').css({ minWidth: 0 })
        })
        $('#' + timeId + ' td .druagle-border').on('mousedown', function () {
            isMoveStart = true;
            oldX = event.screenX;
            oldWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).find('th').eq($(this).attr('dataIndex')).width();
            selectIndex = $(this).attr('dataIndex');
            tableIndex = $(this).attr('tableIndex');
            oldTableWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).width();
            $('#' + timeId + ' col').css({ minWidth: 0 })
        })
        $('#' + timeId + ' table').on('mousemove', function () {
            if (isMoveStart) {
                console.info(selectIndex, tableIndex)
                $('#' + timeId + ' table').eq(tableIndex).find('col').eq(selectIndex).width(event.screenX - oldX + oldWidth);
                $('#' + timeId + ' table').eq(tableIndex).width(oldTableWidth + event.screenX - oldX + oldWidth - oldWidth);
            }
        })
        $('#' + timeId + ' table').on('mouseup', function () {
            isMoveStart = false;
        })
        $('#' + timeId + ' table').on('mouseleave', function () {
            isMoveStart = false;
        })
    }

    //设置可拖拽控制宽度
    componentDidUpdate = () => {
        this.setDragula();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (isEqual(nextProps, this.props) && isEqual(nextState, this.state)) {
            return false
        } else {
            return true
        }
    }

    getUserDefineCol = (columns, customColumns) => {
        if (!customColumns || customColumns.length === 0) {
            return columns.concat();
        }
        let userDefineColumns = [];
        // let columnsMap = {};
        // columns.map((col)=>{
        //     columnsMap[col.dataIndex]=col
        // })
        let customColumnsMap = {};
        customColumns.map((col) => {
            customColumnsMap[col.dataIndex] = col;
        })
        let extraColumns = [];
        // customColumns.map((obj)=>{
        //     const dataIndex = obj.dataIndex;
        //     if(!obj.orderNo || obj.orderNo<0){
        //         return;
        //     }
        //     if(columnsMap[dataIndex]){
        //         const column = columnsMap[dataIndex];
        //         column["orderNo"] = obj.orderNo;
        //         userDefineColumns.push(column);
        //     }else{
        //         userDefineColumns.push(obj);
        //     }
        // })
        columns.map((obj) => {
            const dataIndex = obj.dataIndex;
            // if (!obj.orderNo || obj.orderNo < 0) {
            //     return;
            // }
            if (!obj.key) {
                obj.key = obj.dataIndex;
            }
            if (customColumnsMap[dataIndex]) {
                const customCol = customColumnsMap[dataIndex];
                if (customCol.orderNo && customCol.orderNo > -1) {
                    obj.orderNo = customColumnsMap[dataIndex].orderNo;
                    userDefineColumns.push(obj);
                }
            } else {
                extraColumns.push(obj)
            }
        })
        console.log(customColumnsMap)
        userDefineColumns = userDefineColumns.concat(extraColumns);
        userDefineColumns.sort((a, b) => {
            return a.orderNo - b.orderNo;
        })
        return userDefineColumns;
    }

    handleClose = () => {
        this.setState({ visible: false })
    }

    handleShow = () => {
        this.setState({ visible: true })
    }

    render() {
        console.info(this.props)
        const { columns, customColumns, onCustomChange, showSeq, dataSource, customCtns, title, ...otherProps } = this.props;
        const { timeId } = this.state;
        //多传参数会报错。原因不知道。先把不要用的参数去掉
        let _customColumns = [];
        customColumns && customColumns.map((col) => {
            const { orderNo, dataIndex, title } = col
            _customColumns.push({ orderNo, dataIndex, title })
        })
        _customColumns.sort((a, b) => {
            return a.orderNo - b.orderNo;
        })
        //处理自定义列
        // console.log(columns, _customColumns)
        const userDefineColumns = this.getUserDefineCol(columns, _customColumns);
        let _dataSource;

        if (showSeq && userDefineColumns[0] && userDefineColumns[0].key !== 'olymc_seq') {
            //显示序号
            _dataSource = [];
            dataSource.map((data, index) => {
                // console.log(index)
                // data["olymc_seq"] = index + 1;
                _dataSource.push({
                    olymc_seq: index + 1,
                    ...data
                })
            })
            // console.log(dataSource)
            userDefineColumns.unshift({
                dataIndex: "olymc_seq",
                key: "olymc_seq",
                title: "序号",
                width: '50px'
            })
            // console.log(userDefineColumns)
        }

        // let title = this.props.title;


        // 弹出框参数
        const modalOpts = {
            // ...customConfig,
            columnKeys: _customColumns,
            visible: this.state.visible,
            onCancel: this.handleClose,
            onOk: onCustomChange,
            // dataSource: []
            customColumns: _customColumns
        }

        //处理title
        const _title = () => {
            const left = () => {
                let leftChildren = [];
                if (title) {
                    if (typeof title === "string") {
                        leftChildren.push(<b key="table_title">{title}</b>)
                    } else {
                        leftChildren.push(title)
                    }

                }
                if (_customColumns && Array.isArray(_customColumns) && _customColumns.length > 0) {
                    const buttonProps = {
                        onClick: this.handleShow,
                        size: "small",
                        key: "custom"
                    };
                    if (title) {
                        buttonProps.className = "ml8"
                    }
                    leftChildren.push(<Button {...buttonProps}>自定义列</Button>)
                }
                if (leftChildren.length === 0) {
                    return;
                }
                return <div className="tal" key="leftarea">
                    {leftChildren}
                </div>
            };
            const right = () => {
                let rigthChildren = [];
                if (customCtns && Array.isArray(customCtns) && customCtns.length > 0) {
                    customCtns.map((btn) => {
                        const { props, ...others } = btn;
                        const _btn = {
                            props: {
                                ...props,
                                className: "custom_other_btn_right",

                            },
                            ...others
                        }
                        rigthChildren.unshift(_btn)
                    })
                    return (<div className="tar" key="rightarea">
                        {rigthChildren}
                    </div>)
                } else if (customCtns && typeof customCtns === "function") {
                    return (<div className="tar" key="rightarea">
                        {customCtns()}
                    </div>)
                }
            }
            return (<Row>
                <Col span={6}>
                    {left()}
                </Col>
                <Col span={18}>
                    {right()}
                </Col>
            </Row>)
        };

        console.log(_title())


        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        //把处理完的数据组合成新的props
        const props = {
            ...otherProps,
            // title:_title,
            dataSource: _dataSource || dataSource,
            columns: userDefineColumns,

        };
        if (title || customCtns || (_customColumns && _customColumns.length > 0)) {
            props.title = _title
        }
        return (
            <div id={timeId}>
                <ATable {...props} />
                <CustomColumnsModalGen />
            </div>

        )
    }
}
export default Table;