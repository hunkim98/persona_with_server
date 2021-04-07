import React, { useEffect, useState } from "react";
import "./Infographic.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataVisualize from "./DataVisualize";
import { mask_raw } from "../masks/mask_raw";
import { mask_fit, mask_fit_cover } from "./mask_fit";
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
  let complete_analysis = {};
  let chosenData;
  let json_data;
  let user_data;
  let personality_array = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let sum_of_personality = 0;
  let chosen_data_analysis = { A: 0, CPL: 0, W: 0, P: 0, CPT: 0, R: 0 };

  useEffect(() => {
    changeColor("#76729F");
    window.scrollTo(0, 0);

    axios({
      method: "GET",
      url: "https://personapersonality.com/gatherData", //change this later
    })
      .then((res) => {
        user_data = res.data;
        setTotalNumber(user_data.length);
      })
      .then(() => {
        for (let i = 0; i < user_data.length; i++) {
          personality_array[user_data[i].personality - 1]++;
          //this is for gathering all data of user_data
          if (user_data[i]._id == id) {
            chosenData = user_data[i];
            setName(user_data[i].name);
            setPersonality(user_data[i].personality);
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
        let min_hornevian = 9; //total of 9 hornevian questions
        let min_harmonic = 5; //total of 5 harmonic questions
        for (let key in chosen_data_analysis) {
          if (key === "A" || key === "CPL" || key === "W") {
            if (chosen_data_analysis[key] < min_hornevian) {
              min_hornevian = chosen_data_analysis[key];
            }
          } else if (key === "P" || key === "CPT" || key === "R") {
            if (chosen_data_analysis[key] < min_harmonic) {
              min_harmonic = chosen_data_analysis[key];
            }
          }
        }
        for (let key in chosen_data_analysis) {
          if (key === "A" || key === "CPL" || key === "W") {
            if (
              chosen_data_analysis[key] === min_hornevian &&
              chosen_data_analysis[key] != 3
            ) {
              delete chosen_data_analysis[key]; // this deletes the element
            }
          } else if (key === "P" || key === "CPT" || key === "R") {
            if (chosen_data_analysis[key] === min_harmonic) {
              delete chosen_data_analysis[key];
            }
          }
        }
        let hornevian_length = 9; //total of 9 hornevian questions
        let harmonic_length = 5;
        for (let key in chosen_data_analysis) {
          if (key === "A" || key === "CPL" || key === "W") {
            for (let nested_key in chosen_data_analysis) {
              //nested loop
              if (key === "A") {
                if (nested_key === "P") {
                  complete_analysis["E7"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "CPT") {
                  complete_analysis["E3"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "R") {
                  complete_analysis["E8"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                }
              } else if (key === "CPL") {
                if (nested_key === "P") {
                  complete_analysis["E2"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "CPT") {
                  complete_analysis["E1"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "R") {
                  complete_analysis["E6"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                }
              } else if (key === "W") {
                if (nested_key === "P") {
                  complete_analysis["E9"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "CPT") {
                  complete_analysis["E5"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                } else if (nested_key === "R") {
                  complete_analysis["E4"] =
                    (chosen_data_analysis[key] / hornevian_length +
                      chosen_data_analysis[nested_key] / harmonic_length) *
                    50;
                }
              }
            }
          }
        }
        console.log(complete_analysis);

        //add mask to it
        // const mask_option = document.createElement("div");
        // mask_option.className = "mask_option";
        // const mask_option_img = document.createElement("img");
        // const mask_percentage = document.createElement("div");
        // let maximum_option = 0;
        // for (let i = 1; i < 10; i++) {
        //   if (chosenData.personality === i) {
        //     mask_option_img.src = mask_raw[i - 1];
        //     mask_option.appendChild(mask_option_img);
        //     for (let key in complete_analysis) {
        //       if (key.slice(1, 3) != chosenData.personality) {
        //         if (complete_analysis[key] > maximum_option) {
        //           maximum_option = complete_analysis[key];
        //           console.log(maximum_option);
        //         }
        //       } else {
        //         mask_percentage.innerHTML =
        //           complete_analysis[key].toFixed(1) + "%";
        //         console.log(mask_percentage);
        //         mask_option.appendChild(mask_percentage);
        //       }
        //     }
        //     document
        //       .querySelector(".mask_option_container")
        //       .appendChild(mask_option);
        //   }
        // }
        // const mask_second_option = document.createElement("div");
        // const mask_second_option_img = document.createElement("img");
        // mask_second_option.className = "mask_option";
        // const mask_second_percentage = document.createElement("div");
        // for (let key in complete_analysis) {
        //   if (
        //     complete_analysis[key] == maximum_option &&
        //     key.slice(1, 3) != chosenData.personality
        //   ) {
        //     mask_second_option_img.src = mask_raw[key.slice(1, 3) - 1];
        //     mask_second_option.appendChild(mask_second_option_img);
        //     mask_second_percentage.innerHTML =
        //       complete_analysis[key].toFixed(1) + "%";
        //     mask_second_option.appendChild(mask_second_percentage);
        //     document
        //       .querySelector(".mask_option_container")
        //       .appendChild(mask_second_option);

        //     break;
        //   }
        // }
        let maximum_option = 0;
        for (let key in complete_analysis) {
          if (key.slice(1, 3) != chosenData.personality) {
            if (complete_analysis[key] > maximum_option) {
              maximum_option = complete_analysis[key];
            }
          } else {
            if (key.slice(1, 3) == chosenData.personality) {
              console.log(key);
              setMasks((array) => [
                ...array,
                mask_fit[chosenData.personality - 1],
              ]);
              setCoverMasks((array) => [
                ...array,
                mask_fit_cover(1 - complete_analysis[key] / 100)[
                  chosenData.personality - 1
                ],
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
            key.slice(1, 3) != chosenData.personality
          ) {
            setPercentage((array) => [
              ...array,
              complete_analysis[key].toFixed(1) + "%",
            ]);
            setMasks((array) => [...array, mask_fit[key.slice(1, 3) - 1]]);
            setCoverMasks((array) => [
              ...array,
              mask_fit_cover(1 - complete_analysis[key] / 100)[
                key.slice(1, 3) - 1
              ],
            ]);
            break;
          }
        }

        DataVisualize(
          chosenData.personality,
          sum_of_personality,
          json_data,
          mask_names,
          personality_array,
          mask_raw
        );
      });
  }, []);

  return (
    <div>
      <div className="infographic_container">
        <div className="infographic">
          <div className="mask_map">
            <div className="title_container">
              <div className="title">페르소나 분포도</div>(
              <div className="number">{totalNumber}</div>)
            </div>
            <div id="my_dataviz"></div>
            <script src="infographic.js"></script>
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
