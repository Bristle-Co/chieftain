import { TopBarStateContext } from "../../components/context.js";
import { IoIosAdd } from "react-icons/io";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import styles from "./order.module.css";
import DataTableStyles from "./DataTable.module.css";
import axios from "axios";
import Link from "next/link";
import Pagination from "../../components/Pagination/Pagination.js";
import TopBarButton from "../../components/TopBar/TopBarButton/TopBarButton.js";
import { IconContext } from "react-icons";
import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setOrders,
  clearOrders,
  setOrderRequest,
  resetOrderRequestToDefault,
} from "../../components/redux/order.js";

const orderTopBarState = {
  pageName: "訂購單",
  buttons: [],
};
const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { orderRequest } = useSelector((state) => state.orderRequest);
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);

  // state variable for search input fields
  const [orderIdSearch, setOrderIdSearch] = useState("");
  // request.params.orderId == null ? "" : request.params.orderId
  const [customerOrderIdSearch, setCustomerOrderIdSearch] = useState("");
  // request.params.customerOrderId == null ? "" : request.params.customerOrderId
  const [customerIdSearch, setCustomerIdSearch] = useState("");
  // request.params.customeId == null ? "" : request.params.customerId
  const [dueDateFromSearch, setDueDateFromSearch] = useState("");
  // request.params.dueDateFrom == null ? "" : request.params.dueDateFrom
  const [dueDateToSearch, setDueDateToSearch] = useState("");
  // request.params.dueDateTo == null ? "" : request.params.dueDateTo
  const [issuedAtFromSearch, setIssuedAtFromSearch] = useState("");
  // request.params.issuedAtFrom == null ? "" : request.params.issuedAtFrom
  const [issuedAtToSearch, setIssuedAtToSearch] = useState("");
  // request.params.issuedAtTo == null ? "" : request.params.issuedAtTo
  const [pageIndexSearch, setPageIndexSearch] = useState("");
  // request.params.pageIndex

  const fetchOrdersWithCachedRequest = () => {
    console.log("getOrders request sent, request:");
    console.log(orderRequest);
    axios(orderRequest)
      .then((result) => {
        dispatch(setOrders(result.data.data));
        console.log(
          "getOrders by existing request from client side success. result: "
        );
        console.log(result.data.data);
      })
      .catch((error) => {
        console.log(
          "getOrders by existing request from client side failed. error: "
        );
        console.log(error);
      });
  };

  const fetchOrdersByPageIndex = (index) => {
    if (index < 0) {
      alert("頁數不能為負數");
      return;
    }
    const newRequest = {
      ...request,
      params: {
        ...request.params,
        pageIndex: index,
      },
    };
    console.log("getOrders request sent, request:");

    console.log(newRequest);
    axios(newRequest)
      .then((result) => {
        if (result.data.data.length <= 0) {
          console.log("empty result after fetch customer");
          alert("超過最大頁數 這頁沒有資料囉");
          return;
        }
        dispatch(setOrders(result.data.data));
        console.log("getOrders by pageIndex success. result: ");
        console.log(result.data.data);
        // only update current axios request if request is successful
        dispatch(setOrdersRequest(newRequest));

        // only update real page index if request is successful
        setPageIndexSearch(index);
      })
      .catch((error) => {
        console.log("getOrders by pageIndex failed. result: ");
        console.log(error);
      });
  };

  const fetchOrdersByFilter = (event) => {
    event.preventDefault();
    //TODO validate serach fields

    const newRequest = {
      url: "/customer_detail",
      baseURL: process.env.backendServerBaseURI,
      params: {
        customerId: customerIdSearch === "" ? null : customerIdSearch,
        name: nameSearch === "" ? null : nameSearch,
        contactName: contactNameSearch === "" ? null : contactNameSearch,
        contactNumber: contactNumberSearch === "" ? null : contactNumberSearch,
        address: addressSearch === "" ? null : addressSearch,
        pageIndex: 0,
        pageSize: process.env.globalPageSize,
      },
    };
    axios(newRequest)
      .then((result) => {
        dispatch(setCustomers(result.data.data));
        console.log("getCustomers by filter from client side success");
        console.log(result.data.data);

        // only update current axios request if request is successful
        dispatch(setCustomerRequest(newRequest));
        setPageIndexSearch(0);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setTopBarState(orderTopBarState);
    //only fetch customers on first time load when there is no customers fetched in redux store
    if (orders[0].orderId === 0) {
      fetchOrdersWithCachedRequest();
    }
  }, []);
  return (
    <div className={styles.Container}>
      <IconContext.Provider
        value={{ color: "var(--brown)", height: "100%", width: "100%" }}
      >
        <div className="TopButtonContainer">
          <Pagination
            previous={() => getPreviousPage()}
            next={() => getNextPage()}
            pageIndex={pageIndexSearch}
            setPageIndex={(val) => setpageIndexSearch(val)}
            onSubmit={(pageIndex) => fetchOrdersByPageIndex(pageIndex)}
          />
          <Link href="/order/add_order">
            <TopBarButton>
              <IoIosAdd style={{ fontSize: "1.4em" }} />
            </TopBarButton>
          </Link>
        </div>
      </IconContext.Provider>
      {/* form is only allowed to wrap entire table */}
      <form className={styles.SearchForm} onSubmit={fetchOrdersByFilter}>
        <table className={DataTableStyles.DataTable}>
          <thead>
            <tr key="searchBar">
              {/* set the column width here inline by percentage
          all other child elements should have width:100% to fill all available space in a cell*/}
              <th key="orderId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 必須完全符合"
                  value={orderIdSearch}
                  onChange={(e) => setOrderIdSearch(e.target.value)}
                />
              </th>
              <th key="customerOrderId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 必須完全符合"
                  value={customerOrderIdSearch}
                  onChange={(e) => setCustomerOrderIdSearch(e.target.value)}
                />
              </th>
              <th key="customerId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 必須完全符合"
                  value={customerIdSearch}
                  onChange={(e) => setCustomerIdSearch(e.target.value)}
                />
              </th>

              <th key="issuedAtFromTo" style={{ width: "15%" }}>
                <input
                  type="date"
                  placeholder=" 必須完全符合"
                  value={issuedAtFromSearch}
                  onChange={(e) => setIssuedAtFromSearch(e.target.value)}
                />

                <input
                  type="date"
                  placeholder=" 必須完全符合"
                  value={issuedAtToSearch}
                  onChange={(e) => setIssuedAtToSearch(e.target.value)}
                />
              </th>

              <th key="dueDateFromTo" style={{ width: "15%" }}>
                <input
                  type="date"
                  placeholder=" 必須完全符合"
                  value={dueDateFromSearch}
                  onChange={(e) => setDueDateFromSearch(e.target.value)}
                />

                <input
                  type="date"
                  placeholder=" 必須完全符合"
                  value={dueDateToSearch}
                  onChange={(e) => setDueDateToSearch(e.target.value)}
                />
              </th>
              <th key="models" style={{ width: "40%" }}>
                <SearchButton type="submit" />
              </th>
              {/* <div>
              </div> */}
            </tr>

            <tr key="titleBar">
              <th key="orderId">訂單號碼</th>
              <th key="customerOrderId">客戶訂單號碼</th>
              <th key="customerId">客戶代號</th>
              <th key="issuedAt">開立時間</th>
              <th key="dueDate">預計日期</th>
              <th key="models">品項</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td key="orderId">{order.orderId}</td>
                <td key="customerOrderId">{order.customerOrderId}</td>
                <td key="customerId">{order.customerId}</td>
                <td key="issuedAt">{order.issuedAt}</td>
                <td key="dueDate">{order.dueDate}</td>
                <td key="models">
                  <div>
                    {order.productEntries[0].model}
                    <Link href={"/order/view_order/" + order.orderId}>
                      <ArrowButton type="button" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};
export default Order;
