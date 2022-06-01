import React from 'react';
import './App.css';

import MainPage from './pages/MainPage';
import Navigation from './components/Navigation';
import Encuesta from './pages/Encuesta';
/*
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
*/



const App = () => {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
};

/*
function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={MainPage} />
      <Route path="/Encuesta" exact component={Encuesta} />
    </Router>
  );
};
*/

/*
const App = () => {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component={MainPage} />
      <Route path="/Encuesta" exact component={Encuesta} />
    </Router>
  );
};
*/
export default App;