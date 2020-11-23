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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                in culpa qui officia deserunt mollit anim id est laborum.
              </p>
        </div>
      </div>
  );
}

export default App;
