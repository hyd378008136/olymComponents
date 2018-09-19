import React from 'react'
import Button from '../button/index'

function FloatDragComponent(WrappedComponent, option = {
  top: 5,
  right: 5,
  id: 'suspension-drag-component',
}) {
  class DragComponent extends React.Component {

    self = {
      offsetX: 0,
      offsetY: 0,
      offsetWidth: 0,
      offsetHeight: 0,
    }

    constructor(props) {
      super(props);
      this.state = {
        top: option.top || 5,
        right: option.right || 5
      }
      this.self.offsetWidth = document.body.offsetWidth;
      this.self.offsetHeight = document.body.offsetHeight;
    }

    componentDidMount() {
      const ref = this.refs[option.id];
      if (ref) {
        ref.addEventListener("dragstart", this.onDragstart, false);
        ref.addEventListener("dragend", this.onDragend, false);
      }
    }

    onDragstart = (e) => {
      this.self.offsetX = e.offsetX;
      this.self.offsetY = e.offsetY;
    }

    onDragend = (e) => {
      const ref = this.refs[option.id];
      const { top, right } = this.state;
      const { offsetX, offsetY, offsetWidth, offsetHeight } = this.self;
      console.log(ref)
      let _top = top + (e.offsetY - offsetY);
      if (_top < 0) {
        _top = 0;
      } else if (_top > (offsetHeight - ref.clientHeight)) {
        _top = offsetHeight - ref.clientHeight;
      }
      let _right = right - (e.offsetX - offsetX);
      if (_right < 0) {
        _right = 0;
      } else if (_right > (offsetWidth - ref.clientWidth)) {
        _right = offsetWidth - ref.clientWidth;
      }
      this.setState({ top: _top, right: _right })
      this.self.offsetX = 0;
      this.self.offsetY = 0;
    }

    jumpToCustomizedPage = (e) => {
      console.log(e);
      if(this.props.url) {
        window.open(this.props.url);
      }
    }

    render() {
      const { top, right } = this.state;
      return <div id={option.id} ref={option.id} draggable='true' style={{ zIndex: 100, position: 'fixed', top, right }}>
        {WrappedComponent != null ? <div style={{width: option.width || 200}}>{WrappedComponent}</div> : <Button onClick={option.onClick || this.jumpToCustomizedPage}>{option.buttonLabel || '自定义页面布局'}</Button>}
      </div>
    }
  }

  return <DragComponent />
}

export default { FloatDragComponent }
