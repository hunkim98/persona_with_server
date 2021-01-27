import React from "react";
import "./Start.css";
import "./Home.css";
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

  const nameHandler = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const nameEntered = () => {
    if (name === "") {
      alert("이름을 입력해주세요");
    } else {
      controlBool(0);
    }
  };

  const goToStart = () => {
    setStartBool([false, false, false]);
    setName("");
  };

  if (startBool[0]) {
    if (startBool[1]) {
      return <></>;
    } else
      return (
        <>
          <div className="survey_container">
            <div className="basic_container">
              <div className="name_question">
                "{name}"님의 성격 가면을 알아보러 갈까요?
              </div>
              <div className="yes_no_container">
                <Link to="/check_persona" className="yes_no_square">
                  네
                </Link>
                <Link to="/" className="yes_no_square" onClick={goToStart}>
                  아니오
                </Link>
              </div>
            </div>
            <BackButton goToBack={nameEntered} />
          </div>
        </>
      );
  } else
    return (
      <>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(props) => (
            <div style={props}>
              <div className="survey_container">
                <div className="basic_container">
                  <div className="name_question">
                    지인의 이름을 기입해주세요.
                  </div>
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
                  <div className="name_comment">
                    * 별칭을 입력하셔도 무관합니다
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
