import React,{Component} from "react";

import {AdSearch} from 'olym'

import {Select} from 'antd'

const Option = Select.Option;



const req = {
    "resultCode": 100,
    "resultMsg": "",
    "data": [
        {
            "id": 1,
            "orgId": "46425",
            "userId": "565599",
            "templateName": "测试模板名",
            "businessType": "2",
            "advancedcondition": "[{\"fieldNum\":1,\"fieldCn\":\"创建时间\",\"fieldEn\":\"createdate\",\"fieldValue\":\"2017-07-20 ~ 2017-07-27\",\"fieldType\":\"date\"},{\"fieldNum\":2,\"fieldCn\":\"委托单位\",\"fieldEn\":\"customername\",\"fieldValue\":\"公司名称\",\"fieldType\":\"select\"},{\"fieldNum\":3,\"fieldCn\":\"各类编号\",\"fieldEn\":\"multi_number\",\"fieldValue\":\"EXP2017090005\",\"fieldType\":\"text\"},{\"fieldNum\":4,\"fieldCn\":\"起运港\",\"fieldEn\":\"loadport\",\"fieldValue\":\"NINGBO\",\"fieldType\":\"multi_select\"}]",
            "updateTime": "2017-10-18 00:00:00"
        },
        {
            "id": 2,
            "orgId": "46425",
            "userId": "565599",
            "templateName": "测试模板名2",
            "businessType": "1",
            "advancedcondition": "[{\"fieldNum\":1,\"fieldCn\":\"创建时间\",\"fieldEn\":\"createdate\",\"fieldValue\":\"2017-07-20 ~ 2017-07-27\",\"fieldType\":\"date\"},{\"fieldNum\":2,\"fieldCn\":\"委托单位\",\"fieldEn\":\"customername\",\"fieldValue\":\"公司名称\",\"fieldType\":\"select\"},{\"fieldNum\":3,\"fieldCn\":\"各类编号\",\"fieldEn\":\"multi_number\",\"fieldValue\":\"EXP2017090005\",\"fieldType\":\"text\"},{\"fieldNum\":4,\"fieldCn\":\"起运港\",\"fieldEn\":\"loadport\",\"fieldValue\":\"NINGBO\",\"fieldType\":\"multi_select\"}]",
            "updateTime": "2017-10-17 00:00:00"
        },
        {
            "id": 4,
            "orgId": "46425",
            "userId": "565599",
            "templateName": "测试模板名4",
            "businessType": "4",
            "advancedcondition": "[{\"fieldNum\":1,\"fieldCn\":\"创建时间\",\"fieldEn\":\"createdate\",\"fieldValue\":\"2017-07-20 ~ 2017-07-27\",\"fieldType\":\"date\"},{\"fieldNum\":2,\"fieldCn\":\"委托单位\",\"fieldEn\":\"customername\",\"fieldValue\":\"公司名称\",\"fieldType\":\"select\"},{\"fieldNum\":3,\"fieldCn\":\"各类编号\",\"fieldEn\":\"multi_number\",\"fieldValue\":\"EXP2017090005\",\"fieldType\":\"text\"},{\"fieldNum\":4,\"fieldCn\":\"起运港\",\"fieldEn\":\"loadport\",\"fieldValue\":\"NINGBO\",\"fieldType\":\"multi_select\"}]",
            "updateTime": "2017-10-18 00:00:00"
        }
    ]
}

const defaultCondition = ["createdate","multi_number"]

const searchCondition = [
    {
        id:"multi_number",
        props:{
            "fieldCn":"各类编号","fieldEn":"multi_number","fieldType":"text"
        }
    },
    {
        id:"createdate",
        props:[
            {
                "fieldCn":"创建时间","fieldEn":"createdate","fieldType":"date_range"
            },
            {
                "fieldCn":"头程航班时间","fieldEn":"flightdate","fieldType":"date_range"
            }
        ],
    },
    {
        id:"customername",
        props:{
            "fieldCn":"委托单位","fieldEn":"customername","fieldType":"select"
        },
    },
    {
        id:"loadport",
        props:{
            "fieldCn":"起运港","fieldEn":"loadport","fieldType":"multi_select",
        }
    },
    {
        id:"businesstype",
        props:{
            "fieldCn":"业务类型","fieldEn":"businesstype","fieldType":"select"
        }
    },
    {
        id:"goodssource",
        props:{
            "fieldCn":"货物来源","fieldEn":"goodssource","fieldType":"select",
            children:goodssourceChildren()
        }
    },
    {
        id:"dischargeport",
        props:{
            "fieldCn":"目的港","fieldEn":"dischargeport","fieldType":"multi_select"
        }
    },
    {
        id:"bookingagency",
        props:{
            "fieldCn":"订舱代理","fieldEn":"bookingagency","fieldType":"select"
        }
    },
    {
        id:"carrier",
        props:{
            "fieldCn":"船公司","fieldEn":"carrier","fieldType":"select"
        }
    },
    {
        id:"carrier2",
        props:{
          "fieldCn":"航空公司","fieldEn":"carrier2","fieldType":"select"
        }
    },
    {
        id:"voyno",
        props:{
            "fieldCn":"头程航班","fieldEn":"voyno","fieldType":"text",
            onChange:(e)=>{
                console.log(e.target.value,e.target.id)
            }
        }
    },
    {
        id:"sales",
        props:{
            "fieldCn":"销售","fieldEn":"sales","fieldType":"select"
        }
    },
    {
        id:"businesspeople",
        props:{
            "fieldCn":"商务","fieldEn":"businesspeople","fieldType":"select"
        }
    },
    {
        id:"servicecustomer",
        props:{
            "fieldCn":"客服","fieldEn":"servicecustomer","fieldType":"select"
        }
    },
    {
        id:"op",
        props:{
            "fieldCn":"操作","fieldEn":"op","fieldType":"select"
        }
    },
    {
        id:"docby",
        props:{
            "fieldCn":"单证","fieldEn":"docby","fieldType":"select"
        }
    },
]

const topButton = [
    {
        id:"button1",
        props:{
            onClick:()=>{
                console.log("button1")
            },
            displayName:"button1"
        }
    },
    {
        id:"button2",
        props:{
            onClick:()=>{
                console.log("button2")
            },
            displayName:"button2"
        }
    },
    {
        id:"button3",
        props:{
            onClick:()=>{
                console.log("button3")
            },
            displayName:"button3"
        }
    },
    {
        id:"button4",
        props:{
            onClick:()=>{
                console.log("button4")
            },
            displayName:"button4"
        }
    },
]

function goodssourceChildren() {
    let goodssourceChildren = [];
    goodssourceChildren.push(<Option value="1">直客</Option>)
    goodssourceChildren.push(<Option value="2">同行货</Option>)
    goodssourceChildren.push(<Option value="3">指定货</Option>)
    console.log("goodssourceChildren",goodssourceChildren)
    return goodssourceChildren
}
class AdSearchSample extends Component{
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render(){

        const {data} = req;
        return(
            <AdSearch
                topButton={topButton}
                searchCondition={searchCondition}
                defaultCondition={defaultCondition}
                templateSource={data}
                onSearch={()=>{console.log("search")}}
                onReSet={()=>{console.log("reset")}}
                onSaveMySearch={(templateName)=>{console.log(templateName)}}
            />
        )
    }
}

export default AdSearchSample;