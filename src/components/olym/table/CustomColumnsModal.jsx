import React, { Component } from 'react'
import { Modal, Row, Col, Button, Form, Input, InputNumber, Select, Message } from 'antd'
import CustomTransfer from './CustomTransfer'
import _ from 'lodash';
const titles = ['可选', '已选'];

function RedStar() {
    return <span style={{ color: 'red' }}>*</span>
}

class CustomColumnsModal extends Component {

    static defaultProps = {
        columnKeys: [],
        fixCols: 0,
        pageSize: 15,
    }

    constructor(props) {
        super(props)
        const customColumns = props.customColumns || [];
        let targetKeys = [];
        let dataSource = [];
        customColumns.map((col) => {
            // console.log("col",col)
            if (col.orderNo > 0) {
                targetKeys.push(col.dataIndex)
            }
            const data = {
                key: col.dataIndex,
                ...col
            };
            dataSource.push(data)
        })
        // const targetKeys = props.columnKeys.map(info => info.key)
        // const dataSource = props.dataSource.map(data => {
        //     const a = props.columnKeys.filter(info => info.key === data.key)[0]
        //     const required = a ? !!a.required : false
        //     return {...data, required}
        // })
        this.pageSizeList = this.props.pageSizeList ? this.props.pageSizeList : [15, 30, 50, 100, 200]
        this.state = {
            dataSource,
            targetKeys,
            fixCols: props.fixCols,
            pageSize: props.pageSize ? props.pageSize : this.pageSizeList[0],
            selectedKeys: [],
        }
    }

    handleOk = () => {
        const { columnKeys } = this.props
        const { targetKeys, selectedKeys, dataSource, ...values } = this.state
        // values.pageSize = Number(values.pageSize)
        console.log("columnKeys", columnKeys)
        values.columnKeys = targetKeys.map((key) => {
            return columnKeys.filter(info => info.dataIndex === key)[0] || { key }
        })
        console.log("values", values)
        this.props.onOk(values)
        this.props.onCancel()
    }

    handleSelectChange = ({ key }, checked) => {
        console.log(key, checked)
        let { selectedKeys, targetKeys } = this.state
        let _selectedKeys = _.cloneDeep(selectedKeys)
        const checkedLen = checked.length
        const targetKeysLen = targetKeys.length
        if(Array.isArray(checked)){
            if(checkedLen === 0){
                _selectedKeys = []
            }else {
                if(checkedLen === targetKeysLen){
                    _selectedKeys = checked
                }
            }
        }else {
            if (targetKeys.indexOf(key) > -1) {
                if (checked) {
                    _selectedKeys = _selectedKeys.concat(key)
                } else {
                    _selectedKeys = _selectedKeys.filter(item => item !== key)
                }
            }
        }
        // console.log('_selectedKeys',_selectedKeys)
        this.setState({ selectedKeys:_selectedKeys })

    }

    handleTransferChange = (targetKeys, direction, moveKeys) => {
        // const {columnKeys} = this.props
        // function isRequired(key) {
        //     return columnKeys.filter(info => info.key === key && info.required ).length > 0
        // }
        let newTargetKeys = this.state.targetKeys
        if (direction === 'left') {
            this.setState({ selectedKeys: [] })
            // 必选字段是无法移动的
            // moveKeys = moveKeys.filter(key => !isRequired(key))
            newTargetKeys = newTargetKeys.filter(key => moveKeys.indexOf(key) === -1)
        } else {
            newTargetKeys = newTargetKeys.concat(moveKeys)
        }
        this.setState({ targetKeys: newTargetKeys })
    }

    handleFixColsChange = (value) => {
        this.setState({ fixCols: value })
    }

    handlePageSizeChange = (value) => {
        const max = Math.max(...this.pageSizeList)
        const _value = _.toNumber(value)
        const reg =  new RegExp("^(-?\\d+)?$")
        if(reg.test(_value)){
	        if(_value <= max){
		        this.setState({ pageSize: _value})
	        }else {
		        Message.info(`请输入小于${max}的数字`, 3)
		        this.setState({ pageSize: max })
		        return false
	        }
        }else {
          Message.info('请输入数字', 3)
	        this.setState({ pageSize: this.props.pageSize || this.pageSizeList[0] })
	        return false
        }

    }

