import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Route, Switch
} from "react-router-dom";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import DisplayForm from "./components/DisplayForm";
import Results from "./components/Results";
import './App.css';
//
function App() {
  return(
    <BrowserRouter>
    <div className="container">
      <Switch>
        <Route component={DisplayForm} path="/" exact={true} />
        <Route component={Results} path="/results" />
      </Switch>
    </div>
  </BrowserRouter>
  );
}
//
export default App;
