import React from "react";
import "../css/MakeOrder.css";
import OrderHeader from "../components/make/OrderHeader";
import OrderButtonControl from "../components/make/OrderButtonControl";

const MakeOrder = () => {
  return (
    <div>
      <OrderHeader />
      <OrderButtonControl />
    </div>
  );
};

export default MakeOrder;
