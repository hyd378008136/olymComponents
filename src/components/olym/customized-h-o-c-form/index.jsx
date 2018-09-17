import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import schema from 'async-validator';
import moment from 'moment';
import $ from 'jquery';

// imported from flattenJS (Thanks richie5um) https://github.com/richie5um/FlattenJS/blob/master/lib/flatten.js
const convert = obj => {
  return _.transform(
    obj,
    (result, value, key) => {
      if (moment.isMoment(value)) {
        result[key] = value;
      } else if (_.isObject(value)) {
        if (_.isArray(value)) {
          result[key] = value;
        }
        let flatMap = _.mapKeys(convert(value), (mvalue, mkey) => {
          if (_.isArray(value)) {
            let index = mkey.indexOf('.');
            if (index !== -1) {
              return key + '[' + mkey.slice(0, index) + ']' + mkey.slice(index);
            }
            return key + '[' + mkey + ']';
          }
          return key + '.' + mkey;
        });
        _.assign(result, flatMap);
      } else if (value !== undefined) {
        result[key] = value;
      }
      return result;
    },
    {}
  );
};

const getParams = (ns, opt, cb) => {
  let names = ns;
  let options = opt;
  let callback = cb;
  if (cb === undefined) {
    if (typeof names === 'function') {
      callback = names;
      options = {};
      names = undefined;
    } else if (Array.isArray(names)) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
    } else {
      callback = options;
      options = names || {};
      names = undefined;
    }
  }
  return {
    names,
    options,
    callback
  };
};

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const validateFields = ({
  values,
  rules,
  options = {
    force: true
  }
}) => {
  const validator = new schema(rules);
  let formErrors = null;
  validator.validate(values, options, errors => {
    formErrors = errors;
  });
  if (formErrors) {
    return formErrors;
  } else {
    // if (callback) {
    // callback(null, getFieldsValue())
    // } else {
    //     return null
    // }
    return null;
  }
};

