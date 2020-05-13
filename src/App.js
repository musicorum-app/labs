import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss'
import AppNavBar from './components/AppNavBar';
import ExperimentsSection from './components/ExperimentsSection';
import ExperimentScaffold from './components/ExperimentScaffold';

import Router from "react-router-dom/BrowserRouter";
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Mainstream from './pages/Mainstream';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <AppNavBar />
            <ExperimentsSection />
          </Route>
          <Route path="/mainstream">
            <ExperimentScaffold
              name="mainstream metter"
              description={<p>
                Check if you listen to more popular or underground artists/tracks, inspired by <a href="https://mainstream.ghan.nl/">https://mainstream.ghan.nl/</a>,
                but using Spotify's popularity factor instead.
              </p>}
            >
              <Mainstream />
            </ExperimentScaffold>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
