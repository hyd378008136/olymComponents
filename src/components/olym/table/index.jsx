import React, {Component} from "react";

import {Table as ATable, Button, Modal,Row,Col} from 'antd';

import CustomColumnsModal from './CustomColumnsModal'

import './style.css'
import '../styles/common.less'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        };
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
            if(!obj.key){
                obj.key = obj.dataIndex;
            }
            if (customColumnsMap[dataIndex]) {
                const customCol = customColumnsMap[dataIndex];
                if(customCol.orderNo && customCol.orderNo > -1){
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
        this.setState({visible: false})
    }

    handleShow = () => {
        this.setState({visible: true})
    }

    render() {
        const {columns, customColumns, onCustomChange, showSeq, dataSource, customCtns,title, ...otherProps} = this.props;
        //多传参数会报错。原因不知道。先把不要用的参数去掉
        let _customColumns = [];
        customColumns && customColumns.map((col) => {
            const {orderNo, dataIndex, title} = col
            _customColumns.push({orderNo, dataIndex, title})
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
                    olymc_seq:index+1,
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


        // if(customCtns){
        //     if(_customColumns && Array.isArray(_customColumns) && _customColumns.length > 0){
        //         title = (data) =>{
        //             let ctns = [];
        //             ctns.push(<Button onClick={this.handleShow} size="small" key="custom">自定义列</Button>);
        //             customCtns.map((obj) => {
        //                 // obj.props.className = "custom_other_btn_right"
        //                 const {props,...others} = obj;
        //                 const _obj = {
        //                     props:{
        //                         ...props,
        //                         className:"custom_other_btn_right",
        //
        //                     },
        //                     ...others
        //                 }
        //                 console.log(_obj)
        //                 ctns.push(_obj);
        //             })
        //             // ctns.push(<div className="tar">
        //             //     {customCtns}
        //             // </div>)
        //             return ctns;
        //         }
        //     }else{
        //         title = () =>
        //         <div className="tar">
        //             {customCtns}
        //         </div>
        //     }
        // }else{
        //     title = () =><Button onClick={this.handleShow} size="small" key="custom">自定义列</Button>;
        // }

        //处理title
        const _title = () =>{
            const left = () =>{
                let leftChildren = [];
                if(title){
                    if(typeof title === "string"){
                        leftChildren.push(<b key="table_title">{title}</b>)
                    }else{
                        leftChildren.push(title)
                    }

                }
                if(_customColumns && Array.isArray(_customColumns) && _customColumns.length > 0){
                    const buttonProps = {
                        onClick:this.handleShow,
                        size:"small",
                        key:"custom"
                    };
                    if(title){
                        buttonProps.className = "ml8"
                    }
                    leftChildren.push(<Button {...buttonProps}>自定义列</Button>)
                }
                if(leftChildren.length === 0){
                    return;
                }
                return <div className="tal" key="leftarea">
                    {leftChildren}
                </div>
            };
            const right = () =>{
                let rigthChildren = [];
                if(customCtns && Array.isArray(customCtns) && customCtns.length > 0){
                    customCtns.map((btn)=>{
                        const {props,...others} = btn;
                        const _btn = {
                            props:{
                                ...props,
                                className:"custom_other_btn_right",

                            },
                            ...others
                        }
                        rigthChildren.unshift(_btn)
                    })
                    return(<div className="tar" key="rightarea">
                        {rigthChildren}
                    </div>)
                }else if(customCtns && typeof customCtns === "function"){
                    return(<div className="tar" key="rightarea">
                        {customCtns()}
                    </div>)
                }
            }
            return(<Row>
                <Col span={6}>
                    {left()}
                </Col>
                <Col span={18}>
                    {right()}
                </Col>
            </Row>)
        }


        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        //把处理完的数据组合成新的props
        const props = {
            ...otherProps,
            // title:_title,
            dataSource:_dataSource || dataSource,
            columns: userDefineColumns,

        };
        if(title || (customCtns && customCtns.length > 0) || (_customColumns && _customColumns.length>0)){
            props.title = _title
        }
        return (
            <div>
                <ATable {...props}/>
                <CustomColumnsModalGen />
            </div>

        )
    }
}
export default Table;