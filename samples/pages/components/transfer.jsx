import React,{Component} from "react";
import {Transfer} from 'olym';

class TransferSample extends Component{
    constructor(props) {
        super(props)
        this.state = {
            mockData: [],
            targetKeys: [],
        };
    }

    componentDidMount() {
        this.getMock();
    }

    getMock = () =>{
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i,
                title: `内容${i + 1}`,
                description: `内容${i + 1}的描述`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        console.log(targetKeys, direction, moveKeys);
        this.setState({ targetKeys });
    }

    render(){
        return(
            <Transfer
                dataSource={this.state.mockData}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
            />
        )
    }
}
export default TransferSample;