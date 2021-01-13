import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Basic from "./components/Start/Basic";
import CheckPersona from "./components/Check_persona/check_persona";
import Result from "./components/Result/Result";
import Share from "./components/Share/Share";

function App() {
  const [personality, setPersonality] = useState(5);
  const [startBool, setStartBool] = useState([false, false, false]);
  const [name, setName] = useState("김동훈");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [color, changeColor] = useState("#ffffff");

  return (
    <div
      style={{
        backgroundColor: color,
        transition: "all .5s ease",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
      id="main"
    >
      <Navbar
        setStartBool={setStartBool}
        setName={setName}
        setQuestionNumber={setQuestionNumber}
        changeColor={changeColor}
      />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Basic
              {...props}
              setStartBool={setStartBool}
              startBool={startBool}
              name={name}
              setName={setName}
            />
          )}
        />
        <Route
          path="/check_persona"
          render={(props) => (
            <CheckPersona
              {...props}
              setPersonality={setPersonality}
              name={name}
              personality={personality}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
              changeColor={changeColor}
            />
          )}
        />
        <Route
          path="/result"
          render={(props) => (
            <Result
              {...props}
              personality={personality}
              changeColor={changeColor}
              setPersonality={setPersonality}
              name={name}
            />
          )}
        />
        <Route path="/share" render={(props) => <Share />} />
      </Switch>
    </div>
  );
}

export default App;
