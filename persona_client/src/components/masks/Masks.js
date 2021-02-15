import React, { useEffect } from "react";
import "./Masks.css";
import { mask_raw } from "./mask_raw";
import { index_number } from "./index";
import { Spring } from "react-spring/renderprops";
import { Link } from "react-router-dom";

function Masks({ changeColor }) {
  useEffect(() => {
    changeColor("#76729F");
  }, []);

  const mask_data = () => {
    return mask_raw.map((mask, index) => (
      <div className="mask_container" key={index}>
        <Link to={"/masks/" + (index + 1)}>
          <img className="mask_img" src={mask} alt="mask" />
        </Link>
        <img className="mask_index" src={index_number[index]} />
      </div>
    ));
  };
  return (
    <>
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {(props) => (
          <div style={props}>
            <div className="mask_collection_container">
              <div className="mask_collection">{mask_data()}</div>
            </div>
          </div>
        )}
      </Spring>
    </>
  );
}

export default Masks;
