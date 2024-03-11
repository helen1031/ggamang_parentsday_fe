import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHeader from "../components/edit/OrderHeader";
import OrderFind from "../components/edit/OrderFind";
import FindButton from "../components/edit/FindButton";
import { orderSearchByOid } from "../service/OrderService";

const EditOrder = () => {
  const [oid, setOid] = useState("");

  const navigate = useNavigate();

  const handleFindOrder = () => {
    orderSearchByOid(oid)
      .then((orderDetails) => {
        if (orderDetails && orderDetails.length > 0) {
          navigate("/edit-order-detail", {
            state: { orderDetails },
          });
        } else {
          alert("해당 주문번호로 된 주문 내역이 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch order details:", error);
        alert("An error occurred while fetching order details.");
      });
  };

  return (
    <div>
      <OrderHeader />
      <OrderFind oid={oid} setOid={setOid} />
      <FindButton onClick={handleFindOrder}></FindButton>
    </div>
  );
};

export default EditOrder;
