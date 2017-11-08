import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../icon';
import Dialog from './Modal';
import ActionButton from './ActionButton';
import { getConfirmLocale } from './locale';
export default function confirm(config) {
    const props = Object.assign({ iconType: 'question-circle', okType: 'primary' }, config);
    const prefixCls = props.prefixCls || 'ant-confirm';
    let div = document.createElement('div');
    document.body.appendChild(div);
    let width = props.width || 416;
    let style = props.style || {};
    // 默认为 false，保持旧版默认行为
    const maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
        props.okCancel = true;
    }
    const runtimeLocale = getConfirmLocale();
    props.okText = props.okText ||
        (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText);
    props.cancelText = props.cancelText || runtimeLocale.cancelText;
    function close(...args) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args && args.length &&
            args.some(param => param && param.triggerCancel);
        if (props.onCancel && triggerCancel) {
            props.onCancel(...args);
        }
    }
    let body = (React.createElement("div", { className: `${prefixCls}-body` },
        React.createElement(Icon, { type: props.iconType }),
        React.createElement("span", { className: `${prefixCls}-title` }, props.title),
        React.createElement("div", { className: `${prefixCls}-content` }, props.content)));
    let footer = null;
    if (props.okCancel) {
        footer = (React.createElement("div", { className: `${prefixCls}-btns` },
            React.createElement(ActionButton, { actionFn: props.onCancel, closeModal: close }, props.cancelText),
            React.createElement(ActionButton, { type: props.okType, actionFn: props.onOk, closeModal: close, autoFocus: true }, props.okText)));
    }
    else {
        footer = (React.createElement("div", { className: `${prefixCls}-btns` },
            React.createElement(ActionButton, { type: props.okType, actionFn: props.onOk, closeModal: close, autoFocus: true }, props.okText)));
    }
    const classString = classNames(prefixCls, {
        [`${prefixCls}-${props.type}`]: true,
    }, props.className);
    ReactDOM.render(React.createElement(Dialog, { className: classString, onCancel: close.bind(this, { triggerCancel: true }), visible: true, title: "", transitionName: "zoom", footer: "", maskTransitionName: "fade", maskClosable: maskClosable, style: style, width: width, zIndex: props.zIndex },
        React.createElement("div", { className: `${prefixCls}-body-wrapper` },
            body,
            " ",
            footer)), div);
    return {
        destroy: close,
    };
}
