import { TopBarStateContext } from "../../components/context.js";
import { IoIosAdd } from "react-icons/io";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import styles from "./production_ticket.module.css";
import DataTableStyles from "./DataTable.module.css";
import Link from "next/link";
import Pagination from "../../components/Pagination/Pagination.js";
import TopBarButton from "../../components/TopBar/TopBarButton/TopBarButton.js";
import { IconContext } from "react-icons";
import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductionTickets } from "../../components/redux/productionTicket.js";

const productionTicketTopBarState = {
  pageName: "製造工單",
  buttons: [],
};
const ProductionTicket = () => {
  const dispatch = useDispatch();
  const { productionTickets } = useSelector((state) => state.productionTicket);
  const { productionTicketRequest } = useSelector(
    (state) => state.productionTicket
  );
  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  // state variable for search input fields
  const [productionTicketIdSearch, setProductionTicketIdSearch] = useState(
    productionTicketRequest.params.ticketId == undefined
      ? ""
      : productionTicketRequest.params.ticketId
  );

  const [customerIdSearch, setCustomerIdSearch] = useState(
    productionTicketRequest.params.customerId == null
      ? ""
      : productionTicketRequest.params.customerId
  );
  const [bristleTypeSearch, setBristleTypeSearch] = useState(
    productionTicketRequest.params.bristleType == null
      ? ""
      : productionTicketRequest.params.bristleType
  );
  const [modelSearch, setModelSearch] = useState(
    productionTicketRequest.params.model == null
      ? ""
      : productionTicketRequest.params.model
  );
  const [productNameSearch, setProductNameSearch] = useState(
    productionTicketRequest.params.productName == null
      ? ""
      : productionTicketRequest.params.productName
  );
  const [dueDateFromSearch, setDueDateFromSearch] = useState(
    productionTicketRequest.params.dueDateFrom == null
      ? ""
      : productionTicketRequest.params.dueDateFrom
  );
  const [dueDateToSearch, setDueDateToSearch] = useState(
    productionTicketRequest.params.dueDateTo == null
      ? ""
      : productionTicketRequest.params.dueDateTo
  );
  const [pageIndexSearch, setPageIndexSearch] = useState(
    productionTicketRequest.params.pageIndex
  );

  const updateSearchFields = () => {
    setProductionTicketIdSearch(
      productionTicketRequest.params.ticketId == undefined
        ? ""
        : productionTicketRequest.params.ticketId
    );

    setCustomerIdSearch(
      productionTicketRequest.params.customerId == null
        ? ""
        : productionTicketRequest.params.customerId
    );
    setBristleTypeSearch(
      productionTicketRequest.params.bristleType == null
        ? ""
        : productionTicketRequest.params.bristleType
    );
    setModelSearch(
      productionTicketRequest.params.model == null
        ? ""
        : productionTicketRequest.params.model
    );
    setProductNameSearch(
      productionTicketRequest.params.productName == null
        ? ""
        : productionTicketRequest.params.productName
    );
    setDueDateFromSearch(
      productionTicketRequest.params.dueDateFrom == null
        ? ""
        : productionTicketRequest.params.dueDateFrom
    );
    setDueDateToSearch(
      productionTicketRequest.params.dueDateTo == null
        ? ""
        : productionTicketRequest.params.dueDateTo
    );
    setPageIndexSearch(productionTicketRequest.params.pageIndex);
  };
  const fetchProductionTicketsWithCachedRequest = () => {
    // send empty params means send another get request with what params we have in the redux store
    dispatch(getProductionTickets());
  };

  const validateSearchFields = (newParameters) => {
    // validate fields here
    if (productionTicketIdSearch !== "") {
      const parsed = parseInt(productionTicketIdSearch);
      if (!isNaN(parsed) && isFinite(parsed)) {
        newParameters.ticketId = parsed;
      }
    }
    if (customerIdSearch !== "") {
      newParameters.customerId = customerIdSearch;
    }
    if (bristleTypeSearch !== "") {
      newParameters.bristleType = bristleTypeSearch;
    }
    if (modelSearch !== "") {
      newParameters.model = modelSearch;
    }

    if (productNameSearch !== "") {
      newParameters.productName = productNameSearch;
    }

    if (dueDateFromSearch !== "") {
      newParameters.dueDateFrom = dueDateFromSearch;
    }

    if (dueDateToSearch !== "") {
      newParameters.dueDateTo = dueDateToSearch;
    }
    return newParameters;
  };

  const getNextPage = () => {
    if (productionTickets.length < process.env.globalPageSize) {
      alert("已經是最後一頁啦~");
      return;
    }
    fetchProductionTicketsByIndex(
      parseInt(productionTicketRequest.params.pageIndex) + 1
    );
  };

  const getPreviousPage = (index) => {
    if (index <= 0) {
      alert("已經是第一頁啦~");
      return;
    }
    fetchProductionTicketsByIndex(
      parseInt(productionTicketRequest.params.pageIndex) - 1
    );
  };

  const fetchProductionTicketsByIndex = (index) => {
    if (index < 0) {
      alert("頁數不能為負數");
      return;
    }

    dispatch(
      getProductionTickets({
        ...productionTicketRequest.params,
        pageIndex: index,
      })
    );
  };

  const fetchProductionTicketsByFilter = (event) => {
    event.preventDefault();
    //TODO validate serach fields
    const newParameters = {
      // when search with filter always reset page to first page
      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    };

    dispatch(getProductionTickets(validateSearchFields(newParameters)));
  };

  useEffect(() => {
    setTopBarState(productionTicketTopBarState);
    //fetch list of customers everytime since we are not keeping track of what's being updated or not
    fetchProductionTicketsWithCachedRequest();
  }, []);
  useEffect(() => {}, [productionTicketRequest.params]);
  return (
    <div className={styles.Container}>
      <IconContext.Provider
        value={{ color: "var(--brown)", height: "100%", width: "100%" }}
      >
        <div className="TopButtonContainer">
          <Pagination
            previous={() =>
              getPreviousPage(productionTicketRequest.params.pageIndex)
            }
            next={() => getNextPage()}
            pageIndex={productionTicketRequest.params.pageIndex}
            setPageIndex={(val) => setPageIndexSearch(val)}
            onSubmit={(pageIndex) => fetchProductionTicketsByIndex(pageIndex)}
          />
          <Link href="/production_ticket/add_production_ticket">
            <TopBarButton>
              <IoIosAdd style={{ fontSize: "1.4em" }} />
            </TopBarButton>
          </Link>
        </div>
      </IconContext.Provider>
      {/* form is only allowed to wrap entire table */}
      <form
        className={styles.SearchForm}
        onSubmit={fetchProductionTicketsByFilter}
      >
        <table className={DataTableStyles.DataTable}>
          <thead>
            <tr key="searchBar">
              {/* set the column width here inline by percentage
          all other child elements should have width:100% to fill all available space in a cell*/}
              <th key="productionTicketId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 必須完全符合"
                  value={productionTicketIdSearch}
                  onChange={(e) => setProductionTicketIdSearch(e.target.value)}
                />
              </th>

              <th key="customerId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={customerIdSearch}
                  onChange={(e) => setCustomerIdSearch(e.target.value)}
                />
              </th>
              <th key="bristleType" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={bristleTypeSearch}
                  onChange={(e) => setBristleTypeSearch(e.target.value)}
                />
              </th>

              <th key="model" style={{ width: "25%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                />
              </th>

              <th key="productName" style={{ width: "20%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={productNameSearch}
                  onChange={(e) => setProductNameSearch(e.target.value)}
                />
              </th>

              <th key="dueDate" style={{ width: "25%" }}>
                <div>
                  <input
                    type="date"
                    value={dueDateFromSearch}
                    onChange={(e) => setDueDateFromSearch(e.target.value)}
                  />
                  &nbsp;~&nbsp;
                  <input
                    type="date"
                    value={dueDateToSearch}
                    onChange={(e) => setDueDateToSearch(e.target.value)}
                  />
                  <SearchButton type="submit" />
                </div>
              </th>
            </tr>

            <tr key="titleBar">
              <th key="productionTicketId">工單號碼</th>
              <th key="customerId">客戶代號</th>
              <th key="bristleType">目數</th>
              <th key="issuedAt">規格</th>
              <th key="productName">產品名稱</th>
              <th key="dueDate">交貨日期</th>
            </tr>
          </thead>
          <tbody>
            {productionTickets.map((ticket, index) => (
              <tr key={index}>
                <td key="productionTicketId">{ticket.ticketId}</td>
                <td key="customerId">{ticket.customerId}</td>
                <td key="bristleType">{ticket.bristleType}</td>
                <td key="issumodeledAt">{ticket.model}</td>
                <td key="productName">{ticket.productName}</td>
                <td key="dueDate">
                  <div>
                    {ticket.dueDate}
                    <Link
                      href={
                        "/production_ticket/view_production_ticket/" +
                        ticket.ticketId
                      }
                    >
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
export default ProductionTicket;
