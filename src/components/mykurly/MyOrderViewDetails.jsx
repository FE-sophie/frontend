import React from 'react';

const MyOrderViewDetails = ({ orderDetail, ordno }) => {
  const detailTitle = 'border-b-2 border-kg-300 pb-8 text-r-2 font-medium';
  const blindString = string => {
    if (!string) return '';
    else return string.replace(string.substring(4, 8), '****');
  };
  return (
    <>
      <div className="my-16">
        <h3 className={`${detailTitle}`}>결제 정보</h3>
        <dl className="text-r-1.6 py-4 text-kg-350 leading-r-5 border-b border-kg-80">
          <dt className="inline-block w-4/5 text-kg-350">상품금액</dt>
          <dd className="inline-block w-1/5 text-right text-kg-400">{orderDetail.checkout()}원</dd>
          <dt className="inline-block w-4/5 text-kg-350">배송비</dt>
          <dd className="inline-block w-1/5 text-right text-kg-400">
            {orderDetail.delivery_cost}원
          </dd>
          <dt className="inline-block w-4/5 text-kg-350">상품할인금액</dt>
          <dd className="inline-block w-1/5 text-right text-kg-400">-{orderDetail.discount()}원</dd>
          {/* <dt className="inline-block w-4/5 text-kg-350">쿠폰할인</dt>
            <dd className="inline-block w-1/5 text-right text-kg-400">0 원</dd> */}
          {/* <dt className="inline-block w-4/5 text-kg-350">적립금사용</dt>
            <dd className="inline-block w-1/5 text-right text-kg-400">4,600원</dd> */}
          <dt className="inline-block w-4/5 text-kg-350">결제금액</dt>
          <dd className="inline-block w-1/5 text-right text-kg-400 font-medium">
            {orderDetail.totalCheckout()}원
          </dd>
          {/* <dt className="inline-block w-4/5 text-kg-350">적립예정금액</dt>
            <dd className="inline-block w-1/5 text-right text-kg-400">100원</dd> */}
          <dt className="inline-block w-4/5 text-kg-350 font-medium">결제방법</dt>
          <dd className="inline-block w-1/5 text-right text-kg-400">
            {orderDetail.checkout_method}
          </dd>
        </dl>
      </div>
      <div className="my-16">
        <h3 className={`${detailTitle}`}>주문 정보</h3>
        <dl className="text-r-1.6 py-4 text-kg-350 leading-r-5 border-b border-kg-80">
          <dt className="inline-block w-1/5 text-kg-350">주문 번호</dt>
          <dd className="inline-block w-4/5  text-kg-400">{ordno}</dd>
          <dt className="inline-block w-1/5 text-kg-350">주문자명</dt>
          <dd className="inline-block w-4/5 text-kg-400">{orderDetail.orderer_name || '임정우'}</dd>
          <dt className="inline-block w-1/5 text-kg-350">보내는 분</dt>
          <dd className="inline-block w-4/5 text-kg-400">{orderDetail.sender_name}</dd>
          <dt className="inline-block w-1/5 text-kg-350">결제일시</dt>
          <dd className="inline-block w-4/5 text-kg-400">{orderDetail.checkout_date}</dd>
        </dl>
      </div>
      <div className="my-16">
        <h3 className={`${detailTitle}`}>배송 정보</h3>
        <dl className="text-r-1.6 py-4 text-kg-350 leading-r-5 border-b border-kg-80">
          <dt className="inline-block w-1/5 text-kg-350">받는 분</dt>
          <dd className="inline-block w-4/5  text-kg-400">
            {orderDetail.reciever_name || '임정우'}
          </dd>
          <dt className="inline-block w-1/5 text-kg-350">핸드폰</dt>
          <dd className="inline-block w-4/5  text-kg-400">
            {/* {orderDetail.reciever_phone} */}
            {blindString(orderDetail.reciever_phone || '010-0000-0000')}
          </dd>
          {/* <dt className="inline-block w-1/5 text-kg-350">배송방법</dt>
            <dd className="inline-block w-4/5  text-kg-400">샛별배송</dd> */}
          <dt className="inline-block w-1/5 text-kg-350">주소</dt>
          <dd className="inline-block w-4/5  text-kg-400">{orderDetail.reciever_address}</dd>
          <dt className="inline-block w-1/5 text-kg-350">받으실 장소</dt>
          <dd className="inline-block w-4/5  text-kg-400">{orderDetail.reciever_place}</dd>
          {/* <dt className="inline-block w-1/5 text-kg-350">경비실 특이사항</dt> */}
          <dt className="inline-block w-1/5 text-kg-350">특이사항</dt>
          <dd className="inline-block w-4/5 text-kg-400">{orderDetail.reciever_visit_method}</dd>
        </dl>
      </div>
      <div className="my-16">
        <h3 className={`${detailTitle}`}>배송 정보</h3>
        <dl className="text-r-1.6 py-4 text-kg-350 leading-r-5 border-b border-kg-80">
          <dt className="inline-block w-1/5 text-kg-350">메세지 전송</dt>
          <dd className="inline-block w-4/5 text-kg-400">{orderDetail.arrived_alarm}</dd>
          <dt className="inline-block w-1/5 text-kg-350">미출시 조치방법</dt>
          <dd className="inline-block w-4/5 text-kg-400">결제수단으로 환불</dd>
        </dl>
      </div>
    </>
  );
};

export default MyOrderViewDetails;
