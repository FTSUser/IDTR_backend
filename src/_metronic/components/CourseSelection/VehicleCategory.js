import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../helpers/API/ApiData";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import CsvDownload from "react-json-to-csv";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VehicleCategory = ({ getNewCount, title }) => {
  const [filteredVehicleCategory, setFilteredVehicleCategory] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  //new data
  const [isUpdateVehicleCategory, setIsUpdateVehicleCategory] = useState(false);
  const [isAddVehicleCategory, setIsAddVehicleCategory] = useState(false);
  const [idForUpdateVehicleCategoryData, setIdForUpdateVehicleCategoryData] =
    useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteVehicleCategory, setIdForDeleteVehicleCategory] =
    useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [idForUpdateVehicleStatus, setIdForUpdateVehicleStatus] = useState("");
  const [statusDisplay, setStatusDisplay] = useState(false);

  // const [isActive , setIsActive] = useState(true);

  useEffect(() => {
    document.title = "Honda | VehicleCategory";
  }, []);

  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  useEffect(() => {
    console.log("inputValue", inputValueForAdd);
  }, [inputValueForAdd]);

  useEffect(() => {
    console.log("idForEditStatus", idForEditStatus);
  }, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setIsUpdateVehicleCategory(false);
  };

  const handleCloseShowStatus = () => {
    setShowStatus(false);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setIsAddVehicleCategory(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllVehicleCategory();
  }, [page, countPerPage]);

  const getAllVehicleCategory = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(
        `vehicleCategory/getAllVehicleCategory?page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredVehicleCategory(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await ApiGet(
        `vehicleCategory/getAllVehicleCategory?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredVehicleCategory(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleUpdateStatusProperty = (status) => {
    ApiPut(`vehicleCategory/updateStatus/${idForUpdateVehicleStatus}`, {
      isActive: status,
    })
      // ApiPut(`property/updateProperty/${idForUpdatePropertyStatus}`)
      .then((res) => {
        if (res?.status == 200) {
          setShowStatus(false);
          toast.success("Status updated Successfully");
          getAllVehicleCategory();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.VehicleCategory) {
      formIsValid = false;
      errorsForAdd["VehicleCategory"] = "*Please Enter Vehicle Category!";
    }

    if (inputValueForAdd && !inputValueForAdd.VehicleDescription) {
      formIsValid = false;
      errorsForAdd["VehicleDescription"] = "*Please Enter Vehicle Description!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handelAddVehicleCategoryDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        vehicleCategory: inputValueForAdd.VehicleCategory,
        description: inputValueForAdd.VehicleDescription,
        isActive: true,
      };
      ApiPost(`vehicleCategory/addVehicleCategory`, Data)
        .then((res) => {
          console.log("resresres", res);
          if (res?.status == 200) {
            setIsAddVehicleCategory(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllVehicleCategory();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.VehicleCategory) {
      formIsValid = false;
      errors["VehicleCategory"] = "*Please Enter Vehicle Category!";
    }

    if (inputValue && !inputValue.VehicleDescription) {
      formIsValid = false;
      errors["VehicleDescription"] = "*Please Enter Vehicle Description!";
    }

    // }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteVehicleCategory = () => {
    ApiDelete(
      `vehicleCategory/deleteVehicleCategory/${idForDeleteVehicleCategory}`
    )
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllVehicleCategory();
          setPage(1);
          setCount(0);
          setCountPerPage(countPerPage);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    console.log("inputValue", inputValue);
  }, [inputValue]);

  const handelUpdateVehicleCategoryDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let Data = {
        vehicleCategory: inputValue.VehicleCategory,
        description: inputValue.VehicleDescription,
      };
      ApiPut(
        `vehicleCategory/updateVehicleCategory/${idForUpdateVehicleCategoryData}`,
        Data
      )
        .then((res) => {
          console.log("resres", res);
          if (res?.status == 200) {
            setIsUpdateVehicleCategory(false);
            toast.success(res?.data?.message);
            setInputValue({});
            getAllVehicleCategory();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "Vehicle Category",
      selector: "vehicleCategory",
      sortable: true,
    },
    {
      name: "Vehicle Description ",
      selector: "description",
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
                setIdForUpdateVehicleStatus(row?._id);
                setStatusDisplay(row?.isActive);
              }}
            >
              <Tooltip title="Status Property" arrow>
                <div className="cus-medium-button-style widthfixed">
                  <button className="btn btn-success mr-2">
                    {row?.isActive === true ? "Active" : "Deactive"}
                  </button>
                </div>
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
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsUpdateVehicleCategory(true);
                  setIdForUpdateVehicleCategoryData(row._id);
                  setInputValue({
                    VehicleCategory: row?.vehicleCategory,
                    VehicleDescription: row?.description,
                  });
                }}
              >
                <Tooltip title="Edit VehicleCategory" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteVehicleCategory(row?._id);
              }}
            >
              <Tooltip title="Delete VehicleCategory" arrow>
                <DeleteIcon />
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

  // Hook
  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoaderVisible(true);
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllVehicleCategory();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllVehicleCategory();
    }
  }, [debouncedSearchTerm]);

  //for excel file
  const [allVehicleCategoryExcel, setAllVehicleCategoryExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  useEffect(() => {
    getAllVehicleCategoryForExcel();
  }, []);

  const getAllVehicleCategoryForExcel = async () => {
    // if (!search) {
    await ApiGet(`vehicleCategory/getAll`)
      .then((res) => {
        console.log("regist", res?.data?.payload?.Question);
        setAllVehicleCategoryExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  useEffect(() => {
    if (allVehicleCategoryExcel) {
      allVehicleCategoryExcel.map((registerUser) => {
        let data = {
          CreatedAt: moment(registerUser?.createdAt).format("ll"),
          CreatedBy: registerUser?.createdBy,
          VehicleCategory: registerUser?.vehicleCategory,
          Description: registerUser?.description,
          IsActive: registerUser?.isActive,
          UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
          UpdatedBy: registerUser?.updatedBy,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
    console.log("UsertCsvReport", allVehicleCategoryExcel);
  }, [allVehicleCategoryExcel]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Vehicle Details</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Vehicle Category"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddVehicleCategory(true);
                }}
                className="btn btn-success mr-2"
              >
                Add Vehicle Details
              </button>
            </div>
            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Donations.csv"
                style={{
                  //pass other props, like styles
                  backgroundColor: "#CC0001",
                  borderRadius: "6px",
                  border: "1px solid #fff",
                  display: "inline-block",
                  cursor: "pointer",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  padding: "10px 18px",
                  textDecoration: "none",
                  position: "right",
                }}
              >
                Export to Excel
              </CsvDownload>
            </div>
          </div>

          <Modal show={showStatus} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {statusDisplay === true ? "De-active" : "Active"} this vehicle
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShowStatus}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleUpdateStatusProperty(!statusDisplay);
                }}
              >
                {statusDisplay === true ? "De-active" : "Active"}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To delete this VehicleCategory
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteVehicleCategory();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredVehicleCategory}
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
            paginationDefaultPage={page}
            onChangePage={(page) => {
              setPage(page);
            }}
            onChangeRowsPerPage={(rowPerPage) => {
              setCountPerPage(rowPerPage);
            }}
          />
        </div>
      </div>

      {isAddVehicleCategory ? (
        <Dialog
          fullScreen
          open={isAddVehicleCategory}
          onClose={handleAddAdminClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleAddAdminClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isAddVehicleCategory === true ? (
              <div className="form ml-30 ">
                {/* Name Amenintie */}
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Vehicle Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="VehicleCategory"
                        name="VehicleCategory"
                        value={inputValueForAdd.VehicleCategory}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["VehicleCategory"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Vehicle Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="VehicleDescription"
                        name="VehicleDescription"
                        value={inputValueForAdd.VehicleDescription}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["VehicleDescription"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handelAddVehicleCategoryDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Add Details</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}

      {isUpdateVehicleCategory ? (
        <Dialog
          fullScreen
          open={isUpdateVehicleCategory}
          onClose={handleAdminUpdateClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleAdminUpdateClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isUpdateVehicleCategory === true ? (
              <div className="form ml-30 ">
                {/* Ameninties Name */}
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Vehicle Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="VehicleCategory"
                        name="VehicleCategory"
                        value={inputValue.VehicleCategory}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["VehicleCategory"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Vehicle Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="VehicleDescription"
                        name="VehicleDescription"
                        value={inputValue.VehicleDescription}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["VehicleDescription"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handelUpdateVehicleCategoryDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Update Details</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default VehicleCategory;
