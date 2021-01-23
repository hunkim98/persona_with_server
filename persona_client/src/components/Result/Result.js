import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import mask_pattern_white from "../svg/mask_pattern_white.svg";
import "./Result.css";
import { mask_circle } from "./mask_result";
import { useMediaQuery } from "react-responsive";
import { mask_names, mask_basic_info, mask_get_along } from "./mask_info";
import { maskGoodBad } from "./mask_good_bad";
import axios from "axios";
import copy_link_button from "../share_img/copy_link.png";
import kakao_button from "../share_img/kakao.png";
import HideShow from "../HideShow/HideShow";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Result({ personality, changeColor, setPersonality, name }) {
  useEffect(() => {
    window.Kakao.init("dfb19a99996885d213dd7631a295b474");
    changeColor("#76729F");
    axios({
      //need to move this to question page later
      method: "POST",
      url: "/sendData",
      data: {
        name: name,
        personality: personality,
      },
    })
      .then((res) => {
        setShareID(res.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const baseURL = "http://localhost:3000/";

  const [shareID, setShareID] = useState("3");

  const { ref, isComponentVisible, setIsComponentVisible } = HideShow(false);

  const isDesktopOrMobile = useMediaQuery({
    query: "(min-width:1200px)",
  });

  const show_mask = () => {
    return mask_circle[personality - 1];
  };

  const show_mask_name = () => {
    return mask_names[personality - 1];
  };

  const show_basic_info = () => {
    return mask_names[personality - 1] + mask_basic_info[personality - 1];
  };
  const show_get_along = () => {
    return mask_get_along[personality - 1].map((list) => <li>{list}</li>);
  };
  const show_good_bad = (goodBad) => {
    if (goodBad === 0) {
      return maskGoodBad[personality - 1][0].info.map((list) => (
        <li>{list}</li>
      ));
    } else {
      return maskGoodBad[personality - 1][1].info.map((list) => (
        <li>{list}</li>
      ));
    }
  };

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
      // social: {
      //   likeCount: 286,
      //   commentCount: 45,
      //   sharedCount: 845,
      // },
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

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  useEffect(() => {
    //this is to find out when the setShareID has worked
    console.log("copied successfully");
    console.log(shareID);
    copyToClipboard(shareID);
  }, [shareID]);

  const open_methods = () => {
    setIsComponentVisible(true);
  };

  return (
    <>
      <div className="result_container">
        <div className="result_pattern_container">
          <div className="mask_line"></div>
          <div className="result_pattern_control1">
            <div className="mask_result_container">
              <img className="mask_circle" src={show_mask()} alt="" />
            </div>
            <img className="result_pattern" src={mask_pattern_white} alt="" />
          </div>
          {isDesktopOrMobile ? (
            <div className="result_pattern_control2">
              <img className="result_pattern" src={mask_pattern_white} alt="" />
            </div>
          ) : null}
          <div className="mask_line"></div>
        </div>
        <div className="result_mask_information">
          <div className="result_acquaintance_name">{name}님의 가면:</div>
          <div className="result_personality">"{show_mask_name()}" 가면</div>
        </div>
        <div className="result_basic_info_container">
          <div className="result_basic_information">{show_basic_info()}</div>
        </div>
        <div className="result_divide">
          <div className="line"></div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.8 126.67">
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
                <ul className="good">{show_good_bad(0)}</ul>
              </div>
              <div className="bad_info">
                <div className="small_title">단점</div>
                <ul className="bad">{show_good_bad(1)}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="result_divide">
          <div className="line"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120.35"
            height="120.35"
            viewBox="0 0 120.35 120.35"
          >
            <path d="M118.88,44.61,75.74,1.46a5,5,0,0,0-7.07,0L3.86,66.28a1.78,1.78,0,0,0-.22.26,3.31,3.31,0,0,0-.25.3,4.53,4.53,0,0,0-.3.46c-.07.12-.14.23-.2.35a4.65,4.65,0,0,0-.2.52c0,.12-.09.24-.13.37s-.08.42-.11.64,0,.17-.05.27a.43.43,0,0,1,0,0,.07.07,0,0,0,0,0L0,115.08a5,5,0,0,0,5,5.27h.26L50.79,118h.11a1.51,1.51,0,0,0,.28,0,3.22,3.22,0,0,0,.62-.11,2.55,2.55,0,0,0,.39-.13l.5-.19.38-.22a4.94,4.94,0,0,0,.42-.27l.34-.28c.08-.07.17-.13.24-.2l64.81-64.81A5,5,0,0,0,118.88,44.61ZM72.2,12.07l36.08,36.07-3.63,3.63L68.58,15.7Zm13.65,58.5L52.25,68.1,49.78,34.5,61.51,22.77,97.58,58.84ZM21.34,99A11.91,11.91,0,0,0,11,95.66l1.08-20.49,30.79,2.27,2.26,30.79-20.48,1.08A11.94,11.94,0,0,0,21.34,99ZM18.65,65.63,40.44,43.84l1.73,23.52ZM53,78.18l23.52,1.73L54.72,101.7Z" />
          </svg>
          <div className="line"></div>
        </div>
        <div className="how_to_get_along">
          <div className="title">[해당 가면을 지닌 사람과 잘 지내려면?]</div>
          <ol className="info">{show_get_along()}</ol>
        </div>

        <div className="result_buttons">
          <div className="share_result" onClick={open_methods} ref={ref}>
            공유하기
            {isComponentVisible && (
              <div className="share_method">
                <div className="method">
                  <CopyToClipboard
                    text={baseURL + "share/" + shareID}
                    onCopy={() => console.log(baseURL + "share/" + shareID)}
                  >
                    <img src={copy_link_button} />
                  </CopyToClipboard>
                </div>
                <div className="method">
                  <div className="to_kakao" onClick={kakao_share}>
                    <img src={kakao_button} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            to="/"
            onClick={() => changeColor("#ffffff")}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="another_test">다른 페르소나 찾기</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Result;
