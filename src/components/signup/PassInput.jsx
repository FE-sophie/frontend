import React, { useRef } from 'react';

const regTitle = 'font-medium text-left align-top pt-7 ';
const regInput = 'border-solid border border-inputGray w-r-32 h-16 px-6 text-kg-400';
const subText = 'text-r-1.2 text-gray-600';

const PassInput = ({
  state: [validPass1, validPass2, validPass3, validRePass],
  setState: [setValidPass1, setValidPass2, setValidPass3, setValidRePass],
  info,
}) => {
  const passRef = useRef();
  const rePassRef = useRef();

  const passSub = useRef();
  const rePassSub = useRef();

  return (
    <>
      {info ? (
        <tr>
          <th className={regTitle}>현재 비밀번호</th>
          <td className="py-4">
            <input type="password" name="curPassword" className={regInput} />
          </td>
        </tr>
      ) : (
        <></>
      )}
      <tr>
        <th className={regTitle}>
          {info ? (
            '새 비밀번호'
          ) : (
            <>
              비밀번호<span className="text-formStar">*</span>
            </>
          )}
        </th>
        <td className="py-4" colSpan="2">
          <input
            type="password"
            name="password"
            className={regInput}
            onChange={checkPass}
            onFocus={onFocusPass}
            ref={passRef}
            placeholder={info ? '' : '비밀번호를 입력해주세요'}
            autoComplete="new-password"
            onKeyDown={keyPress}
          />
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
        </td>
      </tr>
      <tr>
        <th className={regTitle}>
          {info ? (
            '새 비밀번호 확인'
          ) : (
            <>
              비밀번호 확인<span className="text-formStar">*</span>
            </>
          )}
        </th>
        <td className="py-4" colSpan="2">
          <input
            type="password"
            name="CheckPassword"
            className={regInput}
            onChange={checkPass}
            onFocus={onFocusRePass}
            ref={rePassRef}
            placeholder={info ? '' : '비밀번호를 한번 더 입력해주세요'}
            onKeyDown={keyPress}
          />
          <div className="hidden" ref={rePassSub}>
            <p className={`${subText} ${validRePass ? 'text-green-700' : 'text-red-800'}`}>
              {validRePass ? '✓' : '✕'} 동일한 비밀번호를 입력해주세요.
            </p>
          </div>
        </td>
      </tr>
    </>
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

export default PassInput;
