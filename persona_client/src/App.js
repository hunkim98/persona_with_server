import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Basic from "./components/Start/Basic";
import CheckPersona from "./components/Check_persona/check_persona";
import Result from "./components/Result/Result";
import UserData from "./components/UserData/UserData";
import Share from "./components/Share/Share";
import Home from "./components/Start/Home";

function App() {
  const [startBool, setStartBool] = useState([false, false, false]);
  const [name, setName] = useState("김동훈");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [color, changeColor] = useState("#ffffff");
  const [shareID, setShareID] = useState("null");

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
        <Route path="/home" render={(props) => <Home />} />
        <Route
          path="/check_persona"
          render={(props) => (
            <CheckPersona
              {...props}
              name={name}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
              changeColor={changeColor}
              shareID={shareID}
              setShareID={setShareID}
            />
          )}
        />
        <Route
          path="/result/:id"
          render={(props) => (
            <Result
              {...props}
              changeColor={changeColor}
              setShareID={setShareID}
              shareID={shareID}
            />
          )}
        />
        <Route path="/data" render={(props) => <UserData />} />
        <Route
          path="/share/:id"
          render={(props) => <Share {...props} changeColor={changeColor} />}
        />
      </Switch>
    </div>
  );
}

export default App;
