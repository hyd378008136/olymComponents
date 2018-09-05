import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import Row from '../grid/row';
import Col from '../grid/col';
import { FIELD_META_PROP } from './constants';
import warning from '../_util/warning';
import _ from 'lodash'
export default class FormItem extends React.Component {
    constructor() {
        super(...arguments);
        // Resolve duplicated ids bug between different forms
        // https://github.com/ant-design/ant-design/issues/7351
        this.onLabelClick = (e) => {
            const id = this.props.id || this.getId();
            if (!id) {
                return;
            }
            const controls = document.querySelectorAll(`[id="${id}"]`);
            if (controls.length !== 1) {
                e.preventDefault();
                const control = findDOMNode(this).querySelector(`[id="${id}"]`);
                if (control && control.focus) {
                    control.focus();
                }
            }
        };
    }
    componentDidMount() {
        warning(this.getControls(this.props.children, true).length <= 1, '`Form.Item` cannot generate `validateStatus` and `help` automatically, ' +
            'while there are more than one `getFieldDecorator` in it.');
    }

    compareChildrenProps = (props, nextProps) => {
        if (!props.children && !nextProps) {
            return true
        } else if (props.children && nextProps.children) {
            if (_.isEqual(_.omit(props.children, 'props'), _.omit(nextProps.children, 'props'))){
                if (!props.children.props && !nextProps.children.props) {
                    return true
                } else if (props.children.props && nextProps.children.props) {
                    let childrenPropsEqual = _.isEqual(_.omit(props.children.props, 'data-__meta'), _.omit(nextProps.children.props, 'data-__meta'));

                    // 表单规则变化 需要重新render
                    let childRules = props.children.props['data-__meta'] ? props.children.props['data-__meta'].rules : null;
                    let nextChildRules = nextProps.children.props['data-__meta'] ? nextProps.children.props['data-__meta'].rules : null;

                    return childrenPropsEqual && _.isEqual(childRules, nextChildRules);
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.getHelpMsg()) {
            return true
        }
        if (_.isEqual(_.omit(nextProps, ['children']), _.omit(this.props, ['children']))
            && _.isEqual(nextState, this.state) && this.compareChildrenProps(this.props, nextProps)) {
			return false
		} else {
			return true
		}
    }

    // shouldComponentUpdate(...args) {
    //     return PureRenderMixin.shouldComponentUpdate.apply(this, args);
    // }
    getHelpMsg() {
        const context = this.context;
        const props = this.props;
        if (props.help === undefined && context.form) {
            return this.getId() ? (context.form.getFieldError(this.getId()) || []).join(', ') : '';
        }
        return props.help;
    }
    getControls(children, recursively) {
        let controls = [];
        const childrenArray = React.Children.toArray(children);
        for (let i = 0; i < childrenArray.length; i++) {
            if (!recursively && controls.length > 0) {
                break;
            }
            const child = childrenArray[i];
            if (child.type &&
                (child.type === FormItem || child.type.displayName === 'FormItem')) {
                continue;
            }
            if (!child.props) {
                continue;
            }
            if (FIELD_META_PROP in child.props) {
                controls.push(child);
            }
            else if (child.props.children) {
                controls = controls.concat(this.getControls(child.props.children, recursively));
            }
        }
        return controls;
    }
    getOnlyControl() {
        const child = this.getControls(this.props.children, false)[0];
        return child !== undefined ? child : null;
    }
    getChildProp(prop) {
        const child = this.getOnlyControl();
        return child && child.props && child.props[prop];
    }
    getId() {
        return this.getChildProp('id');
    }
    getMeta() {
        return this.getChildProp(FIELD_META_PROP);
    }
    renderHelp() {
        const prefixCls = this.props.prefixCls;
        const help = this.getHelpMsg();
        var position = this.props.helpPosition ? '-' + this.props.helpPosition : ''
        return help ? (React.createElement("div", { className: `${prefixCls}-explain${position}`, key: "help" }, help)) : null;
    }
    renderExtra() {
        const { prefixCls, extra } = this.props;
        return extra ? (React.createElement("div", { className: `${prefixCls}-extra` }, extra)) : null;
    }
    getValidateStatus() {
        const { isFieldValidating, getFieldError, getFieldValue } = this.context.form;
        const fieldId = this.getId();
        if (!fieldId) {
            return '';
        }
        if (isFieldValidating(fieldId)) {
            return 'validating';
        }
        if (!!getFieldError(fieldId)) {
            return 'error';
        }
        const fieldValue = getFieldValue(fieldId);
        if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
            return 'success';
        }
        return '';
    }
    renderValidateWrapper(c1, c2, c3) {
        let classes = '';
        const form = this.context.form;
        const props = this.props;
        const validateStatus = (props.validateStatus === undefined && form) ?
            this.getValidateStatus() :
            props.validateStatus;
        if (validateStatus) {
            classes = classNames({
                'has-feedback': props.hasFeedback || validateStatus === 'validating',
                'has-success': validateStatus === 'success',
                'has-warning': validateStatus === 'warning',
                'has-error': validateStatus === 'error',
                'is-validating': validateStatus === 'validating',
            });
        }
        return (React.createElement("div", { className: `${this.props.prefixCls}-item-control ${classes}` },
            c1,
            c2,
            c3));
    }
    renderWrapper(children) {
        const { prefixCls, wrapperCol } = this.props;
        const className = classNames(`${prefixCls}-item-control-wrapper`, wrapperCol && wrapperCol.className);
        return (React.createElement(Col, Object.assign({}, wrapperCol, { className: className, key: "wrapper" }), children));
    }
    isRequired() {
        const { required } = this.props;
        if (required !== undefined) {
            return required;
        }
        if (this.context.form) {
            const meta = this.getMeta() || {};
            const validate = (meta.validate || []);
            return validate.filter((item) => !!item.rules).some((item) => {
                return item.rules.some((rule) => rule.required);
            });
        }
        return false;
    }
    renderLabel() {
        const { prefixCls, label, labelCol, colon, id, labelWidth, labelStyle } = this.props;
        const context = this.context;
        const required = this.isRequired();
        const labelColClassName = classNames(`${prefixCls}-item-label`, labelCol && labelCol.className);
        const labelClassName = classNames({
            [`${prefixCls}-item-required`]: required,
        });
        let labelChildren = label;
        // Keep label is original where there should have no colon
        const haveColon = colon && !context.vertical;
        // Remove duplicated user input colon
        if (haveColon && typeof label === 'string' && label.trim() !== '') {
            labelChildren = label.replace(/[：|:]\s*$/, '');
        }

        const labelWidthStyle = {
            width:labelWidth,
            marginLeft:`-${labelWidth}`
        };
        return label ? (React.createElement(Col, Object.assign({}, labelCol, { className: labelColClassName, key: "label",style:labelWidthStyle }),
            React.createElement("label", { htmlFor: id || this.getId(), className: labelClassName, style: labelStyle, title: typeof label === 'string' ? label : '', onClick: this.onLabelClick }, labelChildren))) : null;
    }
    renderChildren() {
        const props = this.props;
        const children = React.Children.map(props.children, (child) => {
            if (child && typeof child.type === 'function' && !child.props.size) {
                return React.cloneElement(child, { size: 'large' });
            }
            return child;
        });
        return [
            this.renderLabel(),
            this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), this.renderExtra())),
        ];
    }
    renderFormItem(children) {
        const props = this.props;
        const prefixCls = props.prefixCls;
        const style = props.style;
        const itemClassName = {
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-with-help`]: !!this.getHelpMsg(),
            [`${prefixCls}-item-no-colon`]: !props.colon,
            [`${props.className}`]: !!props.className,
        };
        return (React.createElement(Row, { className: classNames(itemClassName), style: style }, children));
    }
    render() {
        const children = this.renderChildren();
        return this.renderFormItem(children);
    }
}
FormItem.defaultProps = {
    hasFeedback: false,
    prefixCls: 'ant-form',
    colon: true,
};
FormItem.propTypes = {
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    help: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    validateStatus: PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    hasFeedback: PropTypes.bool,
    wrapperCol: PropTypes.object,
    className: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.node,
    colon: PropTypes.bool,
    helpPosition: PropTypes.string
};
FormItem.contextTypes = {
    form: PropTypes.object,
    vertical: PropTypes.bool,
};
