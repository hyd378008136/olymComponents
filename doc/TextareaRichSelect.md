# TextareaRichSelect

## API

```
<TextAreaRichSelect
                            mode="tags"
                            allowclear
                            style={{ width: 200 }}
                            dataHeader={dataHeader}
							dataBody={dataBody}
                            onSearch={this.handleSearch}
                            placeholder="Select a person"
                            getPopupContainer={this.getPopupContainer}
						/>
```
双击弹出一个大输入框的TextArea
修改过的 api
成员 | 说明 | 类型 | 默认值
----|----|----|----
dataHeader | 头部字段 | array[{dataIndex: 'dataIndex', title: 'title'}] | -
dataBody | 显示字段 | array [{value: 'value', name: 'name'] | -
selectKey | 返回值 | string | value

具体用法跟 richselect 一样