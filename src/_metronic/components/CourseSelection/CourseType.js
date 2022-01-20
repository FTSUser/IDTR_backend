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
    const [idForUpdateCourseStatus, setIdForUpdateCourseStatus] =useState("");
    const [statusDisplay, setStatusDisplay] = useState(false);
    // const [getVehicleCategory, setGetVehicleCategory] = useState([]);
    const [filteredVehicleCategory, setFilteredVehicleCategory] = useState({});



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
        console.log("inputValue", inputValueForAdd);
    }, [inputValueForAdd]);

    // useEffect(() => {
    //     title === "Dashboard | OUR LEISURE HOME" ? document.title = title : document.title = "FAQs | OUR LEISURE HOME"
    // }, [])

    useEffect(() => {
        console.log("idForEditStatus", idForEditStatus);
    }, [idForEditStatus]);

    const handleAdminUpdateClose = () => {
        setInputValue({});
        setIsUpdateCourseType(false);
    };

    const handleAddAdminClose = () => {
        setInputValue({});
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
            await ApiGet(`courseType/getAllCourseType`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setFilteredCourseType(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await ApiGet(`courseType/getAllCourseType?search=${search}&page=${page}&limit=${countPerPage}`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setFilteredCourseType(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };


    
    const getAllVehicleCategory = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`vehicleCategory/getAllVehicleCategory`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setFilteredVehicleCategory(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        } 
        // else {
        //     await ApiGet(`vehicleCategory/getAllVehicleCategory?search=${search}&page=${page}&limit=${countPerPage}`)
        //         .then((res) => {
        //             setIsLoaderVisible(false);
        //             console.log("artistreport", res);
        //             setFilteredVehicleCategory(res?.data?.payload?.Question);
        //             setCount(res?.data?.payload?.count);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }

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
            toast.error(err.message);
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
            errorsForAdd["VehicleDescription"] = "*Please Enter Vehicle Description!";
        }
        // if (inputValueForAdd && !inputValueForAdd.answer) {
        //     formIsValid = false;
        //     errorsForAdd["answer"] = "*Please Enter Answer!";
        // }

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseTypeDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let Data = {
              courseType: inputValueForAdd.CourseType,
              description: inputValueForAdd.VehicleDescription,
                isActive: true,
                _id: inputValueForAdd.VehicleCategory,
                // answer: inputValueForAdd.answer,
                // ctid : "61dfc5645e9d45193cb1a0b6"
            }
            ApiPost(`courseType/addCourseType`, Data)
                .then((res) => {
                    console.log("resresres", res);
                    if (res?.status == 200) {
                        setIsAddCourseType(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllCourseType();
                        // { document.title === "Dashboard | OUR LEISURE HOME" && getNewCount() }

                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        }
    };

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
        // if (inputValue && !inputValue.answer) {
        //     formIsValid = false;
        //     errors["answer"] = "*Please Enter Answer!";
        // }
        setErrors(errors);
        return formIsValid;
    };

    const handleDeleteCourseType = () => {
        ApiDelete(`courseType/deleteCourseType/${idForDeleteCourseType}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShow(false);
                    toast.success("Deleted Successfully");
                    getAllCourseType();
                    // { document.title === "Dashboard | OUR LEISURE HOME" && getNewCount() }
                    setPage(1)
                    setCount(0)
                    setCountPerPage(countPerPage)
                } else {
                    toast.error(res?.data?.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    useEffect(() => {
        console.log("inputValue", inputValue);
    }, [inputValue])

    const handelUpdateCourseTypeDetails = (e) => {

        e.preventDefault();
        if (validateForm()) {
          let Data = {
            courseType: inputValue.CourseType,
            description: inputValue.VehicleDescription,

              // answer: inputValueForAdd.answer,
              // ctid : "61dfc5645e9d45193cb1a0b6"
          }
            ApiPut(`courseType/updateCourseType/${idForUpdateCourseTypeData}`, Data)
                .then((res) => {
                    console.log("resres",res);
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
            name: "Course Type",
            selector: "courseType",
            sortable: true,
        },
      
        {
            name: "Vehicle Description ",
            selector: "description",
            sortable: true,
        },

        {
            name: "Display?",
            cell: (row) => {
              return (
                <>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowStatus(true);
                      setIdForUpdateCourseStatus(row?._id);
                      setStatusDisplay(row?.isActive);
                    }}
                  >
                    <Tooltip title="Status Property" arrow>
                      <div className="cus-medium-button-style">
                        <button  className="btn btn-success mr-2">
                          {row?.isActive === true ? "Active" : "Deactive"}
                        </button>
                      </div>
                    </Tooltip>
                  </div>
                </>
              );
            },
            sortable: true,
          },

        // {
        //     name: "Answer",
        //     selector: "answer",
        //     sortable: true,
        // },
        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        <div className="d-flex justify-content-between">
                            <div
                                className="cursor-pointer pl-2"
                                onClick={() => {
                                    setIsUpdateCourseType(true);
                                    setIdForUpdateCourseTypeData(row._id);
                                    getAllVehicleCategory();
                                    setInputValue({
                                        VehicleCategory:row?.vehicleCategory,
                                        CourseType: row?.courseType,
                                      VehicleDescription: row?.description,
                                        // answer: row?.answer,
                                    });
                                    console.log("a",inputValue)
                                }}
                            >
                                <Tooltip title="Edit CourseType" arrow>
                                    <CreateIcon />
                                </Tooltip>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setShow(true)
                                setIdForDeleteCourseType(row?._id)
                            }}
                        >
                            <Tooltip title="Delete Course Type" arrow>
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
        setSearch(e.target.value)
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
            setPage(1)
            setCount(0)
            setCountPerPage(countPerPage)
            getAllCourseType();

        } else {
            setPage(1)
            setCount(0)
            setCountPerPage(countPerPage)
            getAllCourseType();
        }
    }, [debouncedSearchTerm]);


    return (
        <>
            <div className="card p-1">
         <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Course Type</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="title"
                                    placeholder="Search Course Type"
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
                            Add Course Type
                        </button>
                        </div>
                    </div>

                    <Modal show={showStatus} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {statusDisplay === true ? "De-active" : "Active"} this course type 
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
                            Are You Sure To Want To{" "} delete this CourseType
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
                                {/* Name Amenintie */}
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
                                                    Select Course Type
                                                 </option>
                                                {filteredVehicleCategory?.length>0 && filteredVehicleCategory?.map((item)=>{
                                                    console.log("item",item._id)
                                                      return <option key={item._id} value={item._id}> {item.vehicleCategory} </option>
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
                                        Enter Vehicle Description
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
                                {/* <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Answer
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="answer"
                                                name="answer"
                                                value={inputValueForAdd.answer}
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
                                            {errorsForAdd["answer"]}
                                        </span>
                                    </div>
                                    
                                </div> */}

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
                                                value={inputValue.VehicleCategory}
                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                }}
                                            >
                                                 <option value="" disabled selected hidden>
                                                    Select Course Type
                                                 </option>
                                                {filteredVehicleCategory?.length>0 && filteredVehicleCategory?.map((item)=>{
                                                    console.log("item",item._id)
                                                      return <option key={item._id} value={item._id}> {item.vehicleCategory} </option>
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
                                    Vehicle Description
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
                                {/* <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Enter Answer
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="answer"
                                                name="answer"
                                                value={inputValue.answer}
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
                                            {errors["answer"]}
                                        </span>
                                    </div>
                                </div> */}


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
