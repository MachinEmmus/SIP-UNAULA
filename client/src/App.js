import * as React from 'react';
import MainPage from './pages/MainPage';
import Encuesta from './pages/Encuesta';
import Nabvar from './components/Nabvar';

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
            <Route index path="/" exact element={<MainPage />} />
            <Route path="/encuesta" element={<Encuesta />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;