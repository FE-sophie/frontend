import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import Button from './Button';
import CheckBox from './CheckBox';
import Modalform from './Modalform';
import Modal from './Modal';
import Title from './Title';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAuthentication, setLogInAndOut } from '../../modules/login';

export const LoginFormStyle = styled.div`
  width: 340px;
  height: 600px;
  margin: 0 auto;
`;

const Login = ({ history }) => {
  const modalOpen = useSelector(state => state.login.modalOpen);
  const [user, setUser] = useState({
    u_id: '',
    u_password: '',
  });
  const [modal, setModal] = useState(false);
  const [checked, setchecked] = useState(false);

  const { u_id, u_password } = user;
  function onChange(e) {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  return (
    <LoginFormStyle>
      <Title>로그인</Title>
      <form onSubmit={onSubmitCheckLogin}>
        <Input
          name="u_id"
          onChange={onChange}
          autoFocus
          required
          type="text"
          placeholder="아이디를 입력하세요"
          value={u_id}
        />
        <Input
          name="u_password"
          onChange={onChange}
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={u_password}
          required
        />
        <div className="mt-r-0.9 text-kg-300 text-r-1.3 leading-3">
          <CheckBox value="보안접속" onChange={onClickCheckBox} checked={checked} />
          <Link to="/shop/account/find_id">
            <span className="align-middle ml-r-11">아이디 찾기</span>
          </Link>
          <span className="align-middle px-1">|</span>
          <Link to="/shop/account/find_pwd">
            <span className="align-middle">비밀번호 찾기</span>
          </Link>
        </div>
        <Button onClick={loginCheck} type="submit" form="signin">
          로그인
        </Button>
      </form>
      <Button form="signout" as={Link} to="/shop/account/signup">
        회원가입
      </Button>
      {modalOpen && (
        <Modalform id="modal">
          <Modal closeModal={closeModal} modal={modal} value="아이디와 비밀번호를 확인해주세요" />
        </Modalform>
      )}
    </LoginFormStyle>
  );
  function onSubmitCheckLogin(e) {
    e.preventDefault();
  }
  function loginCheck() {
    dispatch(loginAuthentication(user));
    setModal(true);
  }
  function onClickCheckBox() {
    setchecked(!checked);
  }
  function closeModal() {
    dispatch(setLogInAndOut());
    setModal(false);
  }
};

export default withRouter(Login);
