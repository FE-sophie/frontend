import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import mykurlybanner from '../../img/mykurlybanner.jpg';
import { useSelector } from 'react-redux';
import { withCookies } from 'react-cookie';

const li_sm = 'float-left align-middle w-r-19.7 h-r-17.8 bg-white p-12';
const detail_wrapper = 'mt-r-3.5 text-kp-600 leading-none';
const detail_text = 'text-r-2 inline-block align-middle font-medium -mt-1';
const arr_icon = 'inline-block text-r-1.6 leading-8 text-kg-200 ml-2 align-middle';

const MyKurlyHeader = ({ history }) => {
  const { grade, name } = useSelector(state => state.login.member);
  // const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  // const cookieAuth = cookies.auth;
  // const member = useSelector(state => state.login.member);
  // // useEffect(() => {
  //   if (!cookieAuth) {
  //     history.push('/shop/account/signin');
  //   } else if (cookieAuth && !member.name) {
  //     removeCookie('auth');
  //     alert('비정상적인 접속으로 메인화면으로 이동합니다.');
  //     history.push('/');
  //   }
  // }, []);
  return (
    <section className="bg-kg-100 py-20">
      <h1 className="a11y-hidden">회원정보</h1>
      <div className="container">
        <ul className="overflow-x-visible clear-fix text-left h-full">
          <li className="mr-r-0.4 float-left w-r-44.6 bg-white h-r-17.8">
            <section className="p-12 h-full">
              <h1 className="a11y-hidden">회원등급 및 회원이름</h1>
              <span className="align-top mr-8 inline-block border border-kp-600 px-8 py-10 text-r-1.6 rounded-md text-kp-600 leading-none	">
                {grade}
              </span>
              <div className="inline-block">
                <h2 className="inline-block tracking-wide	 text-r-2 font-medium pr-2">{name}</h2>
                <span className="text-r-1.6">님</span>
                <p className="text-r-1.2 my-6">적립 0.5%</p>
                <button className="py-3 px-7 mr-4 text-r-1.4 bg-kg-100 rounded-full leading-none">
                  전체 등급보기
                </button>
                <button className="py-3 px-7 text-r-1.4 bg-kg-100 rounded-full leading-none">
                  다음 달 예상 등급 보기
                </button>
              </div>
            </section>
          </li>
          <li className={`${li_sm} mr-r-0.4`}>
            <section className="h-full">
              <h3 className="text-r-1.4">적립금</h3>
              <p className={`${detail_wrapper}`}>
                <Link to="/shop/mypage/mypage_emoney">
                  <span className={`${detail_text}`}>100 원</span>
                  <BsChevronRight className={`${arr_icon}`} />
                </Link>
              </p>
              <span className="inline-block mt-8 text-r-1.2 text-kg-150">소멸예정 0원</span>
            </section>
          </li>
          <li className={`${li_sm} mr-r-0.4`}>
            <section className="h-full">
              <h3 className="text-r-1.4">쿠폰</h3>
              <p className={`${detail_wrapper}`}>
                <Link to="/shop/mypage/mypage_coupon">
                  <span className={`${detail_text}`}>0 개</span>
                  <BsChevronRight className={`${arr_icon}`} />
                </Link>
              </p>
            </section>
          </li>
          <li className={li_sm}>
            <section className="h-full">
              <h3 className="text-r-1.4">컬리패스</h3>
              <p className={`${detail_wrapper}`}>
                <Link to="/shop/mypage/kurlypass">
                  <span className={`${detail_text}`}>알아보기</span>
                  <BsChevronRight className={`${arr_icon}`} />
                </Link>
              </p>
            </section>
          </li>
        </ul>
        <Link to="/">
          <article
            className="mt-8 h-24 bg-contain  bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${mykurlybanner})` }}
          >
            <h2 className="a11y-hidden">컬리배너</h2>
            <p className="a11y-hidden">
              컬리가 직접 선별한 선물세트-최대 60%할인+선물특가+최대10만원 추가 할인 쿠폰팩 2종
            </p>
          </article>
        </Link>
      </div>
    </section>
  );
};

export default withRouter(withCookies(MyKurlyHeader));
