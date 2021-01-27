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
          <div className="survey_container">
            <div className="basic_container">
              <div className="name_question">
                상대방의 이름은 어떻게 되나요?
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
              <div className="name_comment">* 별칭을 입력하셔도 무관합니다</div>
            </div>
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
                      <div className="comment1">상대방의</div>
                      <Link to="/about" className="home_phrase_click">
                        <img className="home_phrase_logo" src={logo} alt="" />
                      </Link>
                      <div className="comment2">는</div>
                    </div>
                    <img className="home_pattern" src={mask_pattern} alt="" />
                  </div>
                  <div className="home_pattern_control">
                    <div className="home_phrase2">
                      <div className="comment">무슨</div>
                      <svg
                        className="home_phrase_mask"
                        xmlns="http://www.w3.org/2000/svg"
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
                          d="M195.52,167.2a3.8,3.8,0,0,0-.06-.59c0-.18-.07-.35-.11-.52s-.1-.34-.16-.51a5.45,5.45,0,0,0-.25-.55c-.05-.09-.07-.19-.12-.28l-14.46-25,14.46-25c.05-.09.07-.19.12-.28a5.45,5.45,0,0,0,.25-.55c.06-.16.11-.33.16-.5s.08-.35.11-.52a4.07,4.07,0,0,0,.06-.6,3,3,0,0,0,0-.31c0-.06,0-.12,0-.18s0-.39-.06-.59,0-.33-.09-.5a5,5,0,0,0-.16-.51,4.24,4.24,0,0,0-.18-.5c-.08-.16-.17-.31-.25-.46a4.92,4.92,0,0,0-.28-.45,3.36,3.36,0,0,0-.34-.41,4.64,4.64,0,0,0-.36-.4l-.39-.32c-.16-.12-.32-.24-.49-.35l-.14-.1c-.1-.06-.19-.08-.29-.13a4.45,4.45,0,0,0-.54-.25l-.52-.16-.5-.11a4.48,4.48,0,0,0-.63-.06l-.28,0H161.12l-9.51-16.49h10.16a5.52,5.52,0,1,0,0-11H145.23l-14.45-25c-.05-.1-.13-.17-.18-.26a5.34,5.34,0,0,0-.35-.48q-.18-.21-.36-.39a4.38,4.38,0,0,0-.39-.36A5.74,5.74,0,0,0,129,52c-.08-.05-.15-.12-.24-.17l-.16-.08-.55-.25-.47-.17c-.17,0-.35-.08-.53-.12l-.52-.09h-1.06l-.52.09a4.54,4.54,0,0,0-.53.12l-.46.17a5.69,5.69,0,0,0-.56.26l-.16.07L123,52a5.74,5.74,0,0,0-.5.36,4.26,4.26,0,0,0-.38.35c-.13.13-.25.26-.37.4s-.24.32-.35.48-.12.16-.18.26l-14.45,25H77.85l-.29,0a4.36,4.36,0,0,0-.62.07l-.5.11-.52.16a4.45,4.45,0,0,0-.54.25l-.29.12-.14.11c-.17.11-.33.23-.49.35s-.26.2-.39.32-.24.26-.36.39-.24.27-.34.41-.19.3-.28.46-.17.3-.25.46a4.24,4.24,0,0,0-.18.5,5,5,0,0,0-.16.51c0,.16-.06.33-.09.5s0,.39-.06.59,0,.12,0,.18a3,3,0,0,0,0,.31,4.07,4.07,0,0,0,.06.6c0,.17.07.34.11.52s.1.33.16.5a5.45,5.45,0,0,0,.25.55c0,.09.07.19.12.28l14.46,25L78,128.72,72.93,120a5.52,5.52,0,0,0-9.56,5.51l8.25,14.29-14.44,25c0,.09-.07.19-.12.28a5.45,5.45,0,0,0-.25.55c-.06.17-.11.34-.16.51s-.08.34-.11.52a3.8,3.8,0,0,0-.06.59c0,.11,0,.2,0,.31v.08s0,.1,0,.16v.15c0,.16,0,.31.06.46s0,.33.09.5a5,5,0,0,0,.16.51,4.24,4.24,0,0,0,.18.5c.08.16.17.31.25.46s.18.31.28.45a3.36,3.36,0,0,0,.34.41c.12.14.23.27.36.4l.39.32c.16.12.32.24.49.35l.14.1c.17.1.35.18.52.26l.12.06a6.08,6.08,0,0,0,.92.28l.21,0a5.54,5.54,0,0,0,1,.1H90.88l14.45,25c.1.17.21.32.31.47l.09.13a5.44,5.44,0,0,0,.65.7l.16.14a5.89,5.89,0,0,0,.78.56l0,0h0c.16.09.33.16.49.24l.18.08.21.08a5.5,5.5,0,0,0,1.87.33h0a5.39,5.39,0,0,0,1.92-.36l.15,0,.21-.1c.15-.07.31-.14.45-.22h0l0,0a4.74,4.74,0,0,0,.77-.56l.17-.14a7.18,7.18,0,0,0,.65-.7l.09-.14c.11-.15.21-.3.31-.46L129.39,173h19l-5.08,8.8a5.52,5.52,0,1,0,9.55,5.52L161.12,173H190a5.54,5.54,0,0,0,1-.1l.21-.05a4.42,4.42,0,0,0,.92-.28l.12-.06.52-.25.14-.11a4,4,0,0,0,.49-.35c.13-.1.26-.2.39-.32s.24-.26.36-.39.24-.27.34-.41.19-.3.28-.46.17-.3.25-.46a4.24,4.24,0,0,0,.18-.5,5,5,0,0,0,.16-.51c0-.16.06-.33.09-.5s.05-.39.06-.59,0-.12,0-.18S195.53,167.31,195.52,167.2Zm-15-49.77L174,128.68l-6.5-11.25ZM126,67.63l6.49,11.25h-13ZM93.9,101.16,87.41,89.91h13Zm16.21,83.19-6.49-11.25h13ZM71.56,162,78,150.82,84.46,162Zm65-12.41a5.52,5.52,0,0,0-7.53,2L123,162H97.2L84.36,139.75l9.54-16.53,2.86,4.95a5.51,5.51,0,1,0,9.55-5.51l-6-10.47,3.08-5.33,9.79-17h25.72l9.52,16.49h-5.71a5.52,5.52,0,1,0,0,11h12.08l12.87,22.28L154.75,162h-19l2.81-4.87A5.52,5.52,0,0,0,136.55,149.58ZM174,150.75,180.48,162h-13Z"
                          fill="#fff"
                        />
                      </svg>
                      <div className="comment">일까?</div>
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
