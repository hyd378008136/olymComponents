import React from 'react';
import classNames from 'classnames';
const Group = (props) => {
    const { prefixCls = 'ant-input-group', className = '' } = props;
    const cls = classNames(prefixCls, {
        [`${prefixCls}-lg`]: props.size === 'large',
        [`${prefixCls}-sm`]: props.size === 'small',
        [`${prefixCls}-compact`]: props.compact,
    }, className);
    return (React.createElement("span", { className: cls, style: props.style }, props.children));
};
export default Group;
