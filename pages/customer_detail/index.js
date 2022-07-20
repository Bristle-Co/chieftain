import { TopBarStateContext } from "../../components/context.js";
import { useContext, useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import SearchButton from "../../components/SearchButton/SearchButton.js";
import ArrowButton from "../../components/ArrowButton/ArrowButton";
import styles from "./customer_detail.module.css";
import DataTableStyles from "../../styles/DataTable.module.css";
import axios from "axios";
import Link from "next/link";
import {
  setCustomers,
  clearCustomers,
  setCustomerRequest,
} from "../../components/redux/customers.js";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination/Pagination.js";
import TopBarButton from "../../components/TopBar/TopBarButton/TopBarButton.js";
import { IconContext } from "react-icons";

// export async function getServerSideProps(context) {
//   let customers;
//   const initialRequest = {
//     method: "get",
//     url: "/customer_detail/getCustomers",
//     baseURL: process.env.backendServerBaseURI,
//     params: {
//       pageIndex: 0,
//       pageSize: process.env.globalPageSize,
//     },
//   };
//   try {
//     const result = await axios(initialRequest);
//     customers = result.data.data;
//   } catch (error) {
//     console.log("fetch customer from server side failed");
//     console.log(error.response);
//     return {
//       props: {
//         data: [
//           {
//             customerId: "錯誤",
//             name: "錯誤",
//             contactName: "錯誤",
//             contactNumber: "錯誤",
//             contactMobileNumber: "錯誤",
//             faxNumber: "錯誤",
//             postalCode: "錯誤",
//             address: "錯誤",
//             taxId: "錯誤",
//             receiver: "錯誤",
//             note: "錯誤",
//           },
//         ],
//         initialAxiosRequest: initialRequest,
//       },
//     };
//   }

//   console.log("fetch customer from server side success");
//   console.log(customers);

//   return {
//     props: {
//       data: customers,
//       initialAxiosRequest: initialRequest,
//     },
//   };
// }

const CustomerDetail = (props) => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.customers);
  const { request } = useSelector((state) => state.request);

  const [topBarState, setTopBarState] = useContext(TopBarStateContext);
  const customerDetailTopBarState = {
    pageName: "客戶明細",
    buttons: [],
  };

  // state variable for search input fields
  const [customerIdSearch, setCustomerIdSearch] = useState(
    request.params.customerId
  );
  const [nameSearch, setNameSearch] = useState(request.params.name);
  const [contactNameSearch, setContactNameSearch] = useState(
    request.params.contactName
  );
  const [contactNumberSearch, setContactNumberSearch] = useState(
    request.params.contactNumber
  );
  const [addressSearch, setAddressSearch] = useState(request.params.address);

  // This is the actual pageIndex of the current state, will always be valid
  const [pageIndexSearch, setPageIndexSearch] = useState(
    request.params.pageIndex
  );

  const [currentAxiosRequest, setCurrentAxiosRequest] = useState({
    method: "get",
    url: "/customer_detail/getCustomers",
    baseURL: process.env.backendServerBaseURI,
    params: {
      pageIndex: 0,
      pageSize: process.env.globalPageSize,
    },
  });

  const getNextPage = () => {
    if (customers.length < process.env.globalPageSize) {
      alert("已經是最後一頁啦~");
      return;
    }
    fetchCustomersByPageIndex(parseInt(pageIndexSearch) + 1);
  };

  const getPreviousPage = () => {
    if (pageIndexSearch <= 0) {
      alert("已經是第一頁啦~");
      return;
    }
    fetchCustomersByPageIndex(parseInt(pageIndexSearch) - 1);
  };

  const fetchCustomerWithCachedRequest = () => {
    console.log("getCustomers request sent, request:");
    console.log(request);
    axios(request)
      .then((result) => {
        dispatch(setCustomers(result.data.data));
        console.log(
          "getCustomers by existing request from client side success. result: "
        );
        console.log(result.data.data);
      })
      .catch((error) => {
        console.log(
          "getCustomers by existing request from client side failed. error: "
        );
        console.log(error);
      });
  };

  const fetchCustomersByPageIndex = (index) => {
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
    console.log("getCustomers request sent, request:");

    console.log(newRequest);
    axios(newRequest)
      .then((result) => {
        if (result.data.data.length <= 0) {
          console.log("empty result after fetch customer");
          alert("超過最大頁數 這頁沒有資料囉");
          return;
        }
        dispatch(setCustomers(result.data.data));
        console.log(
          "getCustomers by pageIndex from client side success. result: "
        );
        console.log(result.data.data);
        // only update current axios request if request is successful
        dispatch(setCustomerRequest(newRequest));

        // only update real page index if request is successful
        setPageIndexSearch(index);
      })
      .catch((error) => console.log(error));
  };

  const fetchCustomersByFilter = (event) => {
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
    setTopBarState(customerDetailTopBarState);

    // only fetch customers on first time load when there is no customers fetched in redux store
    if (customers[0].customerId === "") {
      fetchCustomerWithCachedRequest();
    }
  }, []);
  return (
    <div className={styles.Container}>
      <IconContext.Provider
        value={{ color: "var(--brown)", height: "100%", width: "100%" }}
      >
        <div key="test" className="ButtonContainer">
          <Pagination
            previous={() => getPreviousPage()}
            next={() => getNextPage()}
            pageIndex={pageIndexSearch}
            setPageIndex={(val) => setpageIndexSearch(val)}
            onSubmit={(pageIndex) => fetchCustomersByPageIndex(pageIndex)}
          />
          <Link href="/customer_detail/add_customer">
            <TopBarButton>
              <IoIosAdd style={{ fontSize: "1.4em" }} />
            </TopBarButton>
          </Link>
        </div>
      </IconContext.Provider>

      {/* form is only allowed to wrap entire table */}
      <form className={styles.SearchForm} onSubmit={fetchCustomersByFilter}>
        <table className={DataTableStyles.DataTable}>
          <thead>
            <tr key="searchBar">
              {/* set the column width here inline by percentage
              all other child elements should have width:100% to fill all available space in a cell*/}
              <th key="customerId" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={customerIdSearch}
                  onChange={(e) => setCustomerIdSearch(e.target.value)}
                />
              </th>
              <th key="name" style={{ width: "20%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </th>
              <th key="contactName" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={contactNameSearch}
                  onChange={(e) => setContactNameSearch(e.target.value)}
                />
              </th>
              <th key="contactNumber" style={{ width: "10%" }}>
                <input
                  type="text"
                  placeholder=" 類似即可"
                  value={contactNumberSearch}
                  onChange={(e) => setContactNumberSearch(e.target.value)}
                />
              </th>
              <th key="address" style={{ width: "50%" }}>
                <div>
                  <input
                    type="text"
                    placeholder=" 類似即可"
                    value={addressSearch}
                    onChange={(e) => setAddressSearch(e.target.value)}
                  />
                  <SearchButton type="submit" />
                </div>
              </th>
            </tr>

            <tr key="titleBar">
              <th key="customerId" className={styles.CustomerIdTitle}>
                客戶代號
              </th>
              <th key="name" className={styles.NameTitle}>
                客戶名稱
              </th>
              <th key="contactName" className={styles.ContactNameTitle}>
                聯絡人
              </th>
              <th key="contactNumber" className={styles.ContactNumberTitle}>
                公司聯絡電話
              </th>
              <th key="address" className={styles.AddressTitle}>
                地址
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td key="customerId">{customer.customerId}</td>
                <td key="name">{customer.name}</td>
                <td key="contactName">{customer.contactName}</td>
                <td key="contactNumber">{customer.contactNumber}</td>
                <td key="address">
                  <div>
                    {customer.address}
                    <Link
                      href={
                        "/customer_detail/view_customer/" + customer.customerId
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

export default CustomerDetail;