    handleMoveUp = () => {
        const { selectedKeys, targetKeys } = this.state
        const selectedKey = selectedKeys[0]
        const tmp = targetKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx !== 0) {
            const targetIdx = idx - 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            this.setState({ targetKeys: tmp })
        }
    }

    handleMoveDown = () => {
        const { selectedKeys, targetKeys } = this.state
        const selectedKey = selectedKeys[0]
        const tmp = targetKeys.concat()
        const idx = tmp.indexOf(selectedKey)
        if (idx + 1 !== tmp.length) {
            const targetIdx = idx + 1
            const targetKey = tmp[targetIdx]
            tmp[targetIdx] = selectedKey
            tmp[idx] = targetKey
            this.setState({ targetKeys: tmp })
        }
    }
    handleMoveTop = () => {
        const {selectedKeys, targetKeys} = this.state
        // console.log('targetKeys',targetKeys)
        // console.log('selectedKeys',selectedKeys)
        // console.log('targetKeys')
        const newTargetKeys = _.cloneDeep(targetKeys)
        const tmp = new Set(selectedKeys.concat(newTargetKeys))
        const newTmp = [...tmp]
        this.setState({targetKeys: newTmp})
    }

    renderItem = (item) => {
        const customLabel = (
            <span>
                <span style={{ marginRight: 2 }}>{item.required ? <RedStar /> : ' '}</span>
                {item.title}
            </span>
        )
        return {
            label: customLabel, // for displayed item
            value: item.title,   // for title and filter matching
        };
    }

    render() {
        const { dataSource, targetKeys, selectedKeys, pageSize, fixCols } = this.state
        const { visible, onCancel } = this.props
        const footer = <div className="footer-btn-layout">
            {this.props.onCustomInfoChange ? <div className="footer-btn-layout-pagesize">
                <div style={{ paddingTop: 3 }}><label>每页大小：</label></div>
                <div className="pagesize-select-width">
                    <Select mode="combobox" filterOption={_.includes(this.pageSizeList, this.state.pageSize) ? false : true} onChange={this.handlePageSizeChange} value={this.state.pageSize}>
                        {this.pageSizeList.map(item => <Select.Option key={_.toString(item)} value={_.toString(item)}>{item}</Select.Option>)}
                    </Select>
                </div>
            </div> : <div></div>}
            <div>
                <button type="button" className="ant-btn ant-btn-lg" onClick={onCancel}><span>取 消</span></button>
                <button type="button" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk}><span>确 定</span></button>
            </div>
        </div>

        const modalOpts = {
            className: 'table-custom-column',
            maskClosable: false,
            visible,
            onCancel,
            footer
        }

        const canMove = selectedKeys.length === 1
        const canMoveTop = selectedKeys.length >= 1
        const btnType = canMove ? 'primary' : 'default'
        const toTopBtnType = canMoveTop ? 'primary' : 'default'
        const isFirst = canMove && targetKeys[0] === selectedKeys[0]
        const isLast = canMove && targetKeys.length > 1 && targetKeys[targetKeys.length - 1] === selectedKeys[0]

        const upBtnProps = {
            icon: 'up',
            size: 'small',
            type: btnType,
            disabled: isFirst || !canMove,
            onClick: this.handleMoveUp,
        }

        const downBtnProps = {
            icon: 'down',
            size: 'small',
            type: btnType,
            disabled: isLast || !canMove,
            onClick: this.handleMoveDown,
        }
	      const toTopProps = {
		        onClick: this.handleMoveTop,
		        size: "small",
		        key: "toTop",
  		      type: toTopBtnType,
  		      disabled: !canMoveTop,
            style:{marginTop: '4px'}
	      };

        return (
            <Modal {...modalOpts}>
                <Form horizontal>
                    <Form.Item >
                        <Row>
                            <Col span={20}>
                                <CustomTransfer
                                    showSearch
                                    titles={titles}
                                    listStyle={{ width: 180, height: 300 }}
                                    targetKeys={targetKeys}
                                    dataSource={dataSource}
                                    render={this.renderItem}
                                    onSelectChange={this.handleSelectChange}
                                    onChange={this.handleTransferChange}
                                />
                                {/*<Transfer*/}
                                {/*titles={titles}*/}
                                {/*targetKeys={targetKeys}*/}
                                {/*dataSource={dataSource}*/}
                                {/*render={item => item.title}*/}
                                {/*onChange={this.handleTransferChange}*/}
                                {/*onSelectChange={this.handleSelectChange}*/}
                                {/*/>*/}
                            </Col>
                            <Col span={2}>
                                <div className="ant-transfer-operation transfer-updown " >
                                    <Button {...upBtnProps} />
                                    <Button {...downBtnProps} />
                                    <Button {...toTopProps}>置顶</Button>
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>
                    {/*<Row>*/}
                    {/*<Col span={10}>*/}
                    {/*<Form.Item label="固定前几列" labelCol={{span: 8}} wrapperCol={{span: 14}} >*/}
                    {/*<InputNumber min={0} max={3} value={fixCols} onChange={this.handleFixColsChange} />*/}
                    {/*</Form.Item>*/}
                    {/*</Col>*/}
                    {/*<Col span={14}>*/}
                    {/*<Form.Item label="每页行数" labelCol={{span: 8}} wrapperCol={{span: 9}}>*/}
                    {/*<Select value={pageSize} onChange={this.handlePageSizeChange} >*/}
                    {/*<Select.Option value="10" >10行/页</Select.Option>*/}
                    {/*<Select.Option value="20" >20行/页</Select.Option>*/}
                    {/*<Select.Option value="30" >30行/页</Select.Option>*/}
                    {/*<Select.Option value="50" >50行/页</Select.Option>*/}
                    {/*</Select>*/}
                    {/*</Form.Item>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}

                </Form>

            </Modal>
        )
    }
}


export default Form.create()(CustomColumnsModal)