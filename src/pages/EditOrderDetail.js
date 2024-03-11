import React from "react";
import { useLocation } from "react-router-dom";
import OrderHeader from "../components/make/OrderHeader";
import OrderButtonControl from "../components/make/OrderButtonControl";

const EditOrderDetail = () => {
  const location = useLocation();
  const preFilledData = location?.state?.orderDetails || {};
  console.log("Received preFilledData:", preFilledData);

  return (
    <div>
      <OrderHeader />
      <OrderButtonControl preFilledData={preFilledData} isEditing={true} />
    </div>
  );
};

export default EditOrderDetail;
