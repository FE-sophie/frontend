import React from 'react';
import MyKurlyHeader from './MyKurlyHeader';
import MyKurlyCategory from './MyKurlyCategory';
import { GoPrimitiveSquare } from 'react-icons/go';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
const MyCoupon = ({ history }) => {
  const [cookies, , removeCookie] = useCookies(['auth']);
  const cookieAuth = cookies.auth;
  const member = useSelector(state => state.login.member);
  useEffect(() => {
    if (!cookieAuth) {
      alert('로그인 후 이용해주세요');
      history.push('/shop/account/signin');
    } else if (cookieAuth && !member.name) {
      removeCookie('auth');
    }
  }, [cookieAuth, history, member.name, removeCookie]);
  return (
    <>
      <MyKurlyHeader />
      <main className="container h-full box-content clear-fix">
        <MyKurlyCategory />
        <MyCouponBlock />
      </main>
    </>
  );
};

const MyCouponBlock = () => {
  return (
    <div className="float-left align-middle w-r-85 h-full mt-20 mb-6 px-12 pb-32 box-border">
      <h1 className="a11y-hidden">쿠폰내역 확인 </h1>
      <div className="">
        <h2 className=" inline-block font-medium align-middle mr-6 text-r-2.4 mb-12">쿠폰</h2>
        <div className="border border-kg-80 py-4">
          <div className="px-12 py-4">
            <input
              className="inline-block w-r-21.2 px-4 border border-black py-3 mr-6 text-r-1.2 box-border"
              placeholder="쿠폰을 입력해주세요"
            />
            <button className="py-3 px-20 bg-kp-600 text-r-1.2 border border-kp-600  text-white">
              쿠폰 등록
            </button>
            <p className="mt-5 text-r-1.2 text-cautionRed">
              쿠폰에 하이픈("-")이 포함되어 있을경우 하이픈("-")을 반드시 입력해주세요.
            </p>
          </div>
        </div>
        <p className="text-r-1.2 text-kg-350 mt-6">
          <GoPrimitiveSquare className="inline-block mr-2 text-xs text-kg-600" />
          쿠폰은 적용 가능한 상품이 따로 적용되어 있는 경우 해당 상품 구매 시에만 사용이 가능합니다.
          <span className="ml-80 text-r-1.3">사용가능한 쿠폰 : 0장</span>
        </p>
        <ul className="border-t-2  mt-4 border-kg-300">
          <li className="py-7 text-r-1.4 font-medium border-b border-kg-300">
            <ul>
              <li className="w-p-410 inline-block text-left px-6 ">쿠폰명</li>
              <li className="w-r-5.6 align-middle text-center inline-block ">기능</li>
              <li className="w-r-7.9 align-middle inline-block text-center">할인/적립</li>
              <li className="w-r-16.3 align-middle inline-block text-center">사용가능기간</li>
              <li className="w-r-7.9 align-middle inline-block text-center">사용여부</li>
            </ul>
          </li>
          <EmptyCoupon />
          {/* <MyCouponItem /> */}
        </ul>
      </div>
    </div>
  );
};

// const MyCouponItem = () => {
//   return (
//     <li className="py-7 text-r-1.4 font-medium border-b border-kg-300">
//       <ul>
//         <li className="w-p-410 inline-block text-left px-6 align-middle ">
//           <div>
//             <p>[미트클레버] 한돈 떡갈비 100% 행복쿠폰</p>
//             <span>5/31(일) 23:59까지 사용 가능</span>
//           </div>
//         </li>
//         <li className="w-r-5.6 align-middle text-center inline-block ">할인</li>
//         <li className="w-r-7.9 align-middle inline-block text-center">3000원</li>
//         <li className="w-r-16.3 align-middle inline-block text-center">2020.12.9~2020.12.31</li>
//         <li className="w-r-7.9 align-middle inline-block text-center text-klp-600">미사용</li>
//       </ul>
//     </li>
//   );
// };

const EmptyCoupon = () => {
  return (
    <>
      <div className="py-24 text-r-1.3 text-center  text-kg-350 border-b border-kg-100">
        주문 쿠폰이 없습니다.
      </div>
    </>
  );
};
export default withRouter(MyCoupon);
