import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Coleta from './pages/Coleta';


function App() {
  return (
   <Router>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/create-point' element={<CreatePoint/>}/>
       <Route path='/coleta' element={<Coleta/>}/>
     </Routes>
   </Router>
  );
}

export default App;
