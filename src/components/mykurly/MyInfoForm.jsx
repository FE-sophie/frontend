import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myInfoModify } from '../../modules/myInfo';
import CheckBox from '../signup/CheckBox';
import FormInput from '../signup/FormInput';
import IdInput from '../signup/IdInput';
import InputDate from '../signup/InputDate';
import InputGender from '../signup/InputGender';
import PassInput from './MyCurlyPassInput';
import SignupButton from '../signup/SignupButton';
import SignupModal from '../signup/SignupModal';
import { useCookies, withCookies } from 'react-cookie';
import { withRouter } from 'react-router';

const MyInfoForm = ({ history }) => {
  const dispatch = useDispatch();
  const formTitle = 'pb-14 border-b-2 border-solid border-kg-400 font-medium text-r-24';
  const regForm = 'text-r-1.4 mt-4';
  const regTitle = 'text-left align-top pt-7 ';
  const regInput = 'border-solid border border-inputGray w-r-32 h-16 px-6';
  const subText = 'text-r-1.2 text-gray-600';
  const secesstBtn = 'border border-kp-600 mr-4 text-kp-600 w-48 h-20 rounded-md';
  const infoBtn = 'bg-kp-600 text-white w-48 h-20 rounded-md';
  const borderBottom = 'border-b border-solid border-kg-400';

  const [validPass1, setValidPass1] = useState(false);
  const [validPass2, setValidPass2] = useState(false);
  const [validPass3, setValidPass3] = useState(false);
  const [validPass4, setValidPass4] = useState(false);
  const [validRePass, setValidRePass] = useState(false);

  const [userGender, setGender] = useState('none');

  const [agree2, setAgree2] = useState(false);
  const [info, setInfo] = useState(false);
  const [sms, setSms] = useState(false);
  const [userEmail, setEmail] = useState(false);

  const [signup, setSignup] = useState(false);
  const [terms, setTerms] = useState(false);
  const [modalValue, setModalValue] = useState('');

  const formRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const agree2Ref = useRef();
  const infoRef = useRef();
  const smsRef = useRef();
  const emailRef2 = useRef();
  const [inputs, setInputs] = useState({
    uid: '',
    password: '',
    checkPassword: '',
    name: '',
    email: '',
    phone: '',
    date_of_birth: { birthY: '', birthM: '', birthD: '' },
    gender: '',
    address: '',
    check_sns: '',
    check_term: '',
  });
  const {
    password,
    gender,
    check_sns,
    check_term,
    email,
    name,
    phone,
    checkPassword,
    date_of_birth: { birthY, birthM, birthD },
  } = inputs;
  const [originPassword, setOriginPassword] = useState('');
  const getMyInfo = useSelector(state => state.myInfo.info);
  const {
    u_id,
    u_name,
    u_origin_password,
    u_email,
    u_gender,
    u_phone,
    u_date_of_birth,
    u_checkSns,
    u_checkTerm,
  } = getMyInfo;
  const originRef = useRef();

  const passRef = useRef();
  const originSub = useRef();
  const rePassRef = useRef();
  const passSub = useRef();
  const rePassSub = useRef();

  const [cookies] = useCookies(['auth', 'id']);
  const cookieAuth = cookies.auth;
  return (
    <div className="w-r-85 h-full mt-20 mb-14 font-normal">
      <h1 className={formTitle}>개인 정보 수정</h1>
      <form className={regForm} onSubmit={onSubmit} ref={formRef} autoComplete="off">
        <input style={{ display: 'none' }} aria-hidden="true" />
        <input type="password" style={{ display: 'none' }} aria-hidden="true" />
        <table className="ml-auto mr-auto">
          <colgroup>
            <col width="160px" />
          </colgroup>
          <tbody>
            <tr>
              <IdInput
                readOnly={true}
                u_id={u_id}
                // userId={userId}
              />
            </tr>
            <PassInput
              state={[validPass1, validPass2, validPass3, validPass4, validRePass]}
              setState={[
                setValidPass1,
                setValidPass2,
                setValidPass3,
                setValidPass4,
                setValidRePass,
              ]}
              Ref={[originSub, passSub, rePassSub, passRef, rePassRef, originRef]}
              info={true}
              inputs={inputs}
              origin_password={u_origin_password}
              originPassword={originPassword}
              setOriginPassword={setOriginPassword}
              setInputs={setInputs}
            />
            <tr>
              <FormInput
                name="name"
                placeholder="이름을 입력해주세요"
                inFo={true}
                value={u_name || name}
                onChange={checkName}
              >
                이름
              </FormInput>
            </tr>
            <tr>
              <FormInput
                name="email"
                placeholder="예: marketkurly@kurly.com"
                ref={emailRef}
                inFo={true}
                onChange={checkEmail}
                value={u_email || email}
              >
                이메일
              </FormInput>
              <td>
                <SignupButton onClick={clickButton}>중복확인</SignupButton>
              </td>
            </tr>
            <tr>
              <FormInput
                name="phone"
                placeholder="숫자만 입력해주세요"
                ref={phoneRef}
                onChange={checkPhone}
                inFo={true}
                value={u_phone || phone}
              >
                휴대폰
              </FormInput>
              <td>
                <SignupButton onClick={clickButton}>다른 번호인증</SignupButton>
              </td>
            </tr>
            <tr>
              <th className={regTitle}>성별</th>
              <td className="py-4">
                <InputGender
                  id="man"
                  name="userGender"
                  onChange={e => {
                    setGender(e.target.id);
                    setInputs({
                      ...inputs,
                      gender: e.target.id,
                    });
                  }}
                  state={(u_gender && userGender) || userGender}
                >
                  남자
                </InputGender>
                <InputGender
                  id="woman"
                  name="userGender"
                  onChange={e => {
                    setGender(e.target.id);
                    setInputs({
                      ...inputs,
                      gender: e.target.id,
                    });
                  }}
                  state={(u_gender && userGender) || userGender}
                >
                  여자
                </InputGender>
                <InputGender
                  id="none"
                  name="userGender"
                  onChange={e => {
                    setGender(e.target.id);
                    setInputs({
                      ...inputs,
                      gender: e.target.id,
                    });
                  }}
                  state={(u_gender && userGender) || userGender}
                >
                  선택안함
                </InputGender>
              </td>
              <td></td>
            </tr>
            <tr>
              <th className={regTitle}>생년월일</th>
              <td className="py-4">
                <div className={regInput}>
                  <InputDate
                    name="birthY"
                    placeholder="YYYY"
                    onChange={checkBirth}
                    value={u_date_of_birth.year || birthY}
                  />
                  <InputDate
                    name="birthM"
                    placeholder="MM"
                    onChange={checkBirth}
                    value={u_date_of_birth.month || birthM}
                  />
                  <InputDate
                    name="birthD"
                    placeholder="DD"
                    onChange={checkBirth}
                    value={u_date_of_birth.day || birthD}
                  />
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <th className={`${regTitle} ${borderBottom}`}>선택약관동의</th>
              <td colSpan="2" className={`${borderBottom} relative`}>
                <CheckBox
                  id="agree2"
                  state={u_checkTerm === 1 ? true : agree2}
                  ref={agree2Ref}
                  onChange={e => {
                    const { checked } = e.target;
                    setAgree2(!agree2);
                    setInputs({ ...inputs, check_term: checked ? 1 : 0 });
                  }}
                >
                  개인정보 수집·이용 동의 <span className="sub">(선택)</span>
                  <span
                    className="text-kp-600 absolute px-3 right-0 cursor-pointer"
                    onClick={() => setTerms(true)}
                  >
                    약관보기
                  </span>
                </CheckBox>
              </td>
            </tr>
            <tr>
              <th className={regTitle}>이용약관동의</th>
              <td className="py-4" colSpan="2">
                <CheckBox
                  id="info"
                  state={u_checkSns === 3 ? true : info}
                  ref={infoRef}
                  onChange={onSnsAll}
                >
                  무료배송, 할인쿠폰 등 혜택/정보 수신 동의<span className="sub">(선택))</span>
                </CheckBox>
                <div className="pl-14">
                  <CheckBox
                    id="sms"
                    state={u_checkSns === 1 || u_checkSns === 3 ? true : sms}
                    ref={smsRef}
                    onChange={e => {
                      const { checked } = e.target;
                      setSms(!sms);
                      setInputs({
                        ...inputs,
                        check_sns: { ...inputs, check_sns: checked ? 1 : u_checkSns === 3 ? 2 : 0 },
                      });
                    }}
                    sub={true}
                  >
                    <span className="align-middle">SMS</span>
                  </CheckBox>
                  <CheckBox
                    id="userEmail"
                    state={u_checkSns === 2 || u_checkSns === 3 ? true : userEmail}
                    ref={emailRef2}
                    onChange={e => {
                      const { checked } = e.target;
                      setEmail(!userEmail);
                      setInputs({ ...inputs, check_sns: checked ? 2 : u_checkSns === 3 ? 1 : 0 });
                    }}
                    sub={true}
                  >
                    <span className="align-middle">이메일</span>
                  </CheckBox>
                  <p className={`${subText} text-1.2`}>
                    <span className="text-kp-600">
                      동의 시 한 달간 [5% 적립] + [무제한 무료배송]
                    </span>
                    <span className="sub">(첫 주문 후 적용)</span>
                  </p>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="3" className="text-center pt-16">
                <button className={secesstBtn} onClick={secession}>
                  탈퇴하기
                </button>
                <button type="submit" className={infoBtn} onClick={checkForm}>
                  회원정보수정
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <SignupModal
        modalIsOpen={signup || terms}
        closeModal={closeModal}
        value={modalValue}
        form={terms || ''}
      />
    </div>
  );

  function checkForm() {
    const { year, month, day } = u_date_of_birth;
    setInputs({
      ...inputs,
      uid: u_id,
      password: u_origin_password,
      checkPassword,
      name: u_name || name,
      email: u_email || email,
      phone: u_phone || phone,
      date_of_birth: `${year}-${month}-${day}` || `${birthY}-${birthM}-${birthD}`,
      gender: u_gender || gender,
      check_sns: check_sns ? check_sns : u_checkSns,
      check_term: check_term ? check_term : u_checkTerm,
    });
  }
  function secession() {}

  function clickButton(params) {}

  function onSnsAll() {
    setInfo(!info);
    setSms(!info);
    setEmail(!info);
    setInputs({
      ...inputs,
      check_sns: 3,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (originPassword.length > 0) {
      if (originPassword !== u_origin_password) {
        setSignup(true);
        setModalValue('현재 비밀번호를  확인해주세요');
        originRef.current.focus();
      } else if (password !== checkPassword) {
        setSignup(true);
        setModalValue('새비밀번호를  확인해주세요');
        passRef.current.focus();
      }
    } else if (u_email !== emailRef.current.value) {
      setSignup(true);
      setModalValue('이메일 중복체크 확인해주세요');
      emailRef.current.focus();
    } else {
      dispatch(myInfoModify(inputs, cookieAuth));
      alert('회원정보수정이 완료되었습니다.');
      history.push('/');
    }
  }

  function checkPhone(e) {
    const { value } = e.target;
    const lastChar = value.slice(-1);
    if (isNaN(+lastChar) || value.length > 12) {
      e.target.value = value.substring(0, value.length - 1);
    }
    setInputs({ ...inputs, phone: e.target.value });
  }
  function checkBirth(e) {
    const { name, value } = e.target;
    const lastChar = value.slice(-1);
    const num = name === 'birthY' ? 4 : 2;
    if (isNaN(+lastChar) || value.length > num) {
      e.target.value = value.substring(0, value.length - 1);
    }
    setInputs({
      ...inputs,
      date_of_birth: { ...inputs.date_of_birth, [name]: value },
    });
  }
  function checkEmail(e) {
    setInputs({
      ...inputs,
      email: e.target.value,
    });
  }
  function checkName(e) {
    setInputs({
      ...inputs,
      name: e.target.value,
    });
  }
  function closeModal() {
    setSignup(false);
    setTerms(false);
  }
};

export default withRouter(withCookies(MyInfoForm));
