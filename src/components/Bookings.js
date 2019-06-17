import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


//1990-01-13 to 1990-01-15
// 1990-01-15 to 1990-01-01
// 1990-01-13 to 1990-03-15

class Bookings extends Component {
  constructor(props){
    super(props);
    this.guestList=[];
    this.timeList=[];
  }
  handleGuestInfo(event){
    this.guestList= event.target.value.split('\n').filter(x=>x.trim().length>0);
  }
  handleDateInfo(event) {
    this.timeList =  event.target.value.split('\n').filter(x=>x.trim().length>0);
  }
  handleSubmitClick(){
    let final={data:[]}
    let finalTimeList = this.validateStay();
    for(let i=0;i<this.guestList.length;i++){
      final.data.push({'guestname':this.guestList[i],'time':finalTimeList[i]})
    }
    this.props.getDetails(final.data)
  }
  validateStay(){
    let finalTimeList = this.timeList.map(time => {
      let timeSplit = time.split(' to ');
      if(timeSplit.length!=2){
        return -1;
      }
      let timeDiff = isNaN(new Date(timeSplit[1])-new Date(timeSplit[0]))?-1:new Date(timeSplit[1])-new Date(timeSplit[0])
      return timeDiff>=0?timeSplit:-1
    })
    return finalTimeList;
  }
    render() {
        return (
      <div className="row">
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the hacker list (one hacker per line)"
          onBlur={this.handleGuestInfo.bind(this)}
        />
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each hacker's stay (one range per line)"
          onBlur={this.handleDateInfo.bind(this)}
        />
        <Button variant="outlined" color="primary" className="block-center" 
        onClick={this.handleSubmitClick.bind(this)}>Get Meals Schedule</Button>
        </div>);
    }
}

export default Bookings;