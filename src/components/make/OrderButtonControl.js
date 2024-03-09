import React, { useState, useEffect } from "react";
import OrderBody from "./OrderBody";
import OrderButton from "./OrderButton";
import OrderAgree from "./OrderAgree";
import { fetchProducts } from "../../service/ProductService";
import { orderSave } from "../../service/OrderService";

const OrderButtonControl = () => {
  // State to store customer name, phone number, and selected products
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [areAllAgreementsChecked, setAreAllAgreementsChecked] = useState(false);
  const [wantDate, setWantDate] = useState("4");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        // Handle the scenario where fetchProducts might not return an expected format
        setProducts(data);
      })
      .catch(console.error);
  }, []);

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
      //alert("주문이 완료되었습니다."); // Placeholder for your actual order submission logic
      // Here you would typically call a function to send the order data to your server
    } else {
      // Abort the order creation if the user cancels
      console.log("Order creation canceled.");
      // You can handle the cancellation further if needed
    }
  };

  return (
    <div className="ButtonControl">
      {/* Pass customerName and handleNameChange to OrderBody */}
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
      {/* Pass handleSubmit, customerName, phoneNumber, and selectedProducts to OrderButton */}
      <OrderAgree updateAllAgreementsChecked={setAreAllAgreementsChecked} />
      <OrderButton
        handleSubmit={handleSubmit}
        customerName={customerName}
        setCustomerName={setCustomerName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        areAllAgreementsChecked={areAllAgreementsChecked}
        setAreAllAgreementsChecked={setAreAllAgreementsChecked}
        wantDate={wantDate}
        setWantDate={setWantDate}
        products={products}
      />
    </div>
  );
};

export default OrderButtonControl;
