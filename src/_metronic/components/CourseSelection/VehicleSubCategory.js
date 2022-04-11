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

const CourseType = ({ getNewCount, title }) => {
    const [filteredCourseType, setFilteredCourseType] = useState({});
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    //new data
    const [isUpdateCourseType, setIsUpdateCourseType] = useState(false);
    const [isAddCourseType, setIsAddCourseType] = useState(false);
    const [idForUpdateCourseTypeData, setIdForUpdateCourseTypeData] =
        useState("");
    const [inputValue, setInputValue] = useState({});
    const [inputValueForAdd, setInputValueForAdd] = useState({});
    const [errors, setErrors] = useState({});
    const [errorsForAdd, setErrorsForAdd] = useState({});
    const [idForEditStatus, setIdForEditStatus] = useState("");
    const [idForDeleteCourseType, setIdForDeleteCourseType] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [countPerPage, setCountPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const [idForUpdateCourseStatus, setIdForUpdateCourseStatus] = useState("");
    const [statusDisplay, setStatusDisplay] = useState(false);
    // const [getVehicleCategory, setGetVehicleCategory] = useState([]);
    const [filteredVehicleCategory, setFilteredVehicleCategory] = useState({});

    useEffect(() => {
        document.title = "Honda | CourseType";
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
    }, [inputValueForAdd]);

    useEffect(() => {
    }, [inputValue]);

    useEffect(() => {
    }, [filteredVehicleCategory]);


    useEffect(() => {
    }, [idForEditStatus]);

    const handleAdminUpdateClose = () => {
        setInputValue({});
        setIsUpdateCourseType(false);
    };

    const handleAddAdminClose = () => {
        setInputValueForAdd({});
        setIsAddCourseType(false);
    };

    const handleCloseShowStatus = () => {
        setShowStatus(false);
    };

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {
        getAllCourseType();
    }, [page, countPerPage]);

    const getAllCourseType = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`vehicleSubCategory/getAllVehicleSubCategory?page=${page}&limit=${countPerPage}`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseType(res?.data?.payload?.vehicleSubCategory);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                })
        } else {
            await ApiGet(`vehicleSubCategory/getAllVehicleSubCategory?search=${search}&page=${page}&limit=${countPerPage}`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseType(res?.data?.payload?.vehicleSubCategory);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                })
        }
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

    const handleUpdateStatusProperty = (status) => {
        ApiPut(`courseType/updateStatus/${idForUpdateCourseStatus}`, {
            isActive: status,
        })
            // ApiPut(`property/updateProperty/${idForUpdatePropertyStatus}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShowStatus(false);
                    toast.success("Status updated Successfully");
                    getAllCourseType();
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
        if (inputValueForAdd && !inputValueForAdd.CourseType) {
            formIsValid = false;
            errorsForAdd["CourseType"] = "*Please Enter Course Type!";
        }

        if (inputValueForAdd && !inputValueForAdd.VehicleDescription) {
            formIsValid = false;
            errorsForAdd["VehicleDescription"] = "*Please Enter Description!";
        }

        if (inputValueForAdd && !inputValueForAdd.VehicleCategory) {
            formIsValid = false;
            errorsForAdd["VehicleCategory"] = "*Please Enter Vehicle Category!";
        }
        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseTypeDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let Data = {
                vehicleSubCategory: inputValueForAdd.CourseType,
                description: inputValueForAdd.VehicleDescription,
                isActive: true,
                vcid: inputValueForAdd.VehicleCategory,

            };
            ApiPost(`vehicleSubCategory/addVehicleSubCategory`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseType(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllCourseType();
                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        }
    };

    const handleDeleteCourseType = () => {
        ApiDelete(`vehicleSubCategory/deleteVehicleSubCategory/${idForDeleteCourseType}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShow(false);
                    toast.success("Deleted Successfully");
                    getAllCourseType();
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

    useEffect(() => {
    }, [inputValue]);

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};
        if (inputValue && !inputValue.CourseType) {
            formIsValid = false;
            errors["CourseType"] = "*Please Enter CourseType!";
        }

        if (inputValue && !inputValue.VehicleDescription) {
            formIsValid = false;
            errors["VehicleDescription"] = "*Please Enter Vehicle Description!";
        }

        // if (inputValue && !inputValue.VehicleCategory) {
        //     formIsValid = false;
        //     errors["VehicleCategory"] = "*Please Enter Vehicle Category!";
        // }

        setErrors(errors);
        return formIsValid;
    };

    const handelUpdateCourseTypeDetails = (e) => {
        e.preventDefault();
        if (validateForm()) {
            let Data = {
                courseType: inputValue.CourseType,
                description: inputValue.VehicleDescription,
                vcid: inputValue.VehicleCategory,


            };
            ApiPut(`courseType/updateCourseType/${idForUpdateCourseTypeData}`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsUpdateCourseType(false);
                        toast.success(res?.data?.message);
                        setInputValue({});
                        getAllCourseType();
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
            name: "Vehicle Sub-Category",
            selector: row => row?.vehicleSubCategory,
            sortable: true,
        },

        {
            name: "Vehicle Sub-Category Description",
            selector: "description",
            sortable: true,
        },

        // {
        //     name: "Display?",
        //     cell: (row) => {
        //         return (
        //             <>
        //                 <div
        //                     className="cursor-pointer"
        //                     onClick={() => {
        //                         setShowStatus(true);
        //                         setIdForUpdateCourseStatus(row?._id);
        //                         setStatusDisplay(row?.isActive);
        //                     }}
        //                 >
        //                     <Tooltip title="Status Property" arrow>
        //                         <div className="cus-medium-button-style widthfixed">
        //                             <button className="btn btn-success mr-2">
        //                                 {row?.isActive === true ? "Active" : "Deactive"}
        //                             </button>
        //                         </div>
        //                     </Tooltip>
        //                 </div>
        //             </>
        //         );
        //     },
        //     sortable: true,
        // },


        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        {/* <div className="d-flex justify-content-between">
                            <div
                                className="cursor-pointer pl-2"
                                onClick={() => {
                                    setIsUpdateCourseType(true);
                                    setIdForUpdateCourseTypeData(row._id);
                                    getAllVehicleCategory();

                                    setInputValue({
                                        VehicleCategory: row?.vcid?._id,
                                        CourseType: row?.courseType,
                                        VehicleDescription: row?.description,
                                    });
                                }}
                            >
                                <Tooltip title="Edit CourseType" arrow>
                                    <CreateIcon />
                                </Tooltip>
                            </div>
                        </div> */}
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setShow(true);
                                setIdForDeleteCourseType(row?._id);
                            }}
                        >
                            <Tooltip title="Delete Vehicle Sub Category" arrow>
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
            getAllCourseType();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllCourseType();
        }
    }, [debouncedSearchTerm]);

    //Download csv data
    //for excel file
    const [allCourseTypeExcel, setAllCourseTypeExcel] = useState([]);
    const [dataCSV, setDataCSV] = useState([]);
    useEffect(() => {
        getAllCourseTypeForExcel();
    }, []);

    const getAllCourseTypeForExcel = async () => {
        await ApiGet(`vehicleSubCategory/getAllVehicleSubCategory`)
            .then((res) => {
                setAllCourseTypeExcel(res?.data?.payload?.vehicleSubCategory);
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message)
            });
    };
    useEffect(() => {
        if (allCourseTypeExcel) {
            allCourseTypeExcel.map((registerUser) => {
                let data = {
                    CreatedAt: moment(registerUser?.createdAt).format("ll"),
                    CreatedBy: registerUser?.createdBy,
                    VehicleSubCategoryDescription: registerUser?.description,
                    IsActive: registerUser?.isDelete ? "True" : "False",
                    UpdatedAt: moment(registerUser?.updatedAt).format("ll"),
                    UpdatedBy: registerUser?.updatedBy,
                    VehicleCategory:registerUser?.vehicleSubCategory ,
                    VehicleCategoryId: registerUser?.vcid,
                    VehicleSubCategory:registerUser?._id
                };
                setDataCSV((currVal) => [...currVal, data]);
            });
        }
    }, [allCourseTypeExcel]);


    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Vehicle Sub Category</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Vehicle Sub Category"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <button
                                onClick={() => {
                                    setIsAddCourseType(true);
                                    getAllVehicleCategory();
                                }}
                                className="btn btn-success mr-2"
                            >
                                Add Vehicle Sub Category
                            </button>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <CsvDownload
                                className={``}
                                data={dataCSV}
                                filename="Vehicle Sub Category Report.csv"
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
                            {statusDisplay === true ? "De-active" : "Active"} this Vehicle Sub Category
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
                            Are You Sure To Want To delete this Vehicle Sub Category
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                cancel
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    handleDeleteCourseType();
                                }}
                            >
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    {/* end delete model */}

                    <DataTable
                        columns={columns}
                        data={filteredCourseType}
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

            {isAddCourseType ? (
                <Dialog
                    fullScreen
                    open={isAddCourseType}
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
                        {isAddCourseType === true ? (
                            <div className="form ml-30 ">
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
                                                            <option key={item._id} value={item?._id}>
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
                                        Enter Vehicle SubCategory
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseType"
                                                name="CourseType"
                                                value={inputValueForAdd.CourseType}
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
                                            {errorsForAdd["CourseType"]}
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
                                            handelAddCourseTypeDetails(e);
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

            {isUpdateCourseType ? (
                <Dialog
                    fullScreen
                    open={isUpdateCourseType}
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
                        {isUpdateCourseType === true ? (
                            <div className="form ml-30 ">
                                {/* Ameninties Name */}

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
                                                // value={inputValue.VehicleCategory}
                                                onChange={(e) => {
                                                    handleOnChnage(e);
                                                }}
                                            >
                                                <option value="" disabled selected hidden>
                                                    Select Course Type
                                                </option>
                                                {filteredVehicleCategory?.length > 0 &&
                                                    filteredVehicleCategory?.map((item) => {
                                                        return (
                                                            <option
                                                                key={item?._id}
                                                                value={item?._id}
                                                                selected={
                                                                    inputValue?.VehicleCategory === item?._id
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
                                            {errorsForAdd["VehicleCategory"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Course Type
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseType"
                                                name="CourseType"
                                                value={inputValue.CourseType}
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
                                            {errors["CourseType"]}
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
                                            handelUpdateCourseTypeDetails(e);
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

export default CourseType;
