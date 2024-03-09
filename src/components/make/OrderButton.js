import React from "react";

const OrderButton = ({
  handleSubmit,
  customerName,
  phoneNumber,
  selectedProducts,
  areAllAgreementsChecked,
  wantDate,
  products,
}) => {
  let isButtonEnabled =
    customerName.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    Object.values(selectedProducts).some((product) => product.quantity > 0) &&
    areAllAgreementsChecked;

  return (
    <div className="OrderButtonContainer">
      <button
        className="OrderButton"
        onClick={handleSubmit}
        disabled={!isButtonEnabled}
      >
        주문하기
      </button>
    </div>
  );
};

export default OrderButton;
