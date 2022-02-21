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
import S3 from "react-aws-s3";
import { AwsConfig } from "../../../config/S3Backet/app.config";
import { ExportCSV } from "./SampleExcel";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Question = (props) => {
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
        document.title = "Honda | Question";
    }, []);

    const handleViewMoreClose = () => {
        setIsViewMoreAboutus(false);
        setDataViewMore({});
    };

    const handleOnChnageAdd = (e) => {
        const { name, value } = e.target;
        if (name === 'weight') {
            setErrorsForAdd({ ...errorsForAdd, [name]: "" });
            return setInputValueForAdd({ ...inputValueForAdd, [name]: parseInt(value) });
        }
        setInputValueForAdd({ ...inputValueForAdd, [name]: value });
        setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    };

    const handleAddAdminClose = () => {
        setInputValueForAdd({});
        setIsAddCourseName(false);
        setErrorsForAdd({});
        setIsEditPopUp(false);
        setGetCourseType([]);
        setOption([])
        setMcqCheck(false)
        setCheckBoxCheck(false)

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
                `question/getAllQuestion?search=${search}&page=${page}&limit=${countPerPage}`,
            )
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredCourseName(res?.data?.payload?.Question);
                    setCount(res?.data?.payload?.count);
                    setGetCourseType([]);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        } else {
            await ApiGet(
                `question/getAllQuestion?search=${search}&page=${page}&limit=${countPerPage}`,
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

    ;

    const validateFormForAddAdmin = () => {
        let formIsValid = true;
        let errorsForAdd = {};
        if (inputValueForAdd && !inputValueForAdd.name) {
            formIsValid = false;
            errorsForAdd["name"] = "*Please Enter Name!";
        }


        if (inputValueForAdd && !inputValueForAdd.language) {
            formIsValid = false;
            errorsForAdd["language"] = "*Please Enter language!";
        }
        if (inputValueForAdd && !inputValueForAdd.type) {
            formIsValid = false;
            errorsForAdd["type"] = "*Please Enter type!";
        }

        if (inputValueForAdd && !inputValueForAdd.weight) {
            formIsValid = false;
            errorsForAdd["weight"] = "*Please Enter weight!";
        }

        if (inputValueForAdd && !inputValueForAdd.Category) {
            formIsValid = false;
            errorsForAdd["Category"] = "*Please Enter Category!";
        }
        option.map((data) => {
            if (data.name === '') {
                return toast.error('Enter Question')
            }
        })

        setErrorsForAdd(errorsForAdd);
        return formIsValid;
    };

    const handelAddCourseNameDetails = (e) => {
        e.preventDefault();
        if (validateFormForAddAdmin()) {
            let Data = {
                Qname: inputValueForAdd.name,
                type: inputValueForAdd.type,
                Option: option,
                language: inputValueForAdd.language,
                weight: inputValueForAdd.weight,
                Category: inputValueForAdd.Category,
                image: inputValueForAdd.image

            };
            let filter = option.filter((e) => e.istrue === true);
            if (filter.length) {
                ApiPost(`question/addQuestion`, Data)
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
            } else {
                toast.error(`Please select any one ${Data.type}`);
            }



        }
    };

    const handleDeleteCourseName = () => {
        ApiDelete(`question/deleteQuestion/${idForDeleteCourseName}`)
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
                Qname: inputValueForAdd.name,
                type: inputValueForAdd.type,
                Option: option,
                language: inputValueForAdd.language,
                weight: inputValueForAdd.weight,
                Category: inputValueForAdd.Category,
                image: inputValueForAdd.image
            };
            let filter = option.filter((e) => e.istrue === true);
            if (filter.length) {
                ApiPut(`question/updateQuestion/${idForUpdateCourseNameData}`, Data)
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
            } else {
                toast.error(`Please select any one ${Data.type}`);
            }
        }
    };

    const handleUpdateStatusProperty = (status) => {
        ApiPut(`question/updateQuestion/${idForUpdateCourseStatus}`, {
            Qname: inputValueForAdd.name,
            type: inputValueForAdd.type,
            Option: option,
            language: inputValueForAdd.language,
            weight: inputValueForAdd.weight,
            Category: inputValueForAdd.Category,
            image: inputValueForAdd.image,
            isActive: status

        })
            // ApiPut(`property/updateProperty/${idForUpdatePropertyStatus}`)
            .then((res) => {
                if (res?.status == 200) {
                    setShowStatus(false);
                    getAllQuestionSet();
                    toast.success("Status updated Successfully");
                } else {
                    toast.error(res?.data?.message);
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message)
            });
    };

    const [AllCategory, setAllCategory] = useState([]);

    const getAllCategory = async (selectdate) => {
        selectdate = new Date(selectdate)
        setIsLoaderVisible(true);
        await ApiGet(
            `category/getAllCategory`
        )
            .then((res) => {
                setAllCategory(res?.data?.payload?.Menu)
            })
            .catch((err) => {
                setAllCategory([])
            });
    }

    useEffect(() => {
        getAllCategory()
    }, []);



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
            name: "Question Name",
            selector: "Qname",
            sortable: true,
        },

        {
            name: "Type",
            selector: "type",
            sortable: true,
        },

        {
            name: "Language",
            selector: "language",
            sortable: true,
        },
        {
            name: "Image",
            //   selector: "photo",
            cell: (row) => {
                return (
                    <>
                        <div className="p-3">{
                            row?.image ? <img className="max-w-50px zoom" alt="img" src={row?.image} /> : '-'
                        }

                        </div>
                    </>
                );
            },
            wrap: true,
        },
        {
            name: "Category",
            cell: (row) => {
                return (
                    <div>
                        {row?.Category?.name}
                    </div>
                );
            },
            sortable: true,
        },
        {
            name: "Weight",
            selector: "weight",
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
                                    if (row) {
                                        if (row.type === "mcq") {
                                            setMcqCheck(true);
                                        } else if (row.type == "checkbox") {
                                            setCheckBoxCheck(true);
                                        }
                                        setOption(row.Option);
                                    }


                                    setIdForUpdateCourseNameData(row._id);
                                    setOption(row?.Option)
                                    setInputValueForAdd({

                                        name: row?.Qname,
                                        description: row?.description,
                                        weight: row?.weight,
                                        language: row?.language,
                                        type: row?.type,
                                        image: row?.image,
                                        Category: row?.Category?._id,
                                    });
                                    if (row?.type === "mcq") {
                                        setMcqCheck(true);
                                        setCheckBoxCheck(false);

                                    } else {
                                        setMcqCheck(false);
                                        setCheckBoxCheck(true);
                                    }
                                    console.log("row", row?.Category?.name);
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
                                setInputValueForAdd({
                                    name: row?.Qname,
                                    description: row?.description,
                                    weight: row?.weight,
                                    language: row?.language,
                                    type: row?.type,
                                    image: row?.image,
                                    Category: row?.Category?.name,
                                });
                            }}
                        >
                            <Tooltip title="Status Property" arrow>
                                <div className="cus-medium-button-style widthfixed">
                                    <button className="btn btn-success mr-2">
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
        await ApiGet(`question/getAll`)
            .then((res) => {
                setAllCourseNameExcel(res?.data?.payload?.Question);
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
                    QuestionName: registerUser?.Qname,
                    language: registerUser?.language,
                    type: registerUser?.type,
                    weight: registerUser?.weight,
                    Category: registerUser?.Category,
                    image: registerUser?.image,
                };
                setDataCSV((currVal) => [...currVal, data]);
            });
        }
    }, [allCourseNameExcel]);

    const [mcqCheck, setMcqCheck] = useState(false);
    const [checkBoxCheck, setCheckBoxCheck] = useState(false);
    function typeChanges(e) {
        if (e.target.value === "mcq") {
            setMcqCheck(true);
            setCheckBoxCheck(false);
        } else {
            setCheckBoxCheck(true);
            setMcqCheck(false);
        }
    }

    const onBulkUpload = async (e) => {
        e.preventDefault();
        if (e.target.files[0]) {

            let formData = new FormData();
            formData.append("csv", e.target.files[0]);
            await ApiPost("question/uploadcsv", formData)
                .then((res) => {
                    if (res.data?.result === 0) {
                        getAllQuestionSet();
                        toast.success(res.data.message);
                    }else{
                        toast.error(res.data.message);
                    }
                    let img = document.getElementById("upload");
                    img.value = null
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            toast.error("Please Select Excel File !");
        }
    };



    const [option, setOption] = useState([
        {
            no: "1",
            name: "",
            istrue: false,
        },
        {
            no: "2",
            name: "",
            istrue: false,
        },
        {
            no: "3",
            name: "",
            istrue: false,
        },
        {
            no: "4",
            name: "",
            istrue: false,
        },
    ]);
    const handleQuestion = (data, index) => {
        let list = [...option];
        let i = index;
        let type = data.target.type;
        let value;
        if (type === "radio") {
            value = data.target.value === "on" ? true : false;
        } else {
            value = data.target.value;
        }
        if (i === 0) {
            if (type === "radio") {
                list[i].istrue = value;
                list.map((item, index) => {
                    if (index !== i) {
                        list[index].istrue = !value;
                    }
                });
            } else if (type === "text") {
                list[index].name = value;
            }
        } else if (i === 1) {
            if (type === "radio") {
                list[i].istrue = value;
                list.map((item, index) => {
                    if (index !== i) {
                        list[index].istrue = !value;
                    }
                });
            } else if (type === "text") {
                list[i].name = value;
            }
        } else if (i === 2) {
            if (type === "radio") {
                list[i].istrue = value;
                list.map((item, index) => {
                    if (index !== i) {
                        list[index].istrue = !value;
                    }
                });
            } else if (type === "text") {
                list[i].name = value;
            }
        } else if (i === 3) {
            if (type === "radio") {
                list[i].istrue = value;
                list.map((item, index) => {
                    if (index !== i) {
                        list[index].istrue = !value;
                    }
                });
            } else if (type === "text") {
                list[i].name = value;
            }
        } else {
            setOption(option);
        }
        setOption(list);
    };
    const handleQuestionCheckBox = (data, index) => {
        let list = [...option];
        let i = index + 1;
        let type = data.target.type;

        let value;
        if (type === "checkbox") {
            value = data.target.value === "on" ? true : false;
        } else {
            value = data.target.value;
        }

        if (i === 1) {
            if (type === "checkbox") {
                list[i - 1].istrue = !list[i - 1].istrue;
            } else if (type === "text") {
                list[i - 1].name = value;
            }
        } else if (i === 2) {
            if (type === "checkbox") {
                list[i - 1].istrue = !list[i - 1].istrue;
            } else if (type === "text") {
                list[i - 1].name = value;
            }
        } else if (i === 3) {
            if (type === "checkbox") {
                list[i - 1].istrue = !list[i - 1].istrue;
            } else if (type === "text") {
                list[i - 1].name = value;
            }
        } else if (i === 4) {
            if (type === "checkbox") {
                list[i - 1].istrue = !list[i - 1].istrue;
            } else if (type === "text") {
                list[i - 1].name = value;
            }
        } else {
            setOption(option);
        }
        setOption(list);
    };



    const getImageArrayFromUpload = async (e) => {
        // let files = e.target.files;
        // let imageB64Arr = [];
        const file = e?.target?.files[0]
        if (file) {
            if (file.type.includes("image")) {
                let config = AwsConfig;
                config = {
                    ...config,
                    dirName: "Cerificate",
                    ACL: "public-read",
                };
                const Reacts3Client = new S3(config);
                let urls;

                let filename = "AboutImage(" + new Date().getTime() + ")";
                let data = await Reacts3Client.uploadFile(file, filename);
                // try {
                // if (data.status === 204) {
                urls = data.location;
                if (urls) {
                    setInputValueForAdd((cv) => {
                        return { ...cv, image: urls };
                    });
                }
                return urls;
            } else {
                errorsForAdd["image"] = "*Please Upload Image!";
            }
        }
    };


    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Question </h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search Question "
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>
                        <div className="cus-medium-button-style button-height">
                            <button
                                onClick={() => {
                                    setIsAddCourseName(true);
                                    setOption(
                                        [
                                            {
                                                no: "1",
                                                name: "",
                                                istrue: false,
                                            },
                                            {
                                                no: "2",
                                                name: "",
                                                istrue: false,
                                            },
                                            {
                                                no: "3",
                                                name: "",
                                                istrue: false,
                                            },
                                            {
                                                no: "4",
                                                name: "",
                                                istrue: false,
                                            },
                                        ]
                                    )
                                }}
                                className="btn btn-success mr-2"
                            >
                                Add Question
                            </button>
                        </div>
                        <div>
                            <ExportCSV />{" "}
                            <input
                                type="file"
                                id="upload"
                                style={{ display: "none" }}
                                className="btn btn-success"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(e) => onBulkUpload(e)}

                            />
                            <buttton
                                className="btn btn-success mr-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("upload").click();
                                }}

                            >Upload Excel File</buttton>

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
                            Are You Sure To Want To delete this Question
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

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Image
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="file"
                                                className={`form-control form-control-lg form-control-solid `}
                                                name="image"
                                                // value={productValues.image || null}
                                                onChange={(e) => {
                                                    getImageArrayFromUpload(e);
                                                }}
                                                accept="image/*"
                                                required
                                            />
                                        </div>
                                        <span
                                            style={{
                                                color: "red",
                                                top: "5px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {errorsForAdd["image"]}
                                        </span>
                                    </div>
                                </div>



                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Category
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>

                                            <select
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="Category"
                                                name="Category"
                                                value={inputValueForAdd?.Category}
                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                }}
                                            >
                                                <option value="" disabled selected hidden>
                                                    Select Question Category
                                                </option>

                                                {AllCategory?.length > 0 &&
                                                    AllCategory?.map((item) => {
                                                        return (
                                                            <option
                                                                key={item._id}
                                                                value={item?._id}
                                                                selected={
                                                                    inputValueForAdd?.Category === item?._id
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                {" "}
                                                                {item.name}{" "}
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
                                            {errorsForAdd["Category"]}
                                        </span>
                                    </div>

                                </div>




                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Weight
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <input
                                                type="number"
                                                className={`form-control form-control-lg form-control-solid `}
                                                id="weight"
                                                name="weight"
                                                value={inputValueForAdd.weight}
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
                                            {errorsForAdd["weight"]}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">
                                        Select Type
                                    </label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div>
                                            <select
                                                name="type"
                                                type="text"
                                                className={`form-control form-control-lg form-control-solid`}
                                                value={inputValueForAdd.type}

                                                onChange={(e) => {
                                                    handleOnChnageAdd(e);
                                                    typeChanges(e)
                                                }}
                                            >
                                                <option selected disabled value="">
                                                    Type
                                                </option>
                                                <option value="mcq" >MCQ</option>
                                                <option value="checkbox" >Check Box</option>
                                            </select>
                                        </div>
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

                                </div>


                                <div>
                                    {mcqCheck && (
                                        <>
                                            {isAddCourseName
                                                ? option.map((data, index) => {
                                                    return (
                                                        <div className="col-lg-9 col-xl-6">
                                                            <div
                                                                className="form-group d-flex align-items-center"
                                                                key={index}
                                                            >
                                                                <input
                                                                    className="mr-3"
                                                                    type="radio"
                                                                    name="radio"
                                                                    id="radio"
                                                                    defaultChecked={data.istrue}
                                                                    onChange={(e) => handleQuestion(e, index)}
                                                                />
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={data.name}
                                                                    onChange={(e) => handleQuestion(e, index)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                : [0, 1, 2, 3].map((data, index) => {
                                                    return (
                                                        <div
                                                            className="form-group d-flex align-items-center"
                                                            key={index}
                                                        >
                                                            <input
                                                                className="mr-3"
                                                                type="radio"
                                                                name="radio"
                                                                id="radio"
                                                                checked={data.istrue}
                                                                // defaultChecked={data.istrue}
                                                                onChange={(e) => handleQuestion(e, index)}
                                                            />
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                onChange={(e) => handleQuestion(e, index)}
                                                                value={data.name}
                                                                required
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </>
                                    )}

                                    {checkBoxCheck && (
                                        <>
                                            {isAddCourseName
                                                ? option.map((data, index) => {
                                                    return (
                                                        <div className="col-lg-9 col-xl-6">
                                                            <div
                                                                className="form-group d-flex align-items-center"
                                                                key={index}
                                                            >
                                                                <input
                                                                    className="mr-3"
                                                                    type="checkbox"
                                                                    defaultChecked={data.istrue}
                                                                    onChange={(e) =>
                                                                        handleQuestionCheckBox(e, index)
                                                                    }
                                                                />
                                                                <input
                                                                    className={`form-control form-control-lg form-control-solid`}
                                                                    type="text"
                                                                    value={data.name}
                                                                    onChange={(e) =>
                                                                        handleQuestionCheckBox(e, index)
                                                                    }
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                                : [0, 1, 2, 3].map((data, index) => {
                                                    return (
                                                        <div
                                                            className="form-group d-flex align-items-center"
                                                            key={index}
                                                        >
                                                            <input
                                                                className="mr-3"
                                                                type="checkbox"
                                                                defaultChecked={data.istrue}
                                                                onChange={(e) =>
                                                                    handleQuestionCheckBox(e, index)
                                                                }
                                                            />
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={data.name}

                                                                onChange={(e) =>
                                                                    handleQuestionCheckBox(e, index)
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </>
                                    )}
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

                                        <span> {isEditPopUp === false ? 'Add' : 'Edit'}  Question </span>
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
                                                __html: dataViewMore?.Qname,
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
                                    <div className="honda-text-grid-items">
                                        <span>Type:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.type,
                                            }}
                                            className=""
                                        />
                                    </div>
                                    <div className="honda-text-grid-items">
                                        <span>Question Category Type:</span>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: dataViewMore?.Category?.name,
                                            }}
                                            className=""
                                        />
                                    </div>
                                    <div className="honda-text-grid-items">
                                        <span>Option:</span>
                                        {
                                            dataViewMore?.Option.map((data, key) => {
                                                return (
                                                    <div className="d-flex">
                                                        <div className="mr-3"> {data?.no}</div>
                                                        <div>{data?.name}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </List>
                </Dialog>
            ) : null}




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
        </>
    );
};

export default Question;
