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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

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

const CourseCategory = ({ getNewCount, title }) => {
  const [filteredCourseName, setFilteredCourseName] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddCourseName, setIsAddCourseName] = useState(false);
  const [idForUpdateCourseNameData, setIdForUpdateCourseNameData] =
    useState("");
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForDeleteCourseName, setIdForDeleteCourseName] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [idForUpdateCourseStatus, setIdForUpdateCourseStatus] = useState("");
  const [statusDisplay, setStatusDisplay] = useState(false);
  const [getCourseType, setGetCourseType] = useState([]);
  const [filteredVehicleCategory, setFilteredVehicleCategory] = useState([]);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreAboutus, setIsViewMoreAboutus] = useState(false);
  const [isEditPopUp, setIsEditPopUp] = useState(false);

  useEffect(() => {
    document.title = "Honda | CourseCategory";
  }, []);

  useEffect(() => {
    console.log("inputValueForAdd", inputValueForAdd);
  }, [inputValueForAdd]);

  const handleViewMoreClose = () => {
    setIsViewMoreAboutus(false);
    setDataViewMore({});
  };

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    if (name === "VehicleCategory") {
      setInputValueForAdd({ ...inputValueForAdd, [name]: value, CourseType: "" });
      setErrorsForAdd({ ...errorsForAdd, [name]: "" });
      return
    }
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  const handleAddAdminClose = () => {
    setInputValueForAdd({});
    setIsAddCourseName(false);
    setErrorsForAdd({});
    setIsEditPopUp(false);
    setGetCourseType([]);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseShowStatus = () => {
    setShowStatus(false);
  };



  useEffect(() => {
    getAllCourseName();
  }, [page, countPerPage]);

  const getAllCourseType = async () => {
    setIsLoaderVisible(true);
    let Data = {
      vehicleCategory: inputValueForAdd?.VehicleCategory,
    };
    await ApiPost(`courseType/getCoursetypeByVehiclecategory?limit=1000`, Data)
      .then((res) => {
        setIsLoaderVisible(false);
        setGetCourseType(res?.data?.payload?.courseType);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  useEffect(() => {
    if (inputValueForAdd?.VehicleCategory?.length > 0) {
      getAllCourseType();
    }
  }, [inputValueForAdd?.VehicleCategory]);

  const getAllVehicleCategory = async () => {
    setIsLoaderVisible(true);

    await ApiGet(`vehicleCategory/getAll`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredVehicleCategory(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  const getAllCourseName = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(
        `courseCategory/getAllCourseCategory?page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredCourseName(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
          setGetCourseType([]);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    } else {
      await ApiGet(
        `courseCategory/getAllCourseCategory?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredCourseName(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    }
  };

  const handleUpdateStatusCourseName = (status) => {
    ApiPut(`courseCategory/updateStatus/${idForUpdateCourseStatus}`, {
      isActive: status,
    })
      .then((res) => {
        if (res?.status == 200) {
          setShowStatus(false);
          toast.success("Status updated Successfully");
          getAllCourseName();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.CourseCategory) {
      formIsValid = false;
      errorsForAdd["CourseCategory"] = "*Please Enter Course Category!";
    }
    if (inputValueForAdd && !inputValueForAdd.CourseType) {
      formIsValid = false;
      errorsForAdd["CourseType"] = "*Please Enter CourseType!";
    }
    if (inputValueForAdd && !inputValueForAdd.VehicleCategory) {
      formIsValid = false;
      errorsForAdd["VehicleCategory"] = "*Please Enter VehicleCategory!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handelAddCourseNameDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        courseCategory: inputValueForAdd.CourseCategory,
        ctid: inputValueForAdd.CourseType,
        vcid: inputValueForAdd.VehicleCategory,
      };
      ApiPost(`courseCategory/addCourseCategory`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddCourseName(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllCourseName();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    }
  };

  const handleDeleteCourseName = () => {
    ApiDelete(`courseCategory/deleteCourseCategory/${idForDeleteCourseName}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllCourseName();
          setPage(1);
          setCount(0);
          setCountPerPage(countPerPage);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  const handelUpdateCourseNameDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        courseCategory: inputValueForAdd?.CourseCategory,
        ctid: inputValueForAdd?.CourseType,
        vcid: inputValueForAdd?.VehicleCategory,
      };
      ApiPut(`courseCategory/updateCourseCategory/${idForUpdateCourseNameData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddCourseName(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllCourseName();
            setIsEditPopUp(false);
            setGetCourseType([]);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
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
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("ll")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
      // width: "65px",
    },
    {
      name: "courseCategory",
      selector: (row) => row?.courseCategory,
      sortable: true,
    },
    {
      name: "CourseType",
      selector: (row) => row?.ctid?.courseType,
      sortable: true,
    },

    {
      name: "VehicleCategory",
      selector: (row) => row?.vcid?.vehicleCategory,
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
                setIdForUpdateCourseStatus(row?._id);
                setStatusDisplay(row?.isActive);
              }}
            >
              <Tooltip title="Status of Course Category" arrow>
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
                  setIsAddCourseName(true);
                  setIdForUpdateCourseNameData(row._id);
                  // getAllCourseType();
                  getAllVehicleCategory();
                  setInputValueForAdd({
                    CourseCategory: row?.courseCategory,
                    CourseType: row?.ctid?._id,
                    VehicleCategory: row?.vcid?._id,
                  });
                  setIsEditPopUp(true);
                }}
              >
                <Tooltip title="Edit CourseCategory" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteCourseName(row?._id);
              }}
            >
              <Tooltip title="Delete CourseCategory" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <>
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsViewMoreAboutus(true);
                  setDataViewMore(row);

                }}
              >
                <Tooltip title="Show More" arrow>
                  <InfoOutlinedIcon />
                </Tooltip>
              </div>
            </>
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
    let val = e.target.value.replace(/[^\w\s]/gi, "");
    setSearch(val);
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
      getAllCourseName();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllCourseName();
    }
  }, [debouncedSearchTerm]);

  //for excel file
  const [allCourseNameExcel, setAllCourseNameExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  useEffect(() => {
    getAllCourseNameForExcel();
  }, []);

  const getAllCourseNameForExcel = async () => {
    // if (!search) {
    await ApiGet(`courseCategory/getAll`)
      .then((res) => {
        setAllCourseNameExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
    // }
  };
  useEffect(() => {
    if (allCourseNameExcel) {
      allCourseNameExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          CourseCategory: registerUser?.courseCategory,
          CourseCategoryId: registerUser?._id,
          CourseType: registerUser?.ctid?.courseType,
          CourseTypeId: registerUser?.ctid?._id,
          VehicleCategory: registerUser?.vcid?.vehicleCategory,
          VehicleCategoryId: registerUser?.vcid?._id,
          Description: registerUser?.description,
          CreatedAt: moment(registerUser?.createdAt).format("ll"),
          CreatedBy: registerUser?.createdBy,
          UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
          UpdatedBy: registerUser?.updatedBy,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
  }, [allCourseNameExcel]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Course Category</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Course Category"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddCourseName(true);
                  // getAllCourseType();
                  getAllVehicleCategory();
                }}
                className="btn btn-success mr-2"
              >
                Add Course Category
              </button>
            </div>
            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Course Category Report.csv"
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
              {statusDisplay === true ? "De-active" : "Active"} this Course Category
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShowStatus}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleUpdateStatusCourseName(!statusDisplay);
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
              Are You Sure To Want To delete this Course Category
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteCourseName();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredCourseName}
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

      {isAddCourseName ? (
        <Dialog
          fullScreen
          open={isAddCourseName}
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
            {isAddCourseName === true ? (
              <div className="form ml-30 ">
                {/* Name Amenintie */}

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Vehicle Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="VehicleCategory"
                        name="VehicleCategory"
                        value={inputValueForAdd.VehicleCategory}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Vehicle Category
                        </option>
                        {filteredVehicleCategory?.length > 0 &&
                          filteredVehicleCategory?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValueForAdd?.VehicleCategory ===
                                    item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.vehicleCategory}{" "}
                              </option>
                            );
                          })}
                      </select>
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
                    Select Course Type
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="CourseType"
                        name="CourseType"
                        // value={inputValueForAdd.CourseType}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected={
                          !!inputValueForAdd?.CourseType === false
                            ? true
                            : false
                        } hidden>
                          Select Course Type
                        </option>
                        {getCourseType?.length > 0 &&
                          getCourseType?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={
                                  inputValueForAdd?.CourseType === item._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item?.courseType}{" "}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["CourseType"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Course Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="CourseCategory"
                        name="CourseCategory"
                        value={inputValueForAdd?.CourseCategory}
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
                      {errorsForAdd["CourseCategory"]}
                    </span>
                  </div>
                </div>


                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      isEditPopUp === false
                        ? handelAddCourseNameDetails(e)
                        : handelUpdateCourseNameDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>{isEditPopUp === false ? 'Add' : 'Update'}  Course Category</span>
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

      {isViewMoreAboutus ? (
        <Dialog
          fullScreen
          open={isViewMoreAboutus}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition}
        >
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
          <List>
            {isViewMoreAboutus === true ? (
                 <div className="honda-container">
                 <div className="other-information-child-text-style1">
                   <h2>Course Category</h2>
                 </div>
                 <div className="honda-text-grid12 honda-text-grid-border">
 
                   <div className="honda-text-grid-items">
                     <p>Course Category:</p>
                     <span
                       dangerouslySetInnerHTML={{
                         __html: dataViewMore?.courseCategory,
                       }}
                       className=""
                     />
                   </div>
 
                   <div className="honda-text-grid-items">
                     <p>Course Type:</p>
                     <span
                       dangerouslySetInnerHTML={{
                         __html: dataViewMore?.ctid?.courseType,
                       }}
                       className=""
                     />
                   </div>
                   <div className="honda-text-grid-items">
                     <p>Vehicle Category:</p>
                     <span
                       dangerouslySetInnerHTML={{
                         __html: dataViewMore?.vcid?.vehicleCategory,
                       }}
                       className=""
                     />
                   </div>
                  
 
                 </div>
               </div>
            
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default CourseCategory;
