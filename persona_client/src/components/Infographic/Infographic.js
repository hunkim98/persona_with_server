import React, { useEffect, useState } from "react";
import "./Infographic.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { mask_fit, mask_fit_cover } from "./mask_fit";
import Treemap from "../treemap/treemap";
const mask_names = [
  "삐꺽거리는 로봇",
  "귀여운 날다람쥐",
  "호탕한 양반댁",
  "신비한 요술쟁이",
  "고독한 스님",
  "총총거리는 토끼",
  "호기심 많은 도깨비",
  "불 같은 악마",
  "평화로운 자연인",
];
function Infographic({ changeColor }) {
  let { id } = useParams();
  const [totalNumber, setTotalNumber] = useState(0);
  const [personality, setPersonality] = useState(0);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState([]);
  const [masks, setMasks] = useState([]);
  const [coverMasks, setCoverMasks] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [analysis, setAnalysis] = useState({});
  const [jsonData, setJsonData] = useState({});
  const [personalityArray, setPersonalityArray] = useState([]);
  let complete_analysis = {};
  let chosenData;
  let json_data = { children: [] };
  let personality_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let chosen_data_analysis = { A: 0, CPL: 0, W: 0, P: 0, CPT: 0, R: 0 };

  useEffect(() => {
    changeColor("#76729F");
    window.scrollTo(0, 0);

    axios({
      method: "GET",
      url: "https://personapersonality.com/gatherData", //change this later
    }).then((res) => {
      setTotalNumber(res.data.length);
      for (let i = 0; i < res.data.length; i++) {
        personality_array[res.data[i].personality - 1]++;
        //this is for gathering all data of res.data
        if (res.data[i]._id == id) {
          chosenData = res.data[i];
          setName(res.data[i].name);
          setPersonality(res.data[i].personality);
          setShowMap(true);
        }
      }
      for (let key in chosen_data_analysis) {
        //we use for.. in.. to loop json object
        for (let i = 0; i < chosenData.choice.length; i++) {
          if (key === chosenData.choice[i].choice) {
            chosen_data_analysis[key]++;
          }
        }
      }

      for (let j = 0; j < 9; j++) {
        json_data.children[j] = {
          name: mask_names[j],
          value: personality_array[j],
          id: j + 1,
        };
      }
      setPersonalityArray(personality_array);
      setAnalysis(chosen_data_analysis);
      setJsonData(json_data);
      console.log(json_data);
    });
  }, []);
  useEffect(() => {
    let min_hornevian = 9; //total of 9 hornevian questions
    let min_harmonic = 5; //total of 5 harmonic questions
    for (let key in analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        if (analysis[key] < min_hornevian) {
          min_hornevian = analysis[key];
        }
      } else if (key === "P" || key === "CPT" || key === "R") {
        if (analysis[key] < min_harmonic) {
          min_harmonic = analysis[key];
        }
      }
    }
    for (let key in analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        if (analysis[key] === min_hornevian && analysis[key] != 3) {
          delete analysis[key]; // this deletes the element
        }
      } else if (key === "P" || key === "CPT" || key === "R") {
        if (analysis[key] === min_harmonic) {
          delete analysis[key];
        }
      }
    }
    let hornevian_length = 9; //total of 9 hornevian questions
    let harmonic_length = 5;
    for (let key in analysis) {
      if (key === "A" || key === "CPL" || key === "W") {
        for (let nested_key in analysis) {
          //nested loop
          if (key === "A") {
            if (nested_key === "P") {
              complete_analysis["E7"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E3"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E8"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            }
          } else if (key === "CPL") {
            if (nested_key === "P") {
              complete_analysis["E2"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E1"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E6"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            }
          } else if (key === "W") {
            if (nested_key === "P") {
              complete_analysis["E9"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "CPT") {
              complete_analysis["E5"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            } else if (nested_key === "R") {
              complete_analysis["E4"] =
                (analysis[key] / hornevian_length +
                  analysis[nested_key] / harmonic_length) *
                50;
            }
          }
        }
      }
    }
    console.log(complete_analysis);
    let maximum_option = 0;
    for (let key in complete_analysis) {
      if (key.slice(1, 3) != personality) {
        if (complete_analysis[key] > maximum_option) {
          maximum_option = complete_analysis[key];
        }
      } else {
        if (key.slice(1, 3) == personality) {
          console.log(key);
          setMasks((array) => [...array, mask_fit[personality - 1]]);
          setCoverMasks((array) => [
            ...array,
            mask_fit_cover(1 - complete_analysis[key] / 100)[personality - 1],
          ]);
          console.log(masks);
          setPercentage((array) => [
            ...array,
            complete_analysis[key].toFixed(1) + "%",
          ]);
          console.log(complete_analysis[key]);
        }
      }
    }

    for (let key in complete_analysis) {
      console.log(key);
      if (
        complete_analysis[key] == maximum_option &&
        key.slice(1, 3) != personality
      ) {
        setPercentage((array) => [
          ...array,
          complete_analysis[key].toFixed(1) + "%",
        ]);
        setMasks((array) => [...array, mask_fit[key.slice(1, 3) - 1]]);
        setCoverMasks((array) => [
          ...array,
          mask_fit_cover(1 - complete_analysis[key] / 100)[key.slice(1, 3) - 1],
        ]);
        break;
      }
    }
  }, [analysis]);

  return (
    <div>
      <div className="infographic_container">
        <div className="infographic">
          <div className="mask_map">
            <div className="title_container">
              <div className="title">상대방의 가면은 흔할까?</div>(
              <div className="number">{totalNumber}명 기준</div>)
            </div>
            {showMap ? (
              <Treemap
                personality={personality}
                data={jsonData}
                personalityArray={personalityArray}
              />
            ) : null}
          </div>
          <div className="mask_analysis">
            <div className="title_container">
              <div className="title">{name}님에게서 보이는 가면</div>
            </div>
            <div className="mask_option_container">
              <div className="mask_option">
                <div className="cover_mask">{coverMasks[0]}</div>
                <div className="transparent_mask">
                  <img src={masks[0]} alt="" />
                </div>
              </div>
              <div className="mask_option">
                <div className="cover_mask">{coverMasks[1]}</div>
                <div className="transparent_mask">
                  <img src={masks[1]} alt="" />
                </div>
              </div>
            </div>
            <div className="percentage_container">
              <div className="percentage_left">{percentage[0]}</div>
              <div className="percentage_right">{percentage[1]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Infographic;
