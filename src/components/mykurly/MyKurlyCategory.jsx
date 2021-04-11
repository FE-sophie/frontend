import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { getReviewList } from '../../modules/review';
import { useCookies, withCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
const category = [
  { id: 1, name: '주문내역', path: '/shop/mypage/mypage_orderlist' },
  { id: 2, name: '배송지관리', path: '/shop/mypage/destination/list' },
  { id: 3, name: '늘사는것', path: '/shop/mypage/mypage_wishlist' },
  { id: 4, name: '상품후기', path: '/shop/mypage/mypage_review' },
  { id: 5, name: '적립금', path: '/shop/mypage/mypage_emoney' },
  { id: 6, name: '쿠폰', path: '/shop/mypage/mypage_coupon' },
  { id: 7, name: '개인정보수정', path: '/shop/member/myinfo' },
];

const myKurly_menu =
  'w-80 border border-kg-80 border-b-0 last:border text-r-1.4 text-kg-350 hover:text-kp-600 hover:bg-kg-50 leading-none';
const MyKurlyCategory = () => {
  const [cookies] = useCookies(['auth']);
  const cookieAuth = cookies.auth;
  const dispatch = useDispatch();
  return (
    <div className="float-left">
      <h1 className="a11y-hidden">마이컬리 메인</h1>
      <section className="">
        <h2 className="text-5xl leading-none mt-20 mb-14">마이컬리</h2>
        <ul className="w-full ">
          <>
            {category.map(list => (
              <li className={`${myKurly_menu}`} key={list.id}>
                <NavLink
                  to={list.path}
                  activeClassName="bg-kg-50 text-kp-600 font-medium"
                  className="text-right inline-block pl-10 pr-6 py-6 w-full "
                >
                  {list.id === 4 ? (
                    <span
                      onClick={getReview}
                      className="inline-block text-left w-48 mr-8 leading-none align-middle"
                    >
                      {list.name}
                    </span>
                  ) : (
                    <span className="inline-block text-left w-48 mr-8 leading-none align-middle">
                      {list.name}
                    </span>
                  )}
                  <FiChevronRight className="inline-block text-r-1.8 leading-none align-middle" />
                </NavLink>
              </li>
            ))}
          </>
        </ul>
        <div className="cursor-pointer w-80 py-4 pl-10 rounded-r-full bg-kg-100 my-8">
          <p className="inline-block align-middle">
            <strong className="text-r-1.4 font-medium">도움이 필요하신가요?</strong>
            <span className="block text-r-1.2">1:1 문의하기</span>
          </p>
          <FiChevronRight className="inline-block text-r-1.8 ml-6 align-middle text-kp-600" />
        </div>
      </section>
    </div>
  );
  function getReview() {
    dispatch(getReviewList('viewBeforeList', cookieAuth));
  }
};

export default withRouter(withCookies(MyKurlyCategory));
