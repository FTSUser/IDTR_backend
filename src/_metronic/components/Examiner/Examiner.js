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
import { number } from "yup";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Examiner = ({ getNewCount, title }) => {
    const [filteredAnnouncement, setFilteredAnnouncement] = useState({});
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dataViewMore, setDataViewMore] = useState({});
    const [isViewMoreAnnouncement, setIsViewMoreAnnouncement] = useState(false);
    const [date, setDate] = useState(new Date());

    const [description, setDescription] = useState("");
    console.log("dataViewMore", dataViewMore);
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
    const [countPerPage, setCountPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [isPopupForEdit, setIsPopupForEdit] = useState(false);

    useEffect(() => {
        document.title = "Honda | Examiner";
    }, []);

    useEffect(() => {
        console.log("isPopupForEdit", isPopupForEdit);
    }, [isPopupForEdit]);

    useEffect(() => {
        console.log("inputValueForAdd", inputValueForAdd);
    }, [inputValueForAdd]);

    const handleOnChnageAdd = (e) => {
        const { name, value } = e.target;
        setInputValueForAdd({ ...inputValueForAdd, [name]: value });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    };

    const handleViewMoreClose = () => {
        setIsViewMoreAnnouncement(false);
        setDataViewMore({});
    };

    const handleAddAdminClose = () => {
        setInputValue({});
        setDescription([]);
        setDate(new Date());

        setIsAddAnnouncement(false);
        setIsPopupForEdit(false);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        getAllAnnouncement();
    }, [page, countPerPage]);

    const getAllAnnouncement = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`examiner/getAllExaminer?page=${page}&limit=${countPerPage}`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredAnnouncement(res?.data?.payload?.Examiner);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => { });
        } else {
            await ApiGet(
                `examiner/getAllExaminer?search=${search}&page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredAnnouncement(res?.data?.payload?.Examiner);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => { });
        }
    };

    const validateFormForAddAdmin = () => {
        let formIsValid = true;
        let errorsForAdd = {};

        if (inputValueForAdd && !inputValueForAdd.name) {
            formIsValid = false;
            errorsForAdd["name"] = "*Please Enter Name!";
        }
        if (inputValueForAdd && !inputValueForAdd?.phone) {
            formIsValid = false;
            errorsForAdd["phone"] = "*Please Enter Phone Number!";
        } else if (
            inputValueForAdd?.phone &&
            !inputValueForAdd?.phone.match(/^\d{10}$/)
        ) {
            formIsValid = false;
            errorsForAdd["phone"] = "*Please Enter vaild phone number!";
        }
        if (inputValueForAdd && !inputValueForAdd.email) {
            formIsValid = false;
            errorsForAdd["email"] = "*Please Enter Email!";
        } else if (
            inputValueForAdd.email &&
            !inputValueForAdd.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            formIsValid = false;
            errorsForAdd["email"] = "*Please Enter vaild Email!";
        }

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handleAddAnnouncementDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let Data = {
                name: inputValueForAdd?.name,
                email: inputValueForAdd?.email,
                phone: Number(inputValueForAdd?.phone),
            };
            ApiPost(`examiner/addExaminer`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddAnnouncement(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        setDescription("");
                        setDate(new Date());
                        getAllAnnouncement();
                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

    const handleDeleteAnnouncement = () => {
        ApiDelete(`examiner/deleteExaminer/${idForDeleteAnnouncement}`)
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
                toast.error(err.message);
            });
    };

    useEffect(() => { }, [inputValue]);

    const handleUpdateAnnouncementDetails = (e) => {
        e.preventDefault();

        if (validateFormForAddAdmin()) {
            let Data = {
                name: inputValueForAdd?.name,
                email: inputValueForAdd?.email,
                phone: inputValueForAdd?.phone,
                // password: inputValueForAdd.password
            };
            ApiPut(`examiner/updateExaminer/${idForUpdateAnnouncementData}`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddAnnouncement(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        setDescription("");
                        setDate(new Date());
                        getAllAnnouncement();
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
            name: "Name",
            selector: "Name",
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
            name: "Email",
            selector: "Email",
            cell: (row) => {
                return (
                    <>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: row?.email,
                            }}
                            className=""
                        />
                    </>
                );
            },
            sortable: true,
        },
        {
            name: "Phone",
            selector: "Phone",
            cell: (row) => {
                return (
                    <>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: row?.phone,
                            }}
                            className=""
                        />
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
                                    setIsAddAnnouncement(true);
                                    setIdForUpdateAnnouncementData(row._id);
                                    console.log("logrow", row);
                                    setInputValueForAdd({
                                        name: row?.name,
                                        email: row?.email,
                                        phone: row?.phone,
                                    });
                                    setIsPopupForEdit(true);
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
                                setIsViewMoreAnnouncement(true);
                                setDataViewMore(row);
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
    console.log("filteredAnnouncement", filteredAnnouncement);
    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2"> Examiner</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Examiner"
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
                                Add Examiner
                            </button>
                        </div>
                    </div>

                    {/* delete model */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-danger">Alert!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are You Sure To Want To delete this Examiner
                        </Modal.Body>
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
                                        Enter Email
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="email"
                                                name="email"
                                                value={inputValueForAdd.email}
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
                                            {errorsForAdd["email"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Phone
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="number"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="phone"
                                                name="phone"
                                                value={inputValueForAdd.phone}
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
                                            {errorsForAdd["phone"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center">
                                    {isPopupForEdit ? (
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
                                    ) : (
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
                                    )}
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
                                        <span>Title:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.title,
                                            }}
                                            className=""
                                        />
                                    </div>

                                    <div className="honda-text-grid-items">
                                        <span>Image:</span>
                                        <img
                                            src={dataViewMore?.image}
                                            alt=""
                                            height="90px"
                                            width="170px"
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

export default Examiner;
