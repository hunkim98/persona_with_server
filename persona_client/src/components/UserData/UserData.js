import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserData.css";

function UserData() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get("./gatherData").then((res) => {
      console.log(res.data);
      setUserData(res.data);
    });
  }, []);

  const changeToDate = (item) => {
    const date = new Date(item).toLocaleString();
    return date;
  };
  const expandData = () => {
    return userData.map((item) => (
      <div className="userData" key={item.timestamp}>
        <div className="name">{item.name}</div>
        <div className="personality">{item.personality}</div>
        <div className="date">{changeToDate(item.timestamp)}</div>
      </div>
    ));
  };

  return <div>{expandData()}</div>;
}

export default UserData;
