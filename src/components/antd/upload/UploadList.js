import React from 'react';
import Animate from 'rc-animate';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Progress from '../progress';
import classNames from 'classnames';
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
};
export default class UploadList extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClose = (file) => {
            const { onRemove } = this.props;
            if (onRemove) {
                onRemove(file);
            }
        };
        this.handlePreview = (file, e) => {
            const { onPreview } = this.props;
            if (!onPreview) {
                return;
            }
            e.preventDefault();
            return onPreview(file);
        };
    }
    componentDidUpdate() {
        if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
            return;
        }
        (this.props.items || []).forEach(file => {
            if (typeof document === 'undefined' ||
                typeof window === 'undefined' ||
                !window.FileReader || !window.File ||
                !(file.originFileObj instanceof File) ||
                file.thumbUrl !== undefined) {
                return;
            }
            /*eslint-disable */
            file.thumbUrl = '';
            /*eslint-enable */
            previewFile(file.originFileObj, (previewDataUrl) => {
                /*eslint-disable */
                file.thumbUrl = previewDataUrl;
                /*eslint-enable */
                this.forceUpdate();
            });
        });
    }
    render() {
        const { prefixCls, items = [], listType, showPreviewIcon, showRemoveIcon, locale } = this.props;
        const list = items.map(file => {
            let progress;
            let icon = React.createElement(Icon, { type: file.status === 'uploading' ? 'loading' : 'paper-clip' });
            if (listType === 'picture' || listType === 'picture-card') {
                if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
                    if (listType === 'picture-card') {
                        icon = React.createElement("div", { className: `${prefixCls}-list-item-uploading-text` }, locale.uploading);
                    }
                    else {
                        icon = React.createElement(Icon, { className: `${prefixCls}-list-item-thumbnail`, type: "picture" });
                    }
                }
                else {
                    icon = (React.createElement("a", { className: `${prefixCls}-list-item-thumbnail`, onClick: e => this.handlePreview(file, e), href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer" },
                        React.createElement("img", { src: file.thumbUrl || file.url, alt: file.name })));
                }
            }
            if (file.status === 'uploading') {
                // show loading icon if upload progress listener is disabled
                const loadingProgress = ('percent' in file) ? (React.createElement(Progress, Object.assign({ type: "line" }, this.props.progressAttr, { percent: file.percent }))) : null;
                progress = (React.createElement("div", { className: `${prefixCls}-list-item-progress`, key: "progress" }, loadingProgress));
            }
            const infoUploadingClass = classNames({
                [`${prefixCls}-list-item`]: true,
                [`${prefixCls}-list-item-${file.status}`]: true,
            });
            const preview = file.url ? (React.createElement("a", { href: file.url, target: "_blank", rel: "noopener noreferrer", className: `${prefixCls}-list-item-name`, onClick: e => this.handlePreview(file, e), title: file.name }, file.name)) : (React.createElement("span", { className: `${prefixCls}-list-item-name`, onClick: e => this.handlePreview(file, e), title: file.name }, file.name));
            const style = (file.url || file.thumbUrl) ? undefined : {
                pointerEvents: 'none',
                opacity: 0.5,
            };
            const previewIcon = showPreviewIcon ? (React.createElement("a", { href: file.url || file.thumbUrl, target: "_blank", rel: "noopener noreferrer", style: style, onClick: e => this.handlePreview(file, e), title: locale.previewFile },
                React.createElement(Icon, { type: "eye-o" }))) : null;
            const removeIcon = showRemoveIcon ? (React.createElement(Icon, { type: "delete", title: locale.removeFile, onClick: () => this.handleClose(file) })) : null;
            const removeIconCross = showRemoveIcon ? (React.createElement(Icon, { type: "cross", title: locale.removeFile, onClick: () => this.handleClose(file) })) : null;
            const actions = (listType === 'picture-card' && file.status !== 'uploading')
                ? React.createElement("span", { className: `${prefixCls}-list-item-actions` },
                    previewIcon,
                    removeIcon)
                : removeIconCross;
            let message;
            if (file.response && typeof file.response === 'string') {
                message = file.response;
            }
            else {
                message = (file.error && file.error.statusText) || locale.uploadError;
            }
            const iconAndPreview = (file.status === 'error')
                ? React.createElement(Tooltip, { title: message },
                    icon,
                    preview)
                : React.createElement("span", null,
                    icon,
                    preview);
            return (React.createElement("div", { className: infoUploadingClass, key: file.uid },
                React.createElement("div", { className: `${prefixCls}-list-item-info` }, iconAndPreview),
                actions,
                React.createElement(Animate, { transitionName: "fade", component: "" }, progress)));
        });
        const listClassNames = classNames({
            [`${prefixCls}-list`]: true,
            [`${prefixCls}-list-${listType}`]: true,
        });
        const animationDirection = listType === 'picture-card' ? 'animate-inline' : 'animate';
        return (React.createElement(Animate, { transitionName: `${prefixCls}-${animationDirection}`, component: "div", className: listClassNames }, list));
    }
}
UploadList.defaultProps = {
    listType: 'text',
    progressAttr: {
        strokeWidth: 2,
        showInfo: false,
    },
    prefixCls: 'ant-upload',
    showRemoveIcon: true,
    showPreviewIcon: true,
};
