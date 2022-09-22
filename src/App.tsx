import React from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';

import ListPoint from './pages/ListPoint';
import CreatePoint from './pages/CreatePoint';

function App() {
  return (
   <Router>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/create-point' element={<CreatePoint/>}/>
       <Route path='/create-point/:pointId' element={<CreatePoint/>}/>
       <Route path='/list-point' element={<ListPoint/>}/>
     </Routes>
   </Router>
  );
}

export default App;
