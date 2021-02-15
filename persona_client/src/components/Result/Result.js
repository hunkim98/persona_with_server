import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mask_pattern_white from "../svg/mask_pattern_white.svg";
import "./Result.css";
import { show_mask } from "./mask_result";
import { useMediaQuery } from "react-responsive";
import { show_mask_name, show_basic_info, show_get_along } from "./mask_info";
import { show_good_bad } from "./mask_good_bad";
import axios from "axios";
import copy_link_button from "../share_img/copy_link.png";
import kakao_button from "../share_img/kakao.png";
import open_method from "../share_img/open_method.png";
import HideShow from "../HideShow/HideShow";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Spring } from "react-spring/renderprops";
import { useParams } from "react-router-dom";

function Result({ changeColor }) {
  let { id } = useParams();
  const [personality, setPersonality] = useState(1);
  const [shareID, setShareID] = useState("");
  //do not use usestate(0). it does not work
  const [name, setName] = useState("NONE");
  useEffect(() => {
    changeColor("#76729F");
    window.scrollTo(0, 0);
    if (!window.Kakao.isInitialized()) {
      console.log("initialized kakao");
      //initialize kakaotalk only once
      window.Kakao.init("dfb19a99996885d213dd7631a295b474");
    } else {
      console.log("kakao is already initialized");
    }
    setShareID(id);
    axios({
      method: "POST",
      url: "/shareData",
      data: {
        user_id: id,
      },
    })
      .then((res) => {
        if (res.data.status !== "false") {
          console.log(res.data);
          console.log(res.data.name);
          setName(res.data.name);
          setPersonality(res.data.personality);
        } else {
          console.log(res.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const baseURL = "http://localhost:3000/";

  const { ref, isComponentVisible, setIsComponentVisible } = HideShow(false);

  const isDesktopOrMobile = useMediaQuery({
    query: "(max-width:1280px)",
  });

  const share_kakao_url = () => {
    let url = "https://hunkim98.github.io/persona/imgUrl/";
    url = url + personality + ".png";
    console.log(url);
    return url;
  };

  const kakao_share = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "상대방이 나에게서 이런 성격의 가면이 있다고 보고 있어요!",
        description: "#성격심리 #에니어그램 #성격가면",
        imageUrl: share_kakao_url(),
        link: {
          mobileWebUrl: baseURL + "share/" + shareID,
          webUrl: baseURL + "share/" + shareID,
        },
      },
      buttons: [
        {
          title: "나도 상대방 가면 알아보러 가기!",
          link: {
            mobileWebUrl: baseURL,
            webUrl: baseURL,
          },
        },
      ],
    });
  };

  const open_methods = () => {
    setIsComponentVisible(true);
  };

  return (
    <>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <div style={props}>
            <div className="result_container">
              <div className="result_pattern_container">
                <div className="mask_line"></div>
                <div className="result_comment comment_left">
                  상대방은 당신에게
                </div>
                <div className="result_pattern_control1">
                  <div className="mask_result_container">
                    <img
                      className="mask_circle"
                      src={show_mask(personality)}
                      alt=""
                    />
                  </div>
                  <img
                    className="result_pattern"
                    src={mask_pattern_white}
                    alt="pattern_white"
                  />
                </div>
                {!isDesktopOrMobile ? (
                  <div className="result_pattern_control2">
                    <img
                      className="result_pattern"
                      src={mask_pattern_white}
                      alt="pattern_white"
                    />
                  </div>
                ) : null}
                <div className="result_comment comment_right">
                  을 보이고 있습니다!
                </div>
                <div className="mask_line"></div>
              </div>
              <div className="result_mask_information">
                <div className="result_acquaintance_name">{name}님의 가면:</div>
                <div className="result_personality">
                  "{show_mask_name(personality)}" 가면
                </div>
              </div>
              <div className="result_basic_info_container">
                <div className="result_basic_information">
                  {show_basic_info(personality)}
                </div>
              </div>
              <div className="result_divide">
                <div className="line"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  opacity="20%"
                  viewBox="0 0 93.8 126.67"
                >
                  <path d="M93.67,50.3c0-.16.06-.32.08-.48a3.91,3.91,0,0,0,0-.49,2.57,2.57,0,0,0,0-.48,3.93,3.93,0,0,0-.06-.48c0-.16-.06-.31-.1-.47s-.11-.33-.17-.49,0-.19-.09-.28L93.26,47a4.25,4.25,0,0,0-.27-.46c-.08-.13-.17-.26-.26-.38a3.73,3.73,0,0,0-.32-.36,3,3,0,0,0-.36-.35,3.07,3.07,0,0,0-.36-.27,4.53,4.53,0,0,0-.46-.3l-.14-.09L83.5,40.87c0-.07,0-.14,0-.22V14.9a4.73,4.73,0,0,0-.18-1.26L91.18,9.4A5,5,0,0,0,86.43.6L46.87,22,7.32,1.26a5,5,0,0,0-4.64,8.86l7.68,4a4.77,4.77,0,0,0-.07.76V40.65a4.54,4.54,0,0,0,.07.75L2.65,45.5a5,5,0,1,0,4.7,8.83l39.59-21L77.39,49,44.81,64a5,5,0,0,0-2.91,4.54V89.34a5,5,0,0,0,10,0V71.71l39-17.94a.6.6,0,0,1,.11-.06,5.32,5.32,0,0,0,.65-.39l.17-.12a4.43,4.43,0,0,0,.65-.58l.1-.12a4.73,4.73,0,0,0,.43-.57l.13-.23.12-.19c0-.08.06-.17.1-.26a4.19,4.19,0,0,0,.2-.49C93.6,50.61,93.63,50.45,93.67,50.3ZM73.52,35.73l-15.9-8.19L73.52,19ZM20.29,19.35l15.9,8.33-15.9,8.45Z" />
                  <path d="M46.9,100.05a13.31,13.31,0,1,0,13.31,13.31A13.32,13.32,0,0,0,46.9,100.05Zm0,16.62a3.31,3.31,0,1,1,3.31-3.31A3.31,3.31,0,0,1,46.9,116.67Z" />
                </svg>
                <div className="line"></div>
              </div>

              <div className="result_additional_info_container">
                <div className="good_and_bad">
                  <div className="title">[해당 가면의 장점/단점]</div>
                  <div className="info">
                    <div className="good_info">
                      <div className="small_title">장점</div>
                      <ul>{show_good_bad(personality, 0)}</ul>
                    </div>
                    <div className="bad_info">
                      <div className="small_title">단점</div>
                      <ul>{show_good_bad(personality, 1)}</ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="result_divide">
                <div className="line white_line"></div>
                <svg
                  fill="white"
                  opacity="40%"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120.35 120.35"
                >
                  <path d="M118.88,44.61,75.74,1.46a5,5,0,0,0-7.07,0L3.86,66.28a1.78,1.78,0,0,0-.22.26,3.31,3.31,0,0,0-.25.3,4.53,4.53,0,0,0-.3.46c-.07.12-.14.23-.2.35a4.65,4.65,0,0,0-.2.52c0,.12-.09.24-.13.37s-.08.42-.11.64,0,.17-.05.27a.43.43,0,0,1,0,0,.07.07,0,0,0,0,0L0,115.08a5,5,0,0,0,5,5.27h.26L50.79,118h.11a1.51,1.51,0,0,0,.28,0,3.22,3.22,0,0,0,.62-.11,2.55,2.55,0,0,0,.39-.13l.5-.19.38-.22a4.94,4.94,0,0,0,.42-.27l.34-.28c.08-.07.17-.13.24-.2l64.81-64.81A5,5,0,0,0,118.88,44.61ZM72.2,12.07l36.08,36.07-3.63,3.63L68.58,15.7Zm13.65,58.5L52.25,68.1,49.78,34.5,61.51,22.77,97.58,58.84ZM21.34,99A11.91,11.91,0,0,0,11,95.66l1.08-20.49,30.79,2.27,2.26,30.79-20.48,1.08A11.94,11.94,0,0,0,21.34,99ZM18.65,65.63,40.44,43.84l1.73,23.52ZM53,78.18l23.52,1.73L54.72,101.7Z" />
                </svg>
                <div className="line white_line"></div>
              </div>
              <div className="how_to_get_along">
                <div className="title">
                  [해당 가면을 지닌 사람과 잘 지내려면?]
                </div>
                <ol className="info">{show_get_along(personality)}</ol>
              </div>
              <div className="result_button_container">
                <div className="share_result">
                  <div
                    className="result_button"
                    onClick={open_methods}
                    ref={ref}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#ffffff"
                      viewBox="0 0 100 100"
                    >
                      <path d="M94.44,73.22,52.9,9.77l0,0-.05-.07a4.12,4.12,0,0,0-.33-.4l-.09-.09A3.16,3.16,0,0,0,52,8.82l-.09-.06a3.88,3.88,0,0,0-.45-.24l-.11,0a2.69,2.69,0,0,0-.55-.17l-.14,0a3.23,3.23,0,0,0-1.24,0l-.14,0a2.69,2.69,0,0,0-.55.17l-.11,0a3.88,3.88,0,0,0-.45.24L48,8.82a3.16,3.16,0,0,0-.45.37l-.09.09a4.12,4.12,0,0,0-.33.4l-.05.07,0,0L5.56,73.22a3.46,3.46,0,0,0,2.9,5.36H38.21l9,11.85.1.12.08.1a3.47,3.47,0,0,0,.45.41s0,0,0,0l.06,0a2.92,2.92,0,0,0,.37.24l.1,0a4.43,4.43,0,0,0,.45.2l.11,0c.13,0,.25.07.38.09l.15,0a2.38,2.38,0,0,0,.46,0h0a2.38,2.38,0,0,0,.46,0l.15,0a2.62,2.62,0,0,0,.38-.09l.11,0a4.43,4.43,0,0,0,.45-.2l.11-.06a2.41,2.41,0,0,0,.36-.23l.06,0a0,0,0,0,0,0,0,3.47,3.47,0,0,0,.45-.41l.08-.1.1-.12,9-11.85H91.54a3.46,3.46,0,0,0,2.9-5.36Zm-47.9-5.64L28,51.63,46.54,23.28Zm6.92-44.3L72,51.63,53.46,67.58ZM24.15,57.47,40.66,71.66H14.87ZM50,82.62l-3.08-4h6.16Zm9.34-11L75.85,57.47l9.28,14.19Z" />
                    </svg>
                    {isComponentVisible && (
                      <div className="share_method">
                        <img
                          src={open_method}
                          alt="background"
                          className="method_background"
                          onClick={() => console.log("clicked")}
                        />
                        <div className="method_container">
                          <div className="method">
                            <CopyToClipboard
                              text={baseURL + "share/" + shareID}
                              onCopy={() => alert("링크가 복사되었습니다")}
                            >
                              <img src={copy_link_button} alt="copy" />
                            </CopyToClipboard>
                          </div>
                          <div className="method">
                            <img src={kakao_button} onClick={kakao_share} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="comment">결과 공유하기</div>
                </div>

                <div className="another_test">
                  <div className="result_button">
                    <Link
                      to="/"
                      onClick={() => changeColor("#ffffff")}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                        viewBox="0 0 100 100"
                      >
                        <path d="M90.84,76a2.07,2.07,0,0,0,0-.35c0-.1,0-.2-.07-.3l-.09-.3-.15-.32c0-.06,0-.12-.07-.17l-8.5-14.71,8.5-14.71s0-.11.07-.16l.15-.33.09-.29a2.82,2.82,0,0,0,.07-.31,2,2,0,0,0,0-.35,1.1,1.1,0,0,0,0-.18s0-.07,0-.1,0-.24,0-.35,0-.2,0-.3a2.47,2.47,0,0,0-.1-.29,1.54,1.54,0,0,0-.11-.3c0-.09-.09-.18-.14-.27l-.17-.27-.2-.24a2.29,2.29,0,0,0-.21-.23,2.11,2.11,0,0,0-.23-.19,2.83,2.83,0,0,0-.28-.2l-.09-.07-.17-.07-.31-.14-.31-.1-.29-.07-.37,0-.17,0h-17L65,30.56h6a3.24,3.24,0,1,0,0-6.48H61.3L52.81,9.37s-.08-.09-.11-.15l-.2-.28a2.39,2.39,0,0,0-.22-.23,1.55,1.55,0,0,0-.23-.21,1.94,1.94,0,0,0-.29-.21l-.14-.1-.09,0L51.2,8l-.27-.11-.31-.07-.31-.05h-.62l-.31.05-.31.07L48.8,8l-.33.14-.09,0-.14.1-.3.21a2.18,2.18,0,0,0-.22.21l-.22.23-.2.28c0,.06-.08.1-.11.15L38.7,24.08h-17l-.16,0-.37,0a2.47,2.47,0,0,0-.29.06l-.31.1-.32.14-.17.08s-.05,0-.08.06l-.29.2L19.5,25a2.39,2.39,0,0,0-.22.23l-.2.24c-.06.09-.11.18-.16.27s-.11.18-.15.27l-.11.3a2.63,2.63,0,0,0-.09.3,2.5,2.5,0,0,0-.05.29c0,.12,0,.23,0,.35s0,.07,0,.1,0,.12,0,.18,0,.24,0,.35a1.55,1.55,0,0,0,.07.31,1.71,1.71,0,0,0,.09.3c0,.11.09.21.14.32s.05.11.08.16L27.4,43.65l-5.6,9.71-3-5.15a3.24,3.24,0,1,0-5.61,3.24l4.84,8.39L9.57,74.53s0,.11-.07.17L9.35,75l-.09.3c0,.1,0,.2-.07.3a2.07,2.07,0,0,0,0,.35,1.1,1.1,0,0,0,0,.18v0s0,.06,0,.09v.09a2.48,2.48,0,0,0,0,.27c0,.1,0,.2.05.29a2.64,2.64,0,0,0,.1.3,1.82,1.82,0,0,0,.11.3c0,.09.09.18.14.27l.17.27.2.24a2.29,2.29,0,0,0,.21.23,2.11,2.11,0,0,0,.23.19,2.83,2.83,0,0,0,.28.2l.09.06a2.1,2.1,0,0,0,.3.15l.07,0a3.68,3.68,0,0,0,.54.16l.12,0a3.93,3.93,0,0,0,.59.06h17l8.49,14.71c0,.09.12.18.18.27l.05.08a3.78,3.78,0,0,0,.39.41l.09.08a2.79,2.79,0,0,0,.46.33h0l.29.14.1,0,.13,0a3.22,3.22,0,0,0,1.09.2h0a3.18,3.18,0,0,0,1.13-.21l.09,0,.12-.06.27-.13h0a2.36,2.36,0,0,0,.45-.33l.1-.08a5,5,0,0,0,.38-.41.56.56,0,0,1,0-.08c.06-.09.13-.18.18-.27L52,79.39H63.15l-3,5.18A3.24,3.24,0,0,0,61.35,89a3.19,3.19,0,0,0,1.62.44,3.24,3.24,0,0,0,2.81-1.62l4.85-8.42h17a3,3,0,0,0,.59-.06l.12,0a2.81,2.81,0,0,0,.54-.17l.07,0c.1,0,.2-.09.3-.15l.09-.06.28-.21a2.11,2.11,0,0,0,.23-.19,6.9,6.9,0,0,0,.41-.47,3.18,3.18,0,0,0,.17-.27,1.71,1.71,0,0,0,.14-.27,1.45,1.45,0,0,0,.11-.29c0-.1.07-.2.1-.3s0-.2,0-.29,0-.23,0-.35,0-.07,0-.11A1.1,1.1,0,0,0,90.84,76ZM82,46.73l-3.82,6.61-3.81-6.61ZM50,17.47l3.81,6.61H46.19ZM31.14,37.17l-3.81-6.61H35Zm9.53,48.88-3.82-6.61h7.63ZM18,72.91l3.79-6.56,3.79,6.56ZM56.2,65.62a3.24,3.24,0,0,0-4.43,1.19l-3.52,6.1H33.08L25.54,59.84l5.6-9.7L32.82,53a3.24,3.24,0,0,0,2.81,1.62,3.24,3.24,0,0,0,2.81-4.86l-3.55-6.15,1.8-3.13,5.75-10H57.56l5.59,9.69H59.79a3.24,3.24,0,0,0,0,6.48h7.1l7.56,13.09L66.89,72.91H55.73l1.66-2.86A3.25,3.25,0,0,0,56.2,65.62Zm22,.68L82,72.91H74.38Z" />
                      </svg>
                    </Link>
                  </div>
                  <div className="comment">다른 페르소나 찾기</div>
                </div>
              </div>
              <a className="poomang_comment" href="https://poomang.com/">
                다른 성격심리테스트하러 가기!
              </a>
            </div>
          </div>
        )}
      </Spring>
    </>
  );
}

export default Result;
