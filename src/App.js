import React,{useEffect, useState} from "react";
import axios from 'axios';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect( () => {
    getEvents();
    
  }, [query]);

  const updateSearch = event =>{
    setSearch(e.target.value);
    console.log(search);
  }
  
  const getSearch = event =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input onChange={updateSearch} className="search-bar" type="text" placeholder="Enter an event or date"/>
        <button className="search-btn" type="submit">Search</button>
      </form>

      <div className="events">

      </div>
    </div>
  );

}

export default App;
