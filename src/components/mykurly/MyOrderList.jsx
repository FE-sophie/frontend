import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import MyKurlyHeader from './MyKurlyHeader';
import MyKurlyCategory from './MyKurlyCategory';
import MyKurlyPageNation from './MyKurlyPageNation';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderItems } from '../../modules/orderList';
import MyOrderListItem from './MyOrderListItem';
import { useCookies, withCookies } from 'react-cookie';

const MyOrderList = ({ history }) => {
  const [cookies] = useCookies(['auth']);
  const cookieAuth = cookies.auth;
  const QueryString = history.location.search;
  const member = useSelector(state => state.login.member);

  const dispatch = useDispatch();
  useEffect(() => {
    QueryString
      ? dispatch(getOrderItems(QueryString, cookieAuth))
      : dispatch(getOrderItems('?page=0', cookieAuth));
    if (!cookieAuth) {
      alert('로그인 후 이용해주세요');
      history.push('/shop/account/signin');
    } else if (cookieAuth && !member.name) {
      alert('비정상적인 접속으로 메인화면으로 이동합니다.');
      history.push('/');
    }
  }, [QueryString, cookieAuth, dispatch, history, member.name]);

  return (
    <>
      <MyKurlyHeader />
      <main className="container h-full box-content clear-fix">
        <MyKurlyCategory />
        <MyOrderListBlock cookieAuth={cookieAuth} />
      </main>
    </>
  );
};

const MyOrderListBlock = withRouter(({ history, cookieAuth }) => {
  const [open, setOpen] = useState(false);
  const orderList = useSelector(state => state.order.data);

  return (
    <div className="float-left align-middle w-r-85 h-full mt-20 mb-14 px-12 pb-32">
      <h1 className="a11y-hidden">주문 내역 확인 </h1>
      <div className="border-b-2 border-kg-300 pb-10 mb-10">
        <h2 className=" inline-block align-middle font-medium mr-6 text-r-2.4">주문내역</h2>
        <p className="inline-block mr-96 align-middle text-r-1.4 text-kg-150">
          지난 3년간의 주문 내역 조회가 가능합니다
        </p>
        <div
          className={`relative inline-block text-kg-350 overflow-hidden ml-20 border border-kg-80 align-middle w-60 h-16 ${
            open ? 'overflow-visible' : 'overflow-hidden'
          }`}
        >
          <button
            className="absolute  pl-4 text-r-1.4 w-full h-full z-20 left-0 top-0 text-left bg-white focus:outline-0"
            onClick={onClick}
          >
            <span className="w-full h-full">전체기간</span>
            {open ? (
              <TiArrowSortedUp className="inline-block ml-20" />
            ) : (
              <TiArrowSortedDown className="inline-block ml-20" />
            )}
          </button>
          <ul
            className={`bg-white w-60 absolute z-0 transition-all border border-kg-80 border-t-0 text-r-1.2 transform -top-r-0.1 -left-r-0.1 
            ${open ? 'translate-y-16' : '-translate-y-0 '}`}
          >
            <li className=" border-b py-3 pl-4  active:bg-kg-100">
              <NavLink to="">전체기간</NavLink>
            </li>
            <li className=" border-b py-3 pl-4 active:bg-kg-100">
              <NavLink to="">2021년</NavLink>
            </li>
            <li className=" border-b py-3 pl-4 active:bg-kg-100">
              <NavLink to="">2020년</NavLink>
            </li>
            <li className=" py-3 pl-4 active:bg-kg-100">
              <NavLink to="">2019년</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <ul>
          <MyOrderListItem orderList={orderList} />
        </ul>
        <MyKurlyPageNation
          pageNumber={orderList.totalPages}
          totalProduct={orderList.totalElements}
          elementNumber={orderList.numberOfElements}
          history={history}
        />
      </div>
    </div>
  );

  function onClick() {
    setOpen(!open);
  }
});

export default withRouter(withCookies(MyOrderList));
