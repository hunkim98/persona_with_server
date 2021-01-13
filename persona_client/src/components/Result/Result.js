import React, { useEffect } from "react";
import mask_pattern_white from "../svg/mask_pattern_white.svg";
import "./Result.css";
import { mask_circle } from "./mask_result";
import { useMediaQuery } from "react-responsive";
import { mask_names, mask_basic_info, mask_get_along } from "./mask_info";
import { maskGoodBad } from "./mask_good_bad";

function Result({ personality, changeColor, setPersonality, name }) {
  useEffect(() => {
    changeColor("#76729F");
  }, []);

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

  const share_result = () => {
    console.log("Result has been shared");
  };

  return (
    <>
      <div className="result_container">
        <div className="result_pattern_container">
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
        </div>
        <div className="result_mask_information">
          <div className="result_acquaintance_name">{name}님의 가면:</div>
          <div className="result_personality">"{show_mask_name()}" 가면</div>
        </div>
        <div className="result_basic_info_container">
          <div className="result_basic_information">{show_basic_info()}</div>
        </div>
        <div className="result_additional_info_container">
          <div className="good_and_bad">
            <div className="title">해당 가면의 장점/단점</div>
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
          <div className="how_to_get_along">
            <div className="title">해당 가면을 지닌 사람과 잘 지내려면?</div>
            <ol className="info">{show_get_along()}</ol>
          </div>
        </div>
        <div className="result_buttons">
          <div className="share_result" onClick={share_result}>
            공유하기
          </div>
          <div className="another_test">다른 페르소나 찾기</div>
        </div>
      </div>
    </>
  );
}

export default Result;
