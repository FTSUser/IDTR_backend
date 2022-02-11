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
import { NavLink, useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionSet = ({ getNewCount, title }) => {
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
        document.title = "Honda | Examiner";
    }, []);

    const handleViewMoreClose = () => {
        setIsViewMoreAboutus(false);
        setDataViewMore({});
    };
    const history = useHistory();
    const handleOnChnageAdd = (e) => {
        const { name, value } = e.target;
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
        getAllQuestionSet();
    }, [page, countPerPage]);




    const getAllQuestionSet = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(
                `questionset/getAllQuestionSet?page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.QuestionSet);
                    setCount(res?.data?.payload?.count);
                    setGetCourseType([]);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        } else {
            await ApiGet(
                `questionset/getAllQuestionSet?search=${search}&page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.QuestionSet);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        }
    };

    ;

    const validateFormForAddAdmin = () => {
        let formIsValid = true;
        let errorsForAdd = {};
        if (inputValueForAdd && !inputValueForAdd.name) {
            formIsValid = false;
            errorsForAdd["name"] = "*Please Enter Name!";
        }

        if (inputValueForAdd && !inputValueForAdd.description) {
            formIsValid = false;
            errorsForAdd["description"] = "*Please Enter description!";
        }
        if (inputValueForAdd && !inputValueForAdd.language) {
            formIsValid = false;
            errorsForAdd["language"] = "*Please Enter language!";
        }

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseNameDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let Data = {
                name: inputValueForAdd.name,
                description: inputValueForAdd.description,
                language: inputValueForAdd.language,


            };
            ApiPost(`questionset/addQuestionSet`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllQuestionSet();
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
        ApiDelete(`questionset/deleteQuestionSet/${idForDeleteCourseName}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShow(false);
                    toast.success("Deleted Successfully");
                    getAllQuestionSet();
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
                name: inputValueForAdd.name,
                description: inputValueForAdd.description,
                language: inputValueForAdd.language,
            };
            ApiPut(`questionset/updateQuestionSet/${idForUpdateCourseNameData}`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllQuestionSet();
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
            name: "Name",
            selector: "name",
            sortable: true,
        },

        {
            name: "Description",
            selector: "description",
            sortable: true,
        },

        {
            name: "Language",
            selector: "language",
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
                                    setInputValueForAdd({
                                        name: row?.name,
                                        description: row?.description,
                                        language: row?.language,
                                    });
                                    setIsEditPopUp(true);
                                }}
                            >
                                <Tooltip title="Edit Examiner" arrow>
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
                            <Tooltip title="Delete Examiner" arrow>
                                <DeleteIcon />
                            </Tooltip>
                        </div>
                        <>


                            <div className="btn btn-success" onClick={() => {
                                history.push({
                                    pathname: '/question',
                                    state: { question: row }
                                });

                            }}>Add Question</div>
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
            getAllQuestionSet();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllQuestionSet();
        }
    }, [debouncedSearchTerm]);

    //for excel file
    const [allCourseNameExcel, setAllCourseNameExcel] = useState([]);
    const [dataCSV, setDataCSV] = useState([]);
    useEffect(() => {
        getAllQuestionSetForExcel();
    }, []);

    const getAllQuestionSetForExcel = async () => {
        // if (!search) {
        await ApiGet(`examiner/getAll`)
            .then((res) => {
                setAllCourseNameExcel(res?.data?.payload?.QuestionSet);
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
                    CreatedAt: moment(registerUser?.createdAt).format("ll"),
                    QuestionSetName: registerUser?.name,
                    QuestionSetDescription: registerUser?.description,
                    QuestionSetLanguage: registerUser?.language,
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
                            <h2 className="pl-3 pt-2">Question Set</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Question Set"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <button
                                onClick={() => {
                                    setIsAddCourseName(true);
                                }}
                                className="btn btn-success mr-2"
                            >
                                Add Question Set
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

                    {/* delete model */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-danger">Alert!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are You Sure To Want To delete this Question Set
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
                                        Enter Description
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="description"
                                                name="description"
                                                value={inputValueForAdd.description}
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
                                            {errorsForAdd["description"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select Language
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <select
                                                className={`form-control form-control-lg form-control-solid`}
                                                name="language"
                                                value={inputValueForAdd.language}
                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                }}

                                            >
                                                <option>Select Languagae...</option>
                                                <option value="english" selected={
                                                    inputValueForAdd?.language ===
                                                        "english"
                                                        ? true
                                                        : false
                                                }>English </option>
                                                <option value="hindi" selected={
                                                    inputValueForAdd?.language ===
                                                        "hindi"
                                                        ? true
                                                        : false
                                                }>Hindi</option>

                                            </select>

                                        </div>
                                        <span
                                            style={{
                                                color: "red",
                                                top: "5px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {errorsForAdd["language"]}
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

                                        <span> {isEditPopUp === false ? 'Add' : 'Edit'}  Question Set</span>
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
                                <div className="honda-text-grid">
                                    <div className="honda-text-grid-items">
                                        <span>Name:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.name,
                                            }}
                                            className=""
                                        />
                                    </div>
                                    <div className="honda-text-grid-items">
                                        <span>Description:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.description,
                                            }}
                                            className=""
                                        />
                                    </div>
                                    <div className="honda-text-grid-items">
                                        <span>Language:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.language,
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

export default QuestionSet;
