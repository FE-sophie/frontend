import React from 'react';

import { IoIosCheckmarkCircle, IoIosCheckmarkCircleOutline } from 'react-icons/io';

const RoundCheckBox = ({ is_main, id, state, value, onChange }) => {
  return (
    <>
      <input
        id={id}
        type="radio"
        defaultChecked={is_main === 1}
        value={value}
        onChange={onChange}
        className="invisible absolute"
        name="destination"
      />
      <label htmlFor={id} className="inline-block align-middle w-full">
        {+state === id ? (
          <IoIosCheckmarkCircle className="cursor-pointer inline-block align-middle w-12 h-12 leading-none text-kp-600" />
        ) : (
          <IoIosCheckmarkCircleOutline className="cursor-pointer inline-block align-middle w-12 h-12 leading-none text-kg-200" />
        )}
        {window.location.pathname === '/shop/mypage/destination/list' || (
          <span className="inline-block align-middle text-r-1.4 text-kg-350">{value}</span>
        )}
      </label>
    </>
  );
};

export default RoundCheckBox;
