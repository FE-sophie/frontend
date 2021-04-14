import React, { useEffect, useState } from 'react';
import MyKurlyHeader from './MyKurlyHeader';
import Modalform from '../login/Modalform';
import Modal from '../login/Modal';
import MyKurlyCategory from './MyKurlyCategory';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import RoundCheckBox from './RoundCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';
import { getMyDestination, modifyDestination } from '../../modules/desination';

const MyDestinationList = ({ history }) => {
  const [cookies] = useCookies(['auth']);
  const cookieAuth = cookies.auth;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyDestination(cookieAuth));
    if (!cookieAuth) {
      alert('로그인 후 이용해주세요');
      history.push('/shop/account/signin');
    }
  }, [cookieAuth, dispatch, history]);
  return (
    <>
      <MyKurlyHeader />
      <main className="container h-full box-content clear-fix">
        <MyKurlyCategory />
        <MyDestinationBlock />
      </main>
    </>
  );
};

const MyDestinationBlock = () => {
  return (
    <div className="float-left align-middle w-r-85 h-full mt-20 mb-6 px-12 pb-32 box-border">
      <h1 className="a11y-hidden">배송지 확인</h1>
      <div className="border-b-2 border-kg-300 pb-10 mb-8">
        <h2 className=" inline-block font-medium align-middle mr-6 text-r-2.4">배송지 관리</h2>
        <p className="inline-block mr-96 align-middle text-r-1.4 text-kg-150">
          배송지에 따라 상품 정보가 달라질 수 있습니다.
        </p>
        <div className="inline-block  align-middle w-60 ">
          <button onClick={onClick} className="w-full text-left text-r-1.6 font-medium ">
            <AiOutlinePlus className="ml-10 mr-4 inline-block" />
            <span>새 배송지 추가</span>
          </button>
        </div>
      </div>
      <div>
        <form>
          <fieldset>
            <ul>
              <li>
                <ul className="text-r-1.4 pb-8 border-b text-kg-400 border-kg-300 box-border leading-none">
                  <li className="w-16 text-center inline-block align-middle">선택</li>
                  <li className="w-p-370 text-center inline-block">주소</li>
                  <li className="w-32 text-center inline-block">받으실 분</li>
                  <li className="w-52 text-center inline-block">연락처</li>
                  <li className="w-48 text-center inline-block">배송유형</li>
                  <li className="w-16 text-center inline-block">수정</li>
                </ul>
              </li>
              <MyDestinationListItem />
            </ul>
          </fieldset>
        </form>
      </div>
    </div>
  );
  function onClick() {
    const width = 500;
    const height = 450;
    var left = Math.ceil((window.screen.width - width) / 2);
    var top = Math.ceil((window.screen.height - height) / 2);

    window.open(
      '/kakao/destination',
      '_blank',
      `height=${height},width=${width}, top=${top}, left=${left}`,
    );
  }
};

const MyDestinationListItem = () => {
  const destination = useSelector(state => state.destination);
  const { modalOpen, data: destinationList } = destination;
  const [modal, setModal] = useState(false);
  const [htmlfor, setHtmlFor] = useState('');
  const [checked, setChecked] = useState('');
  const [cookies] = useCookies(['auth']);
  const dispatch = useDispatch();
  const cookieAuth = cookies.auth;
  return (
    <>
      {destinationList.map(
        (
          {
            id,
            is_main,
            reciever,
            reciever_phone,
            deliver_address,
            deliver_detail_address,
            member,
            htmlFor,
          },
          index,
        ) => (
          <li key={`destination_${index}`} className="h-40 border-b border-kg-80 box-border">
            <ul className="text-r-1.4 ">
              <li className="text-center inline-block leading-r-10">
                <RoundCheckBox
                  id={id}
                  className="w-1"
                  value={`destination_${index}`}
                  onClick={onClickCheckBox}
                  onChange={onChangeInput}
                  htmlfor={htmlfor}
                  is_main={is_main}
                  state={
                    checked || destinationList.length
                      ? destinationList.find(v => v.is_main === 1).id
                      : false
                  }
                />
                {modalOpen && (
                  <Modalform id="modal">
                    <Modal
                      modal={modal}
                      closeModal={closeModal}
                      value="배송지로 선택이 완료되었습니다"
                    />
                  </Modalform>
                )}
              </li>
              <li className="w-p-370 px-8 inline-block align-middle">
                <p className="text-r-1.6">
                  {member.id === is_main ? (
                    <span className="block text-r-1.2 w-r-7.9 bg-gray-100 rounded-full px-3 py-2 leading-none">
                      기본배송지
                    </span>
                  ) : (
                    ''
                  )}
                  {deliver_address} {deliver_detail_address}
                </p>
              </li>
              <li className="w-32 text-center inline-block align-middle leading-r-10">
                {reciever === '수정된받는사람' ? '이창준' : reciever}
              </li>
              <li className="w-52 text-center inline-block align-middle leading-r-10">
                {reciever_phone}
              </li>
              <li className="w-48 text-kp-600 text-center inline-block align-middle leading-r-10">
                샛별배송
              </li>
              <li className="w-16 text-center inline-block align-middle leading-r-10">
                <BiPencil
                  id={`destination_${id}`}
                  className="w-16 text-r-2.8 text-kg-80 cursor-pointer"
                  onClick={onClick}
                />
              </li>
            </ul>
          </li>
        ),
      )}
    </>
  );
  function onClick(e) {
    const itemId = e.currentTarget.id.split('_')[1];
    const width = 500;
    const height = 450;
    var left = Math.ceil((window.screen.width - width) / 2);
    var top = Math.ceil((window.screen.height - height) / 2);

    window.open(
      `/shop/mypage/desination/modify_form/${itemId}`,
      '_blank',
      `height=${height},width=${width}, top=${top}, left=${left}`,
    );
  }

  function onClickCheckBox(e) {
    dispatch(modifyDestination(e.currentTarget.htmlFor, cookieAuth));
    setModal(!modal);
    setHtmlFor(e.currentTarget.htmlFor);
  }
  function onChangeInput(e) {
    setChecked(e.target.id);
  }
  function closeModal() {
    setModal(false);
  }
};

export default withRouter(withCookies(MyDestinationList));
