import React, { useState } from "react";
import OrderHeader from "../components/edit/OrderHeader";
import OrderFind from "../components/edit/OrderFind";
import FindButton from "../components/edit/FindButton";

const EditOrder = () => {
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
      <FindButton
        customerName={customerName}
        phoneNumber={phoneNumber}
      ></FindButton>
    </div>
  );
};

export default EditOrder;
