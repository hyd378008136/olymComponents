import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class AnchorLink extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = () => {
            this.context.antAnchor.scrollTo(this.props.href);
        };
    }
    componentDidMount() {
        this.context.antAnchor.registerLink(this.props.href);
    }
    componentWillUnmount() {
        this.context.antAnchor.unregisterLink(this.props.href);
    }
    render() {
        const { prefixCls, href, title, children, } = this.props;
        const active = this.context.antAnchor.activeLink === href;
        const wrapperClassName = classNames(`${prefixCls}-link`, {
            [`${prefixCls}-link-active`]: active,
        });
        const titleClassName = classNames(`${prefixCls}-link-title`, {
            [`${prefixCls}-link-title-active`]: active,
        });
        return (React.createElement("div", { className: wrapperClassName },
            React.createElement("a", { className: titleClassName, href: href, title: typeof title === 'string' ? title : '', onClick: this.handleClick }, title),
            children));
    }
}
AnchorLink.defaultProps = {
    prefixCls: 'ant-anchor',
    href: '#',
};
AnchorLink.contextTypes = {
    antAnchor: PropTypes.object,
};
