import React, {Component} from "react";
import {Table} from 'olym';
import Button from "../../../src/components/antd/button/button";
import {Modal} from "antd";
import Input from "../../../src/components/antd/input/Input";
import _ from 'lodash';

const customColumns = [
  {orderNo: -1, dataIndex: "address", title: "地址"},
  {orderNo: 4, dataIndex: "age", title: "age"},
  {orderNo: 3, dataIndex: "name", title: "姓名"},
  {orderNo: 11, dataIndex: "test1", title: "test1"},
  {orderNo: 12, dataIndex: "test2", title: "test2"},
  {orderNo: 13, dataIndex: "test3", title: "test3"},
  {orderNo: 14, dataIndex: "test4", title: "test4"},
  {orderNo: 15, dataIndex: "test5", title: "test5"},
  {orderNo: 16, dataIndex: "test6", title: "test6"},
  {orderNo: 17, dataIndex: "test7", title: "test7"},
]

const strWithStar = (str, color) => {
  if (!color) {
    color = 'red'
  }
  return <div><span style={{color: color,marginRight:'5px',fontSize:'12px'}}>*</span>{str}</div>
};

class TableSample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
	    selectedRowKeys: [],
      data: [{
        key: '1',
        name: '胡斌3333',
        age: 32,
        address: '南湖区湖底公园1号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
        key: '2',
        name: '胡彦祖a',
        age: 42,
        address: '西湖区湖底公园12号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
        key: '3',
        name: '李大嘴',
        age: 32,
        address: '南湖区湖底公园123号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
        key: '4',
        name: '李秀莲大嘴哥',
        age: 32,
        address: '西湖区湖底公园123号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      },{
	      key: '21',
	      name: '胡斌3333',
	      age: 32,
	      address: '南湖区湖底公园1号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
	      key: '22',
	      name: '胡彦祖a',
	      age: 42,
	      address: '西湖区湖底公园12号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
	      key: '23',
	      name: '李大嘴',
	      age: 32,
	      address: '南湖区湖底公园123号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
	      key: '24',
	      name: '李秀莲大嘴哥',
	      age: 32,
	      address: '西湖区湖底公园123号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      },{
	      key: '31',
	      name: '胡斌3333',
	      age: 32,
	      address: '南湖区湖底公园1号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }, {
	      key: '32',
	      name: '胡彦祖a',
	      age: 42,
	      address: '西湖区湖底公园12号',
	      test1: 'test1',
	      test2: 'test2',
	      test3: 'test3',
	      test4: 'test4',
	      test5: 'test5',
	      test6: 'test6',
	      test7: 'test7',
      }]
    };
  }

  onChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
  }

  onCustomChange = (a, b, c) => {
    console.log(a, b, c)
  }

  ctn1 = () => {
    console.log('按了')
  }

  handleModelOk = () => {
    alert('hello')
  }

  handleModelCancel = () => {
    this.setState({visible: false})
  }

  customCtn = () => {
    let customCtn = [];
    customCtn.push(<Button key="1" onClick={this.ctn1} size="small">自定义按钮1</Button>);
    customCtn.push(<Button key="2" onClick={this.ctn1} size="small">自定义按钮2</Button>);
    return customCtn;
  };

  tableFieldChange = (e, fieldName, index) => {
    const {value} = e.target;
    const {data} = this.state;
    const _data = _.cloneDeep(data);
    _data[index][fieldName] = value;
    this.setState({
      data: _data
    })
  }
	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.state.selectedRowKeys = selectedRowKeys
	}
	setSelectedRowKeysFunc = func => {
		this.setSelectedRowKeys = func
	}
	clearSelectedRowKeys = (keys = []) => {
		this.state.selectedRowKeys = keys
		if (this.setSelectedRowKeys) {
			this.setSelectedRowKeys(keys)
		}
	}
	renderTitle = () => {
  	return(
  		<div key='1'>测试 title</div>
	  )
	}
  render() {
    const _this = this
    const columns = [{
      // title: strWithStar('姓名'),
      // title: '姓名',
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      // filters: [
      //     { text: '姓李的', value: '李' },
      //     { text: '姓胡的', value: '胡' },
      // ],
      // filteredValue: filteredInfo.name,
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: true,
	    width: 100,
	    // fixed: 'left',
      // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (text, record, index) => {
        return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'name', index)}/>
      }
    }, {
      title: '<span>姓名span</span>',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
	    width: 200,
	    // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      render: (text, record, index) => {
        return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'age', index)}/>
      }
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
	    // width:900,
	    // fixed: 'right',

	    // filters: [
      //     { text: '南湖', value: '南湖' },
      //     { text: '西湖', value: '西湖' },
      // ],
      // filteredValue: filteredInfo.address,
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: true,
      // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      // render: (text, record, index) => {
      //   return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'address', index)}/>
      // }
    },{
	    title: 'test1',
	    dataIndex: 'test1',
	    key: 'test1',
    },{
	    title: 'test2',
	    dataIndex: 'test2',
	    key: 'test2',
    },{
	    title: 'test3',
	    dataIndex: 'test3',
	    key: 'test3',
    },{
	    title: 'test4',
	    dataIndex: 'test4',
	    key: 'test4',
    },{
	    title: 'test5',
	    dataIndex: 'test5',
	    key: 'test5',
    },{
	    title: 'test6',
	    dataIndex: 'test6',
	    key: 'test6',
    },{
	    title: 'test7',
	    dataIndex: 'test7',
	    key: 'test7',
    }];
	  const rowSelection = {
		  onChange: this.onSelectChange
	  }
	  let leftCtns = [];
	  leftCtns.push(<Button key="1" onClick={this.ctn1} size="small">自定义按钮4</Button>);
	  leftCtns.push(<Button key="2" onClick={this.ctn1} size="small">自定义按钮5</Button>);
    return (
      <div>
        <Table showSeq
               setSelectedRowKeys= {this.setSelectedRowKeysFunc}
	             rowSelection = {rowSelection}
               columns={columns}
               dataSource={this.state.data}
               onChange={this.onChange}
               customColumns={customColumns}
               onCustomChange={this.onCustomChange}
               title={this.renderTitle()}
               bordered
               // customCtns={this.customCtn()}
               pageSize={30}
               tableName = 'test'
               // rowClassName = {(record, index) => 'test'}
               // scroll={{ y: 240 }}
               // scroll = {{x: 2800}}
               onCustomInfoChange={() => {}}
               pageSizeList={[20, 30, 40, 50, 60]}
               leftCtns = {leftCtns}
        />
        <Modal title={"123"} visible={this.state.visible}
               onOk={this.handleModelOk} onCancel={this.handleModelCancel}>
        </Modal>
      </div>
    )
  }
}
export default TableSample;