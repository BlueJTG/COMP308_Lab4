import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import React, { useState } from "react";

function PredictionForm(props){
    const [state, submitIris] = useState({
        epochNum: "",
        learningRate: "",
        sepalLength: "",
        sepalWidth: "",
        petalLength: "",
        petalWidth: "",
        species: ""
    });
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/predictionform";

    // define 
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

    const submitForm = e =>{
        setShowLoading(true);
        e.preventDefault();
        axios
        .post(apiUrl)
        .then(state)
        setShowLoading(false);
        props.history.push({pathname: "/results", state})
        .catch(error => setShowLoading(false));
    };

    const onChange = e => {
        e.persist();
        submitIris({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div>
      <Container>
        <div className="text-center">
          <div
            style={{
              top: "3vw",
              left: "10",
              paddingLeft: "2vw",
              width: "50vw",
              height: "auto",
            }}
          >
            <h1>SPECIES PREDICTION FORM</h1>
            {showLoading && (
              <Spinner animation="border" role="status"></Spinner>
            )}
            <Form onSubmit={submitForm} action="/run" method="post">
                <Form.Group>
                <Form.Label>Epoch Number: </Form.Label> 
                <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    display: "inline-block",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step="any"
                  name="epochNum"
                  id="epochNum"
                  placeholder="i.e. 100"
                  value={state.epochNum}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group class="form-group form-inline">
              <Form.Label>Learning Rate: </Form.Label>
                <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    display: "inline-block",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step=".01"
                  name="learningRate"
                  id="learningRate"
                  min="0"
                  max="1"
                  placeholder="i.e. 0.05"
                  value={state.learningRate}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group class="form-group form-inline">
              <Form.Label>Sepal Length: </Form.Label>
                <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    display: "inline-block",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step=".1"
                  name="sepalLength"
                  id="sepalLength"
                  placeholder="i.e. 3.9"
                  value={state.sepalLength}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group class="form-group form-inline">
              <Form.Label>Sepal Width: </Form.Label>
                <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    display: "inline-block",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step=".1"
                  name="sepalWidth"
                  id="sepalWidth"
                  placeholder="i.e. 4.1"
                  value={state.sepalWidth}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group>
                  <Form.Label>Petal Length: 
                  </Form.Label>
                <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    display: "inline-block",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step=".1"
                  name="petalLength"
                  id="petalLength"
                  placeholder="i.e. 3.9"
                  value={state.petalLength}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Form.Group>
               <Form.Label>Petal Width: </Form.Label> 
               <Form.Control
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    margin: "8px 0",
                    borderRadius: "4px",
                    boxSizing: "border-box",
                  }}
                  type="number"
                  step=".1"
                  name="petalWidth"
                  id="petalWidth"
                  placeholder="i.e. 3.9"
                  value={state.petalWidth}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Button 
                style={{
                  background: "white",
                  color: "black",
                  padding: "15px 32px",
                  textAlign: "center",
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "15px",
                  fontWeight: "bold"
                }}
                className="text-center"
                variant="primary"
                type="submit">
                Predict
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      </div>
    );
}
export default PredictionForm;