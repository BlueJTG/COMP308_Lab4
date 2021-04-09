import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
//
function PredictionResults(props){
    const [results, setResults] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/";
};
export default PredictionResults;