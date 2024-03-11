import React from "react";

const OrderDeleteButton = ({ handleDeleteOrder }) => {
  return (
    <div className="OrderButtonContainer">
      <button className="OrderButton" onClick={handleDeleteOrder}>
        주문 삭제
      </button>
    </div>
  );
};

export default OrderDeleteButton;
