import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss'
import AppNavBar from './components/AppNavBar';
import ExperimentsSection from './components/ExperimentsSection';
import BrowserRouter from "react-router-dom/BrowserRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavBar />
        <ExperimentsSection />
      </BrowserRouter>
    </div>
  );
}

export default App;
