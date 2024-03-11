import React from "react";

const FindButton = ({ onClick }) => {
  return (
    <button className="FindButton" onClick={onClick}>
      조회하기
    </button>
  );
};

export default FindButton;
