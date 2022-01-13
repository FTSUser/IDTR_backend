import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button, Modal } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { ApiGet, ApiPut, ApiDelete } from "../../../helpers/API/ApiData";
import Slide from "@material-ui/core/Slide";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Transition1 = React.forwardRef(function Transition1(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = ({ title, getNewCount }) => {
  const [filteredUser, setFilteredUser] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [statusDisplay, setStatusDisplay] = useState(false);
  const [idForUpdateUserStatus, setIdForUpdateUserStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [isViewMoreUserData, setIsViewMoreUserData] = useState(false);
  const [dataViewMore, setDataViewMore] = useState({});
  const [userId, setUserId] = useState("");
  const [isViewMoreInventoryDataIdWise, setIsViewMoreInventoryDataIdWise] =
    useState(false);
  const [inventoryDataIdWise, setInventoryDataIdWise] = useState({});
  const [orderDataIdWise, setOrderDataIdWise] = useState({});
  const [isViewMoreOrderDataIdWise, setIsViewMoreOrderDataIdWise] =
    useState(false);
  const [userDataForInventory, setUserDataForInventory] = useState({});
  const [userDataForOrder, setUserDataForOrder] = useState({});
  const [isViewMoreInventory, setIsViewMoreInventory] = useState(false);
  const [isViewMoreInventoryDataInUser, setIsViewMoreInventoryDataInUser] =
    useState(false);
  const [dataViewMoreInventory, setDataViewMoreInventory] = useState({});
  const [isViewMoreOrderDataInUser, setIsViewMoreOrderDataInUser] =
    useState(false);
  const [dataViewMoreOrder, setDataViewMoreOrder] = useState({});
  const [show, setShow] = useState(false);
  const [idForDeleteInventory, setIdForDeleteInventory] = useState("");

  useEffect(() => {
    console.log("isViewMoreInventory", isViewMoreInventory);
  }, [isViewMoreInventory]);

  useEffect(() => {
    title === "Dashboard | Canna Source"
      ? (document.title = title)
      : (document.title = "User | Canna Source");
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseShowStatus = () => {
    setShowStatus(false);
  };

  const handleViewMoreClose = () => {
    setIsViewMoreUserData(false);
    setDataViewMore({});
  };

  const handleViewMoreCloseInventory = () => {
    setIsViewMoreInventoryDataIdWise(false);
    setInventoryDataIdWise({});
  };

  const handleViewMoreCloseOrder = () => {
    setIsViewMoreOrderDataIdWise(false);
    setOrderDataIdWise({});
  };

  const handleViewMoreInventoryDataInUser = () => {
    setIsViewMoreInventoryDataInUser(false);
    setDataViewMoreInventory({});
  };

  const handleViewMoreOrderDataInUser = () => {
    setIsViewMoreOrderDataInUser(false);
    setDataViewMoreOrder({});
  };

  useEffect(() => {
    getAllUsers();
  }, [page, countPerPage]);

  const getAllUsers = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`user/all?pagination[offset]=${page}&pagination[count]=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredUser(res?.data?.payload?.findUser);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          toast.error(err?.message);
          console.log(err);
        });
    } else {
      await ApiGet(
        `user/all?search=${search}&pagination[offset]=${page}&pagination[count]=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredUser(res?.data?.payload?.findUser);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message);
        });
    }
  };

  const getAllInventoryIdWise = async (id) => {
    await ApiGet(`inventory/all?userId=${id}`)
      .then((res) => {
        setIsViewMoreInventoryDataIdWise(true);
        setInventoryDataIdWise(res?.data?.payload?.getInventory);
      })
      .catch((err) => {
        toast.error(err?.message);
        console.log(err);
      });
  };

  const getAllOrderIdWise = async (id) => {
    await ApiGet(`order/all?userId=${id}`)
      .then((res) => {
        setIsViewMoreOrderDataIdWise(true);
        setOrderDataIdWise(res?.data?.payload?.allOrder);
      })
      .catch((err) => {
        toast.error(err?.message);
        console.log(err);
      });
  };

  //for update status
  const handleUpdateUserStatus = (status) => {
    ApiPut(`user/status/id=${idForUpdateUserStatus}`, {
      isActive: status,
    })
      .then((res) => {
        if (res?.status == 200) {
          setShowStatus(false);
          toast.success("Status updated Successfully");
          getAllUsers();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteInventory = () => {
    ApiDelete(`inventory/id=${idForDeleteInventory}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success(res?.data?.message);
          // setIsViewMoreInventoryDataIdWise(false);
          // setInventoryDataIdWise({});
          handleViewMoreCloseInventory();
          {
            document.title === "Dashboard | Canna Source" && getNewCount();
          }
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "FirstName",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "LastName",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
    },
    {
      name: "CompanyName",
      selector: "companyName",
      sortable: true,
    },
    {
      name: "Display?",
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowStatus(true);
                setIdForUpdateUserStatus(row?._id);
                setStatusDisplay(row?.isActive);
              }}
            >
              <Tooltip title="User Status" arrow>
                <button
                  className={
                    row?.isActive === true
                      ? "active-button-style"
                      : "disactive-button-style"
                  }
                >
                  {row?.isActive === true ? "Active" : "Deactive"}
                </button>
              </Tooltip>
            </div>
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Data user id wise",
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setUserId(row?._id);
                getAllInventoryIdWise(row._id);
                setUserDataForInventory(row);
              }}
            >
              <Tooltip title="Inventory data of this user" arrow>
                <button className="active-button-style">Inventory</button>
              </Tooltip>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setUserId(row?._id);
                getAllOrderIdWise(row._id);
                setUserDataForOrder(row);
              }}
            >
              <Tooltip title="Order data of this user" arrow>
                <button
                  className="active-button-style"
                  style={{ marginLeft: "8px" }}
                >
                  Order
                </button>
              </Tooltip>
            </div>
          </>
        );
      },
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
                setIsViewMoreUserData(true);
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

  const columns1 = [
    {
      name: "Market Place Name",
      selector: "marketplaceName",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: "Old Price",
      selector: "oldPrice",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Source Harvest",
      selector: "sourceHarvestNames",
      sortable: true,
    },
    {
      name: "size Category",
      selector: (row) => row?.sizeCategory?.name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row?.subCategory?.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            {/* <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteInventory(row?._id);
              }}
            >
              <Tooltip title="Delete Market Place" arrow>
                <DeleteIcon />
              </Tooltip>
            </div> */}
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreInventoryDataInUser(true);
                setDataViewMoreInventory(row);
                console.log("rowShow1", row);
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

  //for order
  const columnsForOrder = [
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
                setIsViewMoreOrderDataInUser(true);
                setDataViewMoreOrder(row);
                console.log("rowShow11", row);
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
      getAllUsers();
    } else {
      setPage(0);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllUsers();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        {document.title === "User | Canna Source" && <ToastContainer />}
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">User</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search user"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </div>

          {/* Status model */}
          <Modal show={showStatus} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {statusDisplay === true ? "De-active" : "Active"} this User
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShowStatus}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleUpdateUserStatus(!statusDisplay);
                }}
              >
                {statusDisplay === true ? "De-active" : "Active"}
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end Status model */}

          {/* delete model */}
          <Modal
            show={show}
            onHide={handleClose}
            style={{ zIndex: "99999999" }}
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To delete this Inventory
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteInventory();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredUser}
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
            paginationTotalRows={(count)}
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

      {isViewMoreUserData ? (
        <Dialog
          fullScreen
          open={isViewMoreUserData}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition1}
        >
          <List>
            {isViewMoreUserData === true ? (
              <>
                <div className="cus-modal-center-align">
                  <div className="cus-modal-box">
                    <Toolbar>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleViewMoreClose}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                    <div className="cus-modal-header">
                      <p>User Data</p>
                    </div>
                    <div className="cus-modal-body">
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>FirstName</p>
                          <span>{`${dataViewMore?.firstName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>LastName</p>
                          <span>{` ${dataViewMore?.lastName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Position:</p>
                          <span>{` ${dataViewMore?.position}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>RegisteredAt:</p>
                          <span>{` ${moment(dataViewMore?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Email: </p>
                          <span>{`${dataViewMore?.email}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Phone:</p>
                          <span>{` ${dataViewMore?.phone}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Phone:</p>
                          <span>{` ${dataViewMore?.phone1 === ""
                              ? "No Contact Available"
                              : dataViewMore?.phone1
                          }`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>City:</p>
                          <span>{` ${dataViewMore?.city}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>State:</p>
                          <span>{` ${dataViewMore?.state}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>zipCode: </p>
                          <span>{`${dataViewMore?.zipCode}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>isActive?:</p>
                          <span>{` ${dataViewMore?.isActive}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>LastLoginAt:</p>
                          <span>{` ${dataViewMore?.lastLogin}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>HearAboutUs:</p>
                          <span>{` ${
                            dataViewMore?.hearAboutUs === ""
                              ? "No Data"
                              : dataViewMore?.hearAboutUs
                          }`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>MetrcApi: </p>
                          <span>{`${dataViewMore?.metrcApi === null ? "No key available" : dataViewMore?.metrcApi}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Profile:</p>
                          <span>{` ${
                            dataViewMore?.profile === null
                              ? "No Data"
                              : dataViewMore?.profile
                          }`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Referral:</p>
                          <span>{` ${
                            dataViewMore?.referral === ""
                              ? "No Data"
                              : dataViewMore?.referral
                          }`}</span>
                        </div>
                      </div>
                      <div className="license-details">
                        <p>License Details</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>issueDate:</p>
                          <span>{` ${moment(dataViewMore?.issueDate).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Expiration Date:</p>
                          <span>{` ${moment(
                            dataViewMore?.expirationDate
                          ).format("MMMM Do YYYY, h:mm:ss a")}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>License Number:</p>
                          <span>{` ${dataViewMore?.licenseNumber}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>License Type:</p>
                          <span>{` ${dataViewMore?.licenseType}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>License Designation:</p>
                          <span>{` ${dataViewMore?.licenseDesignation}`}</span>
                        </div>
                      </div>
                      <div className="license-details">
                        <p>Company Details</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Company Name:</p>
                          <span>{` ${dataViewMore?.companyName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Type:</p>
                          <span>{` ${dataViewMore?.companyType}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Email:</p>
                          <span>{` ${dataViewMore?.companyEmail === "" ? "No email" : dataViewMore?.companyEmail}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Address:</p>
                          <span>{` ${dataViewMore?.companyAddress}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Ein:</p>
                          <span>{` ${dataViewMore?.ein}`}</span>
                        </div>
                        <div className="text-grid-items"></div>
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

      {isViewMoreInventoryDataIdWise ? (
        <Dialog
          fullScreen
          open={isViewMoreInventoryDataIdWise}
          onClose={handleViewMoreCloseInventory}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMoreCloseInventory}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isViewMoreInventoryDataIdWise === true ? (
              <div className="form all-alignment-content">
                <div className="form-group row">
                  <div className="inventroy-data-text">
                    <p className="">
                      Inventory data of user {userDataForInventory?.firstName}{" "}
                      {userDataForInventory?.lastName}
                    </p>
                  </div>
                </div>
                <div className="form-group row">
                  <DataTable
                    columns={columns1}
                    data={inventoryDataIdWise}
                    customStyles={customStyles}
                    style={{
                      marginTop: "-3rem",
                    }}
                    progressPending={isLoaderVisible}
                    progressComponent={
                      <Loader
                        type="Puff"
                        color="#334D52"
                        height={30}
                        width={30}
                      />
                    }
                    highlightOnHover
                    pagination
                  />
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}

      {isViewMoreInventoryDataInUser ? (
        <Dialog
          fullScreen
          open={isViewMoreInventoryDataInUser}
          onClose={handleViewMoreInventoryDataInUser}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMoreInventoryDataInUser}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isViewMoreInventoryDataInUser === true ? (
              <>
                <div className="cus-modal-center-align">
                  <div className="cus-modal-box">
                    <div className="cus-modal-header">
                      <p className="" style={{ paddingTop: "30px" }}>
                        All inventory data of {dataViewMoreInventory?.name}
                      </p>
                    </div>
                    <div className="cus-modal-body">
                      <div className="license-details">
                        <p className="">Inventory Data</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Name:</p>
                          <span>{` ${dataViewMoreInventory?.name}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>CreatedBy:</p>
                          <span>{` ${dataViewMoreInventory?.createdBy}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>CreatedAt:</p>
                          <span>{` ${moment(
                            dataViewMoreInventory?.createdAt
                          ).format("MMMM Do YYYY, h:mm:ss a")}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Price:</p>
                          <span>{` ${dataViewMoreInventory?.price}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Old Price:</p>
                          <span>{` ${dataViewMoreInventory?.oldPrice}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Quantity:</p>
                          <span>{` ${dataViewMoreInventory?.quantity}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>UnitOfMeasure:</p>
                          <span>{` ${dataViewMoreInventory?.unitOfMeasure}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>UnitOfMeasureName:</p>
                          <span>{` ${dataViewMoreInventory?.unitOfMeasureName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: dataViewMoreInventory?.description,
                              }}
                              className=""
                            />
                          </p>
                        </div>
                        <div className="text-grid-items">
                          <p>Is negotiable?:</p>
                          <span>{` ${dataViewMoreInventory?.negotiable}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Market Place Name:</p>
                          <span>{` ${dataViewMoreInventory?.marketplaceName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Item Strain Name:</p>
                          <span>{` ${dataViewMoreInventory?.itemStrainName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>isPublished?:</p>
                          <span>{` ${dataViewMoreInventory?.isPublished}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>isArchive?:</p>
                          <span>{` ${dataViewMoreInventory?.isArchive}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>initialLabTestingState:</p>
                          <span>{` ${dataViewMoreInventory?.initialLabTestingState}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>growType:</p>
                          <span>{` ${dataViewMoreInventory?.growType}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>COA:</p>
                          <span>{` ${dataViewMoreInventory?.coa}`}</span>
                        </div>
                      </div>
                      <div className="license-details">
                        <p className="">Category</p>
                      </div>
                      <div className="text-grid">
                        <div className="text-grid-items">
                          <p>Category:</p>
                          <span>{` ${dataViewMoreInventory?.category?.name}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>sizeCategory:</p>
                          <span>{` ${dataViewMoreInventory?.sizeCategory?.name}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>subCategory:</p>
                          <span>{` ${dataViewMoreInventory?.subCategory?.name}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Source Harvest Names:</p>
                          <span>{` ${dataViewMoreInventory?.sourceHarvestNames}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Strain Classification:</p>
                          <span>{` ${dataViewMoreInventory?.strainClassification}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>THC:</p>
                          <span>{` ${dataViewMoreInventory?.thc}`}</span>
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

      {isViewMoreOrderDataInUser ? (
        <Dialog
          fullScreen
          open={isViewMoreOrderDataInUser}
          onClose={handleViewMoreOrderDataInUser}
          TransitionComponent={Transition}
        >
          <List>
            {isViewMoreOrderDataInUser === true ? (
              <>
                <div className="cus-modal-center-align">
                  <div className="cus-modal-box">
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleViewMoreOrderDataInUser}
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
                          <span>{` ${dataViewMoreOrder?.status}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Quantity:</p>
                          <span>{` ${dataViewMoreOrder?.quantity}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Sum:</p>
                          <span>{` ${dataViewMoreOrder?.summ}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>OrderedAt:</p>
                          <span>{` ${moment(
                            dataViewMoreOrder?.createdAt
                          ).format("MMMM Do YYYY, h:mm:ss a")}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Name:</p>
                          <span>{` ${
                            dataViewMoreOrder?.orderBy?.firstName
                          }${" "}${
                            dataViewMoreOrder?.orderBy?.lastName
                          }`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Company Name:</p>
                          <span>{` ${dataViewMoreOrder?.orderBy?.companyName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Inventory Name:</p>
                          <span>{` ${dataViewMoreOrder?.ordersInventory[0]?.inventoryName}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Price:</p>
                          <span>{` ${dataViewMoreOrder?.ordersInventory[0]?.price}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Quantity:</p>
                          <span>{` ${dataViewMoreOrder?.ordersInventory[0]?.quantity}`}</span>
                        </div>
                        <div className="text-grid-items">
                          <p>Total:</p>
                          <span>{` ${dataViewMoreOrder?.ordersInventory[0]?.total}`}</span>
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

      {isViewMoreOrderDataIdWise ? (
        <Dialog
          fullScreen
          open={isViewMoreOrderDataIdWise}
          onClose={handleViewMoreCloseOrder}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMoreCloseOrder}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isViewMoreOrderDataIdWise === true ? (
              <div className="form ml-30 ">
                <div className="form-group row">
                  <p className="">
                    Order data of {userDataForOrder?.firstName}{" "}
                    {userDataForOrder?.lastName}
                  </p>
                </div>
                <div className="form-group row">
                  <DataTable
                    columns={columnsForOrder}
                    data={orderDataIdWise}
                    customStyles={customStyles}
                    style={{
                      marginTop: "-3rem",
                    }}
                    progressPending={isLoaderVisible}
                    progressComponent={
                      <Loader
                        type="Puff"
                        color="#334D52"
                        height={30}
                        width={30}
                      />
                    }
                    highlightOnHover
                    pagination
                  />
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default User;
