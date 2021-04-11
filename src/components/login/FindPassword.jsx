import React, { useEffect, useState } from 'react';
import { LoginFormStyle } from './Login';
import Input from './Input';
import Title from './Title';
import Button from './Button';
import Modalform from './Modalform';
import Modal from './Modal';
import { findLoginInfo } from '../../modules/login';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { withRouter } from 'react-router';

const FindPassword = withRouter(({ history }) => {
  const [form, setform] = useState({
    findform: false,
    modal: false,
    emailCheckModal: false,
    pwdChangeModal: false,
    modalValue: '',
  });
  const [inputs, setInputs] = useState({
    u_name: '',
    u_id: '',
    u_email: '',
  });
  const findInfo = useSelector(state => state.login.findInfo);
  const modalOpen = useSelector(state => state.login.modalOpen);
  const { u_name, u_id, u_email } = inputs;
  const { modal, modalValue } = form;
  const passRef = useRef();
  const rePassRef = useRef();

  const passSub = useRef();
  const rePassSub = useRef();
  const [validPass1, setValidPass1] = useState(false);
  const [validPass2, setValidPass2] = useState(false);
  const [validPass3, setValidPass3] = useState(false);
  const [validRePass, setValidRePass] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    // if (findInfo.message.member_id) dispatch(resetData());
  }, []);
  return (
    <LoginFormStyle>
      <form onSubmit={onSubmitFindPwd}>
        {findInfo.message !== 'SUCCESS' ? (
          <>
            <FindPassword1 onChange={onChange} u_name={u_name} u_id={u_id} u_email={u_email} />
            <Button type="submit" form="find">
              비밀번호 찾기
            </Button>
          </>
        ) : (
          // <>
          //   <div className="text-center">
          //     <img
          //       className="inline-block w-20"
          //       src="https://res.kurly.com/mobile/service/member/1908/img_pw_find_email.png"
          //       alt=""
          //     />
          //     <p className="text-r-2 text-kp-600 font-semibold pt-2">
          //       고객님의 이메일로 <br />
          //       비밀번호를 발송하였습니다.
          //     </p>
          //     <span className="text-r-1.2 inline-block pt-5 pb-10">
          //       입력하신 {findInfo.email}으로 비밀번호가 발송되며 전송량이 많은 경우 이메일 전송이
          //       지연될 수 있습니다.
          //     </span>
          //   </div>
          //   <Button>
          //     <Link to="/shop/account/signin">로그인하기</Link>
          //   </Button>
          // </>
          // <>
          //   <FindPassword2 />
          //   <Button type="submit" onClick={onClick2} form="find">
          //     비밀번호 변경
          //   </Button>
          // </>

          <>
            <FindPassword2
              passSub={passSub}
              rePassSub={rePassSub}
              passRef={passRef}
              rePassRef={rePassRef}
              validPass1={validPass1}
              validPass2={validPass2}
              validPass3={validPass3}
              validRePass={validRePass}
              setValidPass1={setValidPass1}
              setValidPass2={setValidPass2}
              setValidPass3={setValidPass3}
              setValidRePass={setValidRePass}
            />
            <Button type="submit" form="find">
              비밀번호 변경
            </Button>
          </>
        )}
      </form>
      {findInfo.message !== 'SUCCESS' ? (
        modal || modalOpen ? (
          <Modalform id="modal">
            <Modal closeModal={closeModal} modal={modal} value={modalValue} />
          </Modalform>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </LoginFormStyle>
  );

  // 이벤트핸들러 정의
  //INPUT 상태 관리
  function onChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function onSubmitFindPwd(e) {
    e.preventDefault();

    if (u_name && u_id) {
      if (u_email && checkEmail()) {
        dispatch(findLoginInfo('pwd', inputs));
        setform({
          ...form,
          modal: true,
          modalValue: '고객정보를 올바르게 입력하세요',
        });
      } else if (!checkEmail()) {
        console.log('바보');
        console.log(checkEmail());
        setform({
          ...form,
          modal: true,
          modalValue: '이메일을 제대로 입력하세요',
        });
      }
    }
    if (validPass1 && validPass2 && validPass3 && validRePass) {
      const changePw = { member_id: findInfo.member_id, insertChangePw: passRef.current.value };
      dispatch(findLoginInfo('changePwd', changePw));
      setform({
        ...form,
        modal: true,
        modalValue: '비밀번호가 변경이 완료되었습니다.',
      });
      history.push('/shop/account/signin');
    }
  }
  // //버튼클릭 후 이메일 유효성 검사 실행 결과에 따른 모달창 띄우기
  // function onClickCheckForm() {
  //   if (u_name && u_id) {
  //     setform({
  //       ...form,
  //       findform: u_email && u_name && u_id && checkEmail(),
  //       modal: !checkEmail(),
  //       modalValue: '이메일을 제대로 입력해주세요',
  //     });
  //   } else {
  //     setform({
  //       ...form,
  //       modal: false,
  //     });
  //   }
  // }

  // function onClickFindPwd() {
  // console.log(!validPass1 && !validPass2 && !validPass3 && !validRePass);
  //   setform({
  //     ...form,
  //     modal: true,
  //     pwdChangeModal: true,
  //     modalValue: '고객정보 다시',
  //   });
  // }

  //모달창 닫기
  function closeModal() {
    setform({
      ...form,
      modal: false,
    });
  }

  //이메일 유효성 검사
  function checkEmail() {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(u_email);
  }
});
export default FindPassword;

function FindPassword1({ onChange, u_name, u_id, u_email }) {
  return (
    <div>
      <Title>비밀번호 찾기</Title>
      <label className="text-r-1.2 inline-block pt-r-1.1 ">
        이름
        <Input
          name="u_name"
          type="text"
          onChange={onChange}
          placeholder="고객님의 이름을 입력해주세요"
          value={u_name}
          required
        />
      </label>
      <label className="text-r-1.2 inline-block pt-r-1.1 ">
        아이디
        <Input
          name="u_id"
          onChange={onChange}
          type="text"
          placeholder="고객님의 아이디를 입력해주세요"
          value={u_id}
          required
        />
      </label>
      <label className="text-r-1.2 inline-block pt-r-1.1">
        이메일
        <Input
          name="u_email"
          onChange={onChange}
          type="text"
          placeholder="고객님의 이메일을 입력해주세요"
          value={u_email}
          required
        />
      </label>
    </div>
  );
}
const regInput =
  'text-r-1.4 rounded inline-block w-p-340 h-p-54 px-r-1.9 border border-gray-300 mt-4 Default focus style focus:bg-klp-700';
const subText = 'text-r-1.2 text-gray-600';

const FindPassword2 = ({
  rePassRef,
  passRef,
  passSub,
  rePassSub,
  validPass1,
  validPass2,
  validPass3,
  validRePass,
  setValidPass1,
  setValidPass2,
  setValidPass3,
  setValidRePass,
}) => {
  return (
    <div>
      <Title>비밀번호 변경</Title>
      <label className="text-r-1.2 inline-block pt-r-1.1 ">
        새비밀번호
        <input
          type="password"
          name="password"
          className={regInput}
          onChange={checkPass}
          onFocus={onFocusPass}
          ref={passRef}
          placeholder={'비밀번호를 입력해주세요'}
          autoComplete="new-password"
          onKeyDown={keyPress}
          required
        />
      </label>
      <div className="hidden" ref={passSub}>
        <p className={`${subText} ${validPass1 ? 'text-green-700' : 'text-red-800'}`}>
          {validPass1 ? '✓' : '✕'} 10자 이상 입력
        </p>
        <p className={`${subText} ${validPass2 ? 'text-green-700' : 'text-red-800'}`}>
          {validPass2 ? '✓' : '✕'} 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
        </p>
        <p className={`${subText} ${validPass3 ? 'text-green-700' : 'text-red-800'}`}>
          {validPass3 ? '✓' : '✕'} 동일한 숫자 3개 이상 연속 사용 불가
        </p>
      </div>
      <label className="text-r-1.2 inline-block pt-r-1.1">
        새비밀번호 확인
        <input
          type="password"
          name="CheckPassword"
          className={regInput}
          onChange={checkPass}
          onFocus={onFocusRePass}
          ref={rePassRef}
          placeholder={'비밀번호를 한번 더 입력해주세요'}
          onKeyDown={keyPress}
          required
        />
        <div className="hidden" ref={rePassSub}>
          <p className={`${subText} ${validRePass ? 'text-green-700' : 'text-red-800'}`}>
            {validRePass ? '✓' : '✕'} 동일한 비밀번호를 입력해주세요.
          </p>
        </div>
      </label>
    </div>
  );
  function onFocusPass() {
    passSub.current.className = 'block';
  }

  function onFocusRePass() {
    rePassSub.current.className = 'block';
  }

  function checkPass(e) {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        value === rePassRef.current.value ? setValidRePass(true) : setValidRePass(false);

        var pwRegExp1 = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
        var pwRegExp2 = /(\w)\1\1/;

        value.length >= 10 ? setValidPass1(true) : setValidPass1(false);
        pwRegExp1.test(value) ? setValidPass2(true) : setValidPass2(false);
        pwRegExp2.test(value) ? setValidPass3(false) : setValidPass3(true);
        break;
      case 'CheckPassword':
        passRef.current.value && passRef.current.value === value
          ? setValidRePass(true)
          : setValidRePass(false);
        break;
      default:
        break;
    }
  }
  function keyPress(e) {
    if (e.keyCode === 13) e.preventDefault();
  }
};
