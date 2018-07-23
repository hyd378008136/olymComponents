# Table 

## API

```
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
```
修改过的 api
成员 | 说明 | 类型 | 默认值
----|----|----|----
customCtns|位于表格右上角的按钮|Array Or ReactNode | -
title | 左侧标题 | string Or ReactNode | -
leftCtns | 紧跟左侧标题后面的按钮 | Array Or ReactNode | -
注：当只传title  不传customCtns 时整个表格头将全部是 title 的位置
其他能力参见 Antd 的 [Table](http://2x.ant.design/components/table-cn/)