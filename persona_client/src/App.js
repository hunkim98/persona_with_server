import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Basic from "./components/Start/Basic";
import Result from "./components/Result/Result";
import UserData from "./components/UserData/UserData";
import Share from "./components/Share/Share";
import Home from "./components/Start/Home";
import About from "./components/about/About";
import Masks from "./components/masks/Masks";
import Explanation from "./components/masks/Explanation";
import ReactGA from "react-ga";
import RouteChangeTracker from "./RouteChangeTracker";

function App() {
  const [startBool, setStartBool] = useState([false, false]);
  const [name, setName] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [color, changeColor] = useState("#ffffff");
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-190746001-1");
    const path = location.pathname + location.search;
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
    //to report page view
  }, []);

  return (
    <div
      style={{
        backgroundColor: color,
        transition: "all .5s ease",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
      id="main"
    >
      <RouteChangeTracker />
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
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
              changeColor={changeColor}
            />
          )}
        />
        <Route path="/home" render={(props) => <Home />} />
        <Route
          path="/about"
          render={(props) => <About {...props} changeColor={changeColor} />}
        />
        <Route
          path="/masks"
          exact
          render={(props) => <Masks {...props} changeColor={changeColor} />}
        />
        <Route
          path="/masks/:id"
          render={(props) => (
            <Explanation {...props} changeColor={changeColor} />
          )}
        />
        <Route
          path="/result/:id"
          render={(props) => <Result {...props} changeColor={changeColor} />}
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
