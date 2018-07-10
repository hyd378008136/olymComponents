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

	getLoading = () => document.getElementById('loading')

	checkLoading = () => {
		var observer
		const addNewObserver = () => {
				if (this.getLoading() !== null) {
					observer.disconnect()
					var newObserver
					const removeLoading = () => {
						if (this.getLoading() === null) {
							this.setState({ loading: false })
							newObserver.disconnect()
						}
					}
					newObserver = new MutationObserver(removeLoading)
					newObserver.observe(document.body, { childList: true })
				}
		}
		observer = new MutationObserver(addNewObserver)
		observer.observe(document.body, { childList: true })
	}

	handleClick = () => {
		let needLoading = this.props.needLoading;
		if (!needLoading) {
			this.props.onClick();
		} else {
			this.setState({ loading: true }, () => {
				this.checkLoading();
			})
		}
	}

	render() {
		let { needLoading, onClick, ...otherProps } = this.props
		return <AButton {...otherProps} loading={this.state.loading} onClick={this.handleClick} />;
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
