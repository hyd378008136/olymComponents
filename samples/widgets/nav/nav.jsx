import React, {Component} from 'react'
import {render}  from 'react-dom';
import classnames  from 'classnames';
import { Link} from '../../reactRouter';


import {Icon,Badge} from 'antd';
//style
import './nav.less';

class Nav extends Component{
    constructor(props){
        super(props)
        this.slideToggle = this.slideToggle.bind(this);
    }

    slideToggle(event){
        console.log(this)
    }

    render(){
        return (
                <ul className="nav">
                    {
                        this.props.navArr.map(item =>
                            item.isCat ?
                            <li className="nav__cat" key={item.label.toString()}>{item.label}</li> :
                            <li className="nav__item" key={item.label.toString()}>
                                <Link to={item.href} activeClassName="nav__link--active" className={classnames('nav__link',{'has-subnav':item.children})} onClick={this.slideToggle}><Icon type={item.icon} />{item.label}</Link>
                                {item.children &&
                                    <ol className="subnav">
                                    {item.children.map(item =>
                                        <li className="subnav__item" key={item.label.toString()}>
                                            <Link to={item.href} className="subnav__link" activeClassName="nav__link--active">{item.label}</Link>
                                        </li>
                                )}
                                    </ol>
                                }
                            </li>
                        )
                    }
                </ul>
        );
    }
}

Nav.defaultProps = {
    navArr:[
        {
            label: '首页',
            icon: 'inbox',
            href:'/'
        },        
        // {
			// label: 'Badge 徽标数',
        //     icon: 'laptop',
        //     href:"/components/badge"
        // },{
			// label: 'Breadcrumb 面包屑',
        //     icon: 'laptop',
        //     href:"/components/breadcrumb"
        // },
        // {
			// label: 'Button 按钮',
        //     icon: 'laptop',
        //     href:"/components/button"
        // },
        // {
			// label: 'Checkbox 多选框',
        //     icon: 'laptop',
        //     href:"/components/checkbox"
        // },
        {
			label: 'DatePicker 日期选择框',
            icon: 'laptop',
            href:"/components/datePicker"
        },
        // {
			// label: 'Dropdown 下拉菜单',
        //     icon: 'laptop',
        //     href:"/components/dropdown"
        // },
        // {
			// label: 'Icon 图标',
        //     icon: 'laptop',
        //     href:"/components/icon"
        // },
        // {
			// label: 'Input 输入框',
        //     icon: 'laptop',
        //     href:"/components/input"
        // },
        // {
			// label: 'Layout 布局',
        //     icon: 'laptop',
        //     href:"/components/layout"
        // },
        // {
			// label: 'Menu 菜单',
        //     icon: 'laptop',
        //     href:"/components/menu"
        // },
        // {
			// label: 'Modal 对话框',
        //     icon: 'laptop',
        //     href:"/components/modal"
        // },
        // {
			// label: 'Notification 通知提醒框',
        //     icon: 'laptop',
        //     href:"/components/notification"
        // },
        // {
			// label: 'Radio 单选框',
        //     icon: 'laptop',
        //     href:"/components/radio"
        // },
        // {
			// label: 'Select 选择器',
        //     icon: 'laptop',
        //     href:"/components/select"
        // },
        {
            label: 'Transfer 穿梭框',
            icon: 'laptop',
            href:"/components/transfer"
        },
        {
            label: 'Table 表格',
            icon: 'laptop',
            href:"/components/table"
        },
        {
            label: 'Ad-search 高级查询',
            icon: 'laptop',
            href:"/components/ad-search"
        },
        {
            label: 'multi-col-select 多列选择',
            icon: 'laptop',
            href:"/components/multiColSelect"
        },
        // {
			// label: 'Tabs 标签页',
        //     icon: 'laptop',
        //     href:"/components/tabs"
        // },
        // {
			// label: 'Tag 标签',
        //     icon: 'laptop',
        //     href:"/components/tag"
        // },
        // {
			// label: 'Timeline 时间轴',
        //     icon: 'laptop',
        //     href:"/components/timeline"
        // },
        // {
			// label: 'Upload上传',
        //     icon: 'laptop',
        //     href:"/components/upload"
        // },
        // {
        //     label: 'FormLayout 表单',
        //     icon: 'laptop',
        //     href:"/components/formLayout"
        // },
        // {
        //     label: 'Text 文本',
        //     icon: 'laptop',
        //     href:"/components/text"
        // },
        // {
        //     label: 'Steps 步骤条',
        //     icon: 'laptop',
        //     href:"/components/steps"
        // },
        // {
        //     label: 'Chart 图表',
        //     icon: 'laptop',
        //     href:"/components/chart"
        // },
    ]
}

export default Nav;