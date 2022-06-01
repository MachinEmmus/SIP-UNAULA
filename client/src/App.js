import * as React from 'react';
import DashBoard from './pages/DashBoard';
import Encuesta from './pages/Encuesta';
import Nabvar from './components/Nabvar';
import Login from './pages/Login';
import Register from './pages/Register';

import { Container } from '@mui/material';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nabvar />
        <Container>
          <Routes>
            <Route index path="/" exact element={<DashBoard />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/encuesta" exact element={<Encuesta />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;