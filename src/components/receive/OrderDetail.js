import React, { useState, useEffect } from "react";
import "../../css/OrderDetail.css";
import { useLocation } from "react-router-dom";
import { orderReceiveCheck } from "../../service/OrderService";

const OrderDetail = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(
    location.state?.orderDetails || []
  );

  const handleReceiveClick = (detail) => {
    // Constructing the data object based on the detail received
    const productDTO = {
      oid: detail.id.oid,
      pid: detail.product.pid,
      color: detail.id.color,
    };

    // Calling the service function and handling the promise
    orderReceiveCheck(productDTO)
      .then((response) => {
        console.log("Order receive confirmed:", response);
        // Here you might want to update your state or show some notification
        const updatedOrderDetails = orderDetails.map((item) => {
          if (
            item.id.oid === detail.id.oid &&
            item.product.pid === detail.product.pid
          ) {
            return { ...item, pickUp: true };
          }
          return item;
        });
        setOrderDetails(updatedOrderDetails);
      })
      .catch((error) => {
        console.error("Error confirming order receive:", error);
        // Here you can handle the error, maybe show a message to the user
      });
  };

  return (
    <div className="OrderDetail">
      {orderDetails ? (
        orderDetails.map((detail, index) => (
          <div
            className={`order-item ${detail.pickUp ? "picked-up" : ""}`}
            key={index}
          >
            <p>주문번호: {detail.id.oid}</p>
            <p>상품명: {detail.product.name}</p>
            <p>수량: {detail.quantity}</p>
            <p>색상: {detail.id.color}</p>
            <p>희망일: {detail.order.wantDate}일</p>
            <button
              onClick={() => handleReceiveClick(detail)}
              disabled={detail.pickUp}
            >
              수령
            </button>
          </div>
        ))
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
};

export default OrderDetail;
