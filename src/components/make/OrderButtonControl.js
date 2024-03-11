import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderBody from "./OrderBody";
import OrderButton from "./OrderButton";
import OrderDeleteButton from "../edit/OrderDeleteButton";
import OrderAgree from "./OrderAgree";
import { fetchProducts } from "../../service/ProductService";
import { orderSave, orderDelete } from "../../service/OrderService";

const OrderButtonControl = ({ preFilledData, isEditing }) => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [wantDate, setWantDate] = useState("4");
  const [areAllAgreementsChecked, setAreAllAgreementsChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModifyOrderButtonEnabled, setIsModifyOrderButtonEnabled] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Always fetch products, regardless of preFilledData
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (preFilledData && preFilledData.length > 0) {
      setCustomerName(preFilledData[0].order.cname);
      setPhoneNumber(preFilledData[0].order.phone);
      setWantDate(preFilledData[0].order.wantDate);

      // Initialize an empty object for updated selected products
      const updatedSelectedProducts = {};

      // Loop through each item in the pre-filled data
      preFilledData.forEach((item) => {
        // Generate a unique key for the product-color combination
        const productKey =
          item.id.color != "None"
            ? `${item.product.name}-${item.id.color}`
            : item.product.name;
        // Update the quantity for the corresponding product-color combination
        updatedSelectedProducts[productKey] = {
          productName: item.product.name,
          quantity: item.quantity, // Set the quantity from pre-filled data
          color: item.id.color || "None",
        };
      });
      console.log(updatedSelectedProducts);
      // Update the state outside of the loop
      setSelectedProducts(updatedSelectedProducts);
    }
  }, [preFilledData]);

  useEffect(() => {
    setIsModifyOrderButtonEnabled(
      customerName.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        Object.values(selectedProducts).some(
          (product) => product.quantity > 0
        ) &&
        areAllAgreementsChecked
    );
  }, [customerName, phoneNumber, selectedProducts, areAllAgreementsChecked]);

  useEffect(() => {
    if (isEditing) {
      setAreAllAgreementsChecked(true);
      // This should directly enable the modify button if other conditions are also met
      setIsModifyOrderButtonEnabled(
        customerName.trim() !== "" &&
          phoneNumber.trim() !== "" &&
          Object.values(selectedProducts).some(
            (product) => product.quantity > 0
          )
      );
    }
  }, [isEditing, customerName, phoneNumber, selectedProducts]);

  // Function to handle customer name input changes
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

  const handleDeleteOrder = () => {
    const oid = preFilledData ? preFilledData[0].order.oid : null;
    if (oid) {
      orderDelete(oid)
        .then(() => {
          alert("주문이 삭제되었습니다.");
          navigate("/edit-order"); // or redirect to a different page if necessary
        })
        .catch((error) => {
          console.error("Error deleting order: ", error);
          alert("주문 삭제에 실패했습니다.");
        });
    } else {
      alert("유효한 주문 번호가 없습니다.");
    }
  };

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
      // After the order is successfully saved, refresh the page
      alert("주문이 완료되었습니다.");
      window.location.reload();
    });
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const message = `주문자 정보가 정확한지 확인 부탁드립니다.\n\n고객명: ${customerName}\n전화번호: ${phoneNumber}`;
    const isConfirmed = window.confirm(message);

    // Check the user's response
    if (isConfirmed) {
      // Proceed with the order creation if the user confirms
      sendOrderToServer();
      alert("주문이 완료되었습니다.");
    } else {
      // Abort the order creation if the user cancels
      console.log("Order creation canceled.");
      // You can handle the cancellation further if needed
    }
  };

  return (
    <div className="ButtonControl">
      <OrderBody
        customerName={customerName}
        handleNameChange={handleNameChange}
        phoneNumber={phoneNumber}
        handlePhoneChange={handlePhoneChange}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        wantDate={wantDate}
        setWantDate={setWantDate}
        products={products}
      />
      <OrderAgree
        updateAllAgreementsChecked={setAreAllAgreementsChecked}
        isEditing={isEditing}
      />

      {/* Display "주문 삭제" button if isEditing is true */}
      {isEditing && <OrderDeleteButton handleDeleteOrder={handleDeleteOrder} />}

      {/* Display "주문" button if isEditing is false */}
      {!isEditing && (
        <OrderButton
          handleSubmit={handleSubmit}
          customerName={customerName}
          phoneNumber={phoneNumber}
          selectedProducts={selectedProducts}
          areAllAgreementsChecked={areAllAgreementsChecked}
          wantDate={wantDate}
        />
      )}
    </div>
  );
};

export default OrderButtonControl;
