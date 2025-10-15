import axios from "axios";

export const axiosInstance = axios.create({
  timeout: 10000, // 10 second timeout
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null, // Fixed: was 'bodyData', should be 'data'
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
