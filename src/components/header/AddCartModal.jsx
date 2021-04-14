import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NameBox = styled.p`
  overflow: hidden;
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const AddCartModalStyle =
  'absolute border bg-white border-gray-200 p-7 text-r-1.6 w-r-35.5 h-r-10.3 right-72 top-r-7.4 z-50 origin-top-right transition-all';

const AddCartModal = () => {
  const { itemDetail, isNew, isOpen } = useSelector(({ itemDetail, addGoodsToCart }) => ({
    itemDetail: itemDetail.info,
    isNew: addGoodsToCart.result,
    isOpen: addGoodsToCart.modalopen,
  }));

  return (
    <div className={AddCartModalStyle + (isOpen ? '' : ' transform scale-0 opacity-0')}>
      <div className=" bg-cartTriangle bg-no-repeat absolute bg-contain w-r-1.9 h-36 bg-center -top-r-5.1 right-r-1.4 " />
      <div className="flex justify-between">
        <img
          className="w-r-4.6 h-r-6"
          src={
            itemDetail && itemDetail.list_image_url
              ? itemDetail.list_image_url
              : 'https://img-cf.kurly.com/shop/data/goods/1470380801697s0.jpg'
          }
          alt="img"
        />
        <div className="text-r-1.4 font-medium w-r-24 flex flex-col justify-around">
          <div className="py-1 w-full">
            <NameBox className="text-p-14 text-gray-500">{itemDetail && itemDetail.name}</NameBox>
          </div>
          <p>장바구니에 상품을 담았습니다.</p>
          {isNew === 'addCnt' && <p>이미 담으신 상품이 있어 추가되었습니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AddCartModal);
