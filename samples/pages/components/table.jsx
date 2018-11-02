import React, {Component} from "react";
import {Table} from 'olym';
import Button from "../../../src/components/antd/button/button";
import {Modal} from "antd";
import Input from "../../../src/components/antd/input/Input";
import _ from 'lodash';

const customColumns = [
  {orderNo: -1, dataIndex: "address", title: "地址"},
  {orderNo: 4, dataIndex: "age", title: "age"},
  {orderNo: 3, dataIndex: "name1", title: "姓222名"},
  {orderNo: 5, dataIndex: "name2", title: "姓222名"},
  {orderNo: 6, dataIndex: "name3", title: "姓名2222"},
  {orderNo: 7, dataIndex: "name44", title: "姓名222"},
  {orderNo: 8, dataIndex: "name55", title: "姓名333"},
  {orderNo: 9, dataIndex: "name555", title: "姓名33"},
  {orderNo: 20, dataIndex: "name5555", title: "姓33名"},
  {orderNo: 11, dataIndex: "name555555", title: "姓333名"},
  {orderNo: 12, dataIndex: "name55555", title: "姓333名"},
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
      data: [{
        key: '1',
        name: '胡斌',
        age: 32,
        address: '南湖区湖底公园1号',
      }, {
        key: '2',
        name: '胡彦祖a',
        age: 42,
        address: '西湖区湖底公园12号',
      }, {
        key: '3',
        name: '李大嘴',
        age: 32,
        address: '南湖区湖底公园123号',
      }, {
        key: '4',
        name: '李秀莲大嘴哥',
        age: 32,
        address: '西湖区湖底公园123号',
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
    this.setState({visible: true})
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
  render() {
    const columns = [{
      // title: strWithStar('姓名'),
      // title: '姓名',
      title: <div><span style={{color: 'red',marginRight:'5px',fontSize:'12px'}}>*</span>姓名</div>,
      dataIndex: 'name',
      key: 'name',
      // filters: [
      //     { text: '姓李的', value: '李' },
      //     { text: '姓胡的', value: '胡' },
      // ],
      // filteredValue: filteredInfo.name,
      // onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: true,
      // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      render: (text, record, index) => {
        return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'name', index)}/>
      }
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      // sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      render: (text, record, index) => {
        return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'age', index)}/>
      }
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      // filters: [
      //     { text: '南湖', value: '南湖' },
      //     { text: '西湖', value: '西湖' },
      // ],
      // filteredValue: filteredInfo.address,
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: true,
      // sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      render: (text, record, index) => {
        return <Input value={text} onChange={(e) => this.tableFieldChange(e, 'address', index)}/>
      }
    }];

    return (
      <div>
        <Table showSeq
               columns={columns}
               dataSource={this.state.data}
               onChange={this.onChange}
          customColumns={customColumns}
               onCustomChange={this.onCustomChange}
          // title="这是一个测试自定义列的表格"
               bordered
               customCtns={this.customCtn}
               title="这是一个测试自定义列的表格"
               pageSize={30}
               onCustomInfoChange={() => {}}
               pageSizeList={[20, 30, 40, 50, 60]}
        />
        <Modal title={"123"} visible={this.state.visible}
               onOk={this.handleModelOk} onCancel={this.handleModelCancel}>
        </Modal>
      </div>
    )
  }
}
export default TableSample;