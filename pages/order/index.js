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
import { setOrders, setOrderRequest } from "../../components/redux/order.js";

const orderTopBarState = {
  pageName: "訂購單",
  buttons: [],
};
const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { orderRequest } = useSelector((state) => state.order);
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  // state variable for search input fields
  const [orderIdSearch, setOrderIdSearch] = useState(
    orderRequest.params.orderId == undefined ? "" : orderRequest.params.orderId
  );

  const [customerOrderIdSearch, setCustomerOrderIdSearch] = useState(
    orderRequest.params.customerOrderId == undefined
      ? ""
      : orderRequest.params.customerOrderId
  );
  //
  const [customerIdSearch, setCustomerIdSearch] = useState(
    orderRequest.params.customeId == null ? "" : orderRequest.params.customerId
  );
  const [dueDateFromSearch, setDueDateFromSearch] = useState(
    orderRequest.params.dueDateFrom == null
      ? ""
      : orderRequest.params.dueDateFrom
  );
  const [dueDateToSearch, setDueDateToSearch] = useState(
    orderRequest.params.dueDateTo == null ? "" : orderRequest.params.dueDateTo
  );
  const [issuedAtFromSearch, setIssuedAtFromSearch] = useState(
    orderRequest.params.issuedAtFrom == null
      ? ""
      : orderRequest.params.issuedAtFrom
  );
  const [issuedAtToSearch, setIssuedAtToSearch] = useState(
    orderRequest.params.issuedAtTo == null ? "" : orderRequest.params.issuedAtTo
  );
  const [pageIndexSearch, setPageIndexSearch] = useState(
    orderRequest.params.pageIndex
  );

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

  const validateSearchFields = (newParameters) => {
    // validate fields here
    if (orderIdSearch !== "") {
      const parsed = parseInt(orderIdSearch);
      if (!isNaN(parsed) && isFinite(parsed)) {
        newParameters.orderId = parsed;
      }
    }
    if (customerIdSearch !== "") {
      newParameters.customerId = customerIdSearch;
    }
    if (customerOrderIdSearch !== "") {
      newParameters.name = customerOrderIdSearch;
    }
    if (dueDateFromSearch !== "") {
      newParameters.dueDateFrom = dueDateFromSearch;
    }

    if (dueDateToSearch !== "") {
      newParnewParametersamters.dueDateTo = dueDateToSearch;
    }

    if (issuedAtFromSearch !== "") {
      newParameters.issuedAtFrom = issuedAtFromSearch;
    }

    if (issuedAtToSearch !== "") {
      newParameters.issuedAtTo = issuedAtToSearch;
    }
    return newParameters;
  };

  const getNextPage = () => {
    if (orders.length < process.env.globalPageSize) {
      alert("已經是最後一頁啦~");
      return;
    }
    fetchOrdersByPageIndex(parseInt(pageIndexSearch) + 1);
  };

  const getPreviousPage = () => {
    if (pageIndexSearch <= 0) {
      alert("已經是第一頁啦~");
      return;
    }
    fetchOrdersByPageIndex(parseInt(pageIndexSearch) - 1);
  };

  const fetchOrdersByPageIndex = (index) => {
    if (index < 0) {
      alert("頁數不能為負數");
      return;
    }
    const newRequest = {
      ...orderRequest,
      params: {
        ...orderRequest.params,
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
        dispatch(setOrderRequest(newRequest));

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
    const newParameters = {
      // when search with filter always reset page to first page
      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    };

    const newRequest = {
      url: "/order",
      baseURL: process.env.backendServerBaseURI,
      params: validateSearchFields(newParameters),
    };
    axios(newRequest)
      .then((result) => {
        dispatch(setOrders(result.data.data));
        console.log("getOrders by filter from client side success");
        console.log(result.data.data);

        // only update current axios request if request is successful
        dispatch(setOrderRequest(newRequest));
        setPageIndexSearch(0);
      })
      .catch((error) => {
        console.log("getOrders by filter failed");
        console.log(error);
      });
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
            setPageIndex={(val) => setPageIndexSearch(val)}
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
                <div>
                  <input
                    type="date"
                    placeholder=" 必須完全符合"
                    value={issuedAtFromSearch}
                    onChange={(e) => setIssuedAtFromSearch(e.target.value)}
                  />
                  &nbsp;~&nbsp;
                  <input
                    type="date"
                    placeholder=" 必須完全符合"
                    value={issuedAtToSearch}
                    onChange={(e) => setIssuedAtToSearch(e.target.value)}
                  />
                </div>
              </th>

              <th key="dueDateFromTo" style={{ width: "15%" }}>
                <div>
                  <input
                    type="date"
                    placeholder=" 必須完全符合"
                    value={dueDateFromSearch}
                    onChange={(e) => setDueDateFromSearch(e.target.value)}
                  />
                  &nbsp;~&nbsp;
                  <input
                    type="date"
                    placeholder=" 必須完全符合"
                    value={dueDateToSearch}
                    onChange={(e) => setDueDateToSearch(e.target.value)}
                  />
                </div>
              </th>
              <th key="models" style={{ width: "40%" }}>
                <div>
                  <SearchButton type="submit" />
                </div>
              </th>
              {/* <div>
              </div> */}
            </tr>

            <tr key="titleBar">
              <th key="orderId">訂單號碼</th>
              <th key="customerOrderId">客戶訂單號碼</th>
              <th key="customerId">客戶代號</th>
              <th key="issuedAt">開立時間</th>
              <th key="dueDate">預計交貨日期</th>
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
                    <ul className={styles.ModelList}>
                      {order.productEntries.map((entry) => {
                        return (
                          <li className={styles.ModelListItem}>
                            {entry.model}
                          </li>
                        );
                      })}
                    </ul>

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
