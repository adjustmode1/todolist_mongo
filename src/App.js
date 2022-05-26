import './App.css';
import {Button, Container, FormControl, InputGroup, Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from './utils/axios';
import { BrowserRouter, Outlet, Route, Router , Routes } from 'react-router-dom';
import Index from './pages/viewtask';
import ViewTask from './pages/viewtask';
import EditTask from './pages/edittask';
function App() {
  return (
    <BrowserRouter>
        <Routes path="/">
          <Route path="" element={<ViewTask/>}/>
          <Route path="edit/:id" element={<EditTask/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
