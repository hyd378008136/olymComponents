import React from "react";
import _ from 'lodash';
const person = {
  name: '陈总',
  company: '奥林'
};

class LazyLoadSample extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      scrollHeight: 0,
      hasMore: true,// 判断接口是否还有数据，通过接口设置
      dataList: []
    };
  }

  componentWillMount () {
    this.fetchData();
  }

  fetchData = () => {
    const { dataList } = this.state;
    let array = new Array(20);
    _.fill(array, person);
    const list = _.concat(dataList, array);
    console.log(array, list);
    this.setState({
      dataList: list
    })
  };

  componentDidMount(){
    this.setState({
      scrollHeight: window.innerHeight - 100
    })
  }

  handleScroll = () => {
    const body = document.getElementById('body');
    console.log(body.scrollTop, body.clientHeight, body.scrollHeight)
    if (body.scrollTop + body.clientHeight >= body.scrollHeight) {
      this.fetchData();
    }
  };

  render () {
    const { scrollHeight, dataList } = this.state;
    return (
      <div>
        <div id="header" style={{height: '35px'}}>
          团队
        </div>
        <div
          id="body"
          style={{
            height: scrollHeight,
            background: '#fff',
            overflowY: 'auto'
          }}
          onScroll={this.handleScroll}
        >
          {
            dataList.map((data, index) =>
            <div key={`${index}`} style={{height: '50px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
              {`${data.name}${index+1}`}
            </div>)
          }
        </div>
      </div>
    )
  }
}

export default LazyLoadSample;
