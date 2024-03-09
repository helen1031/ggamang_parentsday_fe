import React, { useState, useEffect } from "react";

const OrderInfo = ({ updateAllAgreementsChecked }) => {
  // Create state variables to track the agreement status for each category
  const [personalInfoAgreed, setPersonalInfoAgreed] = useState(false);
  const [paymentAgreed, setPaymentAgreed] = useState(false);
  const [refundAgreed, setRefundAgreed] = useState(false);
  const [locationAgreed, setLocationAgreed] = useState(false);

  // Function to handle the "전체동의" (Agree All) button click
  const handleAgreeAll = () => {
    setPersonalInfoAgreed(true);
    setPaymentAgreed(true);
    setRefundAgreed(true);
    setLocationAgreed(true);
  };

  const allAgreementsChecked = () => {
    return (
      personalInfoAgreed && paymentAgreed && refundAgreed && locationAgreed
    );
  };

  useEffect(() => {
    const allChecked = allAgreementsChecked();
    updateAllAgreementsChecked(allChecked);
  }, [
    personalInfoAgreed,
    paymentAgreed,
    refundAgreed,
    locationAgreed,
    updateAllAgreementsChecked,
  ]);

  return (
    <div className="OrderInfo">
      <div className="base-container agreement-container block-container">
        <div>
          <button onClick={handleAgreeAll}>전체동의</button>
        </div>
        <div>
          <input
            type="checkbox"
            id="personalInfoAgreement"
            checked={personalInfoAgreed}
            onChange={() => setPersonalInfoAgreed(!personalInfoAgreed)}
          />
          수집된 개인정보(이름, 전화번호)는 까망네정원 상품 주문 및 수령을
          위해서만 사용되며, 개인정보는 암호화되어 보관된 후, 24년 5월 13일 이후
          완전 파기됩니다.
        </div>
        <div>
          <input
            type="checkbox"
            id="paymentAgreement"
            checked={paymentAgreed}
            onChange={() => setPaymentAgreed(!paymentAgreed)}
          />
          주문 상품에 대한 결제는 사전에 부탁드리겠습니다.
        </div>
        <div>
          <input
            type="checkbox"
            id="refundAgreement"
            checked={refundAgreed}
            onChange={() => setRefundAgreed(!refundAgreed)}
          />
          생화 특성 상 주문 취소 및 환불 요청은 수령일로부터 7일 이전까지
          가능합니다. 환불 시, 결제하신 금액 중 예약 이벤트로 제공된 선물 가격
          5,000원을 제외한 금액이 환불됨을 양지 부탁드립니다.
        </div>
        <div>
          <input
            type="checkbox"
            id="locationAgreement"
            checked={locationAgreed}
            onChange={() => setLocationAgreed(!locationAgreed)}
          />
          수령 장소는 까망네정원(경상북도 김천시 대항면 대성향천길 1569-28)로
          수령일에 와주셔야 합니다.
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
