import React from 'react';
import './App.css';
import style from './event.module.css';


//The App components state data gets passed to Events component, which takes in set of input called props
const Events = (props) =>{
    return(
        <div className={style.event}>
            <ul className={style.list}> 
                {props.events.map((event, index) => { //use index as key since list items don't have unique identifiers

                let year = "";
                let month = "";
                let day = "";

                if (event.year < 0) { //negative years means BC in the API
                    year = Math.abs(event.year) + ' BC'; 

                } 
                else {
                    year = event.year + ' AD';

                }

                //change month ints to strings
                if (event.month == 1){
                    month = 'January';
                }
                else if(event.month == 2){
                    month = 'February';
                }
                else if(event.month == 3){
                    month = 'March';
                }
                else if(event.month == 4){
                    month = 'April';
                }
                else if(event.month == 5){
                    month = 'May';
                }
                else if(event.month == 6){
                    month = 'June';
                }
                else if(event.month == 7){
                    month = 'July';
                }
                else if(event.month == 8){
                    month = 'August';
                }
                else if(event.month == 9){
                    month = 'September';
                }
                else if(event.month == 10){
                    month = 'October';
                }
                else if(event.month == 11){
                    month = 'November';
                }
                else if(event.month == 12){
                    month = 'December';
                }

                //change 03 to just 3, 08 to just 8, etc
                if(event.day == 1){
                    day = '1';
                }
                else if(event.day == 2){
                    day = '2';
                }
                else if(event.day == 3){
                    day = '3';
                }
                else if(event.day == 4){
                    day = '4';
                }
                else if(event.day == 5){
                    day = '5';
                }
                else if(event.day == 6){
                    day = '6';
                }
                else if(event.day == 7){
                    day = '7';
                }
                else if(event.day == 8){
                    day = '8';
                }
                else if(event.day == 9){
                    day = '9';
                }
                else{
                    day = event.day;
                }

                const formattedDate = `${month} ${day}, ${year}`;

                return (
                    <li key={index} className={style.listitem}>
                    <p className={style.dates}>{formattedDate}</p>
                    {event.event}

                    </li>
                );
                })}

            </ul>
    </div>
        
    );
};

export default Events;