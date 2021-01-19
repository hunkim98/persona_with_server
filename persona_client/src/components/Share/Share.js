import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Share() {
  let { id } = useParams();
  const { name, setName } = useState("e");
  const { personality, setPersonality } = useState("ee");
  useEffect(() => {
    axios({
      method: "POST",
      url: "/shareData",
      data: {
        user_id: id,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.name);
        setName(res.data.name);
        setPersonality(res.data.personality);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="title">hi</div>
      <div className="data">{id}</div>
      <div className="retrieved_name">{name}</div>
      <div className="retrieved_personality">{personality}</div>
    </>
  );
}

export default Share;
