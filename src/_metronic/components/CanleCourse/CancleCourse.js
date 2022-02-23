import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
    ApiGet,
    ApiDelete,
    ApiPut,
    ApiPost,
} from "../../../helpers/API/ApiData";
import Select from 'react-select';
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CancleCourse = ({ getNewCount, title }) => {
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
    const [dataViewMore, setDataViewMore] = useState({});
    const [isViewMoreAboutus, setIsViewMoreAboutus] = useState(false);
    const [isEditPopUp, setIsEditPopUp] = useState(false);
    const [selectedCourseType, setSelectedCourseType] = useState([]);
    const [allCourseTypeForUpdate, setAllCourseTypeForUpdate] = useState([]);

    useEffect(() => {
        document.title = "Honda | Cancle Course";
    }, []);

    const handleViewMoreClose = () => {
        setIsViewMoreAboutus(false);
        setDataViewMore({});
    };

    const handleOnChnageAdd = (e) => {
        const { name, value } = e.target;
        setInputValueForAdd({ ...inputValueForAdd, [name]: value });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    };

    const [getAllRole, setgetAllRole] = useState({});
    const getAllRoleData = () => {
        ApiGet('role').then((res) => {
            setgetAllRole(res.data.payload.allRole);
        })
    }
    const handleAddAdminClose = () => {
        setInputValueForAdd({});
        setIsAddCourseName(false);
        setErrorsForAdd({});
        setSelectedCourseType([]);
        setIsEditPopUp(false);
        setAllCourseTypeForUpdate([]);


    };

    const handleClose = () => {
        setShow(false);
    };



    useEffect(() => {
        getAllCourseName();
        getAllRoleData()
    }, [page, countPerPage]);




    const getAllCourseName = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(
                `register/getCancleRecord?page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);

                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        } else {
            await ApiGet(
                `register/getCancleRecord?search=${search}&page=${page}&limit=${countPerPage}`
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



    const validateFormForAddAdmin = () => {
        let formIsValid = true;
        let errorsForAdd = {};
        if (inputValueForAdd && !inputValueForAdd.name) {
            formIsValid = false;
            errorsForAdd["name"] = "*Please Enter Name!";
        }
        // if (selectedCourseType?.length === 0) {
        //     formIsValid = false;
        //     errorsForAdd["role"] = "*Please Enter role!";
        // }



        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseNameDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let data = []
            selectedCourseType.map(o => data.push(o._id))
            let Data = {
                name: inputValueForAdd.name,
                // assignTo: data

            };
            ApiPost(`menu/addMenu`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        setSelectedCourseType([]);
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
        ApiDelete(`menu/deleteMenu/${idForDeleteCourseName}`)
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
            let data = []
            selectedCourseType.map(o => data.push(o._id))
            let Data = {
                name: inputValueForAdd?.name,
                // assignTo: data
            };
            ApiPut(`menu/updateMenu/${idForUpdateCourseNameData}`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllCourseName();
                        setSelectedCourseType([]);
                        setIsEditPopUp(false);

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
            name: "Email",
            selector: "email",
            sortable: true,
            cell: (row) => {
              return <span>{row?.email === "" ? "-" : row?.email}</span>;
            },
          },
          {
            name: "First Name",
            selector: "fname",
            sortable: true,
            cell: (row) => {
              return <span>{row?.fname === "" ? "-" : row?.fname}</span>;
            },
          },
      
          {
            name: "Last Name",
            selector: "lname",
            sortable: true,
            cell: (row) => {
              return <span>{row?.lname === "" ? "-" : row?.lname}</span>;
            },
          },
          {
            name: "Gender",
            selector: "gender",
            sortable: true,
          },
      
        {
            name: "Payment Type",
            selector: "type",
            sortable: true,
            cell: (row) => {
              return <span>{row?.type === "" ? "-" : row?.type}</span>;
            },
          },
        // {
        //     name: "Assign To",
        //     cell: (row) => {
        //         return (
        //             <>
        //                 {
        //                     row?.assignTo?.map((data, key) => {
        //                         return (
        //                             <>
        //                                 <div >
        //                                     <div >{data?.roleName},</div>
        //                                 </div>
        //                             </>
        //                         )
        //                     }
        //                     )}
        //             </>
        //         );
        //     },
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
                          
                                    setIsAddCourseName(true);
                                    setIdForUpdateCourseNameData(row._id);
                                    // setSelectedCourseType(row?.assignTo);
                                    // setAllCourseTypeForUpdate(row?.assignTo);


                                    setInputValueForAdd({
                                        name: row?.name,

                                    });
                                    setIsEditPopUp(true);
                                }}
                            >
                                <Tooltip title="Edit Examiner" arrow>
                                    <CreateIcon />
                                </Tooltip>
                            </div>
                        </div> */}

                        {/* <div
                            className="cursor-pointer"
                            onClick={() => {
                                setShow(true);
                                setIdForDeleteCourseName(row?._id);
                            }}
                        >
                            <Tooltip title="Delete Examiner" arrow>
                                <DeleteIcon />
                            </Tooltip>
                        </div> */}
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
        await ApiGet(`examiner/getAll`)
            .then((res) => {
                setAllCourseNameExcel(res?.data?.payload?.Examiner);
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
                    MenuName: registerUser?.name,

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
                            <h2 className="pl-3 pt-2">Cancle Course</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Cancle Course"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                     
                    </div>

                    {/* delete model */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-danger">Alert!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are You Sure To Want To delete this Menu
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
                                {/* <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Assign To
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>


                                            <Multiselect

                                                options={getAllRole}
                                                onSelect={(selectedList, selectedItem) => {
                                                    setSelectedCourseType(selectedList);
                                                    setErrorsForAdd({
                                                        ...errorsForAdd,
                                                        role: "",
                                                    });
                                                }}

                                                onRemove={(selectedList, removedItem) => {
                                                    setSelectedCourseType(selectedList);
                                                }}
                                                displayValue="roleName"
                                                selectedValues={allCourseTypeForUpdate}

                                            />
                                            <span
                                                style={{
                                                    color: "red",
                                                    top: "5px",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {errorsForAdd["role"]}
                                            </span>


                                        </div>

                                    </div>
                                </div> */}


                                <div className="d-flex align-items-center justify-content-center">
                                    <button
                                        onClick={(e) => {
                                            isEditPopUp === false
                                                ? handelAddCourseNameDetails(e)
                                                : handelUpdateCourseNameDetails(e);
                                        }}
                                        className="btn btn-success mr-2"
                                    >

                                        <span> {isEditPopUp === false ? 'Add' : 'Edit'}  Menu</span>
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
                                 <span>First Name:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.fname === null ||
                                         dataViewMore?.fname === "" ||
                                         !dataViewMore?.fname
                                         ? "No data"
                                         : dataViewMore?.fname,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Middle Name:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.mname === null ||
                                         dataViewMore?.mname === "" ||
                                         !dataViewMore?.mname
                                         ? "No data"
                                         : dataViewMore?.mname,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Last Name:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.lname === null ||
                                         dataViewMore?.lname === "" ||
                                         !dataViewMore?.lname
                                         ? "No data"
                                         : dataViewMore?.lname,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Date of Birth:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.DoB === null ||
                                         dataViewMore?.DoB === "" ||
                                         !dataViewMore?.DoB
                                         ? "No data"
                                         : moment(dataViewMore?.DoB).format("ll"),
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Qualification:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.qualification === null ||
                                         dataViewMore?.qualification === "" ||
                                         !dataViewMore?.qualification
                                         ? "No data"
                                         : dataViewMore?.qualification,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Gender:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.gender === null ||
                                         dataViewMore?.gender === "" ||
                                         !dataViewMore?.gender
                                         ? "No data"
                                         : dataViewMore?.gender,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Address:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.address === null ||
                                         dataViewMore?.address === "" ||
                                         !dataViewMore?.address
                                         ? "No data"
                                         : dataViewMore?.address,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>State:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.state === null ||
                                         dataViewMore?.state === "" ||
                                         !dataViewMore?.state
                                         ? "No data"
                                         : dataViewMore?.state,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>City:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.city === null ||
                                         dataViewMore?.city === "" ||
                                         !dataViewMore?.city
                                         ? "No data"
                                         : dataViewMore?.city,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>District:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.district === null ||
                                         dataViewMore?.district === "" ||
                                         !dataViewMore?.district
                                         ? "No data"
                                         : dataViewMore?.district,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Email:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.email === null ||
                                         dataViewMore?.email === "" ||
                                         !dataViewMore?.email
                                         ? "No data"
                                         : dataViewMore?.email,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Phone:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.phone === null ||
                                         dataViewMore?.phone === "" ||
                                         !dataViewMore?.phone
                                         ? "No data"
                                         : dataViewMore?.phone,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Pincode:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.pincode === null ||
                                         dataViewMore?.pincode === "" ||
                                         !dataViewMore?.pincode
                                         ? "No data"
                                         : dataViewMore?.pincode,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Permanent DLnumber:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.permanentDLnumber === null ||
                                         dataViewMore?.permanentDLnumber === "" ||
                                         !dataViewMore?.permanentDLnumber
                                         ? "No data"
                                         : dataViewMore?.permanentDLnumber,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Issue Date:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.issueDate === null ||
                                         dataViewMore?.issueDate === "" ||
                                         !dataViewMore?.issueDate
                                         ? "No data"
                                         : dataViewMore?.issueDate,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Valid Till:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.validTill === null ||
                                         dataViewMore?.validTill === "" ||
                                         !dataViewMore?.validTill
                                         ? "No data"
                                         : dataViewMore?.validTill,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Authority:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.Authority === null ||
                                         dataViewMore?.Authority === "" ||
                                         !dataViewMore?.Authority
                                         ? "No data"
                                         : dataViewMore?.Authority,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Blood Group:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.bloodGroup === null ||
                                         dataViewMore?.bloodGroup === "" ||
                                         !dataViewMore?.bloodGroup
                                         ? "No data"
                                         : dataViewMore?.bloodGroup,
                                   }}
                                   className=""
                                 />
                               </div>
                               
                               <div className="honda-text-grid-items">
                                 <span>Authority City:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.authoritycity === null ||
                                         dataViewMore?.authoritycity === "" ||
                                         !dataViewMore?.authoritycity
                                         ? "No data"
                                         : dataViewMore?.authoritycity,
                                   }}
                                   className=""
                                 />
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Authority District:</span>
                                 <p
                                   dangerouslySetInnerHTML={{
                                     __html:
                                       dataViewMore?.authoritydistrict === null ||
                                         dataViewMore?.authoritydistrict === "" ||
                                         !dataViewMore?.authoritydistrict
                                         ? "No data"
                                         : dataViewMore?.authoritydistrict,
                                   }}
                                   className=""
                                 />
                               </div>
                             </div>
                             <div className="honda-text-grid-items">
                                 <span>Other Information:</span>
                               </div>
                               <div className="honda-text-grid">
                               <div className="honda-text-grid-items">
                                 <span>Photo:</span>
                                 {dataViewMore?.passportPhoto === null ||
                                   dataViewMore?.passportPhoto === "" ||
                                   !dataViewMore?.passportPhoto ? (
                                   "No Data"
                                 ) : (
                                   <img
                                     className="view"
                                     src={dataViewMore?.passportPhoto}
                                     alt="No Image"
                                   />
                                 )}
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Driving License Image:</span>
                                 {dataViewMore?.drivingLicense === null ||
                                   dataViewMore?.drivingLicense === "" ||
                                   !dataViewMore?.drivingLicense ? (
                                   "No Data"
                                 ) : (
                                   <img
                                     className="view"
                                     src={dataViewMore?.drivingLicense}
                                     alt="No Image"
                                   />
                                 )}
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>ID Proof:</span>
                                 {dataViewMore?.IDproof === null ||
                                   dataViewMore?.IDproof === "" ||
                                   !dataViewMore?.IDproof ? (
                                   "No Data"
                                 ) : (
                                   <img
                                     className="view"
                                     src={dataViewMore?.IDproof}
                                     alt="No Image"
                                   />
                                 )}
                               </div>
                               <div className="honda-text-grid-items">
                                 <span>Medical Certificate:</span>
                                 {dataViewMore?.medicalCertificate === null ||
                                   dataViewMore?.medicalCertificate === "" ||
                                   !dataViewMore?.medicalCertificate ? (
                                   "No Data"
                                 ) : (
                                   <img
                                     className="view"
                                     src={dataViewMore?.medicalCertificate}
                                     alt="No Image"
                                   />
                                 )}
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

export default CancleCourse;