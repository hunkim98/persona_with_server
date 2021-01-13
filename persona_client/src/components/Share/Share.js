import React from 'react';

let jsonData = require('../user_data/user_data.json');

function Share() {
  return (
    <>
      <div className="title">hi</div>
      <div className="data">{jsonData[0].name}</div>
    </>
  );
}

export default Share;
