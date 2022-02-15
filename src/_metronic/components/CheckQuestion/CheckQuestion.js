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

const CheckTest = ({ getNewCount, title }) => {
    const [filteredCourseName, setFilteredCourseName] = useState({});
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [countPerPage, setCountPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [dataViewMore, setDataViewMore] = useState({});
    const [userList, setUserList] = useState({});
    const [viewUserDataBatchId, setViewUserDataBatchId] = useState('');
    const [userIds, setUserId] = useState('');
    const [isViewMoreAboutus, setIsViewMoreAboutus] = useState(false);
    const [exampPeperSet, openExamPeperSet] = useState(false);
    const [checkPeperSet, openCheckExamPeperSet] = useState(false);
    const [status, setStatus] = useState('');
    const [questionData, setQuestionData] = useState({});
    const [paperSet, setPaperSet] = useState([]);

    const [isViewUsers, setViewUsers] = useState(false);


    const [attendenceId, setAttendenceId] = useState("");


    useEffect(() => {
        console.log("attendenceId", attendenceId);
    }, [attendenceId]);


    let userInfo = getUserInfo();
    useEffect(() => {
        document.title = "Honda | Check test";
    }, []);

    const handleViewMoreClose = () => {
        setIsViewMoreAboutus(false);
        setDataViewMore({});
    };
    const handleViewUserClose = () => {
        setViewUsers(false);
        setViewUserDataBatchId('');
    };
    const handlePeperSetClose = () => {
        openExamPeperSet(false);
        setUserId('')

    }
    const handleCheckPeperSetClose = () => {
        openCheckExamPeperSet(false);
        // openExamPeperSet(true)


    }

    const [getAllRole, setgetAllRole] = useState({});
    const getAllRoleData = () => {
        ApiGet("role").then((res) => {
            setgetAllRole(res.data.payload.allRole);
        });
    };
    const getAllBatchIdWiseUser = async () => {
        await ApiGet(
            `register/getRegisterByBatch/${viewUserDataBatchId}?isAttendence=true`
        )
            .then((res) => {
                console.log("res", res);
                setUserList(res?.data?.payload)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    useEffect(() => {
        console.log("viewUserDataBatchId", viewUserDataBatchId);
        if (viewUserDataBatchId) {
            getAllBatchIdWiseUser()
        }
    }, [viewUserDataBatchId])
    useEffect(() => {
        getAllCourseName();
        getAllRoleData();
    }, [page, countPerPage]);



    console.log("userInfo", userInfo);
    const getAllCourseName = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            const data = {
                Examiner: userInfo?.admin?._id,
            };
            console.log("userInfo?._id", userInfo?.admin?._id);
            await ApiGet(
                `batch/getBatchByDataEntry/${data?.Examiner}?page=${page}&limit=${countPerPage}`
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
                `batch/getBatchByDataEntry/${data?.Examiner}?page=${page}&limit=${countPerPage}&search=${search}`
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
            name: "Total User",
            selector: (row) => row?.totalUser,
            sortable: true,
        },

        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>


                        <>
                            <div>
                                <div
                                    className="btn btn-success mr-3" onClick={() => {
                                        setViewUsers(true);
                                        setViewUserDataBatchId(row?._id)
                                    }}>
                                    View Users
                                </div>
                            </div>
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

    const viewPeperSet = async (id, userId) => {
        openExamPeperSet(true)
        setUserId(userId)
        console.log("_id", userId);
        await ApiGet(`batch/getExamsetByBatch/${id}`)
            .then((res) => {
                console.log("res", res);
                res?.data?.payload?.Examset?.questionsList?.map((e, index) => {
                    e.Answer = [];
                    return e;
                });
                setQuestionData(res?.data?.payload?.Examset)
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });
    };


    const viewCheckPeperSet = (id) => {
        console.log("iddd", id);
        openCheckExamPeperSet(true)
        openExamPeperSet(false)
        getPapersetByUserId(id?._id)
    };


    const getPapersetByUserId = async (id) => {
        await ApiGet(`response/getResponseByUser/${id}`)
            .then((res) => {
                console.log("resrtrssdf", res?.data?.payload?.Response[0]);
                setPaperSet(res?.data?.payload?.Response[0]);
            })
            .catch((err) => {
                toast.error(err?.message);
                console.log(err?.message);
            });
    };

    const reCheckPeper = async (id) => {

        const data = {
            "status": "pending"
        }
        await ApiPut(`response/editRequestResponseById/${id}`, data)
            .then((res) => {
                console.log("res", res);
                setStatus(res?.data?.payload?.Response?.status)
                getAllBatchIdWiseUser()
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
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


    const createUser = (data) => {
        console.log("data", data);
        let checkData = [];
        questionData?.questionsList.map((e) => {
            e.Option.map((o) => {
                delete o._id;
                return o;
            });
            let a = {
                Qname: e?.Qname,
                Option: e.Option,
                Answer: e.Answer,
                type: e.type,
            };
            checkData.push(a);
        });
        let ans1 = [];
        questionData?.questionsList?.map((ans) => {
            console.log("ans", ans);
            if (!ans.Answer.length) {
                ans1.push(ans.Answer);
            } else {
            }
        });
        if (ans1.length) {
            toast.error("Please Select Answer");
        } else {
            const datas = {
                batch: data?.batchId,
                uid: userIds,
                Esid: data?._id,
                ListofQA: checkData,
            };
            ApiPost(`response/addResponse`, datas)
                .then((res) => {
                    console.log("res", res);
                    toast.success(res?.data?.message)
                    getAllBatchIdWiseUser()
                    setTimeout(() => {
                        openExamPeperSet(false);
                    }, 100);

                })
                .catch((err) => {

                    toast.error(err?.response?.data?.message);
                });
        }
    }

    const handleQuestion = (data, record, index) => {
        if (record.type === "mcq") {
            let index1 = record.Answer.findIndex((e) => e === index + 1);
            if (index1 === -1) {
                record.Answer = [index + 1];
            } else {
                record.Answer.splice(index1, 1);
            }
        } else if (record.type === "checkbox") {
            let index1 = record.Answer.findIndex((e) => e === index + 1);
            if (index1 === -1) {
                record.Answer.push(index + 1);
            } else {
                record.Answer.splice(index1, 1);
            }
        }

        let index2 = questionData?.questionsList.findIndex((e) => e._id === record._id);
        console.log("===================", index, index2, questionData.questionsList);
        if (index2 != -1) {
            questionData.questionsList[index2] = record;
        }
        setQuestionData(questionData);
    };



    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Check Test</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Check Test"
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


            {exampPeperSet ? (
                <Dialog
                    fullScreen
                    open={exampPeperSet}
                    onClose={handlePeperSetClose}
                    TransitionComponent={Transition}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handlePeperSetClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <List>
                        {exampPeperSet === true ? (
                            <div className="honda-container">
                                <div className="">

                                    {
                                        console.log("questionData", questionData?.questionsList)
                                    }
                                    <div className="questionGrid">
                                        {
                                            questionData?.questionsList?.map((data, key) => (
                                                <div className="questionGridItems">
                                                    <div className="flexs">
                                                        <div className="questionCircle mr-3" key={key}> {key + 1}</div>

                                                        {data?.Qname}
                                                    </div>
                                                    <div >
                                                        {data?.Option.map((record, i) => (
                                                            <>
                                                                {data.type === "mcq" ? (
                                                                    <>
                                                                        <div
                                                                            className="d-flex align-items-baseline"
                                                                            key={i}
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={key}
                                                                                id="radio"
                                                                                defaultChecked={data.istrue}
                                                                                onChange={(e) =>
                                                                                    handleQuestion(e, data, i)
                                                                                }
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
                                                                            <input
                                                                                type="checkbox"
                                                                                id={record?.name}
                                                                                onChange={(e) =>
                                                                                    handleQuestion(e, data, i)
                                                                                }
                                                                            />

                                                                            <span className="pl-2">
                                                                                {" "}
                                                                                {record?.name}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button className="btn btn-success mt-5" onClick={() => createUser(questionData)}>Add Data</button>

                                </div>
                            </div>
                        ) : null}
                    </List>
                </Dialog>
            ) : null}


            {checkPeperSet ? (
                <Dialog
                    fullScreen
                    open={checkPeperSet}
                    onClose={handleCheckPeperSetClose}
                    TransitionComponent={Transition}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCheckPeperSetClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <List>
                        {checkPeperSet === true ? (
                            <div className="honda-container">
                                <div className="">

                                    {
                                        console.log("peperset", paperSet)
                                    }
                                    Score:{paperSet?.Score}
                                    <div className="questionGrid">
                                        {
                                            paperSet?.ListofQA?.map((data, key) => (
                                                <div className="questionGridItems">
                                                    <div className="flexs">
                                                        <div className="questionCircle mr-3" key={key}> {key + 1}</div>

                                                        {data?.Qname}
                                                    </div>
                                                    <div >
                                                        {data?.Option.map((record, i) => (
                                                            <>
                                                                {data.type === "mcq" ? (
                                                                    <>
                                                                        <div
                                                                            className="d-flex align-items-baseline"
                                                                            key={i}
                                                                        >
                                                                            <input
                                                                                type="radio"
                                                                                name={key}
                                                                                id={record?.name + i}
                                                                                defaultChecked={data.Answer?.length ? data.Answer[0] === Number(i) + 1 ? true : false : false}
                                                                                onChange={(e) =>
                                                                                    handleQuestion(e, data, i)
                                                                                }
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
                                                                            <input
                                                                                type="checkbox"
                                                                                id={record?.name}
                                                                                onChange={(e) =>
                                                                                    handleQuestion(e, data, i)
                                                                                }
                                                                                defaultChecked={data.Answer?.length ? data.Answer.find(e => e === Number(i) + 1) ? true : false : false}
                                                                            />

                                                                            <span className="pl-2">
                                                                                {" "}
                                                                                {record?.name}
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button className="btn btn-success mt-5" onClick={() => createUser(questionData)}>Update Paper</button>

                                </div>
                            </div>
                        ) : null}
                    </List>
                </Dialog>
            ) : null}


            {isViewUsers ? (
                <Dialog
                    fullScreen
                    open={isViewUsers}
                    onClose={handleViewUserClose}
                    TransitionComponent={Transition}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleViewUserClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <List>
                        {isViewUsers === true ? (
                            <div className="honda-container">
                                <div className="honda-text-grid">
                                    {
                                        userList?.users?.map((data, key) => (

                                            <div className="card p-5" key={key}>
                                                <div>{data?.phone}</div>
                                                <div className="">First Name:{data?.fname ? data?.fname : '-'}</div>
                                                <div className="">Last Name:{data?.lname ? data?.lname : '-'}</div>
                                                <div className="">Middle Name:{data?.mname ? data?.mname : '-'}</div>
                                                <div className="">Email:{data?.email ? data?.email : '-'}</div>
                                                <div className="">Total Score:{data?.totalScore ? data?.totalScore : 0}</div>
                                                {data?.totalScore ? "" : <div className="view btn btn-success mt-5" onClick={() => viewPeperSet(data?.batchId, data?._id)}>Check Paper</div>}
                                                {data?.status === 'noRequest' && data?.isPaperDone ? <div className="view btn btn-success mt-5" onClick={() => reCheckPeper(data?._id)}>Re-Check Paper</div> : ''}
                                                {data?.status === 'pending' && <div className="view btn btn-success mt-5 disabled" >Requested</div>}
                                                {data?.status === 'approved' && <div className="view btn btn-success mt-5 " onClick={() => viewCheckPeperSet(data)}>Edit Paper</div>}
                                                {data?.status === 'rejected' && <div className="view btn btn-success mt-5 disabled" >Request Rejected</div>}
                                            </div>
                                        ))
                                    }
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
                                            {<div>{moment(dataViewMore?.createdAt).format("ll")}</div>}
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
                                        <span>Available Seat:</span>
                                        {<div>{dataViewMore?.total}</div>}
                                    </div>
                                    <div className="honda-text-grid-items">
                                        <span>Total User:</span>
                                        {<div>{dataViewMore?.totalUser}</div>}
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

export default CheckTest;
