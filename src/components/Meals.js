import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const Meals = ((props) => {
    return (props.validEntries.map(entry=>
    <div key={entry.name+''+entry.time} className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
            <ol id="list">
            <div>
                        <li className="morning">Breakfast for {entry.name} on {getFormattedDate(entry.time)}</li>
                        <li className="afternoon">Lunch for {entry.name} on {getFormattedDate(entry.time)}</li>
                        <li className="night">Dinner for {entry.name} on {getFormattedDate(entry.time)}</li>
                    </div>
            </ol>
        </div>));
});
function getFormattedDate(d){
    d = new Date(d);
    let y = d.getFullYear();
    let m = d.getMonth()+1 ;
    let day = d.getDate() ;
    return `${y}-${m}-${day}`;
}
export default Meals;
