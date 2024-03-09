import React from "react";
import { useNavigate } from "react-router-dom";
import { orderSearch } from "../../service/OrderService";

const FindButton = ({ customerName, phoneNumber }) => {
  const navigate = useNavigate();

  const sendPersonInfoToServer = () => {
    const customerDTO = {
      cname: customerName,
      phone: phoneNumber,
    };

    orderSearch(customerDTO)
      .then((response) => {
        // Navigate to the OrderDetailsPage and pass the response data
        navigate("/order-details-edit", { state: { orderDetails: response } });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <button className="FindButton" onClick={sendPersonInfoToServer}>
      조회하기
    </button>
  );
};

export default FindButton;
