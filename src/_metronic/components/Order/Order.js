import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button, Modal } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { ApiGet } from "../../../helpers/API/ApiData";
import Slide from "@material-ui/core/Slide";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Order = ({ title }) => {
  const [filteredOrder, setFilteredOrder] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreOrderData, setIsViewMoreOrderData] = useState(false);

  useEffect(() => {
    title === "Dashboard | Canna Source"
      ? (document.title = title)
      : (document.title = "Order | Canna Source");
  }, []);

  const handleViewMoreClose = () => {
    setIsViewMoreOrderData(false);
    setDataViewMore({});
  };

  useEffect(() => {
    getAllOrder();
  }, [page, countPerPage]);

  const getAllOrder = async () => {
    setIsLoaderVisible(true);
    // if (!search) {
      await ApiGet(`order/all?pagination[offset]=${page}&pagination[count]=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredOrder(res?.data?.payload?.allOrder);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message);
        });
    // } else {
    //   await ApiGet(
    //     `order/all?search=${search}&pagination[offset]=${page}&pagination[count]=${countPerPage}`
    //   )
    //     .then((res) => {
    //       setIsLoaderVisible(false);
    //       console.log("artistreport", res);
    //       setFilteredOrder(res?.data?.payload?.allOrder);
    //       setCount(res?.data?.payload?.count);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.error(err?.message);
    //     });
    // }
  };

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "OrderedAt",
      selector: "createdAt",
      cell: (row) => {
        let d = new Date(row.createdAt);
        let month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let updatedate = ` ${
          month[d.getMonth()]
        } ${d.getDate()},${d.getFullYear()} `;
        return <div>{updatedate}</div>;
      },
      sortable: true,
    },
    {
      name: "OrderBy",
      cell: (row) => {
        return (
          <>
            {" "}
            {row?.orderBy?.firstName} {row?.orderBy?.lastName}
          </>
        );
      },
      selector: (row) => row?.orderBy?.firstName,
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "Sum",
      selector: "summ",
      sortable: true,
    },
    {
      name: "Inventory Name",
      selector: (row) => row?.ordersInventory[0]?.inventoryName,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.ordersInventory[0]?.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row?.ordersInventory[0]?.quantity,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row?.ordersInventory[0]?.total,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreOrderData(true);
                setDataViewMore(row);
                console.log("rowShow", row);
              }}
            >
              <Tooltip title="Show More" arrow>
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];
  // * Table Style
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  //for search data

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(search, 500);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoaderVisible(true);
      setPage(0);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllOrder();
    } else {
      setPage(0);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllOrder();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        {document.title === "Order | Canna Source" && <ToastContainer />}
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Order</h2>
            </div>
            {/* <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Order"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div> */}
          </div>

          <DataTable
            columns={columns}
            data={filteredOrder}
            customStyles={customStyles}
            style={{
              marginTop: "-3rem",
            }}
            progressPending={isLoaderVisible}
            progressComponent={
              <Loader type="Puff" color="#334D52" height={30} width={30} />
            }
            highlightOnHover
            pagination
            paginationServer
            paginationTotalRows={count}
            paginationPerPage={countPerPage}
            paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
            paginationDefaultPage={(page+1)}
            onChangePage={(page) => {
              setPage((page-1));
            }}
            onChangeRowsPerPage={(rowPerPage) => {
              setCountPerPage(rowPerPage);
            }}
          />
        </div>
      </div>

      {isViewMoreOrderData ? (
        <Dialog
          fullScreen
          open={isViewMoreOrderData}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition}
        >
          <List>
            {isViewMoreOrderData === true ? (
              <>
                <div className="cus-modal-center-align">
                  <div className="cus-modal-box">
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleViewMoreClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                    <div className="cus-modal-header">
                    <p className="">Order Data</p>
                    </div>
                    <div className="cus-modal-body">
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Order Status:</p>
                          <span>{` ${dataViewMore?.status}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Quantity:</p>
                          <span>{` ${dataViewMore?.quantity}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Sum:</p>
                          <span>{` ${dataViewMore?.summ}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>OrderedAt:</p>
                          <span>{` ${moment(dataViewMore?.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}`}</span>
                        </div>
                       
                      </div>
                      <div className="license-details">
                      <p className="">Order By</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Name:</p>
                          <span>{` ${dataViewMore?.orderBy?.firstName}${" "}${
                      dataViewMore?.orderBy?.lastName
                    }`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Name:</p>
                          <span>{` ${dataViewMore?.orderBy?.companyName}`}</span>
                        </div>
                      </div>
                      <div className="license-details">
                      <p className="">Orders Inventory Details</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Inventory Name:</p>
                          <span>{` ${dataViewMore?.ordersInventory[0]?.inventoryName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Price:</p>
                          <span>{` ${dataViewMore?.ordersInventory[0]?.price}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Quantity:</p>
                          <span>{` ${dataViewMore?.ordersInventory[0]?.quantity}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Total:</p>
                          <span>{` ${dataViewMore?.ordersInventory[0]?.total}`}</span>
                        </div>
                      </div>
                      <div className="modal-bottom-align"></div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default Order;
