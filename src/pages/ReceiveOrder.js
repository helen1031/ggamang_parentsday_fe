import React, { useState } from "react";
import "../css/ReceiveOrder.css";
import OrderHeader from "../components/receive/OrderHeader";
import OrderFind from "../components/receive/OrderFind";
import FindButton from "../components/receive/FindButton";

const ReceiveOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <div>
      <OrderHeader />
      <OrderFind
        customerName={customerName}
        setCustomerName={setCustomerName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <div className="FindButtonContainer">
        <FindButton customerName={customerName} phoneNumber={phoneNumber} />
      </div>
    </div>
  );
};

export default ReceiveOrder;
