import React,{useEffect, useState} from "react";
import axios from 'axios';
import Events from './Events';
import Header from './Header';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState(""); //state to store user input from search bar, initially empty
  const [query, setQuery] = useState(""); //state to store the final input when onSearch, could set default is Caesar

  useEffect( () => { //[query] at the end of effect hooks are dependency arrays, that the effect depends on
    getEvents(); // useEffect hook is activated to retrieve data from API when query state value changes
    
  }, [query]);

 
  /*async is important for handling tasks that take time to complete such as retrieving API Data, it allows other parts of code to 
  continue executing while async task is being processed, this reduces overall processing time and enables smooth data retrieval */
  const getEvents = async () =>{
    try {

      let apiUrl = ''; //api url depends on search input, if its an event, year, month, or formatted date
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

        if(intQuery > 999 ||  intQuery < 0){ //negative numbers means B.C. and numbers > 999 can only be a year, not days or months
          apiUrl = `https://api.api-ninjas.com/v1/historicalevents?year=${query}`;
        }
        else{ //otherwise its just the month
          apiUrl = `https://api.api-ninjas.com/v1/historicalevents?month=${query}`;
        }
        
      }

      //  'async' allows use of 'await' keyword, which pauses execution of function until promise is resolved
      // normally use 'fetch' but its is restricted by this API, 
      const response = await axios.get(  //retrieves history from API based on query state. Axios sends a GET request to API endpoint 
        //would use AJAX calls for vanilla JS but in React use Axios to make API call
        apiUrl, {   //'await' promise in this case: getting response from API, NOTE*: doesn't pause the entire JSX code, only this function
        headers: { 'X-Api-Key': 'g2Zla0EDHh9KPyhxlzKFJw==wDSqVy3Rs7hSqEdb'},
      });

      const data = await response.data;  //if using fetch api we would convert response to json format
      console.log(data);
      setEvents(data); //Retrieved history data is stored in events state
      
    } catch (error) {
      console.error('Theres an error: ', error); 
    }
  }

   //updates the search with onChange event, which stores value of the user's input field
  const updateSearch = (e) =>{
    setSearch(e.target.value);
    //console.log(search);

  }
  
  //function triggers when user clicks on search, which updates query
  const getSearch = (e) =>{
    e.preventDefault(); //prevents default form submission which causes page to reload
    setQuery(search);
    setSearch(''); //reset the search after

  }

  return(

    <div className="App">

      <Header/>

      <form className="search-form" onSubmit={getSearch}>
        <input value={search} onChange={updateSearch} className="search-bar" type="text" placeholder="Ex: Julius Caesar, Battle of Waterloo, 03/15/-44"/>
        <button className="search-btn" type="submit">Search</button>

      </form>

      <div className="events"> 
          <Events
          key={events} //key prop for proper rendering and prevent browser compile error
          events={events}
         />
       
      </div>

    </div>

  );

}

export default App;
