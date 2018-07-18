import React, {Component} from 'react'
import {Checkbox, Transfer as AntdTransfer} from 'antd'
import Animate from 'rc-animate'
import Search from '../../antd/transfer/search'
import Item from '../../antd/transfer/item';

export function isRenderResultPlainObject(result) {
    return result && !React.isValidElement(result) &&
        Object.prototype.toString.call(result) === '[object Object]';
}

//@see https://github.com/ant-design/ant-design/blob/1.x-stable/components/transfer/list.jsx#L206

class CustomTransfer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mounted: false,
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                mounted: true,
            });
        }, 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    renderTransferBody = ({
                              dataSource, render, showSearch, prefixCls, filter, filterOption,
                              handleFilter, handleClear, handleSelect, checkedKeys, searchPlaceholder, notFoundContent
                          }) => {

        const {onSelectChange} = this.props
        console.log("dataSource", dataSource)

        function matchFilter(filterText, item, text) {
            if (filterOption) {
                return filterOption(filterText, item);
            }
            return text.indexOf(filterText) >= 0;
        }

        function innerHandleSelect(selectedItem){
            const result = checkedKeys.some((key) => key === selectedItem.key);
            handleSelect(selectedItem, !result);
            onSelectChange && onSelectChange(selectedItem, !result)
        }

        const showItems = dataSource.filter(item => !!item).map(item => {
            const renderResult = render(item);
            let renderedText;
            let renderedEl;

            if (isRenderResultPlainObject(renderResult)) {
                renderedText = renderResult.value;
                renderedEl = renderResult.label;
            } else {
                renderedText = renderResult;
                renderedEl = renderResult;
            }

            if (filter && filter.trim() && !matchFilter(filter, item, renderedText)) {
                return null;
            }
            const checked = checkedKeys.indexOf(item.key) >= 0;
            var lazy = {"height": 20, "offset": 20};
            return (
                <Item
                    key={item.key}
                    item={item}
                    lazy={lazy}
                    renderedText={renderedText}
                    renderedEl={renderedEl}
                    checked={checked}
                    prefixCls={prefixCls}
                    onClick={innerHandleSelect}
                />
            );
        });

        return (
            <div className={showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
                {showSearch ? <div className={`${prefixCls}-body-search-wrapper`}>
                    <Search prefixCls={`${prefixCls}-search`}
                            onChange={handleFilter}
                            handleClear={handleClear}
                            placeholder={searchPlaceholder || '请输入搜索内容'}
                            value={filter}
                    />
                </div> : null}
                <Animate component="ul"
                         className={`${prefixCls}-content`}
                         transitionName={this.state.mounted ? `${prefixCls}-highlight` : ''}
                         transitionLeave={false}
                >
                    {showItems.length > 0
                        ? showItems
                        : <div className={`${prefixCls}-body-not-found`}>{notFoundContent || '列表为空'}</div>}
                </Animate>
            </div>
        )
    }

    render() {
        console.log("render",this.props.dataSource)
        const body = this.renderTransferBody;
        return (
            <AntdTransfer {...this.props} body={body} />
        )

    }
}

export default CustomTransfer