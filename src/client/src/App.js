import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/LandingPage'
import PlanificatePage from './components/PlanificatePage'
import './App.css';

function App() {
  return (
    <Router>
     
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
         
          <Route path="/planificate">
            <PlanificatePage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
