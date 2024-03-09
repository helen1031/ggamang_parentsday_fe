import React from "react";
import logo from "../../assets/까망네정원.svg";

const OrderHeader = () => {
  return (
    <div className="OrderHeader">
      <img src={logo} />
      <p>까망네정원 어버이날 예약 수령</p>
    </div>
  );
};

export default OrderHeader;
