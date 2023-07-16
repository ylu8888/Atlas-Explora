import React from 'react';
import './App.css';

const Events = (props) =>{
    
    return(
        
        <div className="event">
            <ul className="list">
                {props.events.map((event, index) => {

                let year;
                if (event.year < 0) {
                    year = Math.abs(event.year) + ' BC';

                } 
                else {
                    year = event.year;

                }

                const formattedDate = `${event.month}/${event.day}/${year}`;

                return (
                    <li key={index} className="listitem">
                    <p className="dates">Date: {formattedDate}</p>
                    {event.event}

                    </li>
                );
                })}
            </ul>
    </div>
        
    );
};

export default Events;