import React from 'react';
import './App.css';
import MenuBar from './components/MenuBar'
import Tracker from './components/Tracker'

function App() {
  return ( 
      <div className="App">  
          <div className="Background">
          <header className="App-header">
            <h1>
              COVID News & Data
            </h1>
            <MenuBar />
          </header> 
            <h2 id="cases">
              COVID Case Tracker
            </h2>
            <Tracker />  
            <a
              className="App-link"
              id= "news"
              href="https://www.nytimes.com/2020/09/21/world/covid-19-coronavirus.html"
              target="_blank"
              rel="noopener noreferrer"
            >
            COVID News
            </a>
              <p id="abt">
                User Website for emotion-ai.
              </p>
        </div>
      </div>
  );
}

export default App;
