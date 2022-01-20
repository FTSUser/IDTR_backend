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

const CourseName = ({ getNewCount, title }) => {
    const [filteredCourseName, setFilteredCourseName] = useState({});
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    //new data
    const [isUpdateCourseName, setIsUpdateCourseName] = useState(false);
    const [isAddCourseName, setIsAddCourseName] = useState(false);
    const [idForUpdateCourseNameData, setIdForUpdateCourseNameData] =
        useState("");
    const [inputValue, setInputValue] = useState({});
    const [inputValueForAdd, setInputValueForAdd] = useState({});
    const [errors, setErrors] = useState({});
    const [errorsForAdd, setErrorsForAdd] = useState({});
    const [idForEditStatus, setIdForEditStatus] = useState("");
    const [idForDeleteCourseName, setIdForDeleteCourseName] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [countPerPage, setCountPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const [idForUpdateCourseStatus, setIdForUpdateCourseStatus] =useState("");
    const [statusDisplay, setStatusDisplay] = useState(false);
    const [getCourseType, setGetCourseType] = useState([]);
    const [courseTypeArr, setCourseTypeArr] = useState();

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
        setIsUpdateCourseName(false);
    };

    const handleAddAdminClose = () => {
        setInputValue({});
        setIsAddCourseName(false);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleCloseShowStatus = () => {
        setShowStatus(false);
      };

    useEffect(() => {
        getAllCourseName();
    }, [page, countPerPage]);





    
    const getAllCourseType = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`courseType/getAllCourseType`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setGetCourseType(res?.data?.payload?.Question);
                    // courseTypeArr.push(getCourseType.map((item)=>item.courseType))
                    console.log("courseTypeArr",courseTypeArr)
                    // setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        } 
        // else {
        //     await ApiGet(`courseType/getAllCourseType?search=${search}&page=${page}&limit=${countPerPage}`)
        //         .then((res) => {
        //             setIsLoaderVisible(false);
        //             console.log("artistreport", res);
        //             setFilteredCourseType(res?.data?.payload?.Question);
        //             setCount(res?.data?.payload?.count);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }

    };






    const getAllCourseName = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`courseName/getAllCourseName`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setFilteredCourseName(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            await ApiGet(`courseName/getAllCourseName?search=${search}&page=${page}&limit=${countPerPage}`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    console.log("artistreport", res);
                    setFilteredCourseName(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    };



    const handleUpdateStatusProperty = (status) => {
        ApiPut(`courseName/updateStatus/${idForUpdateCourseStatus}`, {

          isActive: status,
        })
          // ApiPut(`property/updateProperty/${idForUpdatePropertyStatus}`)
          .then((res) => {
            if (res?.status == 200) {
              setShowStatus(false);
              toast.success("Status updated Successfully");
              getAllCourseName();
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
        if (inputValueForAdd && !inputValueForAdd.CourseName) {
            formIsValid = false;
            errorsForAdd["CourseName"] = "*Please Enter Course Name!";
        }

        if (inputValueForAdd && !inputValueForAdd.Description) {
            formIsValid = false;
            errorsForAdd["Vehicle"] = "*Please Enter Description!";
        }
        // if (inputValueForAdd && !inputValueForAdd.answer) {
        //     formIsValid = false;
        //     errorsForAdd["answer"] = "*Please Enter Answer!";
        // }

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseNameDetails = (e) => {
        e.preventDefault();
            let Data = {
                courseName: inputValueForAdd.CourseName,
                description: inputValueForAdd.Description,
                isActive: true,
                certificate: inputValueForAdd.Certificate,
                documentRequired: inputValueForAdd.DocumentRequired,
                mode: inputValueForAdd.Mode,
                systemRequirement: inputValueForAdd.SystemRequirement,
                timing: inputValueForAdd.Timing,
                duration: inputValueForAdd.Duration,
                validity: inputValueForAdd.Validity,
                price: inputValueForAdd.Price,
                _id: inputValueForAdd.CourseType,

            
                // answer: inputValueForAdd.answer,
                // ctid : "61dfc5645e9d45193cb1a0b6"
            }
            ApiPost(`courseName/addCourseName`, Data)
                .then((res) => {
                    console.log("resresres", res);
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllCourseName();
                        // { document.title === "Dashboard | OUR LEISURE HOME" && getNewCount() }

                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                });
        
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};
        if (inputValue && !inputValue.CourseName) {
            formIsValid = false;
            errors["CourseName"] = "*Please Enter CourseName!";
        }

        if (inputValue && !inputValue.Description) {
            formIsValid = false;
            errors["Description"] = "*Please Enter Description!";
        }
        // if (inputValue && !inputValue.answer) {
        //     formIsValid = false;
        //     errors["answer"] = "*Please Enter Answer!";
        // }
        setErrors(errors);
        return formIsValid;
    };

    const handleDeleteCourseName = () => {
        ApiDelete(`courseName/deleteCourseName/${idForDeleteCourseName}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShow(false);
                    toast.success("Deleted Successfully");
                    getAllCourseName();
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

    const handelUpdateCourseNameDetails = (e) => {

        e.preventDefault();
        if (validateForm()) {
          let Data = {
            courseName: inputValue.CourseName,
            description: inputValue.Description,
            certificate: inputValue.Certificate,
            documentRequired: inputValue.DocumentRequired,
            mode: inputValue.Mode,
            systemRequirement: inputValue.SystemRequirement,
            timing: inputValue.Timing,
            duration: inputValue.Duration,
            validity: inputValue.Validity,
            price: inputValue.price,
            _id: inputValue.CourseType,
           
              // answer: inputValueForAdd.answer,
              // ctid : "61dfc5645e9d45193cb1a0b6"
          }
            ApiPut(`courseName/updateCourseName/${idForUpdateCourseNameData}`, Data)
                .then((res) => {
                    console.log("resres",res);
                    if (res?.status == 200) {
                        setIsUpdateCourseName(false);
                        toast.success(res?.data?.message);
                        setInputValue({});
                        getAllCourseName();
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
            name: "Course Name",
            selector: "courseName",
            sortable: true,
        },
        
        {
            name: "Course Description",
            selector: "description",
            sortable: true,
        },
       
      
        {
            name: "Duration",
            selector: "duration",
            sortable: true,
        },




        {
            name: "Timing",
            selector: "timing",
            sortable: true,
        },

        {
            name: "Mode",
            selector: "mode",
            sortable: true,
        },

        {
            name: "Document Required",
            selector: "documentRequired",
            sortable: true,
        },

        {
            name: "Validity",
            selector: "validity",
            sortable: true,
        },

        {
            name: "System Requirement",
            selector: "systemRequirement",
            sortable: true,
        },

        {
            name: "Certificate",
            selector: "certificate",
            sortable: true,
        },

        {
            name: "Price",
            selector: "price",
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
                                    setIsUpdateCourseName(true);
                                    setIdForUpdateCourseNameData(row._id);
                                    setInputValue({
                                      CourseName: row?.courseName,
                                      Description: row?.description,
                                      Certificate: row?.certificate,
                                      DocumentRequired: row?.documentRequired,
                                      Mode: row?.mode,
                                      SystemRequirement: row?.systemRequirement,
                                      Timing: row?.timing,
                                      Duration: row?.duration,
                                      Validity: row?.validity,
                                      Price: row?.price,
                                      _id: row?.CourseType,
                                    
                                     
                                        // answer: row?.answer,
                                    });
                                }}
                            >
                                <Tooltip title="Edit CourseName" arrow>
                                    <CreateIcon />
                                </Tooltip>
                            </div>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                setShow(true)
                                setIdForDeleteCourseName(row?._id)
                            }}
                        >
                            <Tooltip title="Delete Course Name" arrow>
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
            getAllCourseName();

        } else {
            setPage(1)
            setCount(0)
            setCountPerPage(countPerPage)
            getAllCourseName();
        }
    }, [debouncedSearchTerm]);


    return (
        <>
            <div className="card p-1">
                 <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Course Name</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="title"
                                    placeholder="Search Course Name"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                        <div className="cus-medium-button-style button-height">
                        <button
                            onClick={() => {
                                setIsAddCourseName(true);
                                getAllCourseType();
                            }}
                            className="btn btn-success mr-2"

                        >
                            Add Course Name
                        </button>
                        </div>
                    </div>


                    <Modal show={showStatus} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {statusDisplay === true ? "De-active" : "Active"} this course name
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
                            Are You Sure To Want To{" "} delete this Course Name
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
                                        Select Course Type
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <select
                                            
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseType"
                                                name="CourseType"
                                                value={inputValueForAdd.CourseType}
                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                }}
                                            >
                                                 <option value="" disabled selected hidden>
                                                    Select Course Type
                                                 </option>
                                                {getCourseType?.length>0 && getCourseType?.map((item)=>{
                                                    console.log("item",item._id)
                                                      return <option key={item._id} value={item._id}> {item.courseType} </option>
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
                                        Enter Course Name
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseName"
                                                name="CourseName"
                                                value={inputValueForAdd.CourseName}
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
                                            {errorsForAdd["CourseName"]}
                                        </span>
                                    </div>
                                    
                                </div>


                                



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Course Description
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Description"
                                                name="Description"
                                                value={inputValueForAdd.Description}
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
                                            {errorsForAdd["Description"]}
                                        </span>
                                    </div>
                                    </div>

                                    <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Duration 
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Duration"
                                                name="Duration"
                                                value={inputValueForAdd.Duration}
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
                                            {errorsForAdd["Duration"]}
                                        </span>
                                    </div>
                                    </div>



                                    <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Timing
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Timing"
                                                name="Timing"
                                                value={inputValueForAdd.Timing}
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
                                            {errorsForAdd["Timing"]}
                                        </span>
                                    </div>
                                    
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Mode
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Mode"
                                                name="Mode"
                                                value={inputValueForAdd.Mode}
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
                                            {errorsForAdd["Mode"]}
                                        </span>
                                    </div>
                                    
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Document Required
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="DocumentRequired"
                                                name="DocumentRequired"
                                                value={inputValueForAdd.DocumentRequired}
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
                                            {errorsForAdd["Document Requirement"]}
                                        </span>
                                    </div>
                                    
                                </div>


                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter  Validity
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Validity"
                                                name="Validity"
                                                value={inputValueForAdd.Validity}
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
                                            {errorsForAdd["Validity"]}
                                        </span>
                                    </div>
                                    
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter System Requirement
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="SystemRequirement"
                                                name="SystemRequirement"
                                                value={inputValueForAdd.SystemRequirement}
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
                                            {errorsForAdd["System Requirement"]}
                                        </span>
                                    </div>
                                    
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Certificate
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Certificate"
                                                name="Certificate"
                                                value={inputValueForAdd.Certificate}
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
                                            {errorsForAdd["Certificate"]}
                                        </span>
                                    </div>
                                    
                                </div>


                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter Price
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Price"
                                                name="Price"
                                                value={inputValueForAdd.Price}
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
                                            {errorsForAdd["Price"]}
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
                                            handelAddCourseNameDetails(e);
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

            {isUpdateCourseName ? (
                <Dialog
                    fullScreen
                    open={isUpdateCourseName}
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
                        {isUpdateCourseName === true ? (
                            <div className="form ml-30 ">
                                {/* Ameninties Name */}

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select Course Type
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <select
                                            
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseType"
                                                name="CourseType"
                                                value={inputValue.CourseType}
                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                }}
                                            >
                                                 <option value="" disabled selected hidden>
                                                    Select Course Type
                                                 </option>
                                                {getCourseType?.length>0 && getCourseType?.map((item)=>{
                                                    console.log("item",item._id)
                                                      return <option key={item._id} value={item._id}> {item.courseType} </option>
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
                                    Enter Course Name
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="CourseName"
                                                name="CourseName"
                                                value={inputValue.CourseName}
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
                                            {errors["CourseName"]}
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
                                                id="Description"
                                                name="Description"
                                                value={inputValue.Description}
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
                                            {errors["Description"]}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Duration
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Duration"
                                                name="Duration"
                                                value={inputValue.Duration}
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
                                            {errors["Duration"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Timing
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Timing"
                                                name="Timing"
                                                value={inputValue.Timing}
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
                                            {errors["Timing"]}
                                        </span>
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Mode
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Mode"
                                                name="Mode"
                                                value={inputValue.Mode}
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
                                            {errors["Mode"]}
                                        </span>
                                    </div>
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Document Required
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="DocumentRequired"
                                                name="DocumentRequired"
                                                value={inputValue.DocumentRequired}
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
                                            {errors["DocumentRequired"]}
                                        </span>
                                    </div>
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Validity
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Validity"
                                                name="Validity"
                                                value={inputValue.Validity}
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
                                            {errors["Validity"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    System Requirement
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id=" SystemRequirement"
                                                name=" SystemRequirement"
                                                value={inputValue.SystemRequirement}
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
                                            {errors[" SystemRequirement"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Certificate
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Certificate"
                                                name="Certificate"
                                                value={inputValue.Certificate}
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
                                            {errors["Certificate"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                    Price
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Price"
                                                name="Price"
                                                value={inputValue.Price}
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
                                            {errors["Price"]}
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
                                            handelUpdateCourseNameDetails(e);
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

export default CourseName;
