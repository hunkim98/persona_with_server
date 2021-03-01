import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import ReactGA from "react-ga";
import { best_with_gender } from "./BestWith";

function Result({ changeColor }) {
  let { id } = useParams();
  const [personality, setPersonality] = useState(0);
  //do not use usestate(0). it does not work
  const [name, setName] = useState("");
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

  const baseURL = "https://personapersonality.com/";

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
    ReactGA.event({ category: "Share", action: "Share by kakaotalk" });
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "상대방이 나에게서 이런 성격의 가면이 있다고 보고 있어요!",
        description: "#성격심리 #에니어그램 #성격가면",
        imageUrl: share_kakao_url(),
        link: {
          mobileWebUrl: baseURL + "share/" + id,
          webUrl: baseURL + "share/" + id,
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
                      className={
                        personality === 0
                          ? "mask_circle rotating_mask"
                          : "mask_circle"
                      }
                      src={show_mask(personality)}
                      alt=""
                    />
                  </div>
                  <svg
                    className="result_pattern"
                    xmlns="http://www.w3.org/2000/svg"
                    width="627.66"
                    height="494.88"
                    viewBox="0 0 627.66 494.88"
                  >
                    <g opacity="0.1">
                      <path
                        d="M150.4,20.13a5,5,0,0,0-5.09-8.61L79.93,50.17,14.54,11.52a5,5,0,0,0-5.08,8.61l26.22,15.5v40.7L9.46,91.83a5,5,0,1,0,5.08,8.61L79.93,61.79l65.38,38.65a5,5,0,0,0,5.09-8.61l-26.22-15.5V35.63ZM45.68,70.42V41.54L70.1,56Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L89.75,56l24.43-14.44Z"
                        fill="#fff"
                      />
                      <path
                        d="M618.2,221.39,592,205.89v-40.7l26.22-15.5a5,5,0,0,0-5.08-8.61l-65.39,38.65-65.38-38.65a5,5,0,1,0-5.09,8.61l26.22,15.5v40.7l-26.22,15.5a5,5,0,1,0,5.09,8.61l65.38-38.65L613.12,230a5,5,0,0,0,5.08-8.61ZM513.48,200V171.1l24.43,14.44ZM582,171.1v8.84h-6a5,5,0,0,0,0,10h6v10l-24.42-14.44Z"
                        fill="#fff"
                      />
                      <path
                        d="M481.55,97c0,.18.09.36.14.53s.05.22.09.33l.05.1c0,.1.09.19.13.29s.18.35.28.52l.17.25a6.26,6.26,0,0,0,.41.49l.16.18a5.11,5.11,0,0,0,.68.55l.09.06a7.12,7.12,0,0,0,.67.36l.28.11a5.58,5.58,0,0,0,.58.18l.28.06a4.59,4.59,0,0,0,.9.1,5.11,5.11,0,0,0,1-.1c.13,0,.25-.07.38-.1s.29-.07.43-.12l44.71-16.77,42.69,16c.14,0,.29.08.43.12a2.66,2.66,0,0,0,.38.1,4.38,4.38,0,0,0,1,.1,5.49,5.49,0,0,0,.9-.09l.28-.07a3,3,0,0,0,.58-.18l.28-.11a4.32,4.32,0,0,0,.67-.36l.09,0a5.19,5.19,0,0,0,.68-.56l.16-.18a3.94,3.94,0,0,0,.41-.49l.17-.25c.1-.16.19-.34.28-.52s.09-.19.13-.29a.31.31,0,0,0,0-.1c0-.1.05-.21.09-.32s.1-.36.14-.54a4.89,4.89,0,0,0,.05-.55c0-.11,0-.22,0-.34V65.51l28.37-10.63a5,5,0,1,0-3.51-9.37L532.93,73.37,491.46,57.83V18.29a5,5,0,0,0-10,0V96.14c0,.11,0,.22,0,.34A5.35,5.35,0,0,0,481.55,97Zm90.83-27.77V88.17l-25.21-9.46Zm-53.69,9.45L491.46,88.92V68.51Z"
                        fill="#fff"
                      />
                      <path
                        d="M189.34,101.14a5,5,0,0,0,3.19-1.15l10.14-8.4h84.25a5,5,0,0,0,0-10H214.75l31.74-26.27h40.43a5,5,0,0,0,5-5V15.37a1.81,1.81,0,0,0,0-.23,3.17,3.17,0,0,0-.05-.53,3.58,3.58,0,0,0-.09-.45,3.68,3.68,0,0,0-.15-.47,3.66,3.66,0,0,0-.18-.46l-.22-.41-.3-.44-.13-.2-.16-.15-.37-.37a3.47,3.47,0,0,0-.37-.3c-.13-.1-.27-.18-.41-.27s-.27-.16-.42-.23l-.45-.18-.46-.14a3.89,3.89,0,0,0-.47-.09,3,3,0,0,0-.52,0l-.22,0H201a5,5,0,1,0,0,10h72l-30.14,25H201a5,5,0,0,0-5,5V84.15l-9.83,8.13a5,5,0,0,0,3.19,8.86ZM281.92,26V45.32H258.57ZM206,55.32h24.83L206,75.87Z"
                        fill="#fff"
                      />
                      <path
                        d="M326.16,101.14h70.73a5,5,0,0,0,5-5V63.6l21.42-22,33.53,29.11a5,5,0,0,0,6.56-7.55L400.17,8.23a2.44,2.44,0,0,0-.23-.16,4.48,4.48,0,0,0-.44-.32l-.41-.22-.46-.2a4,4,0,0,0-.46-.14l-.47-.11a4.75,4.75,0,0,0-.53,0c-.09,0-.18,0-.28,0l-.17,0-.53.05a4,4,0,0,0-.46.08l-.46.14-.45.17c-.15.07-.28.15-.42.23A3.66,3.66,0,0,0,394,8l-.36.29c-.13.12-.26.24-.38.37l-.13.11c-.06.08-.1.16-.16.23l-.31.44-.22.41c-.07.15-.14.3-.2.46a3.68,3.68,0,0,0-.15.47c0,.15-.07.3-.1.46a4.75,4.75,0,0,0-.05.53c0,.1,0,.19,0,.28V59.53L361.15,91.14h-35a5,5,0,0,0,0,10ZM401.89,23l13.86,12L401.89,49.25Zm-10,50.91V91.14H375.1Z"
                        fill="#fff"
                      />
                      <path
                        d="M331.87,142.85a5,5,0,0,0-5,5V225.7c0,.11,0,.22,0,.34s0,.36.06.54a4.26,4.26,0,0,0,.14.54c0,.11,0,.22.09.33a1,1,0,0,1,0,.1c0,.1.09.19.14.29a4.16,4.16,0,0,0,.28.51,2.33,2.33,0,0,0,.17.26,6.12,6.12,0,0,0,.4.49l.17.18a5,5,0,0,0,.67.55l.1.06a7,7,0,0,0,.66.36l.28.11a5.76,5.76,0,0,0,.59.18,2.3,2.3,0,0,0,.28.06,4.43,4.43,0,0,0,.9.1,5,5,0,0,0,.94-.1c.13,0,.26-.07.38-.1s.29-.07.43-.12l44.71-16.77,42.7,16c.14,0,.29.08.43.12s.25.08.38.1a4.29,4.29,0,0,0,.94.1,5.28,5.28,0,0,0,.9-.09l.28-.07a3.09,3.09,0,0,0,.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36l.1,0a5.1,5.1,0,0,0,.67-.56l.17-.18a3.88,3.88,0,0,0,.4-.49,2.2,2.2,0,0,0,.17-.25,3.74,3.74,0,0,0,.28-.52,2.59,2.59,0,0,0,.14-.29,1,1,0,0,0,0-.1,1.68,1.68,0,0,0,.09-.32,5.36,5.36,0,0,0,.14-.54,3.31,3.31,0,0,0,.06-.55c0-.11,0-.22,0-.34V195.07l28.38-10.64a5,5,0,1,0-3.51-9.36l-74.32,27.86-41.46-15.54V147.85A5,5,0,0,0,331.87,142.85Zm85.91,56v18.91l-25.2-9.46Zm-53.69,9.45-27.22,10.21V198.07Z"
                        fill="#fff"
                      />
                      <path
                        d="M42.78,174.88a5,5,0,0,0-5,5v33.83L28,221.84a5,5,0,1,0,6.38,7.71l10.14-8.4h84.25a5,5,0,0,0,0-10H56.55l31.74-26.27h40.43a5,5,0,0,0,5-5V144.93c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,4.14,4.14,0,0,0-.09-.46c0-.15-.09-.31-.14-.46s-.12-.31-.19-.46-.14-.28-.22-.41-.19-.3-.3-.44-.08-.14-.13-.2l-.16-.15a4.31,4.31,0,0,0-.37-.37,3.47,3.47,0,0,0-.37-.3,2.9,2.9,0,0,0-.41-.27,4.16,4.16,0,0,0-.42-.23,4.69,4.69,0,0,0-.45-.18l-.46-.14a3.55,3.55,0,0,0-.47-.09,2.94,2.94,0,0,0-.51,0,1.81,1.81,0,0,0-.23,0H42.78a5,5,0,0,0,0,10h72.06L84.69,174.88Zm5,30.55V184.88H72.61Zm75.94-49.87v19.32H100.37Z"
                        fill="#fff"
                      />
                      <path
                        d="M510.59,303.67a5,5,0,0,0-5,5v33.82l-9.84,8.14a5,5,0,0,0,3.19,8.85,4.93,4.93,0,0,0,3.19-1.15l10.14-8.39h84.25a5,5,0,0,0,0-10H524.35l31.74-26.27h40.43a5,5,0,0,0,5-5V273.72c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,3.73,3.73,0,0,0-.09-.46c0-.16-.09-.31-.14-.47s-.12-.31-.19-.46-.14-.27-.22-.4a4.4,4.4,0,0,0-.3-.45c0-.06-.08-.13-.13-.19s-.11-.1-.16-.16a4.17,4.17,0,0,0-.37-.36l-.37-.31c-.13-.09-.26-.18-.4-.26s-.28-.16-.43-.23a3.38,3.38,0,0,0-.44-.18,4.26,4.26,0,0,0-.47-.15l-.46-.08a4.78,4.78,0,0,0-.53-.06l-.22,0H510.59a5,5,0,1,0,0,10h72.05l-30.15,24.95Zm5,30.55V313.67h24.82Zm75.93-49.87v19.32H568.17Z"
                        fill="#fff"
                      />
                      <path
                        d="M171.15,230.7h70.73a5,5,0,0,0,5-5V193.16l21.42-22,33.53,29.11a5,5,0,0,0,6.56-7.55l-63.23-54.9c-.08-.07-.16-.11-.23-.17a4.27,4.27,0,0,0-.44-.3,4.23,4.23,0,0,0-.41-.23l-.46-.2c-.15-.06-.31-.1-.47-.15l-.46-.1a4.75,4.75,0,0,0-.53,0l-.28,0-.17,0a4.53,4.53,0,0,0-.53,0,3.25,3.25,0,0,0-.45.08,4.42,4.42,0,0,0-.48.15l-.44.16c-.15.07-.29.15-.43.23a3.54,3.54,0,0,0-.41.26l-.36.29c-.13.12-.26.24-.38.37l-.13.11c-.06.08-.1.16-.16.23s-.21.29-.31.44l-.22.41c-.07.15-.14.3-.2.46a3.68,3.68,0,0,0-.15.47c0,.15-.07.3-.1.46a4.75,4.75,0,0,0-.05.53c0,.1,0,.19,0,.28v47.53L206.14,220.7h-35a5,5,0,0,0,0,10Zm75.73-78.17,13.86,12-13.86,14.25Zm-10,50.91V220.7H220.09Z"
                        fill="#fff"
                      />
                      <path
                        d="M463.61,278.47a5,5,0,1,0-5.09-8.6l-65.38,38.65-65.39-38.65a5,5,0,1,0-5.09,8.6L348.89,294v40.7l-26.23,15.5a5,5,0,0,0,5.09,8.61l65.39-38.66,65.38,38.66a5,5,0,1,0,5.09-8.61l-26.22-15.5V294Zm-104.72,50.3V299.89l24.42,14.44Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L403,314.33l24.43-14.44Z"
                        fill="#fff"
                      />
                      <path
                        d="M176.86,271.63a5,5,0,0,0-5,5v77.85c0,.12,0,.23,0,.35s0,.36.06.54a4.75,4.75,0,0,0,.14.54c0,.11,0,.22.09.33l0,.09c0,.1.09.2.14.3a5.05,5.05,0,0,0,.28.51c.05.09.11.17.17.26s.26.33.4.48l.17.19a5,5,0,0,0,.67.55l.1.05a4.22,4.22,0,0,0,.66.36c.09.05.19.08.28.12s.39.13.59.18l.28.06a4.43,4.43,0,0,0,.9.09,5,5,0,0,0,.94-.09l.38-.11a3,3,0,0,0,.43-.12l44.71-16.76,42.7,16c.14,0,.29.08.43.12s.25.08.38.1a5,5,0,0,0,.94.1,5.28,5.28,0,0,0,.9-.09l.28-.07a5.76,5.76,0,0,0,.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36l.1-.06a5,5,0,0,0,.67-.55l.17-.18a6.12,6.12,0,0,0,.4-.49l.17-.25a3.74,3.74,0,0,0,.28-.52c.05-.1.1-.19.14-.29a.47.47,0,0,1,0-.1c0-.11.05-.22.08-.33a4.58,4.58,0,0,0,.14-.53,3.55,3.55,0,0,0,.06-.55c0-.12,0-.23,0-.34V323.86l28.38-10.64a5,5,0,1,0-3.51-9.36l-74.32,27.86-41.46-15.55V276.63A5,5,0,0,0,176.86,271.63Zm85.91,56v18.9l-25.2-9.45Zm-53.69,9.45-27.22,10.21V326.85Z"
                        fill="#fff"
                      />
                      <path
                        d="M446.85,401.36a3.4,3.4,0,0,0-.09-.46,7.71,7.71,0,0,0-.33-.93c-.07-.14-.15-.27-.23-.41s-.19-.3-.29-.44-.08-.13-.13-.19-.11-.11-.16-.16a4.44,4.44,0,0,0-.38-.37,2.6,2.6,0,0,0-.36-.3c-.13-.1-.27-.18-.41-.27l-.42-.23c-.15-.07-.29-.12-.45-.18l-.47-.14a3.4,3.4,0,0,0-.46-.09,3,3,0,0,0-.52-.05l-.22,0H356a5,5,0,0,0,0,10H428l-30.14,25H356a5,5,0,0,0-5,5v33.82L341.16,479a5,5,0,1,0,6.38,7.7l10.14-8.4h84.25a5,5,0,0,0,0-10H369.76l31.74-26.26h40.43a5,5,0,0,0,5-5v-35a2.08,2.08,0,0,0,0-.23A3.05,3.05,0,0,0,446.85,401.36ZM361,462.61V442.07h24.82Zm52.59-30.54,23.35-19.33v19.33Z"
                        fill="#fff"
                      />
                      <path
                        d="M308.6,406.87a5,5,0,0,0-5.09-8.61l-65.38,38.65-65.39-38.65a5,5,0,1,0-5.09,8.61l26.23,15.5v40.7l-26.23,15.5a5,5,0,1,0,5.09,8.61l65.39-38.65,65.38,38.65a5,5,0,1,0,5.09-8.61l-26.22-15.5v-40.7ZM203.88,457.16V428.28l24.42,14.44Zm68.5-20h-6a5,5,0,1,0,0,10h6v10L248,442.72l24.43-14.44Z"
                        fill="#fff"
                      />
                      <path
                        d="M139.44,432.25,65.13,460.12,23.66,444.57V405a5,5,0,0,0-10,0v77.85c0,.11,0,.22,0,.34a5.35,5.35,0,0,0,.05.55,4.58,4.58,0,0,0,.14.53c0,.11,0,.22.09.33s0,.06,0,.1.09.19.14.29.18.35.28.52l.17.25c.13.17.26.33.4.49l.17.18a5,5,0,0,0,.67.55l.1.06a4.22,4.22,0,0,0,.66.36l.29.11a5.58,5.58,0,0,0,.58.18l.28.07a5.49,5.49,0,0,0,.9.09,5.11,5.11,0,0,0,.95-.1c.13,0,.25-.07.37-.1l.44-.12L65.13,470.8l42.69,16a3.45,3.45,0,0,0,.43.12l.38.11a5.07,5.07,0,0,0,.94.09,5.5,5.5,0,0,0,.91-.09l.28-.06a4.36,4.36,0,0,0,.58-.19l.28-.11a4.83,4.83,0,0,0,.67-.36l.09-.05a4.42,4.42,0,0,0,.67-.56,1.45,1.45,0,0,0,.17-.18,3.88,3.88,0,0,0,.4-.49l.18-.25c.1-.16.19-.34.28-.52s.09-.19.13-.29l.05-.09c0-.11,0-.22.08-.33a4.77,4.77,0,0,0,.15-.54,4.89,4.89,0,0,0,.05-.55c0-.11,0-.22,0-.34V452.26L143,441.62a5,5,0,0,0-3.51-9.37ZM23.66,475.66V455.25l27.22,10.21Zm80.92-.75-25.21-9.45L104.58,456Z"
                        fill="#fff"
                      />
                      <path
                        d="M87,266.57c-.07-.06-.16-.1-.23-.16s-.29-.21-.44-.31-.27-.15-.41-.22l-.45-.2-.48-.15-.45-.1a4.93,4.93,0,0,0-.54-.05,2.66,2.66,0,0,0-.28,0l-.16,0a3.19,3.19,0,0,0-.54.05l-.45.07c-.16,0-.32.1-.48.15a3.34,3.34,0,0,0-.44.17,4.36,4.36,0,0,0-.42.23,3.66,3.66,0,0,0-.42.26l-.35.29A4.49,4.49,0,0,0,80,267l-.12.12c-.07.07-.11.16-.17.23a4.91,4.91,0,0,0-.31.44c-.08.13-.15.27-.22.41s-.14.3-.2.45-.1.32-.15.48-.07.3-.1.46a4.53,4.53,0,0,0-.05.53,2.4,2.4,0,0,0,0,.28v47.53l-30.74,31.6H13a5,5,0,1,0,0,10H83.68a5,5,0,0,0,5-5V321.94l21.42-22L143.63,329a5,5,0,0,0,3.28,1.22,5,5,0,0,0,3.28-8.77Zm-8.28,82.91H61.89l16.79-17.26Zm10-41.88V281.31l13.86,12Z"
                        fill="#fff"
                      />
                      <path
                        d="M554.76,395a1.19,1.19,0,0,0-.23-.16,3.47,3.47,0,0,0-.44-.31,3.3,3.3,0,0,0-.41-.23l-.45-.2-.48-.14a3.63,3.63,0,0,0-.45-.1l-.54-.06c-.09,0-.18,0-.28,0l-.16,0-.54.05c-.15,0-.3,0-.45.08l-.48.15-.44.16-.42.23-.42.26-.35.29a4.59,4.59,0,0,0-.39.37,1.31,1.31,0,0,0-.12.11c-.07.08-.11.16-.17.23s-.21.29-.3.44a4.23,4.23,0,0,0-.23.41c-.07.15-.14.3-.2.46a3.64,3.64,0,0,0-.14.47c0,.15-.08.3-.11.46s0,.35,0,.53,0,.19,0,.28v47.54l-30.73,31.6h-35a5,5,0,0,0,0,10h70.73a5,5,0,0,0,5-5V450.34l21.43-22,33.52,29.11a5,5,0,1,0,6.56-7.55Zm-8.28,82.91H529.7l16.78-17.26Zm10-41.89V409.71l13.86,12Z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </div>
                {!isDesktopOrMobile ? (
                  <div className="result_pattern_control2">
                    <svg
                      className="result_pattern"
                      xmlns="http://www.w3.org/2000/svg"
                      width="627.66"
                      height="494.88"
                      viewBox="0 0 627.66 494.88"
                    >
                      <g opacity="0.1">
                        <path
                          d="M150.4,20.13a5,5,0,0,0-5.09-8.61L79.93,50.17,14.54,11.52a5,5,0,0,0-5.08,8.61l26.22,15.5v40.7L9.46,91.83a5,5,0,1,0,5.08,8.61L79.93,61.79l65.38,38.65a5,5,0,0,0,5.09-8.61l-26.22-15.5V35.63ZM45.68,70.42V41.54L70.1,56Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L89.75,56l24.43-14.44Z"
                          fill="#fff"
                        />
                        <path
                          d="M618.2,221.39,592,205.89v-40.7l26.22-15.5a5,5,0,0,0-5.08-8.61l-65.39,38.65-65.38-38.65a5,5,0,1,0-5.09,8.61l26.22,15.5v40.7l-26.22,15.5a5,5,0,1,0,5.09,8.61l65.38-38.65L613.12,230a5,5,0,0,0,5.08-8.61ZM513.48,200V171.1l24.43,14.44ZM582,171.1v8.84h-6a5,5,0,0,0,0,10h6v10l-24.42-14.44Z"
                          fill="#fff"
                        />
                        <path
                          d="M481.55,97c0,.18.09.36.14.53s.05.22.09.33l.05.1c0,.1.09.19.13.29s.18.35.28.52l.17.25a6.26,6.26,0,0,0,.41.49l.16.18a5.11,5.11,0,0,0,.68.55l.09.06a7.12,7.12,0,0,0,.67.36l.28.11a5.58,5.58,0,0,0,.58.18l.28.06a4.59,4.59,0,0,0,.9.1,5.11,5.11,0,0,0,1-.1c.13,0,.25-.07.38-.1s.29-.07.43-.12l44.71-16.77,42.69,16c.14,0,.29.08.43.12a2.66,2.66,0,0,0,.38.1,4.38,4.38,0,0,0,1,.1,5.49,5.49,0,0,0,.9-.09l.28-.07a3,3,0,0,0,.58-.18l.28-.11a4.32,4.32,0,0,0,.67-.36l.09,0a5.19,5.19,0,0,0,.68-.56l.16-.18a3.94,3.94,0,0,0,.41-.49l.17-.25c.1-.16.19-.34.28-.52s.09-.19.13-.29a.31.31,0,0,0,0-.1c0-.1.05-.21.09-.32s.1-.36.14-.54a4.89,4.89,0,0,0,.05-.55c0-.11,0-.22,0-.34V65.51l28.37-10.63a5,5,0,1,0-3.51-9.37L532.93,73.37,491.46,57.83V18.29a5,5,0,0,0-10,0V96.14c0,.11,0,.22,0,.34A5.35,5.35,0,0,0,481.55,97Zm90.83-27.77V88.17l-25.21-9.46Zm-53.69,9.45L491.46,88.92V68.51Z"
                          fill="#fff"
                        />
                        <path
                          d="M189.34,101.14a5,5,0,0,0,3.19-1.15l10.14-8.4h84.25a5,5,0,0,0,0-10H214.75l31.74-26.27h40.43a5,5,0,0,0,5-5V15.37a1.81,1.81,0,0,0,0-.23,3.17,3.17,0,0,0-.05-.53,3.58,3.58,0,0,0-.09-.45,3.68,3.68,0,0,0-.15-.47,3.66,3.66,0,0,0-.18-.46l-.22-.41-.3-.44-.13-.2-.16-.15-.37-.37a3.47,3.47,0,0,0-.37-.3c-.13-.1-.27-.18-.41-.27s-.27-.16-.42-.23l-.45-.18-.46-.14a3.89,3.89,0,0,0-.47-.09,3,3,0,0,0-.52,0l-.22,0H201a5,5,0,1,0,0,10h72l-30.14,25H201a5,5,0,0,0-5,5V84.15l-9.83,8.13a5,5,0,0,0,3.19,8.86ZM281.92,26V45.32H258.57ZM206,55.32h24.83L206,75.87Z"
                          fill="#fff"
                        />
                        <path
                          d="M326.16,101.14h70.73a5,5,0,0,0,5-5V63.6l21.42-22,33.53,29.11a5,5,0,0,0,6.56-7.55L400.17,8.23a2.44,2.44,0,0,0-.23-.16,4.48,4.48,0,0,0-.44-.32l-.41-.22-.46-.2a4,4,0,0,0-.46-.14l-.47-.11a4.75,4.75,0,0,0-.53,0c-.09,0-.18,0-.28,0l-.17,0-.53.05a4,4,0,0,0-.46.08l-.46.14-.45.17c-.15.07-.28.15-.42.23A3.66,3.66,0,0,0,394,8l-.36.29c-.13.12-.26.24-.38.37l-.13.11c-.06.08-.1.16-.16.23l-.31.44-.22.41c-.07.15-.14.3-.2.46a3.68,3.68,0,0,0-.15.47c0,.15-.07.3-.1.46a4.75,4.75,0,0,0-.05.53c0,.1,0,.19,0,.28V59.53L361.15,91.14h-35a5,5,0,0,0,0,10ZM401.89,23l13.86,12L401.89,49.25Zm-10,50.91V91.14H375.1Z"
                          fill="#fff"
                        />
                        <path
                          d="M331.87,142.85a5,5,0,0,0-5,5V225.7c0,.11,0,.22,0,.34s0,.36.06.54a4.26,4.26,0,0,0,.14.54c0,.11,0,.22.09.33a1,1,0,0,1,0,.1c0,.1.09.19.14.29a4.16,4.16,0,0,0,.28.51,2.33,2.33,0,0,0,.17.26,6.12,6.12,0,0,0,.4.49l.17.18a5,5,0,0,0,.67.55l.1.06a7,7,0,0,0,.66.36l.28.11a5.76,5.76,0,0,0,.59.18,2.3,2.3,0,0,0,.28.06,4.43,4.43,0,0,0,.9.1,5,5,0,0,0,.94-.1c.13,0,.26-.07.38-.1s.29-.07.43-.12l44.71-16.77,42.7,16c.14,0,.29.08.43.12s.25.08.38.1a4.29,4.29,0,0,0,.94.1,5.28,5.28,0,0,0,.9-.09l.28-.07a3.09,3.09,0,0,0,.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36l.1,0a5.1,5.1,0,0,0,.67-.56l.17-.18a3.88,3.88,0,0,0,.4-.49,2.2,2.2,0,0,0,.17-.25,3.74,3.74,0,0,0,.28-.52,2.59,2.59,0,0,0,.14-.29,1,1,0,0,0,0-.1,1.68,1.68,0,0,0,.09-.32,5.36,5.36,0,0,0,.14-.54,3.31,3.31,0,0,0,.06-.55c0-.11,0-.22,0-.34V195.07l28.38-10.64a5,5,0,1,0-3.51-9.36l-74.32,27.86-41.46-15.54V147.85A5,5,0,0,0,331.87,142.85Zm85.91,56v18.91l-25.2-9.46Zm-53.69,9.45-27.22,10.21V198.07Z"
                          fill="#fff"
                        />
                        <path
                          d="M42.78,174.88a5,5,0,0,0-5,5v33.83L28,221.84a5,5,0,1,0,6.38,7.71l10.14-8.4h84.25a5,5,0,0,0,0-10H56.55l31.74-26.27h40.43a5,5,0,0,0,5-5V144.93c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,4.14,4.14,0,0,0-.09-.46c0-.15-.09-.31-.14-.46s-.12-.31-.19-.46-.14-.28-.22-.41-.19-.3-.3-.44-.08-.14-.13-.2l-.16-.15a4.31,4.31,0,0,0-.37-.37,3.47,3.47,0,0,0-.37-.3,2.9,2.9,0,0,0-.41-.27,4.16,4.16,0,0,0-.42-.23,4.69,4.69,0,0,0-.45-.18l-.46-.14a3.55,3.55,0,0,0-.47-.09,2.94,2.94,0,0,0-.51,0,1.81,1.81,0,0,0-.23,0H42.78a5,5,0,0,0,0,10h72.06L84.69,174.88Zm5,30.55V184.88H72.61Zm75.94-49.87v19.32H100.37Z"
                          fill="#fff"
                        />
                        <path
                          d="M510.59,303.67a5,5,0,0,0-5,5v33.82l-9.84,8.14a5,5,0,0,0,3.19,8.85,4.93,4.93,0,0,0,3.19-1.15l10.14-8.39h84.25a5,5,0,0,0,0-10H524.35l31.74-26.27h40.43a5,5,0,0,0,5-5V273.72c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,3.73,3.73,0,0,0-.09-.46c0-.16-.09-.31-.14-.47s-.12-.31-.19-.46-.14-.27-.22-.4a4.4,4.4,0,0,0-.3-.45c0-.06-.08-.13-.13-.19s-.11-.1-.16-.16a4.17,4.17,0,0,0-.37-.36l-.37-.31c-.13-.09-.26-.18-.4-.26s-.28-.16-.43-.23a3.38,3.38,0,0,0-.44-.18,4.26,4.26,0,0,0-.47-.15l-.46-.08a4.78,4.78,0,0,0-.53-.06l-.22,0H510.59a5,5,0,1,0,0,10h72.05l-30.15,24.95Zm5,30.55V313.67h24.82Zm75.93-49.87v19.32H568.17Z"
                          fill="#fff"
                        />
                        <path
                          d="M171.15,230.7h70.73a5,5,0,0,0,5-5V193.16l21.42-22,33.53,29.11a5,5,0,0,0,6.56-7.55l-63.23-54.9c-.08-.07-.16-.11-.23-.17a4.27,4.27,0,0,0-.44-.3,4.23,4.23,0,0,0-.41-.23l-.46-.2c-.15-.06-.31-.1-.47-.15l-.46-.1a4.75,4.75,0,0,0-.53,0l-.28,0-.17,0a4.53,4.53,0,0,0-.53,0,3.25,3.25,0,0,0-.45.08,4.42,4.42,0,0,0-.48.15l-.44.16c-.15.07-.29.15-.43.23a3.54,3.54,0,0,0-.41.26l-.36.29c-.13.12-.26.24-.38.37l-.13.11c-.06.08-.1.16-.16.23s-.21.29-.31.44l-.22.41c-.07.15-.14.3-.2.46a3.68,3.68,0,0,0-.15.47c0,.15-.07.3-.1.46a4.75,4.75,0,0,0-.05.53c0,.1,0,.19,0,.28v47.53L206.14,220.7h-35a5,5,0,0,0,0,10Zm75.73-78.17,13.86,12-13.86,14.25Zm-10,50.91V220.7H220.09Z"
                          fill="#fff"
                        />
                        <path
                          d="M463.61,278.47a5,5,0,1,0-5.09-8.6l-65.38,38.65-65.39-38.65a5,5,0,1,0-5.09,8.6L348.89,294v40.7l-26.23,15.5a5,5,0,0,0,5.09,8.61l65.39-38.66,65.38,38.66a5,5,0,1,0,5.09-8.61l-26.22-15.5V294Zm-104.72,50.3V299.89l24.42,14.44Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L403,314.33l24.43-14.44Z"
                          fill="#fff"
                        />
                        <path
                          d="M176.86,271.63a5,5,0,0,0-5,5v77.85c0,.12,0,.23,0,.35s0,.36.06.54a4.75,4.75,0,0,0,.14.54c0,.11,0,.22.09.33l0,.09c0,.1.09.2.14.3a5.05,5.05,0,0,0,.28.51c.05.09.11.17.17.26s.26.33.4.48l.17.19a5,5,0,0,0,.67.55l.1.05a4.22,4.22,0,0,0,.66.36c.09.05.19.08.28.12s.39.13.59.18l.28.06a4.43,4.43,0,0,0,.9.09,5,5,0,0,0,.94-.09l.38-.11a3,3,0,0,0,.43-.12l44.71-16.76,42.7,16c.14,0,.29.08.43.12s.25.08.38.1a5,5,0,0,0,.94.1,5.28,5.28,0,0,0,.9-.09l.28-.07a5.76,5.76,0,0,0,.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36l.1-.06a5,5,0,0,0,.67-.55l.17-.18a6.12,6.12,0,0,0,.4-.49l.17-.25a3.74,3.74,0,0,0,.28-.52c.05-.1.1-.19.14-.29a.47.47,0,0,1,0-.1c0-.11.05-.22.08-.33a4.58,4.58,0,0,0,.14-.53,3.55,3.55,0,0,0,.06-.55c0-.12,0-.23,0-.34V323.86l28.38-10.64a5,5,0,1,0-3.51-9.36l-74.32,27.86-41.46-15.55V276.63A5,5,0,0,0,176.86,271.63Zm85.91,56v18.9l-25.2-9.45Zm-53.69,9.45-27.22,10.21V326.85Z"
                          fill="#fff"
                        />
                        <path
                          d="M446.85,401.36a3.4,3.4,0,0,0-.09-.46,7.71,7.71,0,0,0-.33-.93c-.07-.14-.15-.27-.23-.41s-.19-.3-.29-.44-.08-.13-.13-.19-.11-.11-.16-.16a4.44,4.44,0,0,0-.38-.37,2.6,2.6,0,0,0-.36-.3c-.13-.1-.27-.18-.41-.27l-.42-.23c-.15-.07-.29-.12-.45-.18l-.47-.14a3.4,3.4,0,0,0-.46-.09,3,3,0,0,0-.52-.05l-.22,0H356a5,5,0,0,0,0,10H428l-30.14,25H356a5,5,0,0,0-5,5v33.82L341.16,479a5,5,0,1,0,6.38,7.7l10.14-8.4h84.25a5,5,0,0,0,0-10H369.76l31.74-26.26h40.43a5,5,0,0,0,5-5v-35a2.08,2.08,0,0,0,0-.23A3.05,3.05,0,0,0,446.85,401.36ZM361,462.61V442.07h24.82Zm52.59-30.54,23.35-19.33v19.33Z"
                          fill="#fff"
                        />
                        <path
                          d="M308.6,406.87a5,5,0,0,0-5.09-8.61l-65.38,38.65-65.39-38.65a5,5,0,1,0-5.09,8.61l26.23,15.5v40.7l-26.23,15.5a5,5,0,1,0,5.09,8.61l65.39-38.65,65.38,38.65a5,5,0,1,0,5.09-8.61l-26.22-15.5v-40.7ZM203.88,457.16V428.28l24.42,14.44Zm68.5-20h-6a5,5,0,1,0,0,10h6v10L248,442.72l24.43-14.44Z"
                          fill="#fff"
                        />
                        <path
                          d="M139.44,432.25,65.13,460.12,23.66,444.57V405a5,5,0,0,0-10,0v77.85c0,.11,0,.22,0,.34a5.35,5.35,0,0,0,.05.55,4.58,4.58,0,0,0,.14.53c0,.11,0,.22.09.33s0,.06,0,.1.09.19.14.29.18.35.28.52l.17.25c.13.17.26.33.4.49l.17.18a5,5,0,0,0,.67.55l.1.06a4.22,4.22,0,0,0,.66.36l.29.11a5.58,5.58,0,0,0,.58.18l.28.07a5.49,5.49,0,0,0,.9.09,5.11,5.11,0,0,0,.95-.1c.13,0,.25-.07.37-.1l.44-.12L65.13,470.8l42.69,16a3.45,3.45,0,0,0,.43.12l.38.11a5.07,5.07,0,0,0,.94.09,5.5,5.5,0,0,0,.91-.09l.28-.06a4.36,4.36,0,0,0,.58-.19l.28-.11a4.83,4.83,0,0,0,.67-.36l.09-.05a4.42,4.42,0,0,0,.67-.56,1.45,1.45,0,0,0,.17-.18,3.88,3.88,0,0,0,.4-.49l.18-.25c.1-.16.19-.34.28-.52s.09-.19.13-.29l.05-.09c0-.11,0-.22.08-.33a4.77,4.77,0,0,0,.15-.54,4.89,4.89,0,0,0,.05-.55c0-.11,0-.22,0-.34V452.26L143,441.62a5,5,0,0,0-3.51-9.37ZM23.66,475.66V455.25l27.22,10.21Zm80.92-.75-25.21-9.45L104.58,456Z"
                          fill="#fff"
                        />
                        <path
                          d="M87,266.57c-.07-.06-.16-.1-.23-.16s-.29-.21-.44-.31-.27-.15-.41-.22l-.45-.2-.48-.15-.45-.1a4.93,4.93,0,0,0-.54-.05,2.66,2.66,0,0,0-.28,0l-.16,0a3.19,3.19,0,0,0-.54.05l-.45.07c-.16,0-.32.1-.48.15a3.34,3.34,0,0,0-.44.17,4.36,4.36,0,0,0-.42.23,3.66,3.66,0,0,0-.42.26l-.35.29A4.49,4.49,0,0,0,80,267l-.12.12c-.07.07-.11.16-.17.23a4.91,4.91,0,0,0-.31.44c-.08.13-.15.27-.22.41s-.14.3-.2.45-.1.32-.15.48-.07.3-.1.46a4.53,4.53,0,0,0-.05.53,2.4,2.4,0,0,0,0,.28v47.53l-30.74,31.6H13a5,5,0,1,0,0,10H83.68a5,5,0,0,0,5-5V321.94l21.42-22L143.63,329a5,5,0,0,0,3.28,1.22,5,5,0,0,0,3.28-8.77Zm-8.28,82.91H61.89l16.79-17.26Zm10-41.88V281.31l13.86,12Z"
                          fill="#fff"
                        />
                        <path
                          d="M554.76,395a1.19,1.19,0,0,0-.23-.16,3.47,3.47,0,0,0-.44-.31,3.3,3.3,0,0,0-.41-.23l-.45-.2-.48-.14a3.63,3.63,0,0,0-.45-.1l-.54-.06c-.09,0-.18,0-.28,0l-.16,0-.54.05c-.15,0-.3,0-.45.08l-.48.15-.44.16-.42.23-.42.26-.35.29a4.59,4.59,0,0,0-.39.37,1.31,1.31,0,0,0-.12.11c-.07.08-.11.16-.17.23s-.21.29-.3.44a4.23,4.23,0,0,0-.23.41c-.07.15-.14.3-.2.46a3.64,3.64,0,0,0-.14.47c0,.15-.08.3-.11.46s0,.35,0,.53,0,.19,0,.28v47.54l-30.73,31.6h-35a5,5,0,0,0,0,10h70.73a5,5,0,0,0,5-5V450.34l21.43-22,33.52,29.11a5,5,0,1,0,6.56-7.55Zm-8.28,82.91H529.7l16.78-17.26Zm10-41.89V409.71l13.86,12Z"
                          fill="#fff"
                        />
                      </g>
                    </svg>
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
              <div className="best_with">
                <div className="title">[짝으로서 좋은 가면]</div>
                <div className="best_with_masks_container">
                  <div className="best_with_masks man">
                    <div className="gender_title">남자의 경우</div>
                    {best_with_gender(personality, 0)}
                  </div>
                  <div className="best_with_masks woman">
                    <div className="gender_title">여자의 경우</div>
                    {best_with_gender(personality, 1)}
                  </div>
                </div>
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
                              text={baseURL + "share/" + id}
                              onCopy={() => {
                                ReactGA.event({
                                  category: "Share",
                                  action: "Share by copying link",
                                });
                                alert("공유 링크가 복사되었습니다!");
                              }}
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
