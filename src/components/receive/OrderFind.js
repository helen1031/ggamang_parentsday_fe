import React from "react";

const OrderFind = ({
  customerName,
  setCustomerName,
  phoneNumber,
  setPhoneNumber,
}) => {
  const handleNameChange = (e) => {
    //console.log("Updating name to:", e.target.value); // Add this line
    setCustomerName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    //console.log("Updating phone to:", e.target.value); // Add this line
    const value = e.target.value;
    // Only update phone number state if the value is numeric or empty
    if (/^\d*$/.test(value) || value === "") {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="OrderFind">
      <div className="customer-info-container block-container">
        <label htmlFor="customerName">주문자명:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={handleNameChange}
        />
        <label htmlFor="phoneNumber">전화번호:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneChange}
        />
      </div>
    </div>
  );
};

export default OrderFind;
