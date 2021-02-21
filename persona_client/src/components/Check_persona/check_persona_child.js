import React from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spring } from "react-spring/renderprops";
import LastQuestion from "./lastQuestion";
import QuestionCount from "./questionCount";
import { useMediaQuery } from "react-responsive";
import BackButton from "../backbutton/BackButton";
import axios from "axios";

let hornevian_result = [];
let harmonic_result = [];

function CheckPersonaChild({
  name,
  questionNumber,
  setQuestionNumber,
  hornevian,
  harmonic,
  types_adjectives,
}) {
  const [personality, setPersonality] = useState(0);
  const isDesktopOrMobile = useMediaQuery({
    query: "(min-width:1000px)",
  });
  const history = useHistory();

  const [possibleTypes, setPossibleTypes] = useState([]);
  const [goToBonus, setGoToBonus] = useState(false);

  const personality_question = () => {
    if (questionNumber < hornevian.length) {
      //this is for hornevian
      if (questionNumber === 0) {
        setQuestionNumber(1);
      } else {
        setQuestionNumber((previousNumber) => previousNumber + 1);
      }
    } else {
      console.log(questionNumber);
      if (questionNumber == harmonic.length + hornevian.length - 1) {
        check_type();
        //do nothing
      } else {
        setQuestionNumber((previousNumber) => previousNumber + 1);
      }
      //this is for harmonic
    }
  };

  const show_question = () => {
    if (questionNumber < hornevian.length) {
      return hornevian[questionNumber].question;
    } else if (goToBonus) {
      return name + "님에게 가장 어울리는 수식어 하나는?";
    } else {
      return harmonic[questionNumber - hornevian.length].question;
    }
  };

  const show_answer = (type) => {
    if (questionNumber < hornevian.length) {
      return hornevian[questionNumber].options[type].selection;
    } else {
      return harmonic[questionNumber - hornevian.length].options[type]
        .selection;
    }
  };

  const answered_question = (answer) => {
    if (questionNumber < hornevian.length) {
      hornevian_result[questionNumber] =
        hornevian[questionNumber].options[answer].id;
      console.log(hornevian_result);
      console.log(questionNumber);
    } else {
      harmonic_result[questionNumber - hornevian.length] =
        harmonic[questionNumber - hornevian.length].options[answer].id;
      console.log(harmonic_result);
    }
  };

  const check_hornevian_type = () => {
    let hornevian_type = [0, 0, 0];
    let decided_hornevian = [];
    for (let i = 0; i < hornevian_result.length; i++) {
      if (hornevian_result[i] === "A") {
        hornevian_type[0]++;
      } else if (hornevian_result[i] === "W") {
        hornevian_type[1]++;
      } else if (hornevian_result[i] === "C") {
        hornevian_type[2]++;
      }
    }
    for (let j = 0; j < hornevian_type.length; j++) {
      if (Math.max(...hornevian_type) === hornevian_type[j]) {
        if (j === 0) {
          decided_hornevian.push("A");
        }
        if (j === 1) {
          decided_hornevian.push("B");
        }
        if (j === 2) {
          decided_hornevian.push("C");
        }
      }
    }
    return decided_hornevian;
  };

  const check_harmonic_type = () => {
    let harmonic_type = [0, 0, 0];
    let decided_harmonic = [];
    for (let i = 0; i < harmonic_result.length; i++) {
      if (harmonic_result[i] === "P") {
        harmonic_type[0]++;
      } else if (harmonic_result[i] === "C") {
        harmonic_type[1]++;
      } else if (harmonic_result[i] === "B") {
        harmonic_type[2]++;
      }
    }
    for (let j = 0; j < harmonic_type.length; j++) {
      if (Math.max(...harmonic_type) === harmonic_type[j]) {
        if (j === 0) {
          decided_harmonic.push("X");
        }
        if (j === 1) {
          decided_harmonic.push("Z");
        }
        if (j === 2) {
          decided_harmonic.push("Y");
        }
      }
    }
    return decided_harmonic;
  };

  const check_type = () => {
    //this is for checking when to go to the result page
    if (
      check_harmonic_type().length === 1 &&
      check_hornevian_type().length === 1
    ) {
      console.log(check_hornevian_type()[0] + check_harmonic_type()[0]);
      if (check_hornevian_type()[0] + check_harmonic_type()[0] === "AX") {
        setPersonality(7);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "AY"
      ) {
        setPersonality(8);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "AZ"
      ) {
        setPersonality(3);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "BX"
      ) {
        setPersonality(9);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "BY"
      ) {
        setPersonality(4);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "BZ"
      ) {
        setPersonality(5);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "CX"
      ) {
        setPersonality(2);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "CY"
      ) {
        setPersonality(6);
      } else if (
        check_hornevian_type()[0] + check_harmonic_type()[0] ===
        "CZ"
      ) {
        setPersonality(1);
      }
    } else {
      for (let i = 0; i < check_hornevian_type().length; i++) {
        for (let j = 0; j < check_harmonic_type().length; j++) {
          setPossibleTypes((oldArray) => [
            ...oldArray,
            check_hornevian_type()[i] + check_harmonic_type()[j],
          ]);
        }
      }
      setGoToBonus(true);
      console.log(possibleTypes);
      //setQuestionNumber(harmonic.length + hornevian.length + 1);
    }

    // eslint-disable-next-line
  };

  useEffect(() => {
    if (personality !== 0) {
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
          console.log(res.data.id);
          history.push("/result/" + res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [personality]);

  useEffect(() => {
    setPersonality(0);
    setQuestionNumber(0);
  }, []);

  const previousQuestion = () => {
    if (goToBonus) {
      setGoToBonus(false);
      setQuestionNumber(harmonic.length + hornevian.length - 1);
      setPossibleTypes([]);
    } else {
      setQuestionNumber((previousNumber) => previousNumber - 1);
    }
  };
  return (
    <>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <div style={props}>
            {isDesktopOrMobile ? (
              <div className="question_pattern">
                <svg
                  className="question_pattern1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="304.06"
                  height="741.7695"
                  viewBox="0 0 304.06 741.7695"
                >
                  <path d="M143.4,9.76a5,5,0,0,0-5.08-8.61L72.93,39.8,7.54,1.15A5,5,0,0,0,2.46,9.76l26.22,15.5V66L2.46,81.46a5,5,0,0,0,5.08,8.61L72.93,51.42l65.39,38.65a5,5,0,0,0,5.08-8.61L117.18,66V25.26ZM38.68,60.05V31.17L63.1,45.61Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L82.76,45.61l24.42-14.44Z" />
                  <path d="M182.34,90.76a5,5,0,0,0,3.19-1.15l10.14-8.39h84.25a5,5,0,0,0,0-10H207.75L239.49,45h40.43a5,5,0,0,0,5-5V5a1.81,1.81,0,0,0,0-.23,3.17,3.17,0,0,0-.05-.53,3.73,3.73,0,0,0-.09-.46c0-.16-.09-.31-.14-.47s-.12-.31-.19-.46-.14-.27-.22-.4-.19-.3-.3-.45-.08-.13-.13-.19-.11-.1-.16-.16a4.17,4.17,0,0,0-.37-.36L282.87,1c-.13-.09-.26-.18-.4-.26s-.28-.16-.43-.23a4.07,4.07,0,0,0-.44-.18l-.48-.15-.45-.08a4.78,4.78,0,0,0-.53-.06l-.22,0H194a5,5,0,0,0,0,10h72L235.89,35H194a5,5,0,0,0-5,5V73.77l-9.83,8.14a5,5,0,0,0-.66,7A5,5,0,0,0,182.34,90.76Zm92.58-75.13V35H251.57ZM199,45h24.83L199,65.5Z" />
                  <path d="M35.78,164.51a5,5,0,0,0-5,5v33.82L21,211.47a5,5,0,1,0,6.38,7.7l10.14-8.39h84.25a5,5,0,0,0,0-10H49.55l31.74-26.27h40.43a5,5,0,0,0,5-5V134.56c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,3.73,3.73,0,0,0-.09-.46c0-.16-.09-.31-.14-.47s-.12-.31-.19-.46-.14-.27-.22-.4a4.4,4.4,0,0,0-.3-.45c0-.06-.08-.13-.13-.19s-.11-.1-.16-.16a4.17,4.17,0,0,0-.37-.36l-.37-.31c-.13-.09-.26-.18-.4-.26s-.28-.16-.43-.23a3.38,3.38,0,0,0-.44-.18,4.26,4.26,0,0,0-.47-.15l-.46-.08a4.52,4.52,0,0,0-.53-.06l-.22,0H35.78a5,5,0,0,0,0,10h72.06L77.69,164.51Zm5,30.55V174.51H65.61Zm75.94-49.87v19.32H93.37Z" />
                  <path d="M164.15,220.32h70.73a5,5,0,0,0,5-5V182.78l21.42-22,33.53,29.11a5,5,0,0,0,6.56-7.55l-63.23-54.91c-.07-.06-.16-.1-.23-.16s-.29-.21-.44-.31-.27-.15-.41-.22l-.46-.2a3.68,3.68,0,0,0-.47-.15l-.46-.1a4.75,4.75,0,0,0-.53,0l-.28,0-.17,0a3.07,3.07,0,0,0-.53.05l-.45.07-.48.15a3.34,3.34,0,0,0-.44.17,6.58,6.58,0,0,0-.84.49,4.57,4.57,0,0,0-.36.29c-.13.12-.26.23-.38.36a1.42,1.42,0,0,1-.13.12c-.06.07-.1.16-.16.23a4.91,4.91,0,0,0-.31.44c-.08.13-.15.27-.22.41s-.14.3-.2.45-.1.32-.15.48-.07.3-.1.46a4.53,4.53,0,0,0-.05.53,2.4,2.4,0,0,0,0,.28v47.53l-30.74,31.6h-35a5,5,0,0,0,0,10Zm75.73-78.17,13.86,12-13.86,14.25Zm-10,50.91v17.26H213.09Z" />
                  <path d="M169.86,261.26a5,5,0,0,0-5,5v77.85c0,.12,0,.23,0,.34s0,.37.06.55a5.36,5.36,0,0,0,.14.54,3,3,0,0,0,.09.32,1,1,0,0,0,0,.1,2.59,2.59,0,0,0,.14.29c.09.18.18.35.28.52l.17.25a5,5,0,0,0,.4.49l.17.18a5.1,5.1,0,0,0,.67.56l.1.05a4.22,4.22,0,0,0,.66.36l.28.11a3.32,3.32,0,0,0,.59.18l.28.07a5.49,5.49,0,0,0,.9.09,4.29,4.29,0,0,0,.94-.1,3.49,3.49,0,0,0,.38-.1l.44-.12L216.33,332,259,348c.14,0,.29.07.43.11l.38.11a5,5,0,0,0,.94.09,4.6,4.6,0,0,0,.91-.09l.27-.06a5.76,5.76,0,0,0,.59-.18l.28-.11a7,7,0,0,0,.66-.36l.1-.06a5,5,0,0,0,.67-.55l.17-.19a4.63,4.63,0,0,0,.4-.48c.06-.09.12-.17.17-.26a3.15,3.15,0,0,0,.28-.51,2.75,2.75,0,0,0,.14-.3.41.41,0,0,1,0-.09c0-.11.05-.22.08-.33a3.85,3.85,0,0,0,.2-1.08c0-.12,0-.23,0-.35V313.49l28.38-10.64a5,5,0,1,0-3.51-9.36l-74.31,27.86L174.86,305.8V266.26A5,5,0,0,0,169.86,261.26Zm85.91,56v18.9l-25.2-9.45Zm-53.69,9.45L174.86,336.9V316.48Z" />
                  <path d="M301.6,468.2l-26.22-15.5V412l26.22-15.5a5,5,0,0,0-5.09-8.61l-65.38,38.65-65.39-38.65a5,5,0,0,0-5.08,8.61L186.88,412v40.7l-26.22,15.5a5,5,0,0,0,5.08,8.61l65.39-38.65,65.38,38.65a5,5,0,1,0,5.09-8.61ZM196.88,446.79V417.91l24.42,14.44Zm68.5-28.88v8.84h-6a5,5,0,0,0,0,10h6v10L241,432.35Z" />
                  <path d="M11.66,389.66a5,5,0,0,0-5,5V472.5c0,.12,0,.23,0,.35a4.93,4.93,0,0,0,0,.54c0,.19.09.36.14.54s.05.22.09.33a.93.93,0,0,0,0,.1c0,.1.09.19.13.29s.18.35.28.51l.17.26a6.26,6.26,0,0,0,.41.49l.16.18a5.11,5.11,0,0,0,.68.55l.09.06a7.12,7.12,0,0,0,.67.36l.28.11a5.58,5.58,0,0,0,.58.18l.28.06a4.58,4.58,0,0,0,.9.09,5.09,5.09,0,0,0,.95-.09l.38-.11c.14,0,.29-.06.43-.11l44.71-16.77,42.69,16c.14.05.29.08.43.12s.25.08.38.1a5.11,5.11,0,0,0,1,.1,5.49,5.49,0,0,0,.9-.09l.28-.07a5.58,5.58,0,0,0,.58-.18l.28-.11a4.83,4.83,0,0,0,.67-.36.47.47,0,0,0,.09-.06,5,5,0,0,0,.67-.55l.17-.18a3.72,3.72,0,0,0,.4-.49l.18-.25c.1-.17.19-.34.28-.52s.09-.19.13-.29l.05-.1c0-.11,0-.22.08-.32a5.44,5.44,0,0,0,.15-.54,5.35,5.35,0,0,0,.05-.55c0-.11,0-.22,0-.34V441.88L136,431.24a5,5,0,1,0-3.51-9.36L58.13,449.74,16.66,434.2V394.66A5,5,0,0,0,11.66,389.66Zm85.92,56v18.9l-25.21-9.45Zm-53.69,9.45L16.66,465.29V444.88Z" />
                  <path d="M1,344.11a5,5,0,0,0,5,5H76.68a5,5,0,0,0,5-5V311.57l21.43-22,33.52,29.12a5,5,0,0,0,6.56-7.56L80,256.2c-.07-.06-.15-.1-.23-.16a4.25,4.25,0,0,0-.43-.31l-.42-.23a4.32,4.32,0,0,0-.45-.19,4.42,4.42,0,0,0-.48-.15,3.63,3.63,0,0,0-.45-.1A5,5,0,0,0,77,255l-.28,0h-.17a4.6,4.6,0,0,0-.52.06l-.46.07a4.26,4.26,0,0,0-.47.15,4.13,4.13,0,0,0-.45.17,4.23,4.23,0,0,0-.42.22l-.42.26c-.12.09-.23.19-.35.3a3.33,3.33,0,0,0-.39.36.68.68,0,0,0-.12.12,2,2,0,0,0-.17.23,4.15,4.15,0,0,0-.3.43,4.36,4.36,0,0,0-.23.42c-.07.15-.14.29-.2.45a4.19,4.19,0,0,0-.14.47c0,.16-.08.31-.11.46s0,.36-.05.54,0,.18,0,.28v47.53l-30.74,31.6H6A5,5,0,0,0,1,344.11Zm80.73-73.17,13.86,12L81.68,297.23Zm-10,50.91v17.26H54.89Z" />
                  <path d="M143.4,531.2a5,5,0,0,0-5.08-8.61L72.93,561.25,7.54,522.59a5,5,0,0,0-5.08,8.61l26.22,15.5v40.7L2.46,602.9A5,5,0,0,0,5,612.21a4.86,4.86,0,0,0,2.53-.7l65.39-38.65,65.39,38.65a4.86,4.86,0,0,0,2.53.7,5,5,0,0,0,2.55-9.31l-26.22-15.5V546.7ZM38.68,581.49V552.61L63.1,567.05Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L82.76,567.05l24.42-14.43Z" />
                  <path d="M194,556.4a5,5,0,0,0-5,5v33.82l-9.83,8.14a5,5,0,1,0,6.38,7.7l10.14-8.39h84.25a5,5,0,0,0,0-10H207.75l31.74-26.27h40.43a5,5,0,0,0,5-5V526.45a1.6,1.6,0,0,0,0-.23,3.07,3.07,0,0,0-.05-.53,3.4,3.4,0,0,0-.09-.46c0-.16-.09-.31-.14-.47s-.12-.31-.19-.46l-.22-.41c-.1-.15-.19-.3-.3-.44s-.08-.13-.13-.19l-.16-.16-.37-.37c-.12-.1-.24-.21-.37-.3a2.85,2.85,0,0,0-.41-.26,3.5,3.5,0,0,0-.42-.24,4.7,4.7,0,0,0-.45-.17,4.11,4.11,0,0,0-.46-.15l-.46-.09-.53,0-.22,0H194a5,5,0,0,0,0,10h72L235.89,556.4Zm5,30.54V566.4h24.83Zm75.94-49.87V556.4H251.57Z" />
                  <path d="M35.78,686a5,5,0,0,0-5,5v33.82L21,732.92a5,5,0,1,0,6.38,7.7l10.14-8.39h84.25a5,5,0,1,0,0-10H49.55L81.29,696h40.43a5,5,0,0,0,5-5V656c0-.08,0-.16,0-.23a4.52,4.52,0,0,0-.06-.53,3.4,3.4,0,0,0-.09-.46c0-.16-.09-.32-.14-.47s-.12-.31-.19-.46l-.22-.41a4.27,4.27,0,0,0-.3-.44c0-.06-.08-.13-.13-.19l-.16-.16-.37-.37c-.12-.1-.24-.21-.37-.3a3.42,3.42,0,0,0-.4-.26,3.62,3.62,0,0,0-.43-.24l-.44-.18-.47-.14a3.73,3.73,0,0,0-.46-.09A4.8,4.8,0,0,0,122,651l-.23,0H35.78a5,5,0,1,0,0,10h72.06L77.69,686Zm5,30.54V696H65.61Zm75.94-49.87V686H93.37Z" />
                  <path d="M238.16,648.86c-.07-.06-.16-.1-.23-.16a4.37,4.37,0,0,0-.44-.31l-.41-.23-.46-.2-.47-.14a3.41,3.41,0,0,0-.46-.1,4.78,4.78,0,0,0-.53-.06c-.1,0-.19,0-.28,0l-.17,0a4.52,4.52,0,0,0-.53.06l-.45.07-.48.15-.44.16a3.62,3.62,0,0,0-.43.24c-.14.08-.28.16-.41.25s-.24.19-.36.3a4.27,4.27,0,0,0-.38.36,1.42,1.42,0,0,0-.13.12c-.06.07-.1.15-.16.23s-.21.28-.31.43-.15.28-.22.42a4.68,4.68,0,0,0-.2.45c-.06.16-.1.31-.15.47s-.07.31-.1.46a5,5,0,0,0-.05.53c0,.1,0,.19,0,.28v47.54l-30.74,31.6h-35a5,5,0,1,0,0,10h70.73a5,5,0,0,0,5-5V704.23l21.42-22,33.53,29.11a5,5,0,0,0,7.05-.49,5,5,0,0,0-.49-7.06Zm-8.28,82.91H213.09l16.79-17.26Zm10-41.88V663.6l13.86,12Z" />
                  <path d="M290.64,814.93l-74.31,27.86-41.47-15.54V787.71a5,5,0,0,0-10,0v77.85c0,.11,0,.22,0,.34s0,.36.06.55a4.58,4.58,0,0,0,.14.53c0,.11,0,.22.09.33a1,1,0,0,1,0,.1c0,.1.09.19.14.29s.18.35.28.52l.17.25c.13.17.26.33.4.49l.17.18a5,5,0,0,0,.67.55l.1.06a7,7,0,0,0,.66.36l.28.11c.2.07.39.13.59.18a2.3,2.3,0,0,0,.28.06,4.59,4.59,0,0,0,.9.1,5,5,0,0,0,.94-.1,3.49,3.49,0,0,0,.38-.1l.44-.12,44.71-16.77,42.69,16c.14,0,.29.08.43.12a2.66,2.66,0,0,0,.38.1,4.29,4.29,0,0,0,.94.1,5.5,5.5,0,0,0,.91-.09l.27-.07a3.09,3.09,0,0,0,.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36l.1,0a5.1,5.1,0,0,0,.67-.56c.06,0,.11-.12.17-.18a3.88,3.88,0,0,0,.4-.49,2.2,2.2,0,0,0,.17-.25,3.74,3.74,0,0,0,.28-.52,2.59,2.59,0,0,0,.14-.29l0-.1a3,3,0,0,0,.08-.32,3.58,3.58,0,0,0,.14-.54,3.31,3.31,0,0,0,.06-.55c0-.11,0-.22,0-.34V834.93l28.38-10.64a5,5,0,1,0-3.51-9.36ZM174.86,858.34V837.93l27.22,10.2Zm80.91-.75-25.2-9.46,25.2-9.45Z" />
                  <path d="M80,777.65a2,2,0,0,0-.23-.17,4.15,4.15,0,0,0-.43-.3,4.36,4.36,0,0,0-.42-.23l-.45-.2L78,776.6l-.45-.1a4.93,4.93,0,0,0-.54,0,2.4,2.4,0,0,0-.28,0l-.17,0a4.57,4.57,0,0,0-.52,0,3.4,3.4,0,0,0-.46.08l-.47.14-.45.17-.42.23a4.78,4.78,0,0,0-.42.26l-.35.29A4.59,4.59,0,0,0,73,778a1.31,1.31,0,0,0-.12.11c-.07.08-.11.16-.17.23s-.21.29-.3.44a4.23,4.23,0,0,0-.23.41c-.07.15-.14.3-.2.46a3.64,3.64,0,0,0-.14.47c0,.15-.08.3-.11.46s0,.35-.05.53,0,.19,0,.28V829L40.94,860.56H6a5,5,0,0,0,0,10H76.68a5,5,0,0,0,5-5V833l21.43-22,33.52,29.11a5,5,0,1,0,6.56-7.55Zm-8.28,82.91H54.89L71.68,843.3Zm10-41.89V792.39l13.86,12Z" />
                </svg>
                <svg
                  className="question_pattern2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="300.45"
                  height="741.7695"
                  viewBox="0 0 300.45 741.7695"
                >
                  <path d="M298,214.39l-26.23-15.5v-40.7L298,142.69a5,5,0,0,0-5.09-8.61l-65.39,38.65-65.38-38.65a5,5,0,1,0-5.09,8.61l26.22,15.5v40.7l-26.22,15.5a5,5,0,0,0,5.09,8.61l65.38-38.65L292.91,223a5,5,0,0,0,5.09-8.61ZM193.27,193V164.1l24.43,14.44Zm68.5-28.88v8.84h-6a5,5,0,0,0,0,10h6v10l-24.42-14.44Z" />
                  <path d="M161.35,90a4.75,4.75,0,0,0,.14.54c0,.11,0,.22.08.33a.31.31,0,0,1,.05.1c0,.1.09.19.14.29a3.15,3.15,0,0,0,.28.51c.05.09.11.17.17.26a4.63,4.63,0,0,0,.4.48l.17.19a5,5,0,0,0,.67.55l.1.06a7,7,0,0,0,.66.36l.28.11a5.76,5.76,0,0,0,.59.18,2.3,2.3,0,0,0,.28.06,4.43,4.43,0,0,0,.9.09,5,5,0,0,0,.94-.09l.38-.11c.14,0,.29-.06.43-.11l44.71-16.77,42.69,16,.44.12a3.49,3.49,0,0,0,.38.1,5,5,0,0,0,.94.1,5.49,5.49,0,0,0,.9-.09l.28-.07c.2,0,.39-.11.59-.18l.28-.11a4.22,4.22,0,0,0,.66-.36.53.53,0,0,0,.1-.06,5,5,0,0,0,.67-.55l.17-.18c.14-.15.27-.32.4-.49l.17-.25c.1-.17.19-.34.28-.52s.1-.19.14-.29a1,1,0,0,0,0-.1c0-.11.06-.22.09-.32a3.41,3.41,0,0,0,.19-1.09c0-.11,0-.22,0-.34V58.51l28.38-10.64A5,5,0,0,0,287,38.51L212.72,66.37,171.26,50.83V11.29a5,5,0,1,0-10,0V89.13c0,.12,0,.23,0,.35A3.31,3.31,0,0,0,161.35,90Zm90.82-27.76v18.9L227,71.71Zm-53.69,9.45L171.26,81.92V61.51Z" />
                  <path d="M6,94.13H76.68a5,5,0,0,0,5-5V56.59l21.43-22,33.52,29.11a5,5,0,1,0,6.56-7.55L80,1.22c-.07-.06-.16-.1-.23-.16s-.29-.21-.44-.31S79,.6,78.88.53l-.46-.2c-.15-.06-.31-.1-.46-.15l-.47-.1A4.57,4.57,0,0,0,77,0a2.85,2.85,0,0,0-.29,0l-.17,0A4.36,4.36,0,0,0,76,.07a3.4,3.4,0,0,0-.46.08,4.19,4.19,0,0,0-.47.14,4.13,4.13,0,0,0-.45.17l-.42.23a4.78,4.78,0,0,0-.42.26l-.35.29a4.59,4.59,0,0,0-.39.37,1.31,1.31,0,0,0-.12.11c-.07.07-.11.16-.17.23s-.21.29-.31.44-.15.27-.22.41-.14.3-.2.46-.1.31-.15.47-.07.3-.1.46a4.53,4.53,0,0,0-.05.53,2.4,2.4,0,0,0,0,.28V52.53L40.94,84.13H6a5,5,0,0,0,0,10ZM81.68,16,95.54,28,81.68,42.25Zm-10,50.91V84.13H54.89Z" />
                  <path d="M11.66,135.85a5,5,0,0,0-5,5v77.84c0,.12,0,.23,0,.35a4.93,4.93,0,0,0,0,.54,4.75,4.75,0,0,0,.14.54c0,.11.05.22.09.33l0,.09.14.3c.09.18.18.35.28.51l.17.26a4.72,4.72,0,0,0,.41.48,1.46,1.46,0,0,0,.16.19,5,5,0,0,0,.67.55l.1.06a7,7,0,0,0,.66.36l.29.11a5.58,5.58,0,0,0,.58.18l.28.06a4.58,4.58,0,0,0,.9.09,5.09,5.09,0,0,0,.95-.09l.38-.11c.14,0,.28-.06.43-.11l44.71-16.77,42.69,16c.14,0,.29.08.43.12s.25.08.38.1a5.09,5.09,0,0,0,.94.1,5.5,5.5,0,0,0,.91-.09l.28-.07a5.58,5.58,0,0,0,.58-.18l.28-.11a4.83,4.83,0,0,0,.67-.36l.09-.06a5,5,0,0,0,.67-.55l.17-.18a3.72,3.72,0,0,0,.4-.49l.18-.25c.1-.17.19-.34.28-.52s.09-.19.13-.29a.93.93,0,0,0,.05-.1c0-.11,0-.22.08-.33a4.61,4.61,0,0,0,.15-.53,5.35,5.35,0,0,0,.05-.55c0-.11,0-.22,0-.34V188.07L136,177.43a5,5,0,1,0-3.51-9.36L58.13,195.93,16.66,180.39V140.85A5,5,0,0,0,11.66,135.85Zm85.92,56v18.9l-25.21-9.45Zm-53.69,9.45L16.66,211.48V191.06Z" />
                  <path d="M190.38,296.67a5,5,0,0,0-5,5v33.82l-9.84,8.14a5,5,0,1,0,6.38,7.7l10.14-8.39h84.25a5,5,0,0,0,0-10H204.15l31.73-26.27h40.43a5,5,0,0,0,5-5V266.72c0-.08,0-.16,0-.23s0-.36-.05-.53-.05-.31-.09-.46A4.26,4.26,0,0,0,281,265a3.71,3.71,0,0,0-.19-.46,4.1,4.1,0,0,0-.22-.41,4.27,4.27,0,0,0-.3-.44,2,2,0,0,0-.12-.19l-.16-.16c-.12-.13-.25-.25-.38-.37s-.23-.21-.36-.3l-.41-.26a2.91,2.91,0,0,0-.42-.23L278,262a3.68,3.68,0,0,0-.47-.15c-.15,0-.3-.06-.46-.09l-.52-.05-.23,0H190.38a5,5,0,0,0,0,10h72.05l-30.15,24.95Zm5,30.54V306.67H220.2Zm75.93-49.86v19.32H248Z" />
                  <path d="M143.4,271.47a5,5,0,1,0-5.09-8.6L72.93,301.52,7.54,262.87a5,5,0,1,0-5.08,8.6L28.68,287v40.71L2.46,343.18A5,5,0,0,0,5,352.48a4.86,4.86,0,0,0,2.53-.7l65.39-38.65,65.38,38.65a4.92,4.92,0,0,0,2.54.7,5,5,0,0,0,2.55-9.3l-26.22-15.5V287ZM38.68,321.76V292.88l24.43,14.44Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L82.75,307.32l24.43-14.43Z" />
                  <path d="M35.78,425.06a5,5,0,0,0-5,5v33.83L21,472a5,5,0,1,0,6.38,7.71l10.14-8.4h84.25a5,5,0,0,0,0-10H49.55l31.74-26.27h40.43a5,5,0,0,0,5-5V395.11c0-.08,0-.15,0-.23a4.78,4.78,0,0,0-.06-.53,4.14,4.14,0,0,0-.09-.46c0-.15-.09-.31-.14-.46s-.12-.31-.19-.46-.14-.28-.22-.41-.19-.3-.3-.45-.08-.13-.13-.19l-.16-.15a4.31,4.31,0,0,0-.37-.37,3.47,3.47,0,0,0-.37-.3,2.9,2.9,0,0,0-.41-.27,4.16,4.16,0,0,0-.42-.23,4.69,4.69,0,0,0-.45-.18l-.46-.14a3.55,3.55,0,0,0-.47-.09,2.94,2.94,0,0,0-.51-.05,1.81,1.81,0,0,0-.23,0H35.78a5,5,0,1,0,0,10h72.06L77.69,425.06Zm5,30.55V435.06H65.61Zm75.94-49.87v19.32H93.37Z" />
                  <path d="M155.54,475.88a5,5,0,0,0,5,5h70.74a5,5,0,0,0,5-5V443.33l21.42-22,33.53,29.11a5,5,0,0,0,6.55-7.55L234.55,388a2,2,0,0,0-.23-.17,4.15,4.15,0,0,0-.43-.3,4.36,4.36,0,0,0-.42-.23,4.68,4.68,0,0,0-.45-.2l-.47-.15-.46-.1a4.75,4.75,0,0,0-.53-.05l-.28,0-.17,0a4.75,4.75,0,0,0-.53.05,3.69,3.69,0,0,0-.46.08l-.46.14-.46.17-.41.23a3,3,0,0,0-.42.26c-.13.09-.24.19-.36.29l-.39.37-.12.11c-.06.08-.1.16-.16.23a4.37,4.37,0,0,0-.31.44,4.1,4.1,0,0,0-.22.41,2.67,2.67,0,0,0-.2.46,3.68,3.68,0,0,0-.15.47,3.41,3.41,0,0,0-.1.46,4.78,4.78,0,0,0-.06.53c0,.1,0,.19,0,.28v47.53l-30.74,31.61h-35A5,5,0,0,0,155.54,475.88Zm80.74-73.17,13.86,12L236.28,429Zm-10,50.9v17.27H209.49Z" />
                  <path d="M298,664.13a5,5,0,1,0-5.09-8.6l-65.39,38.65-65.38-38.65a5,5,0,1,0-5.09,8.6l26.22,15.5v40.71l-26.22,15.5a5,5,0,0,0,2.55,9.3,4.92,4.92,0,0,0,2.54-.7l65.38-38.65,65.39,38.65a4.9,4.9,0,0,0,2.54.7,5,5,0,0,0,2.55-9.3l-26.23-15.5V679.63ZM193.27,714.42V685.55L217.7,700Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L237.35,700l24.42-14.43Z" />
                  <path d="M166.26,527.73a5,5,0,0,0-5,5v77.85c0,.12,0,.23,0,.34a3.31,3.31,0,0,0,.06.55,5.36,5.36,0,0,0,.14.54,3,3,0,0,0,.08.32l.05.1a2.59,2.59,0,0,0,.14.29,3.25,3.25,0,0,0,.28.52,2.2,2.2,0,0,0,.17.25,3.88,3.88,0,0,0,.4.49c.06.06.11.13.17.18a5.1,5.1,0,0,0,.67.56l.1,0a4.22,4.22,0,0,0,.66.36l.28.11a3.09,3.09,0,0,0,.59.18l.28.07a5.28,5.28,0,0,0,.9.09,4.29,4.29,0,0,0,.94-.1,2.66,2.66,0,0,0,.38-.1c.14,0,.29-.07.43-.12l44.71-16.76,42.69,16c.15,0,.29.07.44.11a3.44,3.44,0,0,0,.38.11,5,5,0,0,0,.94.1,4.59,4.59,0,0,0,.9-.1,2.3,2.3,0,0,0,.28-.06c.2,0,.39-.11.59-.18l.28-.11a7,7,0,0,0,.66-.36l.1-.06a5,5,0,0,0,.67-.55l.17-.18c.14-.16.27-.32.4-.49l.17-.26c.1-.16.19-.33.28-.51s.1-.19.14-.29a1,1,0,0,1,0-.1c0-.11.06-.22.09-.33a4.75,4.75,0,0,0,.14-.54,4.93,4.93,0,0,0,.05-.54c0-.12,0-.23,0-.35V580l28.38-10.64A5,5,0,0,0,287,560l-74.32,27.86-41.46-15.55V532.73A5,5,0,0,0,166.26,527.73Zm85.91,56v18.9L227,593.16Zm-53.69,9.45-27.22,10.21V583Z" />
                  <path d="M1,610.58a5,5,0,0,0,5,5H76.68a5,5,0,0,0,5-5V578l21.43-22,33.52,29.12a5,5,0,1,0,6.56-7.55L80,522.67c-.07-.06-.16-.1-.23-.16a3.47,3.47,0,0,0-.44-.31,3.23,3.23,0,0,0-.41-.22,3,3,0,0,0-.45-.2l-.48-.15a3.63,3.63,0,0,0-.45-.1l-.54-.06-.28,0h-.16a4.69,4.69,0,0,0-.54.06l-.45.07-.48.15a4,4,0,0,0-.44.17,4.36,4.36,0,0,0-.42.23,4.23,4.23,0,0,0-.42.25c-.12.09-.24.2-.35.3a3.33,3.33,0,0,0-.39.36.68.68,0,0,0-.12.12,2,2,0,0,0-.17.23,4.91,4.91,0,0,0-.31.44c-.08.13-.15.27-.22.41s-.14.3-.2.45-.1.32-.15.48-.07.3-.1.45a4.93,4.93,0,0,0-.05.54,2.4,2.4,0,0,0,0,.28V574l-30.74,31.6H6A5,5,0,0,0,1,610.58Zm80.73-73.17,13.86,12L81.68,563.7Zm-10,50.91v17.26H54.89Z" />
                  <path d="M11.66,657.29a5,5,0,0,0-5,5v77.85c0,.12,0,.23,0,.34a4.89,4.89,0,0,0,0,.55,4.58,4.58,0,0,0,.14.53c0,.11.05.23.09.34A.41.41,0,0,0,7,742c0,.1.08.19.13.29a4.3,4.3,0,0,0,.28.52l.17.25a3.94,3.94,0,0,0,.41.49,1.37,1.37,0,0,0,.16.18,5.1,5.1,0,0,0,.67.56l.1.05a4.22,4.22,0,0,0,.66.36l.29.11a3.93,3.93,0,0,0,.58.19l.28.06a5.49,5.49,0,0,0,.9.09,5.09,5.09,0,0,0,.95-.09l.37-.11a3.6,3.6,0,0,0,.44-.12l44.71-16.76,42.69,16c.14,0,.29.07.43.11l.38.11a5.07,5.07,0,0,0,.94.09,4.6,4.6,0,0,0,.91-.09l.28-.06a5.58,5.58,0,0,0,.58-.18l.28-.11c.23-.11.45-.23.67-.36l.09-.06a5,5,0,0,0,.67-.55l.17-.18a4.52,4.52,0,0,0,.4-.49l.18-.26c.1-.16.19-.33.28-.51s.09-.19.13-.3l.05-.09c0-.11,0-.22.08-.33a4.77,4.77,0,0,0,.15-.54,4.93,4.93,0,0,0,.05-.54c0-.12,0-.23,0-.35V709.52L136,698.88a5,5,0,1,0-3.51-9.36L58.13,717.38,16.66,701.83V662.29A5,5,0,0,0,11.66,657.29Zm85.92,56v18.9l-25.21-9.45Zm-53.69,9.45L16.66,732.93V712.51Z" />
                  <path d="M281.24,787.41c0-.16-.05-.31-.09-.46a6,6,0,0,0-.34-.93,4.1,4.1,0,0,0-.22-.41,4.27,4.27,0,0,0-.3-.44,1.22,1.22,0,0,0-.12-.19c-.05-.06-.11-.11-.16-.16s-.25-.25-.38-.37a3.37,3.37,0,0,0-.36-.3c-.13-.1-.27-.18-.41-.27l-.42-.23-.45-.18-.47-.14a3.4,3.4,0,0,0-.46-.09,3.05,3.05,0,0,0-.52,0,1.81,1.81,0,0,0-.23,0H190.38a5,5,0,0,0,0,10h72.05l-30.15,25h-41.9a5,5,0,0,0-5,5v33.82l-9.83,8.14a5,5,0,1,0,6.37,7.7l10.14-8.4h84.25a5,5,0,1,0,0-10H204.15l31.73-26.26h40.43a5,5,0,0,0,5-5v-35c0-.08,0-.15,0-.23S281.26,787.58,281.24,787.41Zm-85.86,61.25V828.12H220.2ZM248,818.12l23.34-19.33v19.33Z" />
                  <path d="M143.4,792.92a5,5,0,1,0-5.09-8.61L72.93,823,7.54,784.31a5,5,0,0,0-5.08,8.61l26.22,15.5v40.7L2.46,864.62a5,5,0,1,0,5.08,8.61l65.39-38.65,65.38,38.65a5,5,0,1,0,5.09-8.61l-26.22-15.5v-40.7ZM38.68,843.21V814.33L63.1,828.77Zm68.5-20h-6a5,5,0,0,0,0,10h6v10L82.76,828.77l24.42-14.44Z" />
                </svg>
              </div>
            ) : null}

            <div className="persona_check_container">
              <QuestionCount
                questionNumber={questionNumber}
                hornevian={hornevian.length}
                harmonic={harmonic.length}
                goToBonus={goToBonus}
              />
              <div className="persona_question">{show_question()}</div>
              {!goToBonus ? (
                <div className="hornevian_answer_container">
                  <div
                    onClick={() => {
                      answered_question(0);
                      personality_question();
                    }}
                    className="hornevian_select"
                  >
                    <div className="question_option">{show_answer(0)}</div>
                  </div>
                  <div
                    onClick={() => {
                      answered_question(1);
                      personality_question();
                    }}
                    className="hornevian_select"
                  >
                    <div className="question_option">{show_answer(1)}</div>
                  </div>
                  <div
                    onClick={() => {
                      answered_question(2);
                      personality_question();
                    }}
                    className="hornevian_select"
                  >
                    <div className="question_option">{show_answer(2)}</div>
                  </div>
                </div>
              ) : (
                <LastQuestion
                  types_adjectives={types_adjectives}
                  possibleTypes={possibleTypes}
                  setPersonality={setPersonality}
                />
              )}
              {questionNumber !== 0 ? (
                <BackButton goToBack={previousQuestion} />
              ) : (
                <div className="empty_space_for_question1"></div>
              )}
            </div>
          </div>
        )}
      </Spring>
    </>
  );
}

export default CheckPersonaChild;
