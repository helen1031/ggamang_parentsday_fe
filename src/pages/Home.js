import React from "react";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleMakeOrderClick = () => {
    navigate("/make-order");
  };

  const handleReceiveOrderclick = () => {
    navigate("/receive-order");
  };

  const handleEditOrderclick = () => {
    navigate("/edit-order");
  };

  return (
    <div>
      <button onClick={handleMakeOrderClick}>예약주문</button>
      <button onClick={handleReceiveOrderclick}>주문수령</button>
      <button onClick={handleEditOrderclick}>주문취소</button>
    </div>
  );
};
export default Home;
