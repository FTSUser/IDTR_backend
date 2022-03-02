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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { addDays } from "date-fns";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Request = ({ getNewCount, title }) => {
    const [filteredFAQ, setFilteredFAQ] = useState({});
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dataViewMore, setDataViewMore] = useState({});
    const [isViewMoreFAQ, setIsViewMoreFAQ] = useState(false);
    const [answer, setAnswer] = useState("");
    const [isAddFAQ, setIsAddFAQ] = useState(false);
    const [idForUpdateFAQData, setIdForUpdateFAQData] = useState("");
    const [inputValueForAdd, setInputValueForAdd] = useState({});
    const [errorsForAdd, setErrorsForAdd] = useState({});
    const [idForDeleteFAQ, setIdForDeleteFAQ] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [countPerPage, setCountPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        document.title = "Honda | Recheck Request ";
    }, []);



    useEffect(() => {
        getAllFAQ();
    }, [page, countPerPage]);

    const getAllFAQ = async () => {
        setIsLoaderVisible(true);
        if (!search) {
            await ApiGet(`response/getRequestResponseByStatus?status=pending`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredFAQ(res?.data?.payload?.Response);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        } else {
            await ApiGet(`response/getRequestResponseByStatus?status=pending`)
                .then((res) => {
                    setIsLoaderVisible(false);
                    setFilteredFAQ(res?.data?.payload?.Response);
                    setCount(res?.data?.payload?.count);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message)
                });
        }
    };



    const approved = async (row) => {

        const data = {
            "status": "approved"
        }
        await ApiPut(`response/editRequestResponseById/${row?._id}`, data)
            .then((res) => {
                getAllFAQ()
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });
    };
    const rejected = async (row) => {

        const data = {
            "status": "rejected"
        }
        await ApiPut(`response/editRequestResponseById/${row?._id}`, data)
            .then((res) => {
                getAllFAQ()
            })
            .catch((err) => {
                console.log(err);
                toast.error(err);
            });
    };





    let i = 0;
    const columns = [
        {
            name: "SNo",
            cell: (row, index) => (page - 1) * countPerPage + (index + 1),
            width: "65px",
        },
        {
            name: "First Name",

            sortable: true,
            selector: row => row?.fname,
        },
        {
            name: "Date",
            cell: (row) => {
                return <span>{moment(row?.updatedAt).format("ll")}</span>;
              },
            sortable: true,
           
        },
        {
            name: "Last Name",

            sortable: true,
            selector: row => row?.lname,
        },
        {
            name: "Email",

            sortable: true,
            selector: row => row?.email ? row?.email : '-',
        },
        {
            name: "Course Name",

            sortable: true,
            selector: row => row?.cnid?.courseName ? row?.cnid?.courseName : '-',
        },
        {
            name: "Examiner Name",

            sortable: true,
            selector: row => row?.batchId?.Examiner?.name ? row?.batchId?.Examiner?.name : '-',
        },
        {
            name: "Data Entery Name",

            sortable: true,
            selector: row => row?.batchId?.DataEntry?.name ? row?.batchId?.DataEntry?.name : '-',
        },
        {
            name: "Mobile Number",
            sortable: true,
            selector: row => row?.phone,
        },

        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                        <div className="d-flex justify-content-between mr-4">
                            <Tooltip title="Approve" arrow>
                                <button className="btn btn-success" onClick={() => approved(row)}>Approve</button>
                            </Tooltip>
                        </div>
                        <div className="d-flex justify-content-between">
                            <Tooltip title="Rejected" arrow>
                                <button className="btn btn-success" onClick={() => rejected(row)}>Reject</button>
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
    const [dateForFilter, setDateForFilter] = useState();
    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay]
        );
        return debouncedValue;
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsLoaderVisible(true);
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllFAQ();
        } else {
            setPage(1);
            setCount(0);
            setCountPerPage(countPerPage);
            getAllFAQ();
        }
    }, [debouncedSearchTerm]);

    const [tableFilterData, setTableFilterData] = useState({});
    useEffect(() => {
        if (dateForFilter) {
            handleSetDateData(dateForFilter)
        } else {

            getAllFAQ();
        }

    }, [page, countPerPage]);

    const handleSetDateData = async (dateForFilter) => {
        console.log("date", dateForFilter);
        if (dateForFilter) {


            await ApiGet(
                `response/getRequestResponseByStatus?status=pending&sd=${moment(dateForFilter[0]).format('MM/DD/YYYY')}&ed=${moment(dateForFilter[1]).format('MM/DD/YYYY')}&page=${page}&limit=${countPerPage}`
               
            )
                .then((res) => {
                    // setTableFilterData(tableFilterData);
                    console.log("res", res);
                    setCount(res?.data?.payload?.count)
                    setFilteredFAQ(res?.data?.payload?.Response);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        } else {

            getAllFAQ()
        }

    };
    const [statesate, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      ]);
    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2"> Recheck Request</h2>
                        </div>
                        <div className="col">
                            <div>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg form-control-solid `}
                                    name="search"
                                    value={search}
                                    placeholder="Search  Recheck Request"
                                    onChange={(e) => handleSearch(e)}
                                />
                            </div>
                        </div>

                    </div>
                    <div style={{ width: "30%", paddingLeft: "15px" }}>

                        <DateRangePickerComponent
                            onChange={(e) => {
                                handleSetDateData(e.target.value);
                                setDateForFilter(e.target.value)
                            }}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={statesate}
                            direction="horizontal"
                        />
                    </div>


                    <DataTable
                        columns={columns}
                        data={filteredFAQ}
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


        </>
    );
};

export default Request;
