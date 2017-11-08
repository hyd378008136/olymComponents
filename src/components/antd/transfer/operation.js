import React from 'react';
import Button from '../button';
import Icon from '../icon';
function noop() {
}
export default class TransferOperation extends React.Component {
    render() {
        const { moveToLeft, moveToRight, leftArrowText, rightArrowText, leftActive, rightActive, className, } = this.props;
        const moveToLeftButton = (React.createElement(Button, { type: "primary", size: "small", disabled: !leftActive, onClick: moveToLeft }, React.createElement("span", null,
            React.createElement(Icon, { type: "left" }),
            leftArrowText)));
        const moveToRightButton = (React.createElement(Button, { type: "primary", size: "small", disabled: !rightActive, onClick: moveToRight }, React.createElement("span", null,
            rightArrowText,
            React.createElement(Icon, { type: "right" }))));
        return (React.createElement("div", { className: className },
            moveToLeftButton,
            moveToRightButton));
    }
}
TransferOperation.defaultProps = {
    leftArrowText: '',
    rightArrowText: '',
    moveToLeft: noop,
    moveToRight: noop,
};
