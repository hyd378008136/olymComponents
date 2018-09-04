/**
 * 将常见的不可见字符转换为普通的空格字符
 * @param str
 * @returns {*}
 */
const replaceInvisibleCharacter = (str) => {
    let returnValue = "";
    if (!!str) {
        const space = " ";
        //排除掉 \r\n  \u000d\u000a
        const regEx = new RegExp("[\u0000-\u0009" + //：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
                "\u000B-\u000C" + //：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
                "\u000E-\u001F" + //：C0控制符及基本拉丁文 (C0 Control and Basic Latin)
                "\u007F-\u00A0" + //：特殊 (Specials);
                "]", "g");
        returnValue = str.replace(regEx, space);
    }
    return returnValue;
}
// 全角转半角
const transformFullToHalf = (str) => {
    let returnValue = "";
    if (!!str) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) == 12288) {
                returnValue += String.fromCharCode(str.charCodeAt(i) - 12256);
                continue;
            }
            if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) {
                returnValue += String.fromCharCode(str.charCodeAt(i) - 65248);
            } else {
                returnValue += String.fromCharCode(str.charCodeAt(i));
            }
        }
    }
    return returnValue
}

const processData = (value, _this) => {
    const {needReplace, needUppercase, needTransform} = _this.props;
    if (!!value&&typeof(value) == 'string') {
        if (needTransform) {
            value = transformFullToHalf(value)
        }
        if (needReplace) {
            value = replaceInvisibleCharacter(value)
        }
        if (needUppercase) {
            value = value.toUpperCase()
        }
    }
    return value;
}

const handleOnBlur = (e, _this) => {
    let {value} = _this.state
    const {onChange, onBlur} = _this.props;
    let resultValue = processData(value, _this);
    if (resultValue !== value) {
        _this.setState({value: resultValue});
        e.target.value = resultValue;
        onChange && onChange(e);
    }
    onBlur && onBlur(e);
}

const setPropsValue = (_value, _this) => {
        _this.setState({value: _value});
};

export {replaceInvisibleCharacter, transformFullToHalf, handleOnBlur, setPropsValue}