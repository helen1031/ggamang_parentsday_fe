import React from "react";
import { orderSave } from "../../service/OrderService";

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

  const sendOrderToServer = () => {
    let items = [];

    Object.keys(selectedProducts).forEach((key) => {
      const item = selectedProducts[key];
      const product = products.find((p) => p.name === item.productName);

      if (product && item.quantity > 0) {
        items.push({
          pid: product.pid,
          quantity: item.quantity,
          color: item.color || "None",
        });
      }
    });

    const orderData = {
      cname: customerName,
      phone: phoneNumber,
      pickUp: false,
      wantDate,
      items,
    };

    orderSave(orderData).then(() => {
      handleSubmit();
      // After the order is successfully saved, refresh the page
      window.location.reload();
    });
  };

  return (
    <div className="OrderButtonContainer">
      <button
        className="OrderButton"
        onClick={sendOrderToServer}
        disabled={!isButtonEnabled}
      >
        주문하기
      </button>
    </div>
  );
};

export default OrderButton;
