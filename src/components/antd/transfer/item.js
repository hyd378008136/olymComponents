import React from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Lazyload from 'react-lazy-load';
import Checkbox from '../checkbox';
export default class Item extends React.Component {
    shouldComponentUpdate(...args) {
        return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    }
    render() {
        const { renderedText, renderedEl, item, lazy, checked, prefixCls, onClick } = this.props;
        const className = classNames({
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-disabled`]: item.disabled,
        });
        const listItem = (React.createElement("li", { className: className, title: renderedText, onClick: item.disabled ? undefined : () => onClick(item) },
            React.createElement(Checkbox, { checked: checked, disabled: item.disabled }),
            React.createElement("span", null, renderedEl)));
        let children = null;
        if (lazy) {
            const lazyProps = Object.assign({ height: 32, offset: 500, throttle: 0, debounce: false }, lazy);
            children = React.createElement(Lazyload, Object.assign({}, lazyProps), listItem);
        }
        else {
            children = listItem;
        }
        return children;
    }
}
