// functions in this file are used to generate axios config json for different API requests

////// order //////
export const getOrderByIdRequest = (orderId) => ({
  method: "GET",
  url: "/order",
  baseURL: process.env.backendServerBaseURI,
  params: {
    orderId: orderId,
    pageIndex: 0,
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

export const getUnAssignedProductEntryRequest = () => ({
  method: "GET",
  url: "/order/product_entries",
  baseURL: process.env.backendServerBaseURI,
  params: {
    isUnAssigned: true,
  },
});

export const getProductEntryById = (productEntryId) => ({
  method: "GET",
  url: "/order/product_entries",
  baseURL: process.env.backendServerBaseURI,
  params: {
    productEntryId: productEntryId,
  },
});

////// production tickets //////
export const getProductionTicketByIdRequest = (ticketId) => ({
  method: "GET",
  url: "/production_ticket",
  baseURL: process.env.backendServerBaseURI,
  params: {
    ticketId: ticketId,
    pageIndex: 0,
  },
});

export const deleteProductionTicketByIdRequest = (ticketId) => ({
  method: "DELETE",
  url: "/production_ticket",
  baseURL: process.env.backendServerBaseURI,
  params: {
    ticketId: ticketId,
  },
});

////// users //////
export const getAllUsersRequest = () => ({
  method: "GET",
  url: "/user",
  baseURL: process.env.backendServerBaseURI,
});
