import React, { Component } from "react";
import { Calendar } from 'olym';

class CalendarSample extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  };

  render () {
    return (
      <div style={{width: '500px', backgroundColor: 'white'}}>
        <Calendar
          fullscreen={false}
        />
      </div>
    );
  }
}

export default CalendarSample;

