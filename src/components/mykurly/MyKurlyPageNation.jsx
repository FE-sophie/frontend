import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const MyKurlyPageNation = ({ pageNumber, totalProduct, history, elementNumber }) => {
  return (
    <div className="mx-auto text-center mt-24">
      <ul className="clear-fix inline-block">
        <li className="cursor-pointer float-left hover:bg-kg-100">
          <FaAngleDoubleLeft className="text-kg-300 border border-kg-80 border-r-0 p-4 box-content" />
        </li>
        <li className="cursor-pointer float-left hover:bg-kg-100" onClick={prevPage}>
          <FaAngleLeft className="text-kg-300 border border-kg-80 border-r-0 p-4 box-content" />
        </li>
        <PageNumber
          pageNumber={pageNumber}
          totalProduct={totalProduct}
          elementNumber={elementNumber}
        />
        <li className="cursor-pointer float-left hover:bg-kg-100" onClick={nextPage}>
          <FaAngleRight className="text-kg-300 border border-kg-80 border-r-0 p-4 box-content" />
        </li>
        <li className="cursor-pointer float-left hover:bg-kg-100">
          <FaAngleDoubleRight className="text-kg-300 border border-kg-80 p-4 box-content" />
        </li>
      </ul>
    </div>
  );
  function prevPage() {
    history.push(`${history.location.pathname}?page=${getPageNum('prev')}`);
  }
  function nextPage() {
    history.push(`${history.location.pathname}?page=${getPageNum('next')}`);
  }
  function getPageNum(direction) {
    let pages = +history.location.search.split('=')[1];
    if (direction === 'prev') return history.location.search ? (pages <= 0 ? pages : --pages) : 1;
    return history.location.search ? (pages < pageNumber - 2 ? ++pages : pageNumber - 1) : 1;
  }
};

const PageNumber = withRouter(({ pageNumber, totalProduct, history, elementNumber }) => {
  // let last = totalProduct % elementNumber === 0 ? 0 : 1;
  return (
    <>
      {(() => {
        const array = [];

        for (let i = 1; i <= 5; i++) {
          array.push(
            <li
              key={`pageNum_${i - 1}`}
              className="cursor-pointer float-left hover:bg-kg-100 active:bg-kg-100"
            >
              <NavLink
                to={`${history.location.pathname}?page=${i - 1}`}
                exact={i === 1}
                activeClassName="inline-block w-full h-full bg-kg-100"
              >
                <span className=" inline-block border border-kg-80 border-r-0 w-12 h-12 box-content text-center leading-r-3 text-r-1.2 font-medium text-kp-600">
                  {i}
                </span>
              </NavLink>
            </li>,
          );
        }
        return array;
      })()}
    </>
  );
});
export default MyKurlyPageNation;
