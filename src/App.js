import React, {Component} from 'react';
import Bookings from './components/Bookings';
import Meals from './components/Meals';
import Error from './components/Error';

//https://s3.amazonaws.com/istreet-assets/ChBrx4MzkIPp3fO8zbHmLg/hackerh.gif

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            errorNames:[],
            validEntries:[]
        }
    }
    getSchedule(scheduleList){
        let errorHack = scheduleList.filter(x=>x.time==-1).map(x=>x.guestname);
        let validEntries = scheduleList.filter(x=>x.time!=-1);
        let finalValid=[];
        validEntries.forEach(entry => {
            let b = entry.time;
            let d1=new Date(b[0]);
            let d2 = new Date(b[1]);
            while(d2-d1>0){
                finalValid.push({'name':entry.guestname,'time':new Date(d1)});
                d1.setDate(d1.getDate()+1)
            }
            finalValid.push({'name':entry.guestname,'time':new Date(d2)})
        });
        finalValid = finalValid.sort(function (x, y) {
            return ('' + x.name).localeCompare(y.name);
        })
        finalValid = finalValid.sort((a,b)=>{
            return new Date(a.time)-new Date(b.time)
        })
        this.setState({errorNames:errorHack,validEntries:finalValid})
    }

    render() {
        return (<div className="container-fluid">
            <center>
                <h2>Hacker Hostel</h2>
            </center>
            <div className="container">
                <Bookings getDetails={this.getSchedule.bind(this)}></Bookings>
                <Error errorName={this.state.errorNames}></Error>
                <Meals validEntries={this.state.validEntries}></Meals>
            </div>
        </div>);
    }
}

export default App;