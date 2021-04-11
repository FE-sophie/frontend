import React from 'react';
import { useSelector } from 'react-redux';

const WriteReview = ({ onClick }) => {
  return (
    <section id="#viewBeforeList" className="">
      <h3 className="a11y-hidden">작성가능한후기보기</h3>
      <ul className="">
        <WriteReviewItem onClick={onClick} />
      </ul>
    </section>
  );
};

const WriteReviewItem = ({ onClick }) => {
  const canWriteReview = useSelector(state => state.review.data.viewBeforeList);
  return (
    <>
      {canWriteReview
        .filter(({ delivery_condition }) => delivery_condition === '배송완료')
        .map(
          (
            { order_id, product_id, product_name, delivery_condition, list_img_url, written },
            index,
          ) => (
            <li key={`reviewItem_${index}`}>
              <div>
                <h3 className="text-r-1.2 my-3">주문번호:{order_id}</h3>
                <ul>
                  <li className="text-r-1.4 border border-kg-80 py-6 px-8 mb-5">
                    <div className="inline-block w-32 h-32 align-middle">
                      <img
                        src={
                          product_id === 2
                            ? 'https://img-cf.kurly.com/shop/data/goods/1583285919646l0.jpg'
                            : list_img_url
                        }
                        alt=""
                        className="inline-block w-full h-full"
                      />
                    </div>
                    <div className="inline-block align-middle w-p-370 px-8">
                      <h3 className="text-r-1.4 text-kg-350 pb-2">
                        {product_id === 2 ? '한끼 당근 1개' : product_name}
                      </h3>
                      {/* <p className="font-medium pb-4">[처카넛베이] 뉴욕 치즈 케이크 클래식 113g</p> */}
                      <span className="block mt-4 text-kg-400">1개 구매</span>
                    </div>
                    <span className="font-medium mx-14">{delivery_condition}</span>
                    {!written ? (
                      <button className="inline-block align-middle bg-kp-600 text-white w-44 py-3">
                        후기쓰기
                      </button>
                    ) : (
                      <div className="inline-block align-middle text-center w-44 ">
                        <span className="font-medium inline-block mb-3 py-3 px-4 border border-kg-250 text-kg-200">
                          후기작성 완료
                        </span>
                        <button
                          id={`button_${product_id}`}
                          onClick={onClick}
                          className="font-medium hover:bg-kp-600 hover:text-white py-3 px-4 border border-kp-600 text-kp-600"
                        >
                          장바구니 담기
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </li>
          ),
        )}
    </>
  );
};
export default WriteReview;
