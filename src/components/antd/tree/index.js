import * as React from 'react';
import RcTree, { TreeNode } from 'rc-tree';
import animation from '../_util/openAnimation';
export default class Tree extends React.Component {
    render() {
        const props = this.props;
        const { prefixCls, className } = props;
        let checkable = props.checkable;
        return (React.createElement(RcTree, Object.assign({}, props, { className: className, checkable: checkable ? React.createElement("span", { className: `${prefixCls}-checkbox-inner` }) : checkable }), this.props.children));
    }
}
Tree.TreeNode = TreeNode;
Tree.defaultProps = {
    prefixCls: 'ant-tree',
    checkable: false,
    showIcon: false,
    openAnimation: animation,
};
