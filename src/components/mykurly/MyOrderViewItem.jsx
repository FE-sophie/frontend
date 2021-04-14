import React from 'react';
const MyOrderViewItem = ({ orderDetail: { orderProducts }, onClick }) => {
  return (
    <>
      {orderProducts.map(
        ({ list_image_url, name, reduced_price, checkout_price, product_id, cnt }, index) => (
          <li
            key={`detail_product_${index}`}
            className="border-b border-kg-80 box-border text-r-1.4  "
          >
            <div className="clear-fix w-full my-8 h-r-7.9 inline-block align-middle ">
              <div className="w-24 mr-8 inline-block align-middle">
                <img src={`${list_image_url}`} alt={`${name}`} />
              </div>
              <div className="w-r-50 text-r.1.4 inline-block align-middle text-kg-400 ">
                <h2 className="text-r-1.6 w-full font-medium truncate">{name}</h2>
                <p className="text-kg-150 pt-2"></p>
                <p className="mt-1 pt-2 text-kg-400 ">
                  <span className="font-medium">
                    {(checkout_price - reduced_price)
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                    원
                  </span>
                  {/* <span className="px-4 line-through text-kg-150"></span> */}
                  <span className="text-kg-80 mx-2">|</span>
                  <span className="">{cnt}개</span>
                </p>
              </div>
              <span className="align-middle text-r-1.6 font-medium mx-8">배송 완료</span>
              <button
                id={`button_${product_id}`}
                onClick={onClick}
                className="ml-7 rounded border font-medium text-r-1.2 border-kp-600 text-kp-600 py-3 px-3"
              >
                장바구니 담기
              </button>
            </div>
          </li>
        ),
      )}
    </>
  );
};

export default MyOrderViewItem;
