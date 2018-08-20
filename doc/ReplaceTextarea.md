# Textarea

## API

```
<ReplaceTextArea
    needReplace = {true}
    needUppercase = {true}
    needTransform = {true}
	autosize={{minRows: 5, maxRows: 6}}
    bigAutosize = {{minRows: 20}} // 大弹出框的行数
/>
```
双击弹出一个大输入框的TextArea
修改过的 api
成员 | 说明 | 类型 | 默认值
----|----|----|----
needReplace| 是否需要去除特殊空白字符 |bool | -
needUppercase | 是否需要转大写 | bool | -
needTransform | 是否需要全角转半角 | bool | -

能力参见 Antd 的 [Input.TextArea](http://2x.ant.design/components/input-cn/)
使用的时候使用别名 TextArea 可实现无缝切换
