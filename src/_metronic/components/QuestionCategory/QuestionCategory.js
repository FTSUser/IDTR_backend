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
import { MultiSelect } from "react-multi-select-component";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionCategory = ({ getNewCount, title }) => {
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
    const [filteredVehicleCategory, setFilteredVehicleCategory] = useState([]);
    const [filteredVehicleSubCategory, setFilteredVehicleSubCategory] = useState([]);
    const [optionsForRecipe, setOptionsForRecipe] = useState([]);
    const [selectedIngredientsFinal, setSelectedIngredientsFinal] = useState([]);


    useEffect(() => {
        document.title = "Honda | Question Category";
    }, []);

    useEffect(() => {
        console.log("inputValueForAdd", selectedIngredientsFinal);
    }, [selectedIngredientsFinal]);

    const handleViewMoreClose = () => {
        setIsViewMoreAboutus(false);
        setDataViewMore({});
    };

    const handleOnChnageAdd = (e) => {
        const { name, value } = e.target;
        if (name === 'VehicleCategory') {
            setErrorsForAdd({ ...errorsForAdd, [name]: "" });
            return setInputValueForAdd({ ...inputValueForAdd, [name]: value, VehicleSubCategory: "" })
        }
        setInputValueForAdd({ ...inputValueForAdd, [name]: value });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    };



    const handleAddAdminClose = () => {
        setInputValueForAdd({});
        setIsAddCourseName(false);
        setErrorsForAdd({});
        setSelectedCourseType([]);
        setIsEditPopUp(false);
        setAllCourseTypeForUpdate([]);
        setSelectedIngredientsFinal([])


    };

    const handleClose = () => {
        setShow(false);
    };



    useEffect(() => {
        getAllCourseName();

    }, [page, countPerPage]);




    const getAllCourseName = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(
                `category/getAllCategory?page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.Menu);
                    setCount(res?.data?.payload?.count);

                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        } else {
            await ApiGet(
                `category/getAllCategory?search=${search}&page=${page}&limit=${countPerPage}`
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.Menu);
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
        if (inputValueForAdd && !inputValueForAdd?.VehicleCategory) {
            formIsValid = false;
            errorsForAdd["VehicleCategory"] = "*Please enter vehicle category!";
        }
        if (inputValueForAdd && !inputValueForAdd?.VehicleSubCategory) {
            formIsValid = false;
            errorsForAdd["VehicleSubCategory"] = "*Please enter vehicle sub-category!";
        }


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
                vcid: inputValueForAdd.VehicleCategory,
                vscid: inputValueForAdd.VehicleSubCategory
            };
            ApiPost(`category/addCategory`, Data)
                .then((res) => {
                    if (res?.status == 200) {
                        setIsAddCourseName(false);
                        setSelectedCourseType([]);
                        toast.success(res?.data?.message);
                        setInputValueForAdd({});
                        getAllCourseName();
                        setOptionsForRecipe([])
                    } else {
                        toast.error(res?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
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

    useEffect(() => {
        if (inputValueForAdd.VehicleCategory) {
            getAllVehicleSubCategory()
        }
    }, [inputValueForAdd.VehicleCategory])


    const getAllVehicleSubCategory = async () => {
        setIsLoaderVisible(true);

        await ApiGet(`vehicleSubCategory/getVehicleSubCategoryByVcid/${inputValueForAdd.VehicleCategory}`)
            .then((res) => {
                setIsLoaderVisible(false);
                console.log("tetsdgsds", res);
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

    const handleDeleteCourseName = () => {
        ApiDelete(`category/deleteCategory/${idForDeleteCourseName}`)
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
            // let Data = {
            //     name: inputValueForAdd?.name,
            //     // assignTo: data
            // };
            let SubCategoryFinal = []
            selectedIngredientsFinal?.length > 0 && selectedIngredientsFinal.map((item) => {
                return SubCategoryFinal.push(item?.value)
            })
            let Data = {
                name: inputValueForAdd.name,
                vcid: inputValueForAdd.VehicleCategory,
                vscid: inputValueForAdd?.VehicleSubCategory
            };
            ApiPut(`category/updateCategory/${idForUpdateCourseNameData}`, Data)
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
            name: "Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Vehicle Category",
            selector: (row) => row?.vcid?.vehicleCategory,
            sortable: true,
            // width: "65px",
        },
        {
            name: "Vehicle Sub Category",
            selector: (row) => row?.vscid?.vehicleSubCategory,
            sortable: true,
            // width: "65px",
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
                                    // setSelectedCourseType(row?.assignTo);
                                    // setAllCourseTypeForUpdate(row?.assignTo);


                                    setInputValueForAdd({
                                        name: row?.name,
                                        VehicleCategory: row?.vcid?._id,
                                        VehicleSubCategory: row?.vscid?._id

                                    });
                                    setIsEditPopUp(true);
                                    getAllVehicleCategory()
                                    // getAllVehicleSubCategory()
                                    // setSelectedIngredientsFinal(row?.vscid?.map((item, index) => {
                                    //     return { label: item?.vehicleSubCategory, value: item?._id }
                                    // }))
                                }}
                            >
                                <Tooltip title="Edit Question Category" arrow>
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
                            <Tooltip title="Delete Question Category" arrow>
                                <DeleteIcon />
                            </Tooltip>
                        </div>
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
        await ApiGet(`category/getAll`)
            .then((res) => {
                setAllCourseNameExcel(res?.data?.payload?.Menu);
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
                    QuestionCategoryName: registerUser?.name,
                    QuestionCategoryNameId: registerUser?._id,
                    CreatedAt: moment(registerUser?.createdAt).format("ll"),

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
                            <h2 className="pl-3 pt-2">Question Category</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Question Category"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <button
                                onClick={() => {
                                    setIsAddCourseName(true);
                                    getAllVehicleCategory()
                                    // getAllVehicleSubCategory()
                                }}
                                className="btn btn-success mr-2"
                            >
                                Add Question Category
                            </button>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <CsvDownload
                                className={``}
                                data={dataCSV}
                                filename="Question Category Report.csv"
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
                            Are You Sure To Want To delete this question category
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

                                {/* select category */}
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select vehicle category
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
                                                    Select vehicle category type

                                                </option>
                                                {filteredVehicleCategory?.length > 0 &&
                                                    filteredVehicleCategory?.map((item) => {
                                                        return (
                                                            <option
                                                                key={item?._id}
                                                                value={item?._id}
                                                                selected={
                                                                    inputValueForAdd?.VehicleCategory === item?._id
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


                                {/* select category */}
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select vehicle sub-category
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        {filteredVehicleSubCategory?.length > 0 ?

                                            <div>
                                                <select
                                                    className={`form-control form-control-lg form-control-solid `}
                                                    id="VehicleSubCategory"
                                                    name="VehicleSubCategory"
                                                    value={inputValueForAdd.VehicleSubCategory}
                                                    onChange={(e) => {
                                                        handleOnChnageAdd(e);
                                                    }}
                                                >
                                                    <option value="" disabled selected hidden>
                                                        Select vehicle sub-category
                                                    </option>
                                                    {filteredVehicleSubCategory?.length > 0 &&
                                                        filteredVehicleSubCategory?.map((item) => {
                                                            return (
                                                                <option
                                                                    key={item?._id}
                                                                    value={item?._id}
                                                                    selected={
                                                                        inputValueForAdd?.VehicleSubCategory === item?._id
                                                                            ? true
                                                                            : false
                                                                    }
                                                                >
                                                                    {" "}
                                                                    {item?.vehicleSubCategory}{" "}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                            </div>
                                            :
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-control form-control-lg form-control-solid `}
                                                    id="VehicleSubCategory"
                                                    name="VehicleSubCategory"
                                                    value="No Vehicle Sub-Category Found For This Vehicle Category"
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
                                            {errorsForAdd["VehicleSubCategory"]}
                                        </span>
                                    </div>
                                </div>


                                {/* select category
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select Vehicle Sub-Category
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
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
                                </div> */}

                                {/* Name Amenintie */}
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Enter name
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


                                <div className="d-flex align-items-center justify-content-center">
                                    <button
                                        onClick={(e) => {
                                            isEditPopUp === false
                                                ? handelAddCourseNameDetails(e)
                                                : handelUpdateCourseNameDetails(e);
                                        }}
                                        className="btn btn-success mr-2"
                                    >

                                        <span> {isEditPopUp === false ? 'Add' : 'Update'}  Question Category</span>
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
                                <div className="other-information-child-text-style1">
                                    <h2>Question Category</h2>
                                </div>
                                <div className="honda-text-grid honda-text-grid-border">
                                    <div className="honda-text-grid-items">
                                        <span>Question Category Name:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.name,
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

export default QuestionCategory;
