import React from "react";
import { Button as AButton } from "antd";
import PropTypes from 'prop-types'

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	handleClick = () => {
		let needLoading = this.props.needLoading;
		if (!needLoading) {
			this.props.onClick();
		} else {
			this.setState({ loading: true }, () => {
				this.props.onClick();
				setTimeout(() => {
					this.setState({ loading: false })
				}, 300);
			})
		}
	}

	render() {
		return <AButton {...this.props} loading={this.state.loading} onClick={this.handleClick} />;
	}
}

Button.defaultProps = {
	needLoading: true,
	onClick: () => {},
}

Button.PropTypes = {
	needLoading: PropTypes.bool,
	onClick: PropTypes.func,
}

export default Button;
