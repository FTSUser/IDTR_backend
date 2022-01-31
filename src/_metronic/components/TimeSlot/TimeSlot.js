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
import Multiselect from "multiselect-react-dropdown";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import TimePicker from "rc-time-picker";
import DatePicker from "react-datepicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TimeSlot = ({ getNewCount, title }) => {
  const [filteredCourseName, setFilteredCourseName] = useState([]);
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
  const [getCourseType, setGetCourseType] = useState([]);
  const [filteredVehicleCategory, setFilteredVehicleCategory] = useState([]);
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState([]);
  const [selectedCourseType, setSelectedCourseType] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState([]);
  const [date, setDate] = useState(new Date());
  const [allTimeSlot, setAllTimeSlot] = useState([]);
  const [allVehicleCategoryForUpdate, setAllVehicleCategoryForUpdate] =
    useState([]);
  const [allCourseTypeForUpdate, setAllCourseTypeForUpdate] = useState([]);
  const [allCourseNameForUpdate, setAllCourseNameForUpdate] = useState([]);
  const [isEditPopUp, setIsEditPopUp] = useState(false);

  useEffect(() => {
    document.title = "Honda | TimeSlot";
  }, []);

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "seat") {
      let val = e.target.value.replace(/\D/g, "");
      setInputValueForAdd({ ...inputValueForAdd, [name]: val });
      setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    } else {
      const { name, value } = e.target;
      setInputValueForAdd({ ...inputValueForAdd, [name]: value });
      setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    }
  };

  const handleAddAdminClose = () => {
    setInputValueForAdd({});
    setIsAddCourseName(false);
    setErrorsForAdd({});
    // setSelectedCourseName([]);
    // setSelectedCourseType([]);
    // setSelectedVehicleCategory([]);
    setIsEditPopUp(false);
    setIdForUpdateCourseNameData("");
    setStartTime("");
    setEndTime("");
    setDate(new Date());
    // setAllVehicleCategoryForUpdate([]);
    // setAllCourseNameForUpdate([]);
    // setAllCourseTypeForUpdate([]);
    setNow(moment().hour(0).minute(0));
    setNow1(moment().hour(0).minute(0));
    setIsEditPopUp(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  //for start time selector
  const [startTime, setStartTime] = useState("");
  const [now, setNow] = useState(moment().hour(0).minute(0));
  const format = "h:mm a";
  function onChange(value) {
    setStartTime(value?.toDate());
    setErrorsForAdd({
      ...errorsForAdd,
      startTime: "",
    });
  }

  //for end time selector
  const [endTime, setEndTime] = useState("");
  const [now1, setNow1] = useState(moment().hour(0).minute(0));
  const format1 = "h:mm a";
  function onChange1(value) {
    setEndTime(value?.toDate());
    setErrorsForAdd({
      ...errorsForAdd,
      endTime: "",
    });
  }

  const getAllCourseType = async () => {
    setIsLoaderVisible(true);
    let Data = {
      vehicleCategory: inputValueForAdd?.VehicleCategory,
    };
    await ApiPost(
      `courseType/getCoursetypeByVehiclecategory?limit=1000`,
      Data
    )
      .then((res) => {
        setIsLoaderVisible(false);
        console.log("artistreport", res);
        setGetCourseType(res?.data?.payload?.courseType);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (inputValueForAdd?.VehicleCategory?.length > 0) {
      getAllCourseType();
    }
  }, [inputValueForAdd?.VehicleCategory]);

  const getAllVehicleCategory = async () => {
    setIsLoaderVisible(true);

    await ApiGet(
      `vehicleCategory/getAllVehicleCategory?limit=1000`
    )
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredVehicleCategory(res?.data?.payload?.Question);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  useEffect(() => {
    console.log("inputValueForAdd", inputValueForAdd);
  }, [inputValueForAdd]);

  useEffect(() => {
    if (inputValueForAdd?.CourseType?.length > 0) {
      getAllCourseName();
    }
  }, [inputValueForAdd?.CourseType]);

  const getAllCourseName = async () => {
    setIsLoaderVisible(true);
    let Data = {
      courseType: inputValueForAdd?.CourseType,
      vehicleCategory: inputValueForAdd?.VehicleCategory,
    };

    await ApiPost(
      `courseName/getCoursenameByCoursetype?limit=1000`,
      Data
    )
      .then((res) => {
        setIsLoaderVisible(false);
        setSelectedCourseName(res?.data?.payload?.courseName);
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  };

  useEffect(() => {
    getAllTimeSlot();
  }, [page, countPerPage]);

  const getAllTimeSlot = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`trainingDate/getAllDate?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          if (res?.status == 200) {
            setIsLoaderVisible(false);
            setAllTimeSlot(res?.data?.payload?.Question);
            setCount(res?.data?.payload?.count);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      await ApiGet(
        `trainingDate/getAllDate?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          if (res?.status == 200) {
            setIsLoaderVisible(false);
            setAllTimeSlot(res?.data?.payload?.Question);
            setCount(res?.data?.payload?.count);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  // const getAllCourseName = async () => {
  //   setIsLoaderVisible(true);

  //   await ApiGet(`courseName/getAllCourseName?page=${page}&limit=1000`)
  //     .then((res) => {
  //       setIsLoaderVisible(false);
  //       setFilteredCourseName(res?.data?.payload?.Question);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handelAddCourseNameDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let Data = {
        date: date,
        seat: inputValueForAdd?.seat,
        endTime: endTime,
        startTime: startTime,
        cnid: inputValueForAdd?.CourseName,
        ctid: inputValueForAdd?.CourseType,
        vcid: inputValueForAdd?.VehicleCategory,
      };
      ApiPost(`trainingDate/addDate`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddCourseName(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllTimeSlot();
            setIsAddCourseName(false);
            setErrorsForAdd({});
            // setSelectedCourseName([]);
            // setSelectedCourseType([]);
            // setSelectedVehicleCategory([]);
            setIsEditPopUp(false);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handleDeleteCourseName = () => {
    ApiDelete(`trainingDate/deleteDate/${idForDeleteCourseName}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllTimeSlot();
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

  const validateForm = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.VehicleCategory) {
      formIsValid = false;
      errorsForAdd["VehicleCategory"] = "*Please Enter Vehicle Category!";
    }

    if (inputValueForAdd && !inputValueForAdd.CourseType) {
      formIsValid = false;
      errorsForAdd["CourseType"] = "*Please Enter CourseType!";
    }

    if (inputValueForAdd && !inputValueForAdd.CourseName) {
      formIsValid = false;
      errorsForAdd["CourseName"] = "*Please Enter CourseName!";
    }

    if (inputValueForAdd && !inputValueForAdd.seat) {
      formIsValid = false;
      errorsForAdd["seat"] = "*Please Enter seat Number!";
    } else if (inputValueForAdd.seat < 0) {
      formIsValid = false;
      errorsForAdd["seat"] = "*Please Enter vaild seat number!";
    }

    if (!date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please Enter date!";
    }
    if (!startTime) {
      formIsValid = false;
      errorsForAdd["startTime"] = "*Please Enter startTime!";
    }
    if (!endTime) {
      formIsValid = false;
      errorsForAdd["endTime"] = "*Please Enter endTime!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handelUpdateTimeSlotDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // const newCourseName = [];
      // {
      //   selectedCourseName.map((sub, i) => {
      //     newCourseName.push(sub._id);
      //   });
      // }
      // const newCourseType = [];
      // {
      //   selectedCourseType.map((sub, i) => {
      //     newCourseType.push(sub._id);
      //   });
      // }
      // const newVehicleCategory = [];
      // {
      //   selectedVehicleCategory.map((sub, i) => {
      //     newVehicleCategory.push(sub._id);
      //   });
      // }
      let Data = {
        date: date,
        seat: inputValueForAdd?.seat,
        endTime: endTime,
        startTime: startTime,
        cnid: inputValueForAdd?.CourseName,
        ctid: inputValueForAdd?.CourseType,
        vcid: inputValueForAdd?.VehicleCategory,
      };
      ApiPut(`trainingDate/updateDate/${idForUpdateCourseNameData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddCourseName(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            getAllTimeSlot();
            setIsAddCourseName(false);
            setErrorsForAdd({});
            // setSelectedCourseName([]);
            // setSelectedCourseType([]);
            // setSelectedVehicleCategory([]);
            setIsEditPopUp(false);
          } else {
            console.log("res007", res);
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log("errerrerr", err?.message);
          toast.error(err?.message);
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
        return <span>{moment(row?.date).format("ll")}</span>;
      },
      sortable: true,
      selector: (row) => row?.date,
    },
    {
      name: "Vehicle Category",
      selector: (row) => row?.vehicleCategory[0]?.vehicleCategory,
      sortable: true,
    },
    {
      name: "Course Type",
      selector: (row) => row?.courseType[0]?.courseType,
      sortable: true,
    },
    {
      name: "Course Name",
      selector: (row) => row?.courseName[0]?.courseName,
      sortable: true,
    },
    {
      name: "Start Time",
      cell: (row) => {
        return <span>{moment(row?.startTime).format("LT")}</span>;
      },
      sortable: true,
      selector: (row) => row?.startTime,
    },
    {
      name: "End Time",
      cell: (row) => {
        return <span>{moment(row?.endTime).format("LT")}</span>;
      },
      sortable: true,
      selector: (row) => row?.endTime,
    },

    {
      name: "Total Seat",
      selector: "seat",
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
                  console.log("rowrow", row);
                  setIsAddCourseName(true);
                  setIdForUpdateCourseNameData(row._id);
                  getAllVehicleCategory();
                  setInputValueForAdd({
                    seat: row?.seat,
                    CourseName: row?.cnid,
                    CourseType: row?.ctid,
                    VehicleCategory: row?.vcid,
                  });
                  setStartTime(row?.startTime);
                  setEndTime(row?.endTime);
                  setDate(row?.date);
                  // setSelectedCourseName(row?.cnid);
                  // setSelectedCourseType(row?.ctid);
                  // setSelectedVehicleCategory(row?.vcid);
                  // setAllVehicleCategoryForUpdate(row?.vcid);
                  // setAllCourseNameForUpdate(row?.cnid);
                  // setAllCourseTypeForUpdate(row?.ctid);
                  setNow(moment(row?.startTime));
                  setNow1(moment(row?.endTime));
                  setIsEditPopUp(true);
                }}
              >
                <Tooltip title="Edit CourseName" arrow>
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
              <Tooltip title="Delete Course Name" arrow>
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
    let val = e.target.value.replace(/[^\w\s]/gi, "");
    setSearch(val);
  };

  const debouncedSearchTerm = useDebounce(search, 500);

  // Hook
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
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllTimeSlot();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllTimeSlot();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Time Slot</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Time Slot"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>

            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddCourseName(true);
                  getAllVehicleCategory();
                  // getAllCourseName();
                }}
                className="btn btn-success mr-2"
              >
                Add Time Slot
              </button>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To delete this time slot?
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
            data={allTimeSlot}
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
                {/* <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Vehicle Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <Multiselect
                        options={filteredVehicleCategory}
                        onSelect={(selectedList, selectedItem) => {
                          setSelectedVehicleCategory(selectedList);
                          setErrorsForAdd({
                            ...errorsForAdd,
                            selectedTopSubjects: "",
                          });
                        }}
                        onRemove={(selectedList, removedItem) => {
                          setSelectedVehicleCategory(selectedList);
                        }}
                        displayValue="vehicleCategory"
                        selectedValues={allVehicleCategoryForUpdate}
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
                    Select Course Type
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <Multiselect
                      options={getCourseType}
                      onSelect={(selectedList, selectedItem) => {
                        setSelectedCourseType(selectedList);
                        setErrorsForAdd({
                          ...errorsForAdd,
                          selectedTopSubjects: "",
                        });
                      }}
                      onRemove={(selectedList, removedItem) => {
                        setSelectedCourseType(selectedList);
                      }}
                      displayValue="courseType"
                      selectedValues={allCourseTypeForUpdate}
                    />
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
                    Select Course Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <Multiselect
                      options={filteredCourseName}
                      onSelect={(selectedList, selectedItem) => {
                        setSelectedCourseName(selectedList);
                        setErrorsForAdd({
                          ...errorsForAdd,
                          selectedCourseName: "",
                        });
                      }}
                      onRemove={(selectedList, removedItem) => {
                        setSelectedCourseName(selectedList);
                      }}
                      displayValue="courseName"
                      selectedValues={allCourseNameForUpdate}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["CourseName"]}
                    </span>
                  </div>
                </div> */}

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
                        value={inputValueForAdd?.VehicleCategory}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Vehicle Category
                        </option>
                        {filteredVehicleCategory?.length > 0 &&
                          filteredVehicleCategory?.map((item) => {
                            // console.log("item", filteredVehicleCategory);
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
                        <option value="" disabled selected hidden>
                          Select Course Type
                        </option>
                        {getCourseType?.length > 0 &&
                          getCourseType?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={
                                  inputValueForAdd?.CourseType === item?._id
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
                    Select Course Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="CourseName"
                        name="CourseName"
                        // value={inputValueForAdd.CourseName}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Course Type
                        </option>
                        {selectedCourseName?.length > 0 &&
                          selectedCourseName?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={
                                  inputValueForAdd?.CourseName === item._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.courseName}{" "}
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
                      {errorsForAdd["CourseName"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Total Seat
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="number"
                        className={`form-control form-control-lg form-control-solid `}
                        id="seat"
                        name="seat"
                        value={inputValueForAdd?.seat}
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
                      {errorsForAdd["seat"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Date
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <DatePicker
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        setErrorsForAdd({ ...errorsForAdd, date: "" });
                      }}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["date"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Start Time
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <TimePicker
                      showSecond={false}
                      defaultValue={now}
                      onChange={onChange}
                      format={format}
                      use12Hours
                      inputReadOnly
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["startTime"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter End Time
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <TimePicker
                      showSecond={false}
                      defaultValue={now1}
                      onChange={onChange1}
                      format={format1}
                      use12Hours
                      inputReadOnly
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["endTime"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      isEditPopUp === false
                        ? handelAddCourseNameDetails(e)
                        : handelUpdateTimeSlotDetails(e);
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

export default TimeSlot;
