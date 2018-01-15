var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../icon';
import { Circle } from 'rc-progress';
import classNames from 'classnames';
const statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068',
};
export default class Progress extends React.Component {
    render() {
        const props = this.props;
        const { prefixCls, className, percent = 0, status, format, trailColor, size, type, strokeWidth, width, showInfo, gapDegree = 0, gapPosition } = props, restProps = __rest(props, ["prefixCls", "className", "percent", "status", "format", "trailColor", "size", "type", "strokeWidth", "width", "showInfo", "gapDegree", "gapPosition"]);
        const progressStatus = parseInt(percent.toString(), 10) >= 100 && !('status' in props) ?
            'success' : (status || 'normal');
        let progressInfo;
        let progress;
        const textFormatter = format || (percentNumber => `${percentNumber}%`);
        if (showInfo) {
            let text;
            const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
            if (progressStatus === 'exception') {
                text = format ? textFormatter(percent) : React.createElement(Icon, { type: `cross${iconType}` });
            }
            else if (progressStatus === 'success') {
                text = format ? textFormatter(percent) : React.createElement(Icon, { type: `check${iconType}` });
            }
            else {
                text = textFormatter(percent);
            }
            progressInfo = React.createElement("span", { className: `${prefixCls}-text` }, text);
        }
        if (type === 'line') {
            const percentStyle = {
                width: `${percent}%`,
                height: strokeWidth || (size === 'small' ? 6 : 8),
            };
            progress = (React.createElement("div", null,
                React.createElement("div", { className: `${prefixCls}-outer` },
                    React.createElement("div", { className: `${prefixCls}-inner` },
                        React.createElement("div", { className: `${prefixCls}-bg`, style: percentStyle }))),
                progressInfo));
        }
        else if (type === 'circle' || type === 'dashboard') {
            const circleSize = width || 120;
            const circleStyle = {
                width: circleSize,
                height: circleSize,
                fontSize: circleSize * 0.15 + 6,
            };
            const circleWidth = strokeWidth || 6;
            const gapPos = gapPosition || type === 'dashboard' && 'bottom' || 'top';
            const gapDeg = gapDegree || type === 'dashboard' && 75;
            progress = (React.createElement("div", { className: `${prefixCls}-inner`, style: circleStyle },
                React.createElement(Circle, { percent: percent, strokeWidth: circleWidth, trailWidth: circleWidth, strokeColor: statusColorMap[progressStatus], trailColor: trailColor, prefixCls: prefixCls, gapDegree: gapDeg, gapPosition: gapPos }),
                progressInfo));
        }
        const classString = classNames(prefixCls, {
            [`${prefixCls}-${type === 'dashboard' && 'circle' || type}`]: true,
            [`${prefixCls}-status-${progressStatus}`]: true,
            [`${prefixCls}-show-info`]: showInfo,
            [`${prefixCls}-${size}`]: size,
        }, className);
        return (React.createElement("div", Object.assign({}, restProps, { className: classString }), progress));
    }
}
Progress.defaultProps = {
    type: 'line',
    percent: 0,
    showInfo: true,
    trailColor: '#f3f3f3',
    prefixCls: 'ant-progress',
    size: 'default',
};
Progress.propTypes = {
    status: PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
    type: PropTypes.oneOf(['line', 'circle', 'dashboard']),
    showInfo: PropTypes.bool,
    percent: PropTypes.number,
    width: PropTypes.number,
    strokeWidth: PropTypes.number,
    trailColor: PropTypes.string,
    format: PropTypes.func,
    gapDegree: PropTypes.number,
    default: PropTypes.oneOf(['default', 'small']),
};
