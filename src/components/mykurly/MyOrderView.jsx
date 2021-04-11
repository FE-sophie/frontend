import React, { useState, useEffect } from 'react';
import MyKurlyHeader from './MyKurlyHeader';
import MyKurlyCategory from './MyKurlyCategory';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useParams, withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetail, postInsertCart } from '../../modules/orderList';
import CartModal from '../itemList/CartModal';
import MyOrderViewDetails from './MyOrderViewDetails';
import MyOrderViewItem from './MyOrderViewItem';
import Modalform from '../login/Modalform';
import Modal from '../login/Modal';
import { useCookies, withCookies } from 'react-cookie';
const MyOrderView = () => {
  return (
    <>
      <MyKurlyHeader />
      <main className="container h-full box-content clear-fix">
        <MyKurlyCategory />
        <MyOrderViewBlock />
      </main>
    </>
  );
};

const MyOrderViewBlock = withRouter(({ history }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const { orderNumber } = useParams();
  const ordno = orderNumber.split('=')[1];
  const orderDetail = useSelector(state => state.order.detail);
  const postSuccess = useSelector(state => state.order.posts);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['auth']);
  const member = useSelector(state => state.login.member);
  const cookieAuth = cookies.auth;
  useEffect(() => {
    if (!cookieAuth) {
      alert('로그인 후 이용해주세요');
      history.push('/shop/account/signin');
    } else if (cookieAuth && !member.name) {
      alert('비정상적인 접속으로 메인화면으로 이동합니다.');
      history.push('/');
    }
    dispatch(getOrderDetail(ordno, cookieAuth));
  }, [cookieAuth, dispatch, history, member.name, ordno]);

  const [cartItem, setCartItem] = useState({
    product_id: '',
    name: '',
    original_price: 0,
    discounted_price: 0,
    discount_percent: 0,
  });

  const { product_id, name, original_price, discounted_price, discount_percent } = cartItem;

  return (
    <div className="float-left align-middle w-r-85 h-full mt-20 px-12 box-border ">
      <h1 className="a11y-hidden">배송지 확인</h1>
      <div className="border-b-2 border-kg-300 pb-6">
        <h2 className="font-medium align-middle text-r-2.4 mb-10 ">주문내역상세</h2>
        <h3 className="w-2/3  inline-block align-middle text-r-2 font-medium">{}</h3>
        <p className="ml-8  inline-block text-r-1.2 align-middle text-kg-350">
          배송 또는 상품에 문제가 있나요?{' '}
          <span className="text-kp-600">
            1:1문의하기
            <HiOutlineChevronRight className="inline-block" />
          </span>
        </p>
      </div>
      <MyOrderViewItem orderDetail={orderDetail} onClick={openCartModal} />
      <div className="text-center ">
        <div className="inline-block my-16">
          <button
            onClick={insertCartItems}
            className="rounded w-r-21.2 border font-medium border-kp-600 py-6 text-r-1.6 text-kp-600"
          >
            전체 상품 다시 담기
          </button>
          <button className="ml-4 rounded w-r-21.2 border font-medium border-kp-80 py-6 text-r-1.6 text-kg-80">
            전체 상품 주문 취소
          </button>
        </div>
        <p className="text-r-1.4 text-kg-350 ">
          직접 주문취소는 '입금확인'상태일 경우에만 가능합니다.
        </p>
      </div>
      <MyOrderViewDetails orderDetail={orderDetail} ordno={ordno} />
      <CartModal
        product_id={product_id}
        modalIsOpen={modalIsOpen}
        closeModal={closeCartModal}
        productName={name}
        originalPrice={original_price}
        discounted_price={discounted_price}
        discount_percent={discount_percent}
      />
      {postSuccess ? (
        <Modalform id="modal">
          <Modal
            closeModal={closeModal}
            modal={modal}
            post={'cart'}
            value="장바구니에 상품을 추가하였습니다."
          />
        </Modalform>
      ) : (
        ''
      )}
    </div>
  );
  function openCartModal(e) {
    const product_item = orderDetail.orderProducts.find(
      product => product.product_id === +e.target.id.split('_')[1],
    );
    const { product_id, name, checkout_price, reduced_price, cnt } = product_item;
    setCartItem({
      ...cartItem,
      product_id,
      name,
      original_price: checkout_price / cnt,
      discounted_price: (checkout_price - reduced_price) / cnt,
      discount_percent: checkout_price / reduced_price,
    });
    setmodalIsOpen(true);
    // dispatch(getProductInfo(product_id));
  }

  function closeCartModal() {
    setmodalIsOpen(false);
  }
  function insertCartItems() {
    const allItem = orderDetail.orderProducts.map(({ product_id, cnt }) => ({ product_id, cnt }));
    dispatch(postInsertCart(allItem, cookieAuth));
    setModal(true);
  }
  function closeModal() {
    setModal(false);
  }
});

export default withCookies(MyOrderView);
