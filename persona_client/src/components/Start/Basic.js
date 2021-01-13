import React from "react";
import "./Start.css";
import BackButton from "../backbutton/BackButton";
import { Link } from "react-router-dom";
import mask_pattern from "../svg/pattern(opacity).svg";
import logo from "../logo/brand(svg).svg";
import { Spring } from "react-spring/renderprops";

function Basic({ setStartBool, startBool, name, setName, changeColor }) {
  const controlBool = (index) => {
    setStartBool((
      prevState //prevState is the starBool array
    ) => prevState.map((item, idx) => (idx === index ? !item : item)));
  };
  const clickStart = () => {
    controlBool(0);
  };

  const nameHandler = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const nameEntered = () => {
    if (name === "") {
      alert("이름을 입력해주세요");
    } else {
      controlBool(1);
    }
  };

  const goToStart = () => {
    setStartBool([false, false, false]);
    setName("");
  };

  if (startBool[0]) {
    if (startBool[1]) {
      return (
        <>
          <div className="container survery_container">
            <div className="name_question">
              "{name}"님의 성격을 알아보러 갈까요?
            </div>
            <div className="yes_no_container">
              <Link to="/check_persona" className="yes_no_square">
                네
              </Link>
              <Link to="/" className="yes_no_square" onClick={goToStart}>
                아니오
              </Link>
            </div>
            <BackButton goToBack={nameEntered} />
          </div>
        </>
      );
    } else
      return (
        <>
          <div className="container survey_container">
            <div className="name_question">상대방의 이름은 어떻게 되나요?</div>
            <div className="name_input_container">
              <input
                value={name}
                onChange={nameHandler}
                className="name_input"
                type="text"
              />
              <button className="name_input_enter" onClick={nameEntered}>
                <svg
                  className="name_right"
                  xmlns="http://www.w3.org/2000/svg"
                  width="136.75"
                  height="109.89"
                  viewBox="0 0 136.75 109.89"
                >
                  <path d="M136.38,56.83a3.62,3.62,0,0,0,.17-.56,4.61,4.61,0,0,0,.17-1c0-.12,0-.24,0-.37s0-.24,0-.36a4.61,4.61,0,0,0-.17-1,3.62,3.62,0,0,0-.17-.56,2.12,2.12,0,0,0-.11-.21,3.61,3.61,0,0,0-.36-.67,0,0,0,0,0,0,0c-.06-.09-.14-.16-.2-.24a3.28,3.28,0,0,0-.91-.91,2.73,2.73,0,0,0-.25-.2l0,0h0L60.3.85A5,5,0,0,0,53,7.05L72.2,49.94H5a5,5,0,0,0,0,10H71.24l-18.33,43A5,5,0,0,0,60.3,109l74.19-49.91h0l0,0a2.78,2.78,0,0,0,.27-.21,6,6,0,0,0,.48-.4,6.4,6.4,0,0,0,.41-.5l.2-.24a0,0,0,0,0,0,0,3.61,3.61,0,0,0,.36-.67A2.12,2.12,0,0,0,136.38,56.83ZM94.08,74.26,87.65,59.94h27.71Zm21.28-24.32h-29l6.46-15.15Zm-31-20.83L79.23,41.19l-10-22.28Zm-4.92,37,6.19,13.79L68.73,91.31Z" />
                </svg>
              </button>
            </div>
            <div className="name_comment">* 별칭을 입력하셔도 무관합니다</div>
            <BackButton goToBack={clickStart} />
          </div>
        </>
      );
  } else
    return (
      <>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(props) => (
            <div style={props}>
              <div className="home_container">
                <div className="home_pattern_container">
                  <div className="home_pattern_control">
                    <div className="home_phrase1">
                      상대방의
                      <Link to="/about">
                        <img className="home_phrase_logo" src={logo} alt="" />
                      </Link>
                      는
                    </div>
                    <img className="home_pattern" src={mask_pattern} alt="" />
                  </div>
                  <div className="home_pattern_control">
                    <div className="home_phrase2">
                      무슨
                      <svg
                        className="home_phrase_mask"
                        xmlns="http://www.w3.org/2000/svg"
                        width="252"
                        height="252"
                        viewBox="0 0 252 252"
                        onClick={clickStart}
                      >
                        <circle
                          cx="126"
                          cy="126"
                          r="126"
                          fill="#3b3b3b"
                          opacity="0.94"
                        />
                        <path
                          d="M176.48,111.93a4.71,4.71,0,0,0,.09-.52,4.67,4.67,0,0,0,0-.52,3.13,3.13,0,0,0,0-.53,4.43,4.43,0,0,0-.06-.51c0-.17-.07-.34-.11-.51a4.76,4.76,0,0,0-.19-.53c0-.1,0-.2-.1-.3s-.06-.1-.09-.16a4.94,4.94,0,0,0-.3-.49c-.09-.14-.17-.28-.27-.41s-.24-.27-.36-.4a4.44,4.44,0,0,0-.38-.37,4.17,4.17,0,0,0-.4-.3l-.47-.31-.16-.1-8.2-4.22a1.81,1.81,0,0,0,0-.23V73.72a5.08,5.08,0,0,0-.2-1.36l8.47-4.58a5.4,5.4,0,1,0-5.14-9.49L126,81.37,83.28,59a5.4,5.4,0,1,0-5,9.56l8.29,4.34a5.56,5.56,0,0,0-.09.82v27.8a5.43,5.43,0,0,0,.09.81l-8.32,4.42a5.4,5.4,0,0,0,2.54,10.16,5.32,5.32,0,0,0,2.52-.63L126,93.57l32.87,16.93-35.17,16.19a5.4,5.4,0,0,0-3.14,4.9v22.48a5.4,5.4,0,0,0,10.8,0v-19l42.09-19.38.11-.06a5.75,5.75,0,0,0,.71-.42l.18-.13a5.86,5.86,0,0,0,.7-.62,1.71,1.71,0,0,1,.11-.14,5.65,5.65,0,0,0,.45-.61,1.28,1.28,0,0,0,.15-.25l.13-.2c0-.09.07-.19.11-.28a5,5,0,0,0,.21-.54C176.4,112.26,176.44,112.1,176.48,111.93ZM154.73,96.2l-17.16-8.84,17.16-9.27ZM97.27,78.52l17.17,9L97.27,96.64Z"
                          fill="#fff"
                        />
                        <path
                          d="M126,165.63A14.37,14.37,0,1,0,140.37,180,14.38,14.38,0,0,0,126,165.63Zm0,17.94a3.57,3.57,0,1,1,3.57-3.57A3.57,3.57,0,0,1,126,183.57Z"
                          fill="#fff"
                        />
                      </svg>
                      일까?
                    </div>
                    <img className="home_pattern" src={mask_pattern} alt="" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Spring>
      </>
    );
}

export default Basic;
