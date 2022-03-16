/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import produce from "immer";

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
import Logo from "./honda.png";

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
import ReactToPrint from "react-to-print";
import { MultiSelect } from "react-multi-select-component";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ComponentToPrintss extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    if (this.props?.id) {
      ApiGet(
        `batch/getExamsetByBatch/${this.props?.id}`
      )
        .then((res) => {
          this.setState(res?.data?.payload);
        })
        .catch((err) => { });
      this.setState({ ...this.props });
    }
  }

  render() {


    return (
      <>
        <div class="invoice-box">
          {
            this.state?.Examset?.questionsList?.map((data, key) => (
              <div key={key} style={{ padding: "10px 0 20px 0" }}>
                <h2>Question{key + 1}:{data?.Qname}</h2>
                <div style={{ padding: "10px 0 0px 0" }}>
                  <img src={this.state.Examset[key]?.image ? this.state.Examset[key]?.image : ''} className="img-fluid" style={{ height: "200px" }} alt="" />
                </div>
                <div>
                  {data?.Option.map((data, key) => {
                    return (
                      <div className="d-flex  mx-3 mb-4 ques-text-design-style" style={{ padding: "20px 0 0 0" }}>
                        <div className="mr-2" style={{ fontSize: "20px" }}>
                          <b>Option{[key + 1]}:</b>
                        </div>
                        <div style={{ fontSize: "20px" }}>{data?.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

class ComponentToPrintsForUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    return (
      <>
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>
                        A joint venture of Transport Department, <br />{" "}
                        Government of Haryana & Honda IDTR
                      </p>
                    </td>
                    <td class="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created:{" "}
                      {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>First Name: {`${this?.props?.data?.fname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Middle Name: {`${this?.props?.data?.mname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Last Name: {`${this?.props?.data?.lname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Email: {`${this?.props?.data?.email} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Phone:{" "}
                  {`${this?.props?.data?.phone
                    ? this?.props?.data?.phone
                    : "No Data"
                    } `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Gender: {`${this?.props?.data?.gender} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Address: {`${this?.props?.data?.address} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>City: {`${this?.props?.data?.city} `} </td>
              </td>
            </tr>
            <tr>
              <td>
                Created: {moment(this?.props?.data?.DoB).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Address: {`${this?.props?.data?.address} `} </td>
              </td>
            </tr>
            <tr>
              <td>
                Date of course:{" "}
                {moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr>
              <td>
                Pass?:{" "}
                {moment(this?.props?.data?.isPass ? "Pass" : "Fail").format(
                  "DD-MM-YYYY "
                )}
              </td>
            </tr>
            <tr>
              <td>
                LCID: {moment(this?.props?.data?.lcid).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Percentage: {`${this?.props?.data?.percentage} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>TotalScore: {`${this?.props?.data?.totalScore} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Status: {`${this?.props?.data?.status} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Type: {`${this?.props?.data?.type} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Authoritydistrict:{" "}
                  {`${this?.props?.data?.authoritydistrict} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Authoritycity: {`${this?.props?.data?.authoritycity} `}{" "}
                </td>
              </td>
            </tr>

            {/* <tr className="">
              <td>
                <td>Examiner Phone: {`${this.props?.data?.Examiner?.phone} `} </td>
              </td>
            </tr> */}

            {/* <tr class="heading">
              <td>Payment Method</td>
            </tr> */}

            {/* <tr class="details">
              <td>{this.props?.data?.type}</td>
            </tr> */}

            {/* <tr class="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>
            </tr>

            <tr class="item">
              <td>{this.props?.data?.courseName[0]?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr> */}
          </table>
        </div>
      </>
    );
  }
}
const TakeTest = ({ getNewCount, title }) => {
  const queRef = useRef([]);
  const itemsRefForUser = useRef([]);
  const [filteredCourseName, setFilteredCourseName] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddCourseName, setIsAddCourseName] = useState(false);
  const [userByAttendece, setUserByAttendece] = useState([]);

  const [isAddAttedence, setIsAddAttedence] = useState(false);
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [filteredVehicleCategory, setFilteredVehicleCategory] = useState([]);

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
  const [idForgetResponseByBatch, setIdForgetResponseByBatch] = useState();
  const [isViewMoreAnnouncement, setIsViewMoreAnnouncement] = useState(false);

  const [allDataForResultDownload, setAllDataForResultDownload] = useState([]);
  const [allDataForAttendance, setAllDataForAttendance] = useState([]);
  const [dataCSVResults, setDataCSVResults] = useState([]);
  const [dataCSVForAttendance, setDataCSVForAttendance] = useState([]);
  const [attendenceId, setAttendenceId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [tdId, setTdId] = useState([]);
  const [countForBatch, setCountForBatch] = useState(0);
  const [pageForBatch, setPageForBatch] = useState(1);
  const [countPerPageForBatch, setCountPerPageForBatch] = useState(10);
  const [isPaperViewModel, setIsPaperViewModel] = useState(false);
  const [paperSet, setPaperSet] = useState([]);
  const [responseByBatch, setResponseByBatch] = useState([]);
  const [filteredVehicleSubCategory, setFilteredVehicleSubCategory] = useState();
  const [filteredCategoryByVehicleSubCategory, setFilteredCategoryByVehicleSubCategory] = useState();
  const [optionsForRecipe, setOptionsForRecipe] = useState([]);
  const [selectedIngredientsFinal, setSelectedIngredientsFinal] = useState([]);
  const [datanumber, setData] = useState([]);
  const [VSCID, setVscId] = useState();
  const [CTID, setCTID] = useState();
  const [CTIDDATA, setCtiddata] = useState();
  useEffect(() => {
    if (filteredCategoryByVehicleSubCategory?.length > 0) {
      let storeData = filteredCategoryByVehicleSubCategory.map((item) => {
        return {
          id: item?._id,
          no: null,
          name: item?.name
        }
      });
      setCTID(
        storeData.map((i) => {
          return i?.id
        })
      );

      setData(storeData)
      console.log("storeData", storeData);
    } else {
      setData([])
    }
  }, [filteredCategoryByVehicleSubCategory]);
  useEffect(() => {
    if (datanumber) {
      setCtiddata(
        datanumber?.map((ids) => {
          return {
            id: ids?.id,
            no: Number(ids?.no)
          }
        })
      )
    }
  }, [datanumber])
  const [questionKEY, setQuestionKEY] = useState(0);
  let userInfo = getUserInfo();
  useEffect(() => {
    document.title = "Honda | Take test";
  }, []);



  const handleViewMorePaper = () => {
    setIsPaperViewModel(false);
  };
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

  useEffect(() => {
    if (inputValueForAdd.vcid) {
      getAllVehicleSubCategory()
    }
  }, [inputValueForAdd.vcid])


  const getAllVehicleSubCategory = async () => {
    setIsLoaderVisible(true);

    await ApiGet(`vehicleSubCategory/getVehicleSubCategoryByVcid/${inputValueForAdd.vcid}`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredVehicleSubCategory(res?.data?.payload?.vehicleSubCategory);
        // setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  useEffect(() => {
    setOptionsForRecipe(filteredVehicleSubCategory?.length > 0 && filteredVehicleSubCategory?.map((item, index) => {
      return { label: item?.vehicleSubCategory, value: item?._id }
    }))
  }, [filteredVehicleSubCategory])

  useEffect(() => {
    if (selectedIngredientsFinal) {
      getCategoryByVehicleSubCategory()

    }
  }, [selectedIngredientsFinal])

  let SubIds = []
  const getCategoryByVehicleSubCategory = async () => {
    selectedIngredientsFinal?.length > 0 && selectedIngredientsFinal.map((item, index) => {
      return SubIds.push(item?.value)
    })
    let Data = {
      vcid: inputValueForAdd.vcid,
      vscid: SubIds
    }
    setVscId(SubIds)
    await ApiPost(`category/getCategoryByVscid`, Data)
      .then((res) => {
        setFilteredCategoryByVehicleSubCategory(res?.data?.payload?.category);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
  };

  const getPapersetByUserId = async (id) => {
    await ApiGet(`response/getResponseByUser/${id}`)
      .then((res) => {
        setPaperSet(res?.data?.payload?.Response[0]);
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };




  //getResponseByBatch


  const getResponseByBatchs = async (id) => {
    await ApiGet(
      `register/getRegisterByBatch/${id}?page=${pageForBatch}&limit=${countPerPageForBatch}`
    )
      .then((res) => {
        setResponseByBatch(res?.data?.payload?.users);
        setCountForBatch(res?.data?.payload?.count);
      })
      .catch((err) => {
        // toast.error(err?.message);
      });
  };
  const getAllResponseByBatch = async (id) => {
    await ApiGet(`response/getResponseByUserWithoutPagination/${id}`)
      .then((res) => {
        setAllDataForResultDownload(res?.data?.payload?.findResponse);

      })
      .catch((err) => {
      });
  };
  const handleViewMoreClose = () => {
    setIsViewMoreAboutus(false);
    setResponseByBatch([]);
    setIsViewMoreAnnouncement(false);
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
        setQuestionData(res?.data?.payload?.Examset?.questionsList);
        setSuucessBatchId(res?.data?.payload?.Examset?.batchId);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const showToast = async () => {



    toast.error("There is no user in this batch");

  };

  const getAllCourseName = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      const data = {
        Examiner: userInfo?.admin?._id,
      };

      await ApiGet(
        `batch/getBatchByExaminer/${data?.Examiner}?page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
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
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("ll")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
      // width: "65px",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },

    {
      name: "Available Seat",
      selector: (row) => row?.total,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.totalUser === "" || !row?.totalUser ? "-" : row?.totalUser,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            {row?.isAttendanceTake && !row?.isExamGenerate && (
              <div className="d-flex  justify-content-between">
                <div
                  className="cursor-pointer pl-2"
                  onClick={() => {
                    setIsAddCourseName(true);
                    setBatchId(row?._id);
                    setTdId(row?.tdid);
                    getAllVehicleCategory()
                    // setDataViewMore(row);
                  }}
                >
                  <button className="btn btn-success">Start Test</button>
                </div>
              </div>
            )}

            {row?.isExamGenerate && !row?.complete ? (
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
                    row?.User.length === 0 ? showToast() :

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
                  setIdForgetResponseByBatch(row?._id);
                  setDataViewMore(row);
                  getAllResponseByBatch(row?._id);
                  getAllResponseByBatchForUser(row?._id);
                  getResponseByBatchs(row?._id)
                }}
              >
                <Tooltip title="Show More" arrow>
                  <InfoOutlinedIcon />
                </Tooltip>
              </div>
              <div className="cursor-pointer pl-2">
                <ReactToPrint
                  trigger={() => (
                    <Tooltip title="Generate Question PDF" arrow>
                      <img src="media/allIconsForTable/invoice.png" />
                    </Tooltip>
                  )}
                  content={() => queRef.current[row._id]}
                />
                <div style={{ display: "none" }}>
                  <div
                    ref={(el) => (queRef.current[row._id] = el)}
                    id={row?._id}
                  >
                    <ComponentToPrintss id={row?._id} />
                  </div>
                </div>
              </div>
            </>
          </>
        );
      },
    },
  ];
  const columnsUser = [
    {
      name: "SNo",
      cell: (row, index) =>
        (pageForBatch - 1) * countPerPageForBatch + (index + 1),
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
              {row?.isPaperDone && (
                <div
                  className="cursor-pointer pl-2"
                  onClick={() => {
                    setIsViewMoreAnnouncement(true)
                    setIsPaperViewModel(true);
                    getPapersetByUserId(row?._id);

                  }}
                >
                  <div className="cus-medium-button-style">
                    <button className="btn btn-success mr-2">
                      View Paperset
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="cursor-pointer pl-2">
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Generate Pdf" arrow>
                    <img src="media/allIconsForTable/invoice.png" />
                  </Tooltip>
                )}
                content={() => itemsRefForUser.current[row._id]}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={(el) => (itemsRefForUser.current[row._id] = el)}
                  id={row?._id}
                >
                  <ComponentToPrintsForUser data={row} />
                </div>
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
  const ABC = ["Option 1", "Option 2", "Option 3", "Option 4"];
  useEffect(() => {
    getAllCourseNameForExcel();
  }, []);

  const getAllCourseNameForExcel = async () => {
    // if (!search) {
    await ApiGet(`examiner/getAll`)
      .then((res) => {
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
        if (res?.status == 200) {
          setSelectedTopSubjects([]);
          setIsAddAttedence(false);
          getAllCourseName();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
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
  }, [allCourseNameExcel]);

  const handleSubjectSelect = (data, id, e) => {
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
    if (inputValueForAdd && !inputValueForAdd.vcid) {
      formIsValid = false;
      errorsForAdd["vcid"] = "*Please Enter Vehical Category!";
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
        vcid: inputValueForAdd.vcid,
        vscid: VSCID,
        ctid: CTID,
        ctidData: CTIDDATA

      };
     
      let tempNumber = datanumber.map((i) => {
        return Number(i.no)
      })
      const reducer = (accumulator, curr) => accumulator + curr;
      if (inputValueForAdd?.no == tempNumber.reduce(reducer)) {
        alert("Okay")
        
      } else {
        
        setData([])
        alert("Please add more category")

      }
      console.log(tempNumber.reduce(reducer));
      console.log("temp", tempNumber);
      // await ApiPost(`question/getgenerateQuestion`, data)
      //   .then((res) => {
      //     if (res?.status == 200) {
      //       console.log("attdence", res?.data?.payload);
      //       setSelectedTopSubjects([]);
      //       setIsAddAttedence(false);
      //       setInputValueForAdd({});
      //       setIsAddCourseName(false);
      //       setErrorsForAdd({});
      //       getAllCourseName();
      //     } else {
      //       toast.error(res?.message);
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(err?.response?.data?.message);
      //   });
    }
  };

  const CompleteBatchById = async () => {
    await ApiPut(`batch/CompleteBatchById/${successBatchId}`)
      .then((res) => {
        if (res?.status == 200) {
          toast.success(res?.data?.message);
          setIsAddQuestion(false);
          getAllCourseName()
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  const getAllResponseByBatchForUser = async (id) => {
    await ApiGet(`response/getResponseByBatch/${id}`)
      .then((res) => {
        setAllDataForAttendance(res?.data?.payload?.findResponse);
      })
      .catch((err) => {
      });
  };
  useEffect(() => {
    if (allDataForAttendance) {
      allDataForAttendance.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id,
          FirstName: registerUser?.uid?.fname,
          LastName: registerUser?.uid?.lname,
          EmailAddress: registerUser?.uid?.email,
          MobileNumber: registerUser?.uid?.phone,
          CourseType: registerUser?.uid?.cnid?.ccid?.ctid?.courseType,
          VehicleCategory:
            registerUser?.uid?.cnid?.ccid?.ctid?.vcid?.vehicleCategory,
          CourseName: registerUser?.uid?.cnid?.courseName,
          DateOfCourse: moment(registerUser?.uid?.dateofCourse).format("ll"),
          LicenseCategory: registerUser?.uid?.lcid,
          DriveringLicenseNo: registerUser?.uid?.drivingLicenseNumber
            ? registerUser?.uid?.drivingLicenseNumber
            : "-",
          CalendarSlotSelected: moment(registerUser?.uid?.tdid?.date).format(
            "ll"
          ),
          TestLanguage: registerUser?.Esid?.language,
          TotalQuestions: registerUser?.Esid?.no,
          QuestionsAnsweredCorrectly: registerUser?.uid?.totalScore,
          QuestionsAnsweredIncorrectly:
            registerUser?.Esid?.no - registerUser?.uid?.totalScore,
          Status: "-",
          DataEntryUser: registerUser?.batch?.DataEntry?.name,
          DataEntryUserID: registerUser?.batch?.Examiner?.name,
        };
        setDataCSVForAttendance((currVal) => [...currVal, data]);
      });
    }
  }, [allDataForAttendance]);
  useEffect(() => {
    if (allDataForResultDownload) {
      allDataForResultDownload.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id,
          FirstName: registerUser?.uid?.fname,
          LastName: registerUser?.uid?.lname,
          EmailAddress: registerUser?.uid?.email,
          MobileNumber: registerUser?.uid?.phone,
          CourseType: registerUser?.uid?.cnid?.ccid?.ctid?.courseType,
          VehicleCategory:
            registerUser?.uid?.cnid?.ccid?.ctid?.vcid?.vehicleCategory,
          CourseName: registerUser?.uid?.cnid?.courseName,
          DateOfCourse: moment(registerUser?.uid?.dateofCourse).format("ll"),
          LicenseCategory: registerUser?.uid?.lcid,
          DriveringLicenseNo: registerUser?.uid?.drivingLicenseNumber
            ? registerUser?.uid?.drivingLicenseNumber
            : "-",
          CalendarSlotSelected: moment(registerUser?.uid?.tdid?.date).format(
            "ll"
          ),
          TestLanguage: registerUser?.Esid?.language,
          TotalQuestions: registerUser?.Esid?.no,
          QuestionsAnsweredCorrectly: registerUser?.uid?.totalScore,
          QuestionsAnsweredIncorrectly:
            registerUser?.Esid?.no - registerUser?.uid?.totalScore,
          Status: "-",
          DataEntryUser: registerUser?.batch?.DataEntry?.name,
          DataEntryUserID: registerUser?.batch?.Examiner?.name,
        };
        setDataCSVResults((currVal) => [...currVal, data]);
      });
    }
  }, [allDataForResultDownload]);

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
                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Vehicle Category
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      <div>
                        <select
                          className={`form-control form-control-lg form-control-solid `}
                          id="vcid"
                          name="vcid"
                          value={inputValueForAdd.vcid}
                          onChange={(e) => {
                            handleOnChnageAdd(e);
                          }}
                        >
                          <option value="" disabled selected hidden>
                            Select Vehicle Category Type

                          </option>
                          {filteredVehicleCategory?.length > 0 &&
                            filteredVehicleCategory?.map((item) => {
                              return (
                                <option
                                  key={item?._id}
                                  value={item?._id}
                                  selected={
                                    inputValueForAdd?.vcid === item?._id
                                      ? true
                                      : false
                                  }
                                >
                                  {" "}
                                  {item?.vehicleCategory}{" "}
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
                        {errorsForAdd["vcid"]}
                      </span>
                    </div>
                  </div>



                  <div className="form-group row">
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Vehicle Sub-Category
                    </label>
                    <div className="col-lg-9 col-xl-6">
                      {filteredVehicleSubCategory?.length > 0 ?
                        <div>
                          <MultiSelect
                            options={optionsForRecipe}
                            value={selectedIngredientsFinal}
                            onChange={(selectedIngredientsFinal) => {
                              setSelectedIngredientsFinal(selectedIngredientsFinal)
                              setErrorsForAdd({ ...errorsForAdd, selectedIngredientsFinal: "" });
                            }}
                            labelledBy="name"
                          // isLoading={loaderIsRunning}
                          />
                        </div>
                        :
                        <div>
                          <input
                            value="no vehicle sub-category found"
                            disabled
                          />

                        </div>
                      }

                      <span
                        style={{
                          color: "red",
                          top: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {errorsForAdd["selectedIngredientsFinal"]}
                      </span>
                    </div>
                  </div>
                  {/* {
                    selectedIngredientsFinal.length > 0 && (
                      <div>
                      {
                        filteredCategoryByVehicleSubCategory.length > 0 && filteredCategoryByVehicleSubCategory.map((data,key)=>{
                          return(
  
                            <>
                            <div>{data?.name}</div>
                              </>
                          )
                        }) 
                      }
                    </div>)
                  } */}
                  {datanumber?.length > 0 &&
                    datanumber?.map((item, key) => {
                      return (
                        <>
                          <div className="d-flex" key={key}>
                            <div>{item?.name}</div>
                            <input value={item?.no}
                              onChange={(e) => {
                                setData((curVal) => {
                                  return produce(curVal, (data) => {

                                    data[key].no =
                                      e.target?.value || null;
                                  });
                                });
                              }}
                              type="text" maxLength={1} onKeyPress={(event) => {
                                if (!/[1-5]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }} />
                          </div>
                        </>
                      )
                    })
                  }


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
                  <div className="centerAlign">
                    <div className="take-test-height-qus">
                      <div className="d-flex ">
                        <h4 className="mr-3" style={{ fontSize: "30px" }}>Question {questionKEY + 1}</h4>
                        <h4 style={{ fontSize: "30px" }}>{questionData[questionKEY]?.Qname}</h4>
                      </div>
                      <div style={{ padding: "20px 0 0 0" }}>
                        <img src={questionData[questionKEY]?.image ? questionData[questionKEY]?.image : ''} className="img-fluid" style={{ height: "200px" }} alt="" />
                      </div>
                      <div>
                        <div className="mb-4">
                          {questionData[questionKEY]?.Option.map((data, key) => {
                            return (
                              <div className="d-flex  mx-3 mb-4 ques-text-design-style" style={{ padding: "20px 0 0 0" }}>
                                <div className="mr-2" style={{ fontSize: "20px" }}>
                                  <b>{ABC[key]}:</b>
                                </div>
                                <div style={{ fontSize: "20px" }}>{data?.name}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                    <div className="take-test-all-button-alignment">
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
                  <div className="take-test-box-center-alignment">
                    <div className="take-test-box">
                      <div className="other-information-child-text-style1">
                        <h2>Take Test</h2>
                      </div>


                      <table className="table table-bordered" >
                        <thead>
                          <tr>
                            <th>
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
                            </th>
                            <th >Email</th>
                            <th >Name</th>
                            <th >Phone</th>
                            <th >Course Name</th>

                          </tr>
                        </thead>
                        <tbody>
                          {userByAttendece?.length > 0 &&
                            userByAttendece?.map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>
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
                                  </td>
                                  <td>{data?.email ? data?.email : '-'}</td>
                                  <td>{data?.fname ? data?.fname : "-"}</td>
                                  <td>{data?.phone ? data?.phone : '-'}</td>
                                  <td>{data?.cnid?.courseName ? data?.cnid?.courseName : '-'}</td>

                                </tr>
                              );
                            })}
                        </tbody>
                      </table>


                      {/* {userByAttendece?.length > 0 &&
                        userByAttendece?.map((data, key) => {
                          return (
                            <>
                              <table className="table table-bordered" key={key}>
                                <thead>
                                  <tr>
                                    <th>
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
                                    </th>
                                    <th >Email</th>
                                    <th >Name</th>
                                    <th >Phone</th>
                                    <th >Course Name</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
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
                                    </td>
                                    <td>{data?.email ? data?.email : '-'}</td>
                                    <td>{data?.fname ? data?.fname : "-"}</td>
                                    <td>{data?.phone ? data?.phone : '-'}</td>
                                    <td>{data?.cnid?.courseName ? data?.cnid?.courseName : '-'}</td>

                                  </tr>

                                </tbody>
                              </table>

                            </>
                          );
                        })} */}


                      {selectedTopSubjects?.length > 0 && (
                        <div className="text-center mb-3">
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
                  <h2>Take Test</h2>
                </div>
                <div className="honda-text-grid12 honda-text-grid-border">
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
                  <div className="honda-text-grid-items">
                    <span>Available Seat</span>
                    {<div>{dataViewMore?.totalUser}</div>}
                  </div>
                </div>
                <div className="other-information-child-text-style1">
                  <h2>User Data</h2>
                </div>
                <div className="">
                  <div className="cursor-pointer pl-2">
                    {allDataForResultDownload?.length > 0 ? (
                      <CsvDownload
                        className={``}
                        data={dataCSVResults}
                        filename="User Test Data Report.csv"
                        style={{
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
                        Download Test Data
                      </CsvDownload>
                    ) : (
                      "No test Data"
                    )}

                    {allDataForAttendance?.length > 0 ? (
                      <CsvDownload
                        className={``}
                        data={dataCSVForAttendance}
                        filename="User Attendance Data Report.csv"
                        style={{
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
                        Download Attendance Data
                      </CsvDownload>
                    ) : (
                      "No Attendance Data"
                    )}
                  </div>
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
                <div className="">

                  <div className="questionGrid12121">
                    {paperSet?.ListofQA?.map((data, key) => (
                      <div className="questionGridItems">
                        <div className="flexs mb-1">
                          <div className="questionCircle mr-3" key={key}>
                            {" "}
                            {key + 1}
                          </div>
                          <p>{data?.Qname}</p>
                        </div>
                        <div>{

                          data?.image ? <img src={data?.image} alt="" /> : null}

                        </div>
                        <div className="">
                          Right / Wrong:{" "}
                          <span>
                            {data.isRight ? (
                              <div className="green">Right</div>
                            ) : (
                              <div className="red">Wrong</div>
                            )}
                          </span>
                        </div>
                        <div>
                          {data?.Option.map((record, i) => (
                            <>
                              {record?.istrue}

                              {data?.Answer?.findIndex(
                                (e) => e === record?.no
                              ) !== -1 ? (
                                <div className="">
                                  <b>{record?.name}</b>
                                </div>
                              ) : (
                                <div className="">{record?.name}</div>
                              )}

                              {/* {data.type === "mcq" ? (
                                <>
                                  <div
                                    className="d-flex align-items-baseline"
                                    key={i}
                                  >
                                    <input
                                      type="radio"
                                      name={key}
                                      id="radio"
                                      defaultChecked={record?.istrue}
                                      disabled
                                    />
                                    <span className="pl-2">
                                      {" "}
                                      {record?.name}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="d-flex align-items-baseline"
                                    key={i}
                                  >
                                    <input type="checkbox" id={record?.name} />

                                    <span className="pl-2">
                                      {" "}
                                      {record?.name}
                                    </span>
                                  </div>
                                </>
                              )} */}
                            </>
                          ))}
                        </div>
                      </div>
                    ))}
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
