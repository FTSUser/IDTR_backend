/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../helpers/API/ApiData";
import Select from "react-select";
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
import Multiselect from "multiselect-react-dropdown";
import { getUserInfo } from "../../../utils/user.util";
// import { getUserInfo } from "../../../../../utils/user.util";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TakeTest = ({ getNewCount, title }) => {
  const [filteredCourseName, setFilteredCourseName] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddCourseName, setIsAddCourseName] = useState(false);
  const [userByAttendece, setUserByAttendece] = useState([]);

  const [isAddAttedence, setIsAddAttedence] = useState(false);
  const [isAddQuestion, setIsAddQuestion] = useState(false);

  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreAboutus, setIsViewMoreAboutus] = useState(false);
  const [selectedTopSubjects, setSelectedTopSubjects] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [successBatchId, setSuucessBatchId] = useState("");

  const [attendenceId, setAttendenceId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [tdId, setTdId] = useState([]);

  useEffect(() => {
    console.log("attendenceId", attendenceId);
  }, [attendenceId]);

  const [questionKEY, setQuestionKEY] = useState(0);
  let userInfo = getUserInfo();
  useEffect(() => {
    document.title = "Honda | Take test";
  }, []);

  const handleViewMoreClose = () => {
    setIsViewMoreAboutus(false);
    setDataViewMore({});
  };

  const [getAllRole, setgetAllRole] = useState({});
  const getAllRoleData = () => {
    ApiGet("role").then((res) => {
      setgetAllRole(res.data.payload.allRole);
    });
  };
  const handleAddAdminClose = () => {
    setInputValueForAdd({});
    setIsAddCourseName(false);
    setErrorsForAdd({});
  };

  const handleAddAttedenc = () => {
    setIsAddAttedence(false);
    getAllCourseName();
    setSelectedTopSubjects([]);
  };

  const handelCloseQuestion = () => {
    setIsAddQuestion(false);
    setQuestionKEY(0);
  };

  useEffect(() => {
    getAllCourseName();
    getAllRoleData();
  }, [page, countPerPage]);

  const getAllUserIdWise = async (id) => {
    await ApiGet(`register/getRegisterByBatch/${id}`)
      .then((res) => {
        console.log("res", res);
        setUserByAttendece(res?.data?.payload?.users);
        setAttendenceId(id);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const viewPeperSet = async (id) => {
    await ApiGet(`batch/getExamsetByBatch/${id}`)
      .then((res) => {
        console.log("res", res);
        setQuestionData(res?.data?.payload?.Examset?.questionsList);
        setSuucessBatchId(res?.data?.payload?.Examset?.batchId);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  console.log("userInfo", userInfo);
  const getAllCourseName = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      const data = {
        Examiner: userInfo?.admin?._id,
      };
      console.log("userInfo?._id", userInfo?.admin?._id);
      await ApiGet(
        `batch/getBatchByExaminer/${data?.Examiner}?page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          console.log("res", res);
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredCourseName(res?.data?.payload?.Batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        Examiner: userInfo?.admin?._id,
      };
      await ApiGet(
        `batch/getBatchByExaminer/${data?.Examiner}?page=${page}&limit=${countPerPage}&search=${search}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredCourseName(res?.data?.payload?.Batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
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
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },

    {
      name: "Seat",
      selector: (row) => row?.total,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.totalUser === "" || !row?.totalUser  ? "-" : row?.totalUser,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            {row?.isAttendanceTake && !row?.isExamGenerate && (
              <div className="d-flex justify-content-between">
                <div
                  className="cursor-pointer pl-2"
                  onClick={() => {
                    setIsAddCourseName(true);
                    setBatchId(row?._id);
                    setTdId(row?.tdid);
                    // setDataViewMore(row);
                  }}
                >
                  <button className="btn btn-success">Start Test</button>
                </div>
              </div>
            )}

            {row?.isExamGenerate ? (
              <div>
                <div
                  className="btn btn-success ml-2"
                  onClick={() => {
                    setIsAddQuestion(true);
                    viewPeperSet(row?._id);
                  }}
                >
                  View Peper Set
                </div>
              </div>
            ) : (
              ""
            )}
            {row?.isAttendanceTake ? (
              ""
            ) : (
              <div className="d-flex justify-content-between">
                <div
                  className="cursor-pointer pl-2"
                  onClick={() => {
                    setIsAddAttedence(true);
                    getAllUserIdWise(row?._id);
                  }}
                >
                  <button className="btn btn-success">Attendance</button>
                </div>
              </div>
            )}

            <>
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsViewMoreAboutus(true);
                  setDataViewMore(row);
                  console.log("rowShow", row);
                  console.log("isViewMoreAboutus", isViewMoreAboutus);
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
  const ABC = ["A", "B", "C", "D"];
  useEffect(() => {
    getAllCourseNameForExcel();
  }, []);

  const getAllCourseNameForExcel = async () => {
    // if (!search) {
    await ApiGet(`examiner/getAll`)
      .then((res) => {
        console.log("regist", res?.data?.payload?.Examiner);
        setAllCourseNameExcel(res?.data?.payload?.Examiner);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  const addUserAttedence = async () => {
    const data = {
      uids: selectedTopSubjects,
      batch: attendenceId,
    };
    await ApiPut(`test/attendence`, data)
      .then((res) => {
        console.log("attdence", res?.data?.payload);
        setSelectedTopSubjects([]);
        setIsAddAttedence(false);
        getAllCourseName();

        // setAllCourseNameExcel(res?.data?.payload?.Examiner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (allCourseNameExcel) {
      allCourseNameExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          CreatedAt: moment(registerUser?.createdAt).format("ll"),
          MenuName: registerUser?.name,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
    console.log("UsertCsvReport", allCourseNameExcel);
  }, [allCourseNameExcel]);

  const handleSubjectSelect = (data, id, e) => {
    console.log("eeeee", e?.target?.name);
    if (e?.target?.name === "selectall") {
      let newArr = [];
      if (selectedTopSubjects.length === data.length) {
        setSelectedTopSubjects([]);
      } else {
        console.log("in else");

        let newArr = [];
        data &&
          data?.map((res, key) => {
            return newArr.push(res?._id);
          });
        setSelectedTopSubjects(newArr);
      }
    } else {
      if (selectedTopSubjects?.find((ss) => ss === data?._id)) {
        setSelectedTopSubjects((curVal) =>
          curVal.filter((cv) => cv !== data?._id)
        );
      } else {
        setSelectedTopSubjects((curVal) => [...curVal, data?._id]);
      }
    }
  };

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };
  useEffect(() => {
    console.log("inputValueForAdd", inputValueForAdd);
  }, [inputValueForAdd]);

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};

    if (inputValueForAdd && !inputValueForAdd.type) {
      formIsValid = false;
      errorsForAdd["type"] = "*Please Enter type!";
    }
    if (inputValueForAdd && !inputValueForAdd.no) {
      formIsValid = false;
      errorsForAdd["no"] = "*Please Enter no!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };
  const generatePeperSet = async () => {
    if (validateFormForAddAdmin()) {
      const data = {
        tdid: tdId,
        batch: batchId,
        no: inputValueForAdd.no,
        type: inputValueForAdd.type,
      };
      await ApiPost(`question/getgenerateQuestion`, data)
        .then((res) => {
          if (res?.status == 200) {
            console.log("attdence", res?.data?.payload);
            setSelectedTopSubjects([]);
            setIsAddAttedence(false);
            setInputValueForAdd({});
            setIsAddCourseName(false);
            setErrorsForAdd({});
            getAllCourseName();
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const CompleteBatchById = async () => {
    console.log("BatchId", successBatchId);
    await ApiPut(`batch/CompleteBatchById/${successBatchId}`)
      .then((res) => {
        if (res?.status == 200) {
          toast.success(res?.data?.message);
          setIsAddQuestion(false);
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Take Test</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Take Test"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            {/* <div className="cus-medium-button-style button-height">
                            <button
                                onClick={() => {
                                    setIsAddCourseName(true);
                                }}
                                className="btn btn-success mr-2"
                            >
                                Add Menu
                            </button>
                        </div> */}
            {/* <div className="cus-medium-button-style button-height">
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
                        </div> */}
          </div>

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
              <div>
                <div className="container">
                  <h2>Hello</h2>
                  <div className="form-group">
                    <select
                      className={`form-control form-control-lg form-control-solid`}
                      name="type"
                      value={inputValueForAdd.type}
                      onChange={(e) => {
                        handleOnChnageAdd(e);
                      }}
                    >
                      <option>Select Languagae...</option>
                      <option
                        value="english"
                        selected={
                          inputValueForAdd?.type === "english" ? true : false
                        }
                      >
                        English{" "}
                      </option>
                      <option
                        value="hindi"
                        selected={
                          inputValueForAdd?.type === "hindi" ? true : false
                        }
                      >
                        Hindi
                      </option>
                    </select>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["type"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <select
                      className={`form-control form-control-lg form-control-solid`}
                      name="no"
                      value={inputValueForAdd.no}
                      onChange={(e) => {
                        handleOnChnageAdd(e);
                      }}
                    >
                      <option>Select Number Of Question...</option>
                      <option
                        value="20"
                        selected={inputValueForAdd?.no === "20" ? true : false}
                      >
                        20{" "}
                      </option>
                      <option
                        value="40"
                        selected={inputValueForAdd?.no === "40" ? true : false}
                      >
                        40
                      </option>
                    </select>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["no"]}
                    </span>
                  </div>

                  <div>
                    <div
                      className="btn btn-success"
                      onClick={() => generatePeperSet()}
                    >
                      Generate Question{" "}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
      {isAddQuestion ? (
        <Dialog
          fullScreen
          open={isAddQuestion}
          onClose={handelCloseQuestion}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handelCloseQuestion}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isAddQuestion === true ? (
              <div>
                <div className="container">
                  <div className="d-flex">
                    <h4 className="mr-3">Question {questionKEY + 1}</h4>

                    <h4>{questionData[questionKEY]?.Qname}</h4>
                  </div>
                  <div>
                    <div className="mb-4">
                      {questionData[questionKEY]?.Option.map((data, key) => {
                        return (
                          <div className="d-flex mx-3 mb-4">
                            <div className="mr-2">
                              <b>({ABC[key]})</b>
                            </div>
                            <div>{data?.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    {questionKEY === 0 ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-success m-1"
                        onClick={() => {
                          setQuestionKEY(questionKEY - 1);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    {questionKEY === questionData?.length - 1 ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setQuestionKEY(questionKEY + 1);
                        }}
                      >
                        Next
                      </button>
                    )}
                    {questionKEY === questionData?.length - 1 ? (
                      <>
                        <div
                          className="success btn btn-success"
                          onClick={() => CompleteBatchById()}
                        >
                          Success
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
      {isAddAttedence ? (
        <Dialog
          fullScreen
          open={isAddAttedence}
          onClose={handleAddAttedenc}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleAddAttedenc}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isAddAttedence === true ? (
              <div>
                <div className="container">
                  <div className="">
                    <div className="d-flex">
                      <div className="mr-3">
                        <input
                          type="checkbox"
                          name="selectall"
                          onChange={(e) =>
                            handleSubjectSelect(userByAttendece, "id", e)
                          }
                          checked={
                            selectedTopSubjects?.length ===
                            userByAttendece.length
                              ? true
                              : false
                          }
                        />
                      </div>
                      <div>
                        <div>Select All</div>
                      </div>
                    </div>

                    {userByAttendece?.length > 0 &&
                      userByAttendece?.map((data, key) => {
                        return (
                          <>
                            <div className="d-flex " key={key}>
                              <div className="mr-3">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedTopSubjects?.find(
                                      (ss) => ss === data?._id
                                    )
                                      ? true
                                      : false
                                  }
                                  // onChange={(e) => addAttendence(e)} />
                                  onChange={() =>
                                    handleSubjectSelect(data, data?._id, "e")
                                  }
                                />
                              </div>
                              <div className="">
                                <div>
                                  {data?.email} {data?.fname} {data?.phone}
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>

                  {selectedTopSubjects?.length > 0 && (
                    <div className="">
                      <div
                        className="btn btn-success"
                        onClick={() => addUserAttedence()}
                      >
                        Add Attedence
                      </div>
                    </div>
                  )}
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
                <div className="honda-text-grid">
                  <div className="honda-text-grid-items">
                    <div className="honda-text-grid-items">
                      <span>CreatedAt:</span>
                      {
                        <div>
                          {moment(dataViewMore?.createdAt).format("ll")}
                        </div>
                      }
                    </div>
                    <span>Batch Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.name,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Total Seat:</span>
                    {<div>{dataViewMore?.total}</div>}
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

export default TakeTest;
