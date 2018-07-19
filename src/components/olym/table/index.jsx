import React, {Component} from "react";

import {Button, Modal, Row, Col, OlymTable as ATable} from 'antd';

import CustomColumnsModal from './CustomColumnsModal'
import _ from 'lodash'
import $ from 'jquery'
import PropTypes from 'prop-types'

import './style.css'
import '../styles/common.less'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      timeId: (new Date()).valueOf(),
	    selectedRowKeys: []
    };
  }

  componentDidMount = () => {
    this.setDragula();
  }
  //设置拖拽
  setDragula = () => {
    // console.info(this.props);
    let {scroll, columns, tableName} = this.props;
    const _this = this
    let {timeId} = this.state;
    let haveColumnFixed = false;
    for (let i of columns) {
      if (i.fixed) {
        haveColumnFixed = true;
        break;
      }
    }
    $('#' + timeId + ' th,td').css({position: 'relative'});
    for (let k = 0; k < $('#' + timeId + ' table').length; k++) {
      for (let i = 0; i < $('#' + timeId + ' table').eq(k).find('th').length; i++) {
        $('#' + timeId + ' table').eq(k).find('th').eq(i).append('<div dataIndex=' + i + ' tableIndex=' + k + ' class="druagle-border" style="width:0;height:100%;border-right:2px solid transparent;cursor:e-resize;position:absolute;right:0;top:0"></div>');
      }
    }
    let isMoveStart = false;
    let oldX = 0;
    let oldWidth = 0;
    let oldTableWidth = 0;
    let selectIndex = 0;
    let tableIndex = 0;
    let tableThis;
    $('#' + timeId + ' th .druagle-border').on('mousedown', function () {
      isMoveStart = true;
      oldX = event.screenX;
      oldWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).find('th').eq($(this).attr('dataIndex')).width();
      selectIndex = $(this).attr('dataIndex');
      tableIndex = $(this).attr('tableIndex');
      oldTableWidth = $('#' + timeId + ' table').eq($(this).attr('tableIndex')).width();
      tableThis = $('#' + timeId + ' table').eq($(this).attr('tableIndex'));
      $('#' + timeId + ' col').css({minWidth: 50})
    })

    $('#' + timeId + ' table').on('mousemove', function () {
      if (isMoveStart && event.screenX - oldX + oldWidth > 50) {
        // console.info(selectIndex, tableIndex)
        // console.info(tableThis.attr('class'))
        $('#' + timeId + ' .ant-table-fixed-left th').height(tableThis.find('th').height());
        $('#' + timeId + ' .ant-table-fixed-right th').height(tableThis.find('th').height());
        for (let i = 0; i < tableThis.find('tr').length; i++) {
          $('#' + timeId + ' .ant-table-fixed-left tr').eq(i).height(tableThis.find('tr').eq(i).height());
          $('#' + timeId + ' .ant-table-fixed-right tr').eq(i).height(tableThis.find('tr').eq(i).height());
        }
        if (scroll && scroll.y && !haveColumnFixed) {
          for (let i = 0; i < $('#' + timeId + ' table').length; i++) {
            $('#' + timeId + ' table').eq(i).find('col').eq(selectIndex).width(event.screenX - oldX + oldWidth);
            $('#' + timeId + ' table').eq(i).width(oldTableWidth + event.screenX - oldX + oldWidth - oldWidth);
          }
        } else if (scroll && scroll.y && haveColumnFixed) {
          // console.info(tableThis)
          //暂设置为 fixed部分table不允许拖动。
          if (tableThis.parent().parent().attr('class') == 'ant-table-scroll') {
            for (let i = 0; i < tableThis.parent().parent().find('table').length; i++) {
              tableThis.parent().parent().find('table').eq(i).find('col').eq(selectIndex).width(event.screenX - oldX + oldWidth);
              tableThis.parent().parent().find('table').eq(i).width(oldTableWidth + event.screenX - oldX + oldWidth - oldWidth);
            }
          }
        } else {
          if (tableThis.parent().parent().attr('class') == 'ant-table-scroll') {
            $('#' + timeId + ' table').eq(tableIndex).find('col').eq(selectIndex).width(event.screenX - oldX + oldWidth);
            $('#' + timeId + ' table').eq(tableIndex).width(oldTableWidth + event.screenX - oldX + oldWidth - oldWidth);
          }
        }
      }
    })
    $('#' + timeId + ' table').on('mouseup', function () {
      const th = $($('#' + timeId + ' table')[0]).find('th')
      let thArr = []
      for(let i = 0, len = th.length; i < len; i++){
        const width = $(th[i]).outerWidth()
        const text = $(th[i]).text()
        const item = {
          width,
          text
        }
	      thArr.push(item)
      }
      // console.log(widthArr)
      isMoveStart = false;
      tableName && _this.setTableWidth(thArr)

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
    if (_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state)) {
      return false
    } else {
      return true
    }
  }
  // 拖拽后保存宽度到 local
  // TODO sample table 拖拽报错，待测试
	setTableWidth = (thArr) => {
    const {tableName} = this.props
    const newThArr = thArr.filter(item => item.text !== '' && item.text !== '序号')
    const tableThWidth = localStorage.getItem('tableThWidth') && JSON.parse(localStorage.getItem('tableThWidth')) || {}
		tableThWidth[tableName] = newThArr
    localStorage.setItem('tableThWidth', JSON.stringify(tableThWidth))
  }
  getUserDefineCol = (columns, customColumns) => {
    if (!customColumns || customColumns.length === 0) {
      return _.extend([], columns)
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
    // console.log(customColumnsMap)
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
    // console.info(this.props)
    const {columns, customColumns, onCustomChange, showSeq, dataSource, customCtns, title, rowSelection, rowClassName, ...otherProps} = this.props;
    const {timeId, selectedRowKeys} = this.state;
    //多传参数会报错。原因不知道。先把不要用的参数去掉
    let _customColumns = [];
    customColumns && customColumns.map((col) => {
      const {orderNo, dataIndex, title} = col
      _customColumns.push({orderNo, dataIndex, title})
    })
    _customColumns.sort((a, b) => {
      return a.orderNo - b.orderNo;
    })
    let _rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys})
	      rowSelection && rowSelection.onChange && rowSelection.onChange(selectedRowKeys, selectedRows)
      }
    }
    //处理自定义列
    // console.log(columns, _customColumns)
    const userDefineColumns = this.getUserDefineCol(columns, _customColumns);
    let _dataSource;
	  const tableThWidth = localStorage.getItem('tableThWidth') && JSON.parse(localStorage.getItem('tableThWidth')) || {}
	  const {tableName} = this.props
	  if(tableThWidth[tableName]){
		  userDefineColumns.map((col, index) => {
			  col.width = tableThWidth[tableName][index].width
		  })
	  }
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
        width: 50,
        render: (text, record, index) => {
          return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
              {text}
            </div>
          )
        }
      })
      // console.log(userDefineColumns)
    }

    // let title = this.props.title;
    if(selectedRowKeys.length > 0){
	    selectedRowKeys.forEach(d => {
	      _dataSource.forEach(item => {
	        if(item.key === d){
		        item.className = 'ant-table-row-clicked'
	        }
        })
      })
    }
    // 弹出框参数
    const modalOpts = {
      // ...customConfig,
      columnKeys: _customColumns,
      visible: this.state.visible,
      onCancel: this.handleClose,
      onOk: onCustomChange,
      // dataSource: []
      customColumns: _customColumns,
      pageSize: this.props.pageSize,
      onCustomInfoChange: this.props.onCustomInfoChange,
      pageSizeList: this.props.pageSizeList
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
        // if (_customColumns && Array.isArray(_customColumns) && _customColumns.length > 0) {
          // const buttonProps = {
          //   onClick: this.handleShow,
          //   size: "small",
          //   key: "custom"
          // };
          // if (title) {
          //   buttonProps.className = "ml8"
          // }
          // leftChildren.push(<Button {...buttonProps}>自定义列</Button>)
        // }
        if (leftChildren.length === 0) {
          return;
        }
        return <div className="tal" key="leftarea">
          {leftChildren}
        </div>
      };
      const right = () => {
        if (customCtns && Array.isArray(customCtns) && customCtns.length > 0) {
          return (<div className="right-btn" key="rightarea">
            {customCtns}
          </div>)
        } else if (customCtns && typeof customCtns === "function") {
          return (<div className="right-btn" key="rightarea">
            {customCtns()}
          </div>)
        }
      }
      // return (<Row>
      //   <Col span={6}>
      //     {left()}
      //   </Col>
      //   <Col span={18}>
      //     {right()}
      //   </Col>
      // </Row>)
      return (
        <div className="olym-table-header">
          <div className="olym-table-header-left">{left()}</div>
          <div className="olym-table-header-right">{right()}</div>
        </div>
      )
    };
    // 每次弹框都重新渲染
    const CustomColumnsModalGen = () => <CustomColumnsModal {...modalOpts} />
	  const customButtonProps = {
		  onClick: this.handleShow,
		  size: "small",
		  key: "custom"
	  };
    //把处理完的数据组合成新的props
    const props = {
      ...otherProps,
      // title:_title,
      customButtonProps,
	    rowClassName: (record, i) => `${(record.className || '') + ' ' + (rowClassName && rowClassName())}`,
	    dataSource: _dataSource || dataSource,
      columns: userDefineColumns,

    };
    if(rowSelection){
      props.rowSelection = {
	    ...rowSelection,
	    ..._rowSelection
	    }
    }
    if (title || customCtns || (_customColumns && _customColumns.length > 0)) {
      props.title = _title
    }
    if (props.scroll && props.scroll.y) {
      let className = props.className || '';
      className += ' ant-table-scroll-y';
      props.className = className;
    }
    return (
      <div id={timeId}>
        <ATable {...props} />
        <CustomColumnsModalGen />
      </div>

    )
  }
}

Table.PropTypes = {
	tableName: PropTypes.string,
}

export default Table;