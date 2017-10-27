import React,{Component} from "react";

import {Table as ATable,Button, Modal} from 'antd';

import CustomColumnsModal from './CustomColumnsModal'

import './style.css'

class Table extends Component{
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        };
    }

    getUserDefineCol = (columns,customColumns) =>{
        if(!customColumns){
            return columns;
        }
        let columnsMap = {};
        columns.map((col)=>{
            columnsMap[col.dataIndex]=col
        })
        let userDefineColumns = [];
        customColumns.map((obj)=>{
            const dataIndex = obj.dataIndex;
            if(!obj.orderNo || obj.orderNo<0){
                return;
            }
            if(columnsMap[dataIndex]){
                const column = columnsMap[dataIndex];
                column["orderNo"] = obj.orderNo;
                userDefineColumns.push(column);
            }else{
                userDefineColumns.push(obj);
            }
        })
        userDefineColumns.sort((a,b)=>{
            return a.orderNo-b.orderNo;
        })
        return userDefineColumns;
    }

    handleClose = () => {
        this.setState({visible: false})
    }

    handleShow = () => {
        this.setState({visible: true})
    }

    render(){
        const {columns,customColumns,onCustomChange,showSeq,dataSource,...otherProps} = this.props;
        //多传参数会报错。原因不知道。先把不要用的参数去掉
        let _customColumns = [];
        customColumns.map((col)=>{
            const {orderNo,dataIndex,title} = col
            _customColumns.push({orderNo,dataIndex,title})
        })
        _customColumns.sort((a,b)=>{
            return a.orderNo-b.orderNo;
        })
        //处理自定义列
        const userDefineColumns = this.getUserDefineCol(columns,_customColumns);

        if(showSeq){
            //显示序号
            dataSource.map((data,index)=>{
                // console.log(index)
                data["seq"]=index+1;
            })
            // console.log(dataSource)
            userDefineColumns.unshift({
                dataIndex:"seq",
                key:"seq",
                title:"序号",
                width: '50px'
            })
            // console.log(userDefineColumns)
        }

        let title = this.props.title;



        // 弹出框参数
        const modalOpts = {
            // ...customConfig,
            columnKeys:_customColumns,
            visible: this.state.visible,
            onCancel: this.handleClose,
            onOk: onCustomChange,
            // dataSource: []
            customColumns:_customColumns
        }

        if(_customColumns && Array.isArray(_customColumns) && _customColumns.length>0){
            title = (data) => <Button onClick={this.handleShow} size="small">自定义列</Button>
        }

        // 每次弹框都重新渲染
        const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />

        //把处理完的数据组合成新的props
        const props = {
            ...otherProps,
            title,
            dataSource,
            columns:userDefineColumns,

        }
        return(
            <div>
                <ATable {...props}/>
                <CustomColumnsModalGen />
            </div>

        )
    }
}
export default Table;