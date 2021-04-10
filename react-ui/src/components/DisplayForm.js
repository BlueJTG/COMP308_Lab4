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
        sepal_length: "",
        sepal_width: "",
        petal_length: "",
        petal_width: "",
        species: ""
    });
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/results";

    
    const submitForm = e =>{
        setShowLoading(true);
        e.preventDefault();
        axios
        .post(apiUrl)
        .then(state)
        setShowLoading(false);
        props.history.push({pathname: "/results", state})
        ;
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
            }}>
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
                    borderRadius: "2px",
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
                  name="sepal_length"
                  id="sepal_length"
                  placeholder="i.e. 3.5"
                  value={state.sepal_length}
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
                  name="sepal_width"
                  id="sepal_width"
                  placeholder="i.e. 4.1"
                  value={state.sepal_width}
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
                  name="petal_length"
                  id="petal_length"
                  placeholder="i.e. 3.9"
                  value={state.petal_length}
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
                  name="petal_width"
                  id="petal_width"
                  placeholder="i.e. 2.8"
                  value={state.petal_width}
                  onChange={onChange}
                  required
                />
              </Form.Group>
              <br></br>
              <Button onClick={submitForm}
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