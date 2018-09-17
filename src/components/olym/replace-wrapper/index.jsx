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

export default function replaceWrapper(ReactElement, options = {}) {
	let { needReplace = true, needUppercase = true, needTransform = true, valueKeyFromEvent = 'target.value' } = options;
	let isOnCompositionUpdate = false;
	const onChange = (...rest) => {
		let e = rest[0];
		let value = _.result(e, valueKeyFromEvent, '');
		if (valueKeyFromEvent === 'toString') {
			value = e;
		}
		let resultValue = value;
		if (!isOnCompositionUpdate) {
			resultValue = processData(value, { needReplace, needUppercase, needTransform });
		}
		if (valueKeyFromEvent === 'toString') {
			e = resultValue;
		} else {
			_.set(e, valueKeyFromEvent, resultValue);
		}
		rest[0] = e;
		ReactElement.props && ReactElement.props.onChange && ReactElement.props.onChange(...rest);
	};
	const onCompositionUpdate = e => {
		isOnCompositionUpdate = true;
	};

	const onCompositionEnd = e => {
    isOnCompositionUpdate = false;
    let value = e.currentTarget.value;
    let event = {};
    if (valueKeyFromEvent === 'toString') {
      event = value;
    } else {
      _.set(event, valueKeyFromEvent, value);
    }
    onChange(event);
	};

	return React.cloneElement(ReactElement, { onCompositionUpdate, onChange, onCompositionEnd }, null);
}
