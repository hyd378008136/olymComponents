import React,{Component} from "react";

class CustomTopLine extends Component{
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render(){
        const {content} = this.props
        const Content = () => content()
        return(
            <Content/>
        )
    }
}

export default CustomTopLine