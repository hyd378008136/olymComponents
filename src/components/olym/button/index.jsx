import React, { Component } from "react";
import { Button as AButton } from "antd";

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}
	handerClick = () => {
		let { loading = true } = this.props;
		if (!!loading) {
			this.setState({
				isLoading: true
			});
			setTimeout(() => {
				this.props.onClick();
			}, 100);
			setTimeout(() => {
				this.setState({
					isLoading: false
				});
			}, 300);
		} else {
			this.props.onClick();
		}
	};
	render() {
		return <AButton {...this.props} loading={this.state.isLoading} onClick={this.handerClick} />;
	}
}

export default Button;
