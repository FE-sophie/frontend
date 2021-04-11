import axios from 'axios';

export const getPrivateMyInfo = (authToken, password) => {
  return axios.get(`http://3.35.221.9:8080/api/member/myinfo`, {
    data: { password: password },
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
