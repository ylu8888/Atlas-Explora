import React from 'react';
import './App.css';

const Events = (props) =>{
    
    return(
        
        <div className="event">
            <ul className="list">
                {props.events.map((event, index) =>(
                    <li key={index} className="listitem">
                    <p className="dates">Date: {event.month}/{event.day}/{event.year}</p>
                     {event.event}
                    </li>
                ))}
            </ul>
        </div>
        
    );
};

export default Events;