export default function CustomizedHOCForm({
  onFieldsChange = () => {},
  mapPropsToFields,
  onValuesChange,
  helpPosition,
  prefixClass = 'ant-form'
}) {
  let isScrolled = false;
  let store = {
    fieldsIds: [],
    fields: {}
  };
  let updateQueue = {};
  return WrappedComponent => {
    return class extends React.Component {
      constructor(props) {
        super(props);
      }

      componentDidMount() {
        if (mapPropsToFields && typeof mapPropsToFields === 'function') {
          this.currentResult = mapPropsToFields(this.props);
          this.setFieldsValue(this.currentResult);
        }
      }

      componentWillReceiveProps (nextProps) {
        if (mapPropsToFields && typeof mapPropsToFields === 'function') {
          let nextResult = mapPropsToFields(nextProps);
          if (!_.isEqual(nextResult, this.currentResult)) {
            this.setFieldsValue(nextResult);
            this.currentResult = nextResult;
          }
        }
      }

      resetFields = () => {
        let { fieldsIds, fields } = store;
        let fieldsObject = {};
        fieldsIds.forEach(id => {
          let field = _.result(fields, id);
          if (field && field.setFieldValue) {
            const {initialValue} = field;
            const value = (initialValue || initialValue === false || initialValue === 0) ? initialValue : '';
            field.setFieldValue(value, {
              needCallback: false,
              needValidate: false,
              clearValidate: true
            });
            fieldsObject[id] = {value, initialValue};
          }
        });
        if (onFieldsChange && Object.keys(fieldsObject).length > 0) {
          onFieldsChange(this.props, fieldsObject);
        }
        store.fieldsIds = [];
        store.fields = {};
      };

      getFieldValue = id => {
        let { fields } = store;
        let field = _.result(fields, id);
        if (field && field.setFieldValue && field.isExist && field.isExist()) {
          return _.result(fields, `${id}.value`);
        }
        return undefined;
      };

      getFieldValueWithoutMount = id => {
        let { fields } = store;
        let field = _.result(fields, id);
        if (field) {
          return _.result(fields, `${id}.value`);
        }
        return undefined;
      };

      setFieldsValue = (data, needValidate = true) => {
        const { fields } = store;
        const flattenedObject = convert(data);
        let fieldsObject = {};
        Object.keys(flattenedObject).forEach(key => {
          if (key.endsWith('.value')) {
            _.set(fields, key, flattenedObject[key]);
          } else {
            _.set(fields, `${key}.value`, flattenedObject[key]);
          }
          let field = _.result(fields, key.replace('.value', ''), {});

          if (field.setFieldValue) {
            field.setFieldValue(field.value, { needCallback: false, needValidate, clearValidate: !needValidate });
          }
          fieldsObject[key.replace('.value', '')] = { value: flattenedObject[key] };
        });
        if (onFieldsChange && Object.keys(fieldsObject).length > 0) {
          onFieldsChange(this.props, fieldsObject);
        }
      };

      setFields = (data, needValidate = true) => {
        this.setFieldsValue(data, needValidate);
      };

      getFieldsValue = (names, formatDate = false) => {
        const { fieldsIds } = store;
        const fieldNames = names || fieldsIds;
        let _this = this,
          result = {};
        fieldNames.forEach(name => {
          let value = _this.getFieldValue(name);
          if (value !== undefined) {
            if (formatDate && moment.isMoment(value)) {
              value = value.format(dateTimeFormat);
            }
            _.set(result, name, value);
          }
        });
        return result;
      };

      getFieldDecorator = (id, options = {}) => {
        let { fields, fieldsIds } = store;
        const { initialValue, valuePropName = 'value', rules, ...otherProps } = options;
        if (_.result(fields, id) === undefined) {
          _.set(fields, `${id}`, {});
        }
        if (initialValue !== undefined) {
          _.set(fields, `${id}.initialValue`, initialValue);
        }
        if (fieldsIds.indexOf(id) < 0) {
          fieldsIds.push(id);
        }
        if (rules) {
          _.set(fields, `${id}.rules`, rules);
        }
        const getFieldError = this.getFieldError;
        const outerProps = this.props;
        const getFields = () => fields;
        const removeField = this.removeField;
        if (Array.isArray(updateQueue[id])) {
          updateQueue[id].push(1);
        } else {
          updateQueue[id] = [1];
        }
        const getQueue = () => updateQueue[id];
        return ReactElement => {
          return (
            <WrappedField
              key={id}
              prefixClass={prefixClass}
              {...ReactElement.props}
              id={id}
              removeField={removeField}
              getFields={getFields}
              valuePropName={valuePropName}
              ReactElement={ReactElement}
              onFieldsChange={onFieldsChange}
              getFieldError={getFieldError}
              outerProps={outerProps}
              formHelpPosition={helpPosition}
              getQueue={getQueue}
              {...otherProps}
            />
          );
        };
      };

      removeField = id => {
        delete store.fields[id];
        store.fieldsIds = store.fieldsIds.filter(i => id !== i);
      };

      validateWithoutFieldsAndScroll = (ns, opt, cb) => {
        isScrolled = false;
        let { names = [], callback, options } = getParams(ns, opt, cb);
        let { fields, fieldsIds } = store;
        let errors = {},
          removedIds = [];
        let validateFieldsIds = fieldsIds.filter(id => names.indexOf(id) < 0);
        validateFieldsIds.forEach(id => {
          let field = _.result(fields, id);
          if (field && field.validate) {
            let error = field.validate(true, isScrolled);
            if (error && error !== 'needRemove') {
              isScrolled = true;
            }
            if (error === 'needRemove') {
              removedIds.push(id);
            } else {
              errors = _.merge(errors, error);
            }
          }
        });
        validateFieldsIds = validateFieldsIds.filter(i => removedIds.indexOf(i) < 0);
        let values = this.getFieldsValue(validateFieldsIds, true);
        if (typeof callback === 'function') {
          if (_.keys(errors).length < 1) {
            errors = null;
          }
          callback(errors, values);
        }
      };

      validateFieldsAndScroll = (ns, opt, cb) => {
        isScrolled = false;
        let { fields, fieldsIds } = store;
        let { names = fieldsIds, callback, options } = getParams(ns, opt, cb);
        let errors = {},
          removedIds = [];
        names.forEach(id => {
          let field = _.result(fields, id);
          if (field && field.validate) {
            let error = field.validate(true, isScrolled);
            if (error && error !== 'needRemove') {
              isScrolled = true;
            }
            if (error === 'needRemove') {
              removedIds.push(id);
            } else {
              errors = _.merge(errors, error);
            }
          }
        });
        names = fieldsIds.filter(i => removedIds.indexOf(i) < 0);
        fields = _.omit(fields, removedIds);
        let values = this.getFieldsValue(names, true);
        if (typeof callback === 'function') {
          if (_.keys(errors).length < 1) {
            errors = null;
          }
          callback(errors, values);
        }
      };

      getFieldError = id => {
        let { fields } = store;
        let field = _.result(fields, id);
        if (!field) {
          return;
        }
        let values = {};

        if (!field.rules) {
          return;
        }

        let isRequireed = Array.isArray(field.rules) && field.rules.some(o => o.required)

        if ('value' in field) {
          values[id] = field.value;
        } else if (!isRequireed) {
          return;
        }

        let rules = {};
        rules[id] = field.rules;
        let error = validateFields({ values, rules });
        if (error && error.length > 0) {
          let message = '';
          error.forEach(i => {
            message += i.message;
          });
          return { message, id };
        } else {
          return null;
        }
      };

      validateField = id => {
        let { fields } = store;
        let field = _.result(fields, id);
        return field.validate();
      };

      render() {
        const { wrappedComponentRef, ...props } = this.props;
        let formProps = {
          getFieldDecorator: this.getFieldDecorator,
          resetFields: this.resetFields,
          getFieldValue: this.getFieldValue,
          setFieldsValue: this.setFieldsValue,
          validateFieldsAndScroll: this.validateFieldsAndScroll,
          getFieldError: this.getFieldError,
          setFields: this.setFields,
          getFieldsValue: this.getFieldsValue,
          validateField: this.validateField,
          validateWithoutFieldsAndScroll: this.validateWithoutFieldsAndScroll,
          getFieldValueWithoutMount: this.getFieldValueWithoutMount
        };
        let ref = {};
        if (wrappedComponentRef) {
          ref = wrappedComponentRef;
        }
        return <WrappedComponent ref={ref} form={{ ...formProps }} {...props} />;
      }
    };
  };
}

