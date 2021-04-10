import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Button, ListGroupItem, Spinner} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './styles.css';

function App(props){
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/run";
  const dataFrom = {
    learningRate: parseFloat(props.location.state.learningRate),
    epochNum: parseInt(props.location.state.epochNum),
    sepal_length: parseFloat(props.location.state.sepal_length),
    sepal_width: parseFloat(props.location.state.sepal_width),
    petal_length: parseFloat(props.location.state.petal_length),
    petal_width: parseFloat(props.location.state.petal_width),
    species: (props.location.state.species),
  };
  const checkGuess = (resultData, userGuess) => {
    let val1 = resultData[0];
    let val2 = resultData[1];
    let val3 = resultData[2];
    let final = Math.max(val1, Math.max(val2, val3));
    let name = "";

    if (final == val1) {
        name = "Setosa";
    } else if (final == val2) {
        name = "Virginica";
    } else if (final == val3) {
        name = "Versicolor";
    }
    dataFrom({species: name});

    // return message according to the guess
    if (userGuess.toUpperCase() === name.toUpperCase()) {
        return `Your guess ${name} is same as mine!`;
    } else {
        return (
            `You guessed ${userGuess[0].toUpperCase() + userGuess.slice(1)}` +
            `, but I think it's ${name}. You should study more!`
        );
    }
  }

  //runs once after the first rendering of page
  useEffect(() => {
    
    const fetchData = async () => {
    axios
    .post(apiUrl, dataFrom)
    .then(result => {
      console.log('result.data:' , result.data)
      setData(result.data)
      setShowLoading(false)
    }).catch((error) => {
      console.log('error in fetchData:', error)
    });
  };
  fetchData();
}, []);

return(
  <div>
    { showLoading === false
    ? <div>
        {showLoading && <Spinner animation="border" role="status">
          <span classname="sr-only">Loading...</span>
          </Spinner>}
          
          <h1>Prediction Results</h1>
          <br></br>
          <h2>Results: {dataFrom.species}</h2>
          <table className="Results-table">
          <thead>
            <tr>
              <th>Learning Rate</th>
              <th>Epoch Number</th>
              <th>Setosa</th>
              <th>Virginica</th>
              <th>Versicolor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="App-td">
                {dataFrom.learningRate}
              </td>
              <td className="App-td">
              {dataFrom.epochNum}
              </td>
              <td className="App-td">
                {data.row1.map((value, index) =>(
                    <p key={index}>{value}</p>
                ))}
              </td>
              <td className="App-td">
                {data.row2.map((value, index) =>(
                    <p key={index}>{value}</p>
                ))}
              </td>
              <td className="App-td">
                {data.row3.map((value, index) =>(
                    <p key={index}>{value}</p>
                ))}
              </td>
            </tr>
          </tbody>
          </table>
          <br></br>
          
            <NavLink
            style={{ textDecoration: "none" }}
            to="/"
            activeClassName="active"
            >BACK
            </NavLink>
  </div>
  :
  <div>
    {showLoading && <Spinner animation="border" role="status">
      <span className="sr-only">Waiting for results...</span>
      </Spinner>}
  </div>

}
</div>
);
}

export default App;
