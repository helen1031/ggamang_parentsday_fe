import React, { useState, useEffect } from "react";

const OrderAgree = ({ updateAllAgreementsChecked, isEditing }) => {
  // Create state variables to track the agreement status for each category
  const [personalInfoAgreed, setPersonalInfoAgreed] = useState(isEditing);
  const [paymentAgreed, setPaymentAgreed] = useState(isEditing);
  const [typeAgreed, setTypeAgreed] = useState(isEditing);
  const [refundAgreed, setRefundAgreed] = useState(isEditing);
  const [locationAgreed, setLocationAgreed] = useState(isEditing);

  // Function to handle the "전체동의" (Agree All) button click
  const handleAgreeAll = () => {
    setPersonalInfoAgreed(true);
    setPaymentAgreed(true);
    setTypeAgreed(true);
    setRefundAgreed(true);
    setLocationAgreed(true);
  };

  const allAgreementsChecked = () => {
    return (
      personalInfoAgreed &&
      paymentAgreed &&
      typeAgreed &&
      refundAgreed &&
      locationAgreed
    );
  };

  useEffect(() => {
    const allChecked = allAgreementsChecked();
    updateAllAgreementsChecked(allChecked);
  }, [
    personalInfoAgreed,
    paymentAgreed,
    refundAgreed,
    typeAgreed,
    locationAgreed,
    updateAllAgreementsChecked,
  ]);

  return (
    <div className="OrderAgree">
      <div className="base-container agreement-container block-container">
        <div>
          <button onClick={handleAgreeAll}>전체동의</button>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="personalInfoAgreement"
            checked={personalInfoAgreed}
            onChange={() => setPersonalInfoAgreed(!personalInfoAgreed)}
          />
          수집된 개인정보(이름, 전화번호)는 까망네꽃집 상품 주문 및 수령을
          위해서만 사용되며, 개인정보는 암호화되어 보관된 후, 24년 5월 16일 이후
          완전 파기됩니다.
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="paymentAgreement"
            checked={paymentAgreed}
            onChange={() => setPaymentAgreed(!paymentAgreed)}
          />
          주문 상품에 대한 결제는 사전에 부탁드리겠습니다.
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="typeAgreement"
            checked={typeAgreed}
            onChange={() => setTypeAgreed(!typeAgreed)}
          />
          꽃시장 수급현황에 따라 꽃 종류가 변경될 수 있습니다.
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="refundAgreement"
            checked={refundAgreed}
            onChange={() => setRefundAgreed(!refundAgreed)}
          />
          생화 특성 상 주문 취소 및 환불 요청은 수령일로부터 7일 이전까지
          가능합니다.
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="locationAgreement"
            checked={locationAgreed}
            onChange={() => setLocationAgreed(!locationAgreed)}
          />
          수령 장소는 까망네꽃집(대치동 911-13)으로 수령일에 와주셔야 합니다.
        </div>
      </div>
    </div>
  );
};

export default OrderAgree;
