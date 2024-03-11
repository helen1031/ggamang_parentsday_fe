import React, { useState, useEffect } from "react";

const OrderBody = ({
  customerName,
  handleNameChange,
  phoneNumber,
  handlePhoneChange,
  selectedProducts,
  setSelectedProducts,
  wantDate,
  setWantDate,
  products,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (productName, color, inputQuantity) => {
    // Find the corresponding product to check its stock.
    const product = products.find((p) => p.name === productName);
    const maxQuantity = product ? product.stock : 0;

    // Ensure the requested quantity does not exceed the available stock.
    const quantity = Math.min(maxQuantity, inputQuantity);

    // Update the product quantity ensuring it's within the available stock.
    const key =
      color && product.colorOption ? `${productName}-${color}` : productName;
    setSelectedProducts((prevState) => ({
      ...prevState,
      [key]: {
        productName,
        color: color || "None", // 'None' for products without color options.
        quantity,
      },
    }));
  };

  useEffect(() => {
    let sum = 0;
    Object.values(selectedProducts).forEach((item) => {
      const product = products.find((p) => p.name === item.productName);
      if (product) {
        sum += product.price * item.quantity;
      }
    });
    setTotalPrice(sum);
  }, [selectedProducts, products]);

  return (
    <div className="OrderBody">
      <div className="base-container customer-info-container block-container">
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
      <div className="base-container product-list-container block-container">
        {Array.isArray(products) &&
          products.map((product) => (
            <React.Fragment key={product.pid}>
              {product.colorOption ? (
                ["Red", "Peach"].map((color) => (
                  <div key={`${product.name}-${color}`}>
                    <label>{`${
                      product.name
                    } - ${color} (${product.price.toLocaleString()}원) - 주문 가능 수량 : ${
                      product.stock
                    }`}</label>
                    <input
                      type="number"
                      value={
                        selectedProducts[`${product.name}-${color}`]
                          ?.quantity || 0
                      }
                      onChange={(e) =>
                        handleQuantityChange(
                          product.name,
                          color,
                          parseInt(e.target.value)
                        )
                      }
                      min="0"
                      max={product.stock}
                    />
                  </div>
                ))
              ) : (
                <div key={product.name}>
                  <label>{`${
                    product.name
                  } (${product.price.toLocaleString()}원) - 주문 가능 수량 : ${
                    product.stock
                  }`}</label>
                  <input
                    type="number"
                    value={selectedProducts[product.name]?.quantity || 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.name,
                        null,
                        parseInt(e.target.value)
                      )
                    }
                    min="0"
                    max={product.stock}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        <div className="TotalAmountContainer">
          <label htmlFor="totalPrice">총 주문금액: {totalPrice}원</label>
        </div>
      </div>
      <div className="base-container product-list-container block-container">
        <label htmlFor="wantDate">수령 희망일:</label>
        <select
          name="wantDate"
          id="wantDate"
          value={wantDate}
          onChange={(e) => setWantDate(e.target.value)}
        >
          <option value="4">4일(토)</option>
          <option value="5">5일(일)</option>
          <option value="6">6일(월)</option>
          <option value="7">7일(화)</option>
          <option value="8">8일(수)</option>
          <option value="9">9일(목)</option>
          <option value="10">10일(금)</option>
          <option value="11">11일(토)</option>
          <option value="12">12일(일)</option>
        </select>
      </div>
    </div>
  );
};

export default OrderBody;
