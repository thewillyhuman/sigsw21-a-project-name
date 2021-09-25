import logo from './logo.svg';
import './App.css';
import Map from './map/Map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. We're live.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Map route="camino_frances" route_style="cs.frances" />
      </header>
    </div>
  );
}

export default App;
