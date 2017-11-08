var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Component, Children } from 'react';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Grid from './Grid';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
export default class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            widerPadding: false,
        };
        this.saveRef = (node) => {
            this.container = node;
        };
    }
    componentDidMount() {
        this.updateWiderPadding();
        this.resizeEvent = addEventListener(window, 'resize', this.updateWiderPadding);
    }
    componentWillUnmount() {
        if (this.resizeEvent) {
            this.resizeEvent.remove();
        }
        this.updateWiderPadding.cancel();
    }
    updateWiderPadding() {
        if (!this.container) {
            return;
        }
        // 936 is a magic card width pixer number indicated by designer
        const WIDTH_BOUDARY_PX = 936;
        if (this.container.offsetWidth >= WIDTH_BOUDARY_PX && !this.state.widerPadding) {
            this.setState({ widerPadding: true }, () => {
                this.updateWiderPaddingCalled = true; // first render without css transition
            });
        }
        if (this.container.offsetWidth < WIDTH_BOUDARY_PX && this.state.widerPadding) {
            this.setState({ widerPadding: false }, () => {
                this.updateWiderPaddingCalled = true; // first render without css transition
            });
        }
    }
    isContainGrid() {
        let containGrid;
        Children.forEach(this.props.children, (element) => {
            if (element && element.type && element.type === Grid) {
                containGrid = true;
            }
        });
        return containGrid;
    }
    render() {
        const _a = this.props, { prefixCls = 'ant-card', className, extra, bodyStyle, noHovering, title, loading, bordered = true } = _a, others = __rest(_a, ["prefixCls", "className", "extra", "bodyStyle", "noHovering", "title", "loading", "bordered"]);
        let children = this.props.children;
        const classString = classNames(prefixCls, className, {
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-bordered`]: bordered,
            [`${prefixCls}-no-hovering`]: noHovering,
            [`${prefixCls}-wider-padding`]: this.state.widerPadding,
            [`${prefixCls}-padding-transition`]: this.updateWiderPaddingCalled,
            [`${prefixCls}-contain-grid`]: this.isContainGrid(),
        });
        if (loading) {
            children = (React.createElement("div", { className: `${prefixCls}-loading-content` },
                React.createElement("p", { className: `${prefixCls}-loading-block`, style: { width: '94%' } }),
                React.createElement("p", null,
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '28%' } }),
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '62%' } })),
                React.createElement("p", null,
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '22%' } }),
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '66%' } })),
                React.createElement("p", null,
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '56%' } }),
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '39%' } })),
                React.createElement("p", null,
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '21%' } }),
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '15%' } }),
                    React.createElement("span", { className: `${prefixCls}-loading-block`, style: { width: '40%' } }))));
        }
        let head;
        if (title || extra) {
            head = (React.createElement("div", { className: `${prefixCls}-head` },
                title ? React.createElement("div", { className: `${prefixCls}-head-title` }, title) : null,
                extra ? React.createElement("div", { className: `${prefixCls}-extra` }, extra) : null));
        }
        return (React.createElement("div", Object.assign({}, others, { className: classString, ref: this.saveRef }),
            head,
            React.createElement("div", { className: `${prefixCls}-body`, style: bodyStyle }, children)));
    }
}
Card.Grid = Grid;
__decorate([
    throttleByAnimationFrameDecorator()
], Card.prototype, "updateWiderPadding", null);
