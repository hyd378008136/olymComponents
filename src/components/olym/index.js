/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn &&
    typeof window !== 'undefined') {
    console.warn('You are using a whole package of antd, ' +
        'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.');
}
/* @remove-on-es-build-end */
export { default as AdSearch } from './ad-search';
export { default as Button } from './button';
export { default as DatePicker } from './date-picker';
export { default as FormLayout } from './form-layout';
export { default as InputNumber } from './input-number';
export { default as Textarea } from './text-area';
export { default as MultiColSelect } from './multi-col-select';
export { default as OAdSearch } from './o-ad-search';
export { default as Panel } from './panel';
export { default as RichSelect } from './rich-select';
export { default as Select } from './select';
export { default as Split } from './split';
export { default as SplitContainer } from './split-container';
export { default as Table } from './table';
export { default as Tag } from './tag';
export { default as Text } from './text';
export { default as TextareaRichSelect } from './text-area-rich-select';
export { default as Toe } from './toe';
export { default as Tooltip } from './tooltip';
export { default as Transfer } from './transfer';
export { default as Wrap } from './wrap';
export { default as ReplaceInput } from './replace-input';
export { default as ReplaceTextArea } from './replace-text-area';
export { default as CustomizedHOCForm } from './customized-h-o-c-form';
export { default as replaceWrapper } from './replace-wrapper';
export { default as FloatDrag } from './float-drag'