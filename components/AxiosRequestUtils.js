// functions in this file are used to generate axios config json for different API requests
export const getOrderByIdRequest = (orderId) => ({
  method: "GET",
  url: "/order",
  baseURL: process.env.backendServerBaseURI,
  params: {
    orderId: orderId,
    pageIndex: 0,
    pageSize: process.env.globalPageSize,
  },
});

export const postOrderRequest = (order) => ({
  method: "POST",
  url: "/order",
  baseURL: process.env.backendServerBaseURI,
  data: { ...order, orderId: null, issuedAt: null },
});

export const deleteOrderRequest = (orderId) => ({
  method: "DELETE",
  url: "/order",
  baseURL: process.env.backendServerBaseURI,
  params: {
    orderId: orderId,
  },
});
