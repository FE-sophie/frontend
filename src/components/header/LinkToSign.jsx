import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GoTriangleDown } from 'react-icons/go';
import HeaderDropDown from './HeaderDropDown';
import MyKurlyDropDown from './MyKurlyDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies, withCookies } from 'react-cookie';
import { getLoginMember } from '../../modules/login';

const signWrapper = 'relative w-p-1050 flex justify-between items-center mx-auto mt-2 text-r-1.2';

const LinkToSign = () => {
  const [cookies] = useCookies(['auth']);
  const loginInfo = useSelector(state => state.login.member);
  const authToken = useSelector(state => state.login.data.token);
  const cookieToken = cookies.auth;
  const [dropMenu, setDrop] = useState({
    loginService: false,
    customerService: false,
  });
  const { loginService, customerService } = dropMenu;

  const dispatch = useDispatch();
  useEffect(() => {
    // setDrop({
    //   loginService: false,
    //   customerService: false,
    // });
    if (cookieToken) {
      dispatch(getLoginMember(cookieToken));
    } else {
    }
  }, [cookieToken, authToken, dispatch]);

  return (
    <div className={signWrapper}>
      <Link to="/">
        <img
          src="https://res.kurly.com/pc/service/common/1908/delivery_190819.gif"
          alt="서울, 경기, 인천 샛별배송, 수도권 이외 지역 택배배송"
          className="w-r-16.3 h-9 cursor-pointer"
        />
      </Link>
      <nav>
        <ul>
          <li className="inline-block text-kp-600">
            {!loginInfo.name ? (
              <>
                <NavLink to="/shop/account/signup" className="px-3">
                  회원가입
                </NavLink>
                <span className="text-gray-300">ㅣ</span>
              </>
            ) : (
              <span className="border border-kp-600 text-sm rounded-xl px-4 leading-none -mt-1">
                {loginInfo.grade}
              </span>
            )}
          </li>
          <li
            id="loginService"
            className="inline-block h-8"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {!loginInfo.name ? (
              <NavLink to="/shop/account/signin" className="px-3 inline-block">
                로그인
              </NavLink>
            ) : (
              <>
                <div className="px-2 inline-block">
                  <span className="inline-block pr-2">{loginInfo.name}님</span>
                  <img
                    className="w-4 inline-block"
                    src="https://res.kurly.com/pc/service/common/1904/ico_new_20x20.png"
                    alt=""
                  />
                  {/* <span className="inline-block align-middle text-center text-r-0.2 p-0.5 box-content bg-red-400 text-white  rounded-full leading-none">
                  N
                </span> */}
                  <GoTriangleDown className=" ml-2 inline-block cursor-pointer" />
                </div>
                {loginService && <MyKurlyDropDown />}
              </>
            )}
            <span className="text-gray-300">ㅣ</span>
          </li>
          <li
            id="customerService"
            className="inline-block h-8"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="" className="px-3 inline-block">
              고객센터
            </Link>
            <GoTriangleDown className="inline-block cursor-pointer" />
            {customerService && <HeaderDropDown />}
          </li>
        </ul>
      </nav>
    </div>
  );

  function onMouseEnter(e) {
    const { id } = e.currentTarget;
    setDrop({
      ...setDrop,
      [id]: true,
    });
  }
  function onMouseLeave(e) {
    const { id } = e.currentTarget;
    setDrop({
      ...setDrop,
      [id]: false,
    });
  }
};

export default withCookies(LinkToSign);

