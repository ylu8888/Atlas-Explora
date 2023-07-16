import React,{useEffect, useState} from "react";
import axios from 'axios';
import Events from './Events';
import './App.css';

const App = () => {

  const API_KEY = 'g2Zla0EDHh9KPyhxlzKFJw==wDSqVy3Rs7hSqEdb';

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect( () => {
    getEvents();
    
  }, [query]);


  const getEvents = async () =>{
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/historicalevents?text=${query}`, {
        headers: { 'X-Api-Key': `${API_KEY}` },
      });
      const data = response.data;
      console.log(data);
      setEvents(data);
      
    } catch (error) {
      console.error('Theres an error: ', error);
    }
  }

  const updateSearch = (e) =>{
    setSearch(e.target.value);
    console.log(search);
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
