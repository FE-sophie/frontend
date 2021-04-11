import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
export default function CheckBox({ value, id, onChange, checked }) {
  return (
    <>
      <input
        id={id}
        onChange={onChange}
        type="checkbox"
        className="hidden absolute"
        checked={checked}
      />
      <label htmlFor={id} className="inline-block">
        {checked ? (
          <MdCheckBox className="inline-block align-middle w-9 h-9 leading-none text-klp-600" />
        ) : (
          <MdCheckBoxOutlineBlank className="inline-block align-middle w-9 h-9 leading-none text-kg-200" />
        )}
        <span className="align-middle">{value}</span>
      </label>
    </>
  );
}
