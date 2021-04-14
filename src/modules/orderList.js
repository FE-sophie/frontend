import { createAction, handleActions } from 'redux-actions';
import * as orderAPI from './api/apiOrderList';

const GET_ORDERLIST = 'mykurly/GET_ORDERLIST';
const GET_ORDER_DETAIL = 'mykurly/GET_ORDERDETAIL';
const GET_DETAIL_SUCCESS = 'mykurly/GET_DETAIL_SUCCESS';
const GET_SUCCESS = 'mykurly/GET_SUCCESS';
const GET_FAIL = 'mykurly/GET_FAIL';
const POST_CART = 'mykurly/POST_CART';
const POST_SUCCESS = 'mykurly/POST_SUCCESS';
const POST_FAIL = 'mykurly/POST_FAIL';

export const getOrderList = createAction(GET_ORDERLIST);
export const getListSuccess = createAction(GET_SUCCESS, orderlist => orderlist);
export const getListFail = createAction(GET_FAIL, error => error);
export const getDetail = createAction(GET_ORDER_DETAIL);
export const getDetailSuccess = createAction(GET_DETAIL_SUCCESS, detail => detail);
export const postCart = createAction(POST_CART);
export const postSuccess = createAction(POST_SUCCESS, orderlist => orderlist);
export const postFail = createAction(POST_FAIL, error => error);
export const getOrderItems = (requestPage, authToken) => async dispatch => {
  dispatch(getOrderList());
  try {
    const orderList = await orderAPI.getOrderItems(requestPage, authToken); // API 호출
    dispatch(getListSuccess(orderList.data)); // 성공
  } catch (error) {
    dispatch(getListFail(error)); // 실패
  }
};

export const getOrderDetail = (orderNumber, authToken) => async (dispatch, getState) => {
  dispatch(getDetail()); // 요청이 시작됨
  try {
    const orderListDetail = await orderAPI.getOrderDetail(orderNumber, authToken); // API 호출
    dispatch(getDetailSuccess(orderListDetail.data)); // 성공
  } catch (error) {
    dispatch(getListFail(error)); // 실패
  }
};
export const postInsertCart = (orderItem, authToken) => async (dispatch, getState) => {
  dispatch(postCart()); // 요청이 시작됨
  try {
    await orderAPI.postInsertCart(orderItem, authToken); //API 호출
    dispatch(postSuccess()); //성공
  } catch (error) {
    dispatch(postFail(error)); //실패
  }
};

const initialize = {
  loading: false,
  data: { content: [] },
  detail: {
    orderProducts: [],
    discount() {},
    totalCheckout() {},
    checkout() {},
    discounted1() {},
    reciever_name: '',
    reciever_phone: '',
    reciever_address: '서울시 강동구 암사동 룰루랄라아파트 103동 103호',
    reciever_place: '문 앞',
    reciever_visit_method: '',
    arrived_alarm: '배송 직후',
  },
  posts: false,
  error: null,
};

const order = handleActions(
  {
    [GET_ORDERLIST]: state => ({
      ...state,
      loading: true,
    }),
    [GET_SUCCESS]: (state, action) => ({
      ...state,
      data: {
        ...action.payload,
        content: action.payload.content.map(orderitem => ({
          ...orderitem,
          total_price: (orderitem.total_price + 3000).toLocaleString(),
        })),
      },
    }),
    [GET_ORDER_DETAIL]: state => ({
      ...state,
      loading: true,
    }),
    [GET_DETAIL_SUCCESS]: (state, action) => {
      return {
        ...state,
        detail: {
          ...action.payload,
          total_discount_price: action.payload.orderProducts.reduce(
            (initial, { reduced_price }) => initial + +reduced_price,
            0,
          ),
          discount() {
            return this.total_discount_price.toLocaleString();
          },
          delivery_cost: action.payload.checkout_total_price < 40000 ? 3000 : 0,
          checkout_total_price_str: action.payload.checkout_total_price.toLocaleString(),
          discounted1() {
            return (this.checkout_total_price - this.total_discount_price).toLocaleString;
          },
          checkout() {
            return this.checkout_total_price.toLocaleString();
          },
          totalCheckout() {
            return (
              this.checkout_total_price -
              this.total_discount_price +
              this.delivery_cost
            ).toLocaleString();
          },
        },
      };
    },
    [GET_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [POST_CART]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      posts: true,
    }),
    [POST_FAIL]: (state, action) => ({
      ...state,
      posts: false,
      error: action.payload,
    }),
  },
  initialize,
);

export default order;
