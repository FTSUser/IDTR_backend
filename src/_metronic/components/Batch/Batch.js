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
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { reject } from "lodash";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import S3 from "react-aws-s3";
import { AwsConfig } from "../../../config/S3Backet/app.config";
import CsvDownload from "react-json-to-csv";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Batch = ({ getNewCount, title }) => {
  const [filteredAnnouncement, setFilteredAnnouncement] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateTimezon, setdateTimezon] = useState([]);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreAnnouncement, setIsViewMoreAnnouncement] = useState(false);
  const [date, setDate] = useState(new Date());

  const [description, setDescription] = useState("");
  //new data
  const [isUpdateAnnouncement, setIsUpdateAnnouncement] = useState(false);
  const [isAddAnnouncement, setIsAddAnnouncement] = useState(false);
  const [idForUpdateAnnouncementData, setIdForUpdateAnnouncementData] =
    useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteAnnouncement, setIdForDeleteAnnouncement] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countForBatch, setCountForBatch] = useState(0);
  const [pageForBatch, setPageForBatch] = useState(1);
  const [countPerPageForBatch, setCountPerPageForBatch] = useState(10);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [getExaminer, setgetExaminer] = useState([]);
  const [getDataenter, setgetDataenter] = useState([]);
  const [responseByBatch, setResponseByBatch] = useState([]);
  const [idForgetResponseByBatch, setIdForgetResponseByBatch] = useState();
  const [isPaperViewModel, setIsPaperViewModel] = useState(false);

  useEffect(() => {
    document.title = "Honda | Banner";
    getDateAndApi(new Date());
  }, []);

  // S3 link for image start

  // S3 link for image End
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

  const handleViewMoreClose = () => {
    setIsViewMoreAnnouncement(false);
    setDataViewMore({});
    setIdForgetResponseByBatch("");
    setResponseByBatch([])
    setCountForBatch(0)
  };

  useEffect(() => {}, [inputValueForAdd]);

  useEffect(() => {}, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setDescription("");
    setDate(new Date());
    setShow(false);
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
    setIsUpdateAnnouncement(false);
    setdateTimezon([]);
    setbatchInfo([]);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setDescription([]);
    setDate(new Date());
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
    setdateTimezon([]);
    setbatchInfo([]);
  };

  const handleViewMorePaper = () => {
    setIsPaperViewModel(false)
    
  };

  const handleClose = () => {
    setShow(false);
    setInputValue({});
    setDescription([]);
    setdateTimezon([]);
    setbatchInfo([]);
    setDate(new Date());
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
  };

  useEffect(() => {
    getAllAnnouncement();
  }, [page, countPerPage]);

  const getAllAnnouncement = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`batch/getAllBatch?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {});
    } else {
      await ApiGet(
        `batch/getAllBatch?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {});
    }
  };

  const getDateAndApi = async (selectdate) => {
    selectdate = new Date(selectdate);
    setIsLoaderVisible(true);
    await ApiGet(
      `trainingDate/getData?date=${
        selectdate.getFullYear() +
        "-" +
        (selectdate.getMonth() < 9
          ? "0" + (selectdate.getMonth() + 1)
          : selectdate.getMonth() + 1) +
        "-" +
        (selectdate.getDate() < 9
          ? "0" + selectdate.getDate()
          : selectdate.getDate())
      }`
    )
      .then((res) => {
        setdateTimezon(
          res?.data?.payload?.subMenu ? res?.data?.payload?.subMenu : []
        );
      })
      .catch((err) => {
        setdateTimezon([]);
      });
  };

  const getExaminerAndApi = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`admin/get-examiners`)
      .then((res) => {
        setgetExaminer(
          res?.data?.payload?.Examiner ? res?.data?.payload?.Examiner : []
        );
      })
      .catch((err) => {
        setgetExaminer([]);
      });
  };
  const getDataenterAndApi = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`admin/get-dataentry`)
      .then((res) => {
        setgetDataenter(
          res?.data?.payload?.DataEntry ? res?.data?.payload?.DataEntry : []
        );
      })
      .catch((err) => {
        setgetDataenter([]);
      });
  };

  useEffect(() => {
    console.log("idForgetResponseByBatch", idForgetResponseByBatch);
  }, [idForgetResponseByBatch]);

  //getResponseByBatch

  useEffect(() => {
    if(idForgetResponseByBatch) {
      getResponseByBatch(idForgetResponseByBatch);
    }
  }, [pageForBatch, countPerPageForBatch]);

  const getResponseByBatch = async (id) => {
    await ApiGet(
      `register/getRegisterByBatch/${id}?page=${pageForBatch}&limit=${countPerPageForBatch}`
    )
      .then((res) => {
        console.log("resrtr", res?.data?.payload?.users);
        setResponseByBatch(res?.data?.payload?.users);
        setCountForBatch(res?.data?.payload?.count);
      })
      .catch((err) => {
        // toast.error(err?.message);
        console.log(err?.message);
      });
  };

  const getPapersetByUserId = async (id) => {
    await ApiGet(
      `response/getResponseByUser/${id}`
    )
      .then((res) => {
        console.log("resrtrssdf", res?.data?.payload);
      })
      .catch((err) => {
        // toast.error(err?.message);
        console.log(err?.message);
      });
  };

  useEffect(() => {
    getExaminerAndApi();
    getDataenterAndApi();
  }, []);

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};

    if (inputValueForAdd && !inputValueForAdd.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please Enter Name!";
    }

    if (inputValueForAdd && !date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please Upload Date!";
    }

    if (inputValueForAdd && !inputValueForAdd.DataEntry) {
      formIsValid = false;
      errorsForAdd["DataEntry"] = "*Please Upload DataEntry!";
    }

    if (inputValueForAdd && !inputValueForAdd.Examiner) {
      formIsValid = false;
      errorsForAdd["Examiner"] = "*Please Upload Examiner!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddAnnouncementDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        name: inputValueForAdd.name,
        date: date,
        tdid: batchInfo,
        Examiner: inputValueForAdd.Examiner,
        DataEntry: inputValueForAdd.DataEntry,
      };
      ApiPost(`batch/addBatch`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
            setDescription([]);
            setdateTimezon([]);
            setbatchInfo([]);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please Enter Name!";
    }

    if (inputValue && !date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please Upload Date!";
    }

    if (inputValue && !inputValue.DataEntry) {
      formIsValid = false;
      errorsForAdd["DataEntry"] = "*Please Upload DataEntry!";
    }

    if (inputValue && !inputValue.Examiner) {
      formIsValid = false;
      errorsForAdd["Examiner"] = "*Please Upload Examiner!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteAnnouncement = () => {
    ApiDelete(`batch/deleteBatch/${idForDeleteAnnouncement}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllAnnouncement();
          // {
          //   document.title === "Dashboard | OUR LEISURE HOME" && getNewCount();
          // }
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

  useEffect(() => {}, [inputValue]);

  const handleUpdateAnnouncementDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let Data = {
        name: inputValue.name,
        date: date,
        tdid: batchInfo,
        Examiner: inputValue.Examiner,
        DataEntry: inputValue.DataEntry,
      };
      ApiPut(`batch/updateBatch/${idForUpdateAnnouncementData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsUpdateAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValue({});
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
            setDescription([]);
            setdateTimezon([]);
            setbatchInfo([]);
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
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
      name: "Batch Name",
      selector: "name",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.name,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },

    {
      name: "Date",
      selector: "date",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: moment(row?.date).format("ll"),
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },

    {
      name: "Seat",
      selector: "numberOFUser",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.total,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Total User",
      selector: "totalUser",
      cell: (row) => {
        return (
          <>
            {row?.totalUser ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: row?.totalUser,
                }}
                className=""
              />
            ) : (
              <p>{"-"}</p>
            )}
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
                  setInputValue({
                    name: row?.name,
                    date: row?.date,
                    _id: row?._id,
                    DataEntry: row?.DataEntry._id,
                    Examiner: row?.Examiner._id,
                  });
                  setIsUpdateAnnouncement(true);
                  setIdForUpdateAnnouncementData(row._id);
                  getExaminerAndApi();
                  getDataenterAndApi();
                  getDateAndApi(row?.date);
                  setDate(new Date(row?.date));
                  const tdidId = row?.tdid.map((data) => {
                    return data._id;
                  });
                  setbatchInfo(tdidId);
                }}
              >
                <Tooltip title="Edit Announcement" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteAnnouncement(row?._id);
              }}
            >
              <Tooltip title="Delete Announcement" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIdForgetResponseByBatch(row?._id);
                setIsViewMoreAnnouncement(true);
                setDataViewMore(row);
                getResponseByBatch(row?._id);
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
  const columnsUser = [
    {
      name: "SNo",
      cell: (row, index) => (pageForBatch - 1) * countPerPageForBatch + (index + 1),
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
      name: "Email",
      selector: "email",
      cell: (row) => {
        return (
          <>
            <p>{row?.email ? row?.email : "-"}</p>
          </>
        );
      },
    },
    {
      name: "First Name",
      selector: "fname",
      cell: (row) => {
        return (
          <>
            <p>{row?.fname ? row?.fname : "-"}</p>
          </>
        );
      },
    },
    {
      name: "Middle Name",
      selector: "mname",
      cell: (row) => {
        return (
          <>
            <p>{row?.mname ? row?.mname : "-"}</p>
          </>
        );
      },
    },
    {
      name: "Last Name",
      selector: "lname",
      cell: (row) => {
        return (
          <>
            <p>{row?.lname ? row?.lname : "-"}</p>
          </>
        );
      },
      width: "200px",
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
                  setIsPaperViewModel(true);
                  getPapersetByUserId(row?.batchId)
                }}
              >
                <Tooltip title="Edit Announcement" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
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
      getAllAnnouncement();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllAnnouncement();
    }
  }, [debouncedSearchTerm]);

  const [batchInfo, setbatchInfo] = useState([]);

  const getBatch = (e, valueId) => {
    if (batchInfo.includes(valueId)) {
      setbatchInfo((data) => {
        return data.filter((allID) => {
          return allID !== valueId;
        });
      });
    } else {
      setbatchInfo((data) => {
        return [...data, valueId];
      });
    }
  };

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2"> Batch</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Batch"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddAnnouncement(true);
                }}
                className="btn btn-success mr-2"
              >
                Add Batch
              </button>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure To Want To delete this Banner</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteAnnouncement();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredAnnouncement}
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

      {isAddAnnouncement ? (
        <Dialog
          fullScreen
          open={isAddAnnouncement}
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
            {isAddAnnouncement === true ? (
              <div className="form ml-30 ">
                {/* Name Amenintie */}
                {/* <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Date
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="date"
                        name="date"
                        value={inputValueForAdd.date}
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
                      {errorsForAdd["date"]}
                    </span>
                  </div>
                </div> */}

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="name"
                        name="name"
                        value={inputValueForAdd.name}
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
                      {errorsForAdd["name"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <DatePicker
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        getDateAndApi(date);
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
                  {dateTimezon.length > 0 && (
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Slot
                    </label>
                  )}
                  <div className="">
                    {dateTimezon.length > 0 &&
                      dateTimezon.map((data, index) => {
                        return (
                          <div
                            className="d-flex align-items-center check-new-design"
                            key={index}
                          >
                            <input
                              className="mr-3 "
                              type="checkbox"
                              name="getBatch"
                              defaultChecked={data.istrue}
                              value={data._id}
                              onChange={(e) => getBatch(e, data._id)}
                            />
                            <label>
                              {moment(data.startTime).format("ll") +
                                " " +
                                moment(data.startTime).format("LT") +
                                "-" +
                                moment(data.endTime).format("ll") +
                                " " +
                                moment(data.endTime).format("LT")}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Examiner
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="Examiner"
                        name="Examiner"
                        value={inputValueForAdd?.Examiner}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Examiner
                        </option>
                        {getExaminer?.length > 0 &&
                          getExaminer?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValueForAdd?.Examiner === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["Examiner"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select DataEntry
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="DataEntry"
                        name="DataEntry"
                        value={inputValueForAdd?.DataEntry}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select DataEntry
                        </option>
                        {getDataenter?.length > 0 &&
                          getDataenter?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValueForAdd?.DataEntry === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["DataEntry"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleAddAnnouncementDetails(e);
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

      {isUpdateAnnouncement ? (
        <Dialog
          fullScreen
          open={isUpdateAnnouncement}
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
            {isUpdateAnnouncement === true ? (
              <div className="form ml-30 ">
                {/* Ameninties Name */}
                {/* <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Date
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="date"
                        name="date"
                        value={inputValue.date}
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
                      {errors["date"]}
                    </span>
                  </div>
                </div> */}

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="name"
                        name="name"
                        value={inputValue.name}
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
                      {errors["name"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <DatePicker
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        getDateAndApi(date);
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
                  {dateTimezon.length > 0 && (
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Slot
                    </label>
                  )}
                  <div className="form-group">
                    {dateTimezon.length > 0 &&
                      dateTimezon.map((data, index) => {
                        return (
                          <div
                            className="form-group d-flex align-items-center"
                            key={index}
                          >
                            <input
                              className="mr-3 "
                              type="checkbox"
                              name="getBatch"
                              defaultChecked={batchInfo.includes(data._id)}
                              value={data._id}
                              onChange={(e) => getBatch(e, data._id)}
                            />
                            <label>
                              {moment(data.startTime).format("ll") +
                                " " +
                                moment(data.startTime).format("LT") +
                                "-" +
                                moment(data.endTime).format("ll") +
                                " " +
                                moment(data.endTime).format("LT")}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Examiner
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="Examiner"
                        name="Examiner"
                        value={inputValueForAdd?.Examiner}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Examiner
                        </option>
                        {getExaminer?.length > 0 &&
                          getExaminer?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  item?._id === inputValue?.Examiner
                                    ? true
                                    : false
                                }
                              >
                                {item.email}
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
                      {errorsForAdd["Examiner"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select DataEntry
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="DataEntry"
                        name="DataEntry"
                        value={inputValueForAdd?.DataEntry}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select DataEntry
                        </option>
                        {getDataenter?.length > 0 &&
                          getDataenter?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValue?.DataEntry === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["DataEntry"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleUpdateAnnouncementDetails(e);
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

      {/* view more */}

      {isViewMoreAnnouncement ? (
        <Dialog
          fullScreen
          open={isViewMoreAnnouncement}
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
            {isViewMoreAnnouncement === true ? (
              <div className="honda-container">
                <div className="honda-text-grid">
                  <div className="honda-text-grid-items">
                    <span>Batch Name:</span>
                    <p>{dataViewMore?.name}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Date:</span>
                    <p>{moment(dataViewMore?.date).format("ll")}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Total Seat:</span>
                    <p>{dataViewMore?.total}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Total User:</span>
                    <p>
                      {dataViewMore?.totalUser ? dataViewMore?.totalUser : "-"}
                    </p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>User Data:</span>
                    {/* <DataTable
                      columns={columnsUser}
                      data={dataViewMore?.User}
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
                      paginationServer
                    /> */}
                    <DataTable
                      columns={columnsUser}
                      data={responseByBatch}
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
                      paginationServer
                      paginationTotalRows={countForBatch}
                      paginationPerPage={countPerPage}
                      paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
                      paginationDefaultPage={pageForBatch}
                      onChangePage={(page) => {
                        setPageForBatch(page);
                      }}
                      onChangeRowsPerPage={(rowPerPage) => {
                        setCountPerPageForBatch(rowPerPage);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
      {isPaperViewModel ? (
        <Dialog
          fullScreen
          open={isPaperViewModel}
          onClose={handleViewMorePaper}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMorePaper}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isViewMoreAnnouncement === true ? (
              <div className="honda-container">
                <div className="honda-text-grid">
                  <div className="honda-text-grid-items">
                    <span>Batch Name:</span>
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

export default Batch;
