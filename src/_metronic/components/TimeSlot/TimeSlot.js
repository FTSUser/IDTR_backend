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
import CsvDownload from "react-json-to-csv";
import { ExportCSV } from "./SampleExcel";
import { setHours, setMinutes } from "date-fns";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TimeSlot = ({ getNewCount, title }) => {
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
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(date));
  const [allTimeSlot, setAllTimeSlot] = useState([]);
  const [getCourseCategory, setGetCourseCategory] = useState([]);
  const [getCourseName, setGetCourseName] = useState([]);
  const [isEditPopUp, setIsEditPopUp] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [allPaymentDetailsExcel, setAllPaymentDetailsExcel] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(date));
  const [hour, setHour] = useState();
  const [finalDisableEndTime, setFinalDisableEndTime] = useState([]);
  const [finalDisableEndTimeForMin, setFinalDisableEndTimeForMin] = useState([]);

  const [dataCSV, setDataCSV] = useState([]);

  useEffect(() => {
    document.title = "Honda | Timeslot Addition ";
  }, []);



  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "seat") {
      let val = e.target.value.replace(/\D/g, "");
      setInputValueForAdd({ ...inputValueForAdd, [name]: val });
      setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    } else {
      // const { name, value } = e.target;
      if (name === "VehicleCategory") {
        setInputValueForAdd({
          ...inputValueForAdd,
          [name]: value,
          CourseType: "",
          CourseCategory: "",
          CourseName: "",
        });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
        return;
      }
      if (name === "CourseType") {
        setInputValueForAdd({
          ...inputValueForAdd,
          [name]: value,
          CourseCategory: "",
          CourseName: "",
        });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
        return;
      }
      if (name === "CourseCategory") {
        setInputValueForAdd({
          ...inputValueForAdd,
          [name]: value,
          CourseName: "",
        });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
        return;
      }

      setInputValueForAdd({ ...inputValueForAdd, [name]: value });
      setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    }
  };
  useEffect(() => {
    getAllPaymentDetailsForExcel();
  }, []);

  const getAllPaymentDetailsForExcel = async () => {
    // if (!search) {
    await ApiGet(`trainingDate/getAllDateWithoutPagination`)
      .then((res) => {
        setAllPaymentDetailsExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
    // }
  };
  useEffect(() => {
    if (allPaymentDetailsExcel) {
      allPaymentDetailsExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          courseName: registerUser?.courseName[0]?.courseName,
          courseType: registerUser?.courseType[0]?.courseType,
          vehicleCategory: registerUser?.vehicleCategory[0]?.vehicleCategory,
          createdBy: registerUser?.cnid?.createdBy,
          seat: registerUser?.seat,
          startTime: moment(registerUser?.startTime).format("LT"),
          endTime: moment(registerUser?.endTime).format("LT"),
          createdAt: moment(registerUser?.date).format("ll"),
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
  }, [allPaymentDetailsExcel]);

  const handleAddAdminClose = () => {
    setInputValueForAdd({});
    setIsAddCourseName(false);
    setErrorsForAdd({});
    setIsEditPopUp(false);
    setIdForUpdateCourseNameData("");
    setStartTime("");
    setEndTime("");
    setDate(new Date());
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
    setEndTime("")
    setErrorsForAdd({
      ...errorsForAdd,
      startTime: "",
    });
    setEndTime("")
  }




  useEffect(() => {
    setHour(moment(startTime).format("k"))
    let newArr = []
    let newArrForMin = []
    for (var i = 0; i < moment(startTime).format("k"); i++) {
      newArr.push(i)
    }
    setFinalDisableEndTime(newArr)
    for (var i = 0; i <= moment(startTime).format("m"); i++) {
      newArrForMin.push(i)
    }
    setFinalDisableEndTimeForMin(newArrForMin)
  }, [startTime])

  function disabledHoursEndTime() {
    return finalDisableEndTime;
  }
  function disabledMinutesEndTime() {

    return finalDisableEndTimeForMin;
  }









  //for end time selector
  const [endTime, setEndTime] = useState("");
  const [now1, setNow1] = useState(moment().hour(0).minute(1));
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
    await ApiPost(`courseType/getCoursetypeByVehiclecategory?limit=1000`, Data)
      .then((res) => {
        setIsLoaderVisible(false);
        setGetCourseType(res?.data?.payload?.courseType);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getAllCourseCategory = async () => {
    setIsLoaderVisible(true);
    let Data = {
      vehicleCategory: inputValueForAdd?.VehicleCategory,
      courseType: inputValueForAdd?.CourseType,
    };
    await ApiPost(`courseCategory/getCourseCategoryByCourseType`, Data)
      .then((res) => {
        setIsLoaderVisible(false);
        setGetCourseCategory(res?.data?.payload?.courseCategory);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (inputValueForAdd?.VehicleCategory?.length > 0) {
      getAllCourseType();
    }
  }, [inputValueForAdd?.VehicleCategory]);

  useEffect(() => {
    if (inputValueForAdd?.CourseType?.length > 0) {
      getAllCourseCategory();
    }
  }, [inputValueForAdd?.CourseType]);

  const getAllVehicleCategory = async () => {
    setIsLoaderVisible(true);

    await ApiGet(`vehicleCategory/getAll`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredVehicleCategory(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getAllCourseName = async () => {
    setIsLoaderVisible(true);
    let Data = {
      vehicleCategory: inputValueForAdd?.VehicleCategory,
      courseType: inputValueForAdd?.CourseType,
      courseCategory: inputValueForAdd?.courseCategory,
    };
    await ApiPost(`courseName/getCoursenameByCoursetype?limit=1000`, Data)
      .then((res) => {
        setIsLoaderVisible(false);
        setGetCourseName(res?.data?.payload?.courseName);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (inputValueForAdd?.CourseCategory?.length > 0) {
      getAllCourseName();
    }
  }, [inputValueForAdd?.CourseCategory]);

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
          toast.error(err?.response?.data?.message);
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
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const handelAddCourseNameDetails = (e) => {
    e.preventDefault();
    let sTimeHour = new Date(startTime).getHours();
    let sTimeMinute = new Date(startTime).getMinutes();
    let start = moment(date).set({ hour: sTimeHour, minute: sTimeMinute })

    let eTimeHour = new Date(endTime).getHours();
    let eTimeMinute = new Date(endTime).getMinutes();
    let end = moment(date).set({ hour: eTimeHour, minute: eTimeMinute })

    if (validateForm()) {
      let Data = {
        date: date,
        endDate: endDate,
        seat: inputValueForAdd?.seat,
        endTime: end,
        startTime: start,
        cnid: inputValueForAdd?.CourseName,
        ctid: inputValueForAdd?.CourseType,
        vcid: inputValueForAdd?.VehicleCategory,
        ccid: inputValueForAdd?.CourseCategory
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
            setIsEditPopUp(false);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
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
        toast.error(err?.response?.data?.message);
      });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.VehicleCategory) {
      formIsValid = false;
      errorsForAdd["VehicleCategory"] = "*Please enter vehicle category!";
    }

    if (inputValueForAdd && !inputValueForAdd.CourseType) {
      formIsValid = false;
      errorsForAdd["CourseType"] = "*Please enter courseType!";
    }
    if (inputValueForAdd && !inputValueForAdd.CourseCategory) {
      formIsValid = false;
      errorsForAdd["CourseCategory"] = "*Please enter course category!";
    }
    if (inputValueForAdd && !inputValueForAdd.CourseName) {
      formIsValid = false;
      errorsForAdd["CourseName"] = "*Please enter course name!";
    }

    if (inputValueForAdd && !inputValueForAdd.seat) {
      formIsValid = false;
      errorsForAdd["seat"] = "*Please enter seat number!";
    } else if (inputValueForAdd.seat < 0) {
      formIsValid = false;
      errorsForAdd["seat"] = "*Please enter vaild seat number!";
    }

    if (!date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please enter start date!";
    }
    if (!endDate) {
      formIsValid = false;
      errorsForAdd["endDate"] = "*Please enter end date!";
    }
    if (!startTime) {
      formIsValid = false;
      errorsForAdd["startTime"] = "*Please enter start time!";
    }
    if (!endTime) {
      formIsValid = false;
      errorsForAdd["endTime"] = "*Please e  nter end time!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handelUpdateTimeSlotDetails = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let Data = {
        date: date,
        endDate: endDate,
        seat: inputValueForAdd?.seat,
        endTime: endTime,
        startTime: startTime,
        cnid: inputValueForAdd?.CourseName,
        ctid: inputValueForAdd?.CourseType,
        vcid: inputValueForAdd?.VehicleCategory,
        ccid: inputValueForAdd?.CourseCategory
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
            setIsEditPopUp(false);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
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
                  setIsAddCourseName(true);
                  setIdForUpdateCourseNameData(row._id);
                  getAllVehicleCategory();
                  setInputValueForAdd({
                    seat: row?.seat,
                    CourseName: row?.cnid,
                    CourseType: row?.ctid,
                    VehicleCategory: row?.vcid,
                    CourseCategory: row?.ccid,
                  });
                  setStartTime(row?.startTime);
                  setEndTime(row?.endTime);
                  setDate(row?.date);
                  setEndDate(row?.endDate)
                  setNow(moment(row?.startTime));
                  setNow1(moment(row?.endTime));
                  setIsEditPopUp(true);
                }}
              >
                <Tooltip title="Edit Timeslot" arrow>
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
              <Tooltip title="Delete Timeslot" arrow>
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

  const onBulkUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {

      let formData = new FormData();
      formData.append("csv", e.target.files[0]);
      await ApiPost("trainingDate/uploadcsv", formData)
        .then((res) => {
          if (res.data?.result === 0) {
            getAllTimeSlot();
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          let img = document.getElementById("upload");
          img.value = null
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Please Select Excel File !");
    }
  };

 



  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Timeslot Addition</h2>
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
            <div className="cus-medium-button-style button-height mr-2">
              <CsvDownload
                className={`btn btn-success`}
                data={dataCSV}
                filename="Timeslot Addition Report.csv"

              >
                Export to Excel
              </CsvDownload>
            </div>

            <div className="cus-medium-button-style button-height mr-2">
              <ExportCSV />{" "}
            </div>
            <div className="cus-medium-button-style button-height">
              <input
                type="file"
                id="upload"
                style={{ display: "none" }}
                className="btn btn-success"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(e) => onBulkUpload(e)}

              />
            </div>
            <div className="cus-medium-button-style button-height mr-2">
              <buttton
                className="btn btn-success "
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("upload").click();
                }}

              >Upload Excel File</buttton>
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
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select vehicle category
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
                          Select vehicle category
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
                    Select course type
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
                        <option
                          value=""
                          disabled
                          selected={
                            !!inputValueForAdd?.CourseType === false
                              ? true
                              : false
                          }
                          hidden
                        >
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
                                {item.courseType}{" "}
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
                    Select course category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="CourseCategory"
                        name="CourseCategory"
                        // value={inputValueForAdd.CourseCategory}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option
                          value=""
                          disabled
                          selected={
                            !!inputValueForAdd?.CourseCategory === false
                              ? true
                              : false
                          }
                          hidden
                        >
                          Select course category
                        </option>
                        {getCourseCategory?.length > 0 &&
                          getCourseCategory?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item._id}
                                selected={
                                  inputValueForAdd?.CourseCategory === item._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.courseCategory}{" "}
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
                      {errorsForAdd["CourseCategory"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select course name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="CourseName"
                        name="CourseName"
                        // value={inputValueForAdd.CourseCategory}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option
                          value=""
                          disabled
                          selected={
                            !!inputValueForAdd?.CourseName === false
                              ? true
                              : false
                          }
                          hidden
                        >
                          Select course name
                        </option>
                        {getCourseName?.length > 0 &&
                          getCourseName?.map((item) => {
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
                    Enter total seat
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
                  <label className="col-lg-3 col-form-label">
                    Select start date
                  </label>
                  <div className="col-lg-6 cus-data-input-style">
                    <DatePicker
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        setEndDate(new Date(date))
                        setErrorsForAdd({ ...errorsForAdd, date: "" });
                        setIsDisable(true)
                      }}
                      minDate={currentDate}
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
                  <label className="col-lg-3 col-form-label">
                    Select end date
                  </label>
                  <div className="col-lg-6 cus-data-input-style">
                    {endDate ?
                      <DatePicker
                        id="endDate"
                        format="DD/MM/YYYY"
                        selected={new Date(endDate)}
                        onChange={(date) => {
                          setEndDate(date);
                          setErrorsForAdd({ ...errorsForAdd, endDate: "" });
                        }}
                        minDate={new Date(date)}
                      />
                      :
                      <DatePicker
                        id="endDate"
                        format="DD/MM/YYYY"
                        selected={new Date(date)}
                        onChange={(date) => {
                          setEndDate(date);
                          setErrorsForAdd({ ...errorsForAdd, endDate: "" });
                        }}
                        minDate={currentDate}
                      />
                    }

                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["endDate"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-lg-3 col-form-label">
                    Enter start time
                  </label>
                  <div className="col-lg-9 cus-data-input-style">
                    {isDisable ?
                  <TimePicker
                  showSecond={false}
                  defaultValue={now}
                  onChange={onChange}
                  format={format}
                  inputReadOnly
                /> :
                <TimePicker
                showSecond={false}
                defaultValue={now}
                onChange={onChange}
                format={format}
                disabledHours={() => {
                  let newArr = [];
                  for (var i = 0; i < moment(isEditPopUp === true ? new Date(startTime) : new Date()).format("k"); i++) {
                    newArr.push(i)
                  }
                  return newArr
                }}
                disabledMinutes={() => {
                  let newArr = [];
                  for (var i = 0; i < moment(isEditPopUp === true ? new Date(startTime) :new Date()).format("m"); i++) {
                    newArr.push(i)
                  }
                  return newArr
                }}
                inputReadOnly
              /> 
                  }
                    
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
                  <label className="col-lg-3 col-form-label">
                    Enter end time
                  </label>
                  <div className="col-lg-9 cus-data-input-style">
                    {moment(startTime).format("k") === moment(endTime).format("k") && moment(startTime).format("k") !== "24" ?
                      <TimePicker
                        showSecond={false}
                        defaultValue={now1}
                        onChange={onChange1}
                        format={format1}
                        disabledHours={disabledHoursEndTime}
                        disabledMinutes={disabledMinutesEndTime}
                        inputReadOnly
                      />
                      : moment(startTime).format("k") !== moment(endTime).format("k") && moment(startTime).format("k") !== "24" ?
                        <TimePicker
                          showSecond={false}
                          defaultValue={now1}
                          onChange={onChange1}
                          format={format1}
                          disabledHours={disabledHoursEndTime}
                          // disabledMinutes={disabledMinutesEndTime}
                          inputReadOnly
                        />
                        : moment(startTime).format("k") === "24" ?
                          <TimePicker
                            showSecond={false}
                            defaultValue={now1}
                            onChange={onChange1}
                            format={format1}
                            inputReadOnly
                            disabledMinutes={disabledMinutesEndTime}
                          /> :
                          <TimePicker
                            showSecond={false}
                            defaultValue={now1}
                            onChange={onChange1}
                            format={format1}
                            inputReadOnly
                          />
                    }

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

                    <span>{isEditPopUp === false ? 'Add' : 'Update'}  Time Slot</span>

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
