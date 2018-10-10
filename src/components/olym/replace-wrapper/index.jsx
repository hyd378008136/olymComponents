import React from 'react';
import _ from 'lodash';
import { replaceInvisibleCharacter, transformFullToHalf } from '../util/replaceFunc';

const processData = (value, { needReplace, needUppercase, needTransform }) => {
	if (!!value && typeof value === 'string') {
		if (needTransform) {
			value = transformFullToHalf(value);
		}
		if (needReplace) {
			value = replaceInvisibleCharacter(value);
		}
		if (needUppercase) {
			value = value.toUpperCase();
		}
	}
	return value;
};

class ReplaceWrappedComponent extends React.Component {

	constructor(props) {
		super(props);
		this.isOnCompositionStart = false;
	}

	onChange = (...rest) => {
		let { needReplace = true, needUppercase = true, needTransform = true, valueKeyFromEvent = 'target.value', ReactElement } = this.props;
		if (this.isOnCompositionStart) {
			_.set(rest[0], 'type', 'composition');
			ReactElement.props && ReactElement.props.onChange && ReactElement.props.onChange(...rest);
			return;
		}
		let e = rest[0];
		let value = _.result(e, valueKeyFromEvent, '');
		if (valueKeyFromEvent === 'toString') {
			value = e;
		}
		let resultValue = value;
		if (!this.isOnCompositionStart) {
			resultValue = processData(value, { needReplace, needUppercase, needTransform });
		}
		if (valueKeyFromEvent === 'toString') {
			e = resultValue;
		} else {
			_.set(e, valueKeyFromEvent, resultValue);
		}
		rest[0] = e;
		_.set(rest[0], 'type', 'change');
		_.set(rest[0], 'mode', 'replaceWrapper');
		ReactElement.props && ReactElement.props.onChange && ReactElement.props.onChange(...rest);
	};

	onCompositionStart = e => {
		this.isOnCompositionStart = true;
	};

	onCompositionEnd = e => {
		let { valueKeyFromEvent = 'target.value' } = this.props;
    this.isOnCompositionStart = false;
    let value = e.currentTarget.value;
    let event = {};
    if (valueKeyFromEvent === 'toString') {
      event = value;
    } else {
      _.set(event, valueKeyFromEvent, value);
    }
    this.onChange(event);
	};

	render() {
		let ReactElement = this.props.ReactElement;
		return React.cloneElement(ReactElement, { onCompositionStart: this.onCompositionStart, onChange: this.onChange, onCompositionEnd: this.onCompositionEnd }, null);
	}
}

export default function replaceWrapper(ReactElement, options = {}) {
	return <ReplaceWrappedComponent ReactElement={ReactElement} {...options}/>;
}
