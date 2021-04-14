import axios from 'axios';

export const getDestinationList = authToken => {
  return axios.get('http://3.35.221.9:8080/api/mypage/destination/list', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const modifyDestination = (authToken, modifyItem) => {
  return axios({
    method: 'put',
    url: 'http://3.35.221.9:8080/api/mypage/destination/list',
    data: modifyItem,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const deleteDestination = authToken => {
  return axios.delete('http://3.35.221.9:8080/api/mypage/destination/list', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export const modifyMainDestination = (modifyId, authToken) => {
  return axios.put('http://3.35.221.9:8080/api/mypage/destination/list', {
    data: `{ id: ${modifyId}, is_main: ${1} }`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
