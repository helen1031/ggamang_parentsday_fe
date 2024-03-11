import React from "react";

const OrderFind = ({ oid, setOid }) => {
  const handleOidChange = (e) => {
    const value = e.target.value;
    // Update OID state if the value is numeric or empty
    if (/^\d*$/.test(value) || value === "") {
      setOid(value);
    }
  };

  return (
    <div className="OrderFind">
      <div className="customer-info-container block-container">
        <label htmlFor="orderOid">주문번호:</label>
        <input
          type="text"
          id="orderOid"
          value={oid}
          onChange={handleOidChange}
        />
      </div>
    </div>
  );
};

export default OrderFind;
