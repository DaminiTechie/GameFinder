import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import GameDetail from '../pages/GameDetail';
import Library from '../pages/Library';
import { Navbar } from 'react-bootstrap';


const AppRoutes = () => {
  return (
    <BrowserRouter>
       <Navbar />
         <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='game/:id' element={<GameDetail />} />
         <Route path='/library' element={<Library />} />
         </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;