class WrappedField extends React.Component {
  constructor(props) {
    super(props);
    let fields = props.getFields();
    let field = _.result(fields, props.id);
    let valuePropName = props.valuePropName;
    let value = field.initialValue;
    if ('value' in field) {
      value = field.value;
    }
    if (field.value === undefined) {
      field.value = value;
    }
    this.state = {
      value
    };
    this.delay = null
  }

  componentDidMount() {
    this._ismounted = true;
    this.initField(this.props);
  }

  componentWillUnmount() {
    this._ismounted = false;
    if (this.props.getQueue().length === 1) {
      this.props.removeField(this.props.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    let fields = nextProps.getFields();
    let field = _.result(fields, nextProps.id);
    if (!field.setFieldValue) {
      this.initField(nextProps);
    }
  }

  isRequired = rules => {
    return rules && rules.some(rule => rule.required);
  };

  initField = props => {
    let fields = props.getFields();
    let field = _.result(fields, props.id);
    let valuePropName = props.valuePropName;
    let value = field.initialValue;
    if ('value' in field) {
      value = field.value;
    }
    if (field.value === undefined) {
      field.value = value;
    }
    field.setFieldValue = (value, { needCallback = true, needValidate = true, clearValidate = false }) => {
      let result = {
        target: {
          id: props.id
        }
      };
      result.target[valuePropName] = value;
      if (moment.isMoment(value)) {
        result = value;
      }
      this.onChange(result, {
        needCallback,
        needValidate,
        clearValidate
      });
    };
    field.validate = this.validate;
    let required = this.isRequired(field.rules);
    if (required) {
      this.setRequired();
    }
    this.setState({
      value,
      required
    });
    field.isExist = this.isExist;
  };

  getOmitFields = props => {
    let list = [];
    Object.keys(props).forEach(key => {
      if (typeof props[key] === 'function') {
        list.push(key);
      }
    });
    return list;
  };

  shouldComponentUpdate(nextProps, nextState) {
    const omitList = this.getOmitFields(nextProps);
    if (_.isEqual(_.omit(nextProps, omitList), _.omit(this.props, omitList)) && _.isEqual(nextState, this.state)) {
      return false;
    } else {
      return true;
    }
  }

  renderHelp(help) {
    const prefixCls = 'ant-form';
    var position = '';
    if (this.props.formHelpPosition) {
      position = '-' + this.props.formHelpPosition;
    }
    if (this.props.helpPosition) {
      position = '-' + this.props.helpPosition;
    }
    return React.createElement(
      'div',
      { className: `${prefixCls}-explain${position}`, key: 'help', id: `${this.props.id}-explain` },
      help
    );
  }

  isExist = () => {
    return this._ismounted;
    try {
      let selfNode = ReactDOM.findDOMNode(this);
      return true;
    } catch (e) {
      return false;
    }
  };

  setRequired = () => {
    try {
      let selfNode = ReactDOM.findDOMNode(this);
      let parentElement = selfNode.parentElement;
      if (parentElement) {
        $($(parentElement.offsetParent).find(`.${this.props.prefixClass}-item-label label`)).attr(
          'class',
          `${this.props.prefixClass}-item-required`
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  validate = (needScroll = false, isScrolled = true) => {
    let error = this.props.getFieldError(this.props.id);
    let selfNode;
    try {
      selfNode = ReactDOM.findDOMNode(this);
    } catch (e) {
      return 'needRemove';
    }
    const parentElement = selfNode.parentElement;
    let $parent;
    if (parentElement) {
      $parent = $(parentElement);
    }
    if (error) {
      if ($parent) {
        if (!isScrolled) {
          parentElement.scrollIntoView();
        }
        const explain = parentElement.querySelector(`[id='${this.props.id}-explain']`);
        if (explain) {
          return error;
        }
        $parent.removeClass('has-success');
        $parent.addClass('has-error');
        const prefixCls = 'ant-form';
        let div = document.createElement('div');
        selfNode.parentNode.appendChild(ReactDOM.render(this.renderHelp(error.message), div));
        div.remove();
      }
    } else {
      if ($parent) {
        $parent.removeClass('has-error');
        $parent.addClass('has-success');
        const explain = parentElement.querySelector(`[id='${this.props.id}-explain']`);
        if (explain) {
          explain.remove();
        }
      }
    }
    return error;
  };

  clearValidate = () => {
    let selfNode;
    try {
      selfNode = ReactDOM.findDOMNode(this);
    } catch (e) {
      return;
    }
    const parentElement = selfNode.parentElement;
    let $parent;
    if (parentElement) {
      $parent = $(parentElement);
    }
    if ($parent) {
      $parent.removeClass('has-error');
      $parent.addClass('has-success');
      const explain = parentElement.querySelector(`[id='${this.props.id}-explain']`);
      if (explain) {
        explain.remove();
      }
    }
  };

  onChange = (...rest) => {
    let [
      e,
      { needCallback, needValidate, clearValidate } = { needCallback: true, needValidate: true, clearValidate: false }
    ] = rest
    if (!this._ismounted) {
      return;
    }
    let fields = this.props.getFields();
    let field = _.result(fields, this.props.id);
    let valuePropName = this.props.valuePropName;
    if (e && (typeof e === 'string' || !e.target || moment.isMoment(e))) {
      field.value = e;
    } else if (e) {
      field.value = e.target[valuePropName];
    } else {
      field.value = '';
    }
    if (this.props.getValueFromEvent && typeof this.props.getValueFromEvent === 'function') {
      field.value = this.props.getValueFromEvent(field.value);
    }
    if (needValidate || needValidate === undefined) {
      this.validate();
    }
    if (clearValidate) {
      this.clearValidate();
    }
    if (_.isEqual(field.value, this.state.value)) {
      return;
    }
    this.setState({
      value: field.value
    });
    let onFieldsChange = this.props.onFieldsChange;
    if (onFieldsChange && (needCallback || needCallback === undefined)) {
      let fieldsObject = {};
      fieldsObject[this.props.id] = {
        value: field.value
      };
      let outerProps = this.props.outerProps;
      if (outerProps.dispatch) {
        if (this.delay) {
          clearTimeout(this.delay)
          this.delay = null
        }
        this.delay = setTimeout(() => onFieldsChange(outerProps, fieldsObject), 300);
      } else {
        onFieldsChange(outerProps, fieldsObject)
      }
    }
    if (this.props.onChange) {
      this.props.onChange(...rest);
    }
  };

  // onSearch = (value) => {
  // 	this.props.onSearch && this.props.onSearch(value)
  // }

  render() {
    let props = {
      onChange: this.onChange,
      value: this.state.value,
      id: this.props.id,
      key: this.props.id
    };
    // if (this.props.onSearch) {
    // 	props.onSearch = this.onSearch
    // }
    let valuePropName = this.props.valuePropName;
    if (valuePropName !== 'value') {
      props[valuePropName] = this.state.value;
      delete props.value;
    }
    return React.cloneElement(this.props.ReactElement, { ...props });
  }
}
