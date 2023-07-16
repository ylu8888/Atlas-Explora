import React,{useEffect, useState} from "react";
import axios from 'axios';
import Events from './Events';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Julius Caesar");

  useEffect( () => {
    getEvents();
    
  }, [query]);


  const getEvents = async () =>{
    try {

      let apiUrl = '';
      let intQuery = 0;
      const isDate = query.includes('/'); //if query has forward slash, its a formatted date

     if(isDate){ 
        const parts = query.replace(/\s/g, "").split("/"); //remove whitespace and other chars, split string between commas
        const dateArray = parts.map(part => parseInt(part)); //each part is mapped onto date array for ex [ 3, 15, -44]

        console.log(dateArray);
        apiUrl = `https://api.api-ninjas.com/v1/historicalevents?month=${dateArray[0]}&day=${dateArray[1]}&year=${dateArray[2]}`;
       
      }
      else if(isNaN(query)) { //if search input is text/not a number
        apiUrl = `https://api.api-ninjas.com/v1/historicalevents?text=${query}`;
      }
       else { //not a formatted date, but just Either year or month
        intQuery = parseInt(query);

        if(intQuery > 999 ||  intQuery < 0){ //this is a year
          apiUrl = `https://api.api-ninjas.com/v1/historicalevents?year=${query}`;
        }
        else{
          apiUrl = `https://api.api-ninjas.com/v1/historicalevents?month=${query}`;
        }
        
      }

      const response = await axios.get(
        apiUrl, {
        headers: { 'X-Api-Key': 'g2Zla0EDHh9KPyhxlzKFJw==wDSqVy3Rs7hSqEdb'},
      });

      const data = response.data;
      //console.log(data);
      setEvents(data);
      
    } catch (error) {
      console.error('Theres an error: ', error);
    }
  }

  const updateSearch = (e) =>{
    setSearch(e.target.value);
    //console.log(search);

  }
  
  const getSearch = (e) =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');

  }

  return(

    <div className="App">

      <form className="search-form" onSubmit={getSearch}>
        <input value={search} onChange={updateSearch} className="search-bar" type="text" placeholder="Enter an event or date"/>
        <button className="search-btn" type="submit">Search</button>

      </form>

      <div className="events"> 
          <Events
          key={events}
          events={events}
         />
       
      </div>

    </div>

  );

}

export default App;
