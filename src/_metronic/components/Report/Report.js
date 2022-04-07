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
import { ReportExcel } from "./ReportExcel";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { addDays } from "date-fns/esm";
import { NavLink, useHistory } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const data = [
    {
        "_id": "6214a53e5413504c352f8dc6",
        "name": "Timeslot",
        "endPoint": "trainingDate/getAllDateWithoutPagination",
        "pathname": "/timeslot-addition"

    },
    {
        "_id": "62106ded491bcd2a1683a487",
        "name": "User",
        "endPoint": "register/getAll",
        "pathname": "/user"
    },
    // {
    //     "_id": "620e42b6924864153489ea0a",
    //     "name": "Vehicle Category",
    //     "endPoint": "vehicleCategory/getAll"
    // },
    // {
    //     "_id": "620b94feef74e22a3f7554ef",
    //     "name": "Course Type",
    //     "endPoint": "courseType/getAll"
    // },
    // {
    //     "_id": "6204f0790d11261d68edf5dd",
    //     "name": "Course Category",
    //     "endPoint": "courseCategory/getAll"
    // },
    // {
    //     "_id": "6204f06b0d11261d68edf5d5",
    //     "name": "Course Name",
    //     "endPoint": "courseName/getAll"
    // },
    {
        "_id": "61fd0cd5df3e201fe081ff8c",
        "name": "Payment",
        "endPoint": "payment/getAll",
        "pathname": "/payment-history"
    },
    {
        "_id": "61fce992a6682147b4c29b19",
        "name": "Question Category",
        "endPoint": "category/getAll",
        "pathname": "/question-category"

    },
    {
        "_id": "61fce98ba6682147b4c29b11",
        "name": "Question",
        "endPoint": "question/getAll",
        "pathname": "/question-addition"

    },
    {
        "_id": "61fccb27eb9ffd140891e6e0",
        "name": "Feedback",
        "endPoint": "feedback/getAll",
        "pathname": "/feedback-records"

    }
]

const Report = ({ getNewCount, title }) => {
    const history = useHistory();

    useEffect(() => {
        document.title = "Honda | Reports";
    }, []);


    let i = 0;
    const columns = [
        {
            name: "SNo",
            cell: (row, index) => index + 1,
            width: "65px",
        },
        {
            name: "Name",
            selector: "name",
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => {
                return (
                    <>
                     
                        <button className="btn btn-success" onClick={() => history.push(row?.pathname)}>Export To Excel</button>
                        {/* <ReportExcel type={row} date={statesate} filter={filterState} /> */}
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


    const [statesate, setState] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);

    const [filterState, setFilterData] = useState();


    const handleSetDateData = async (data) => {
      
        setState(data);
    }
    const handleDropdown = (data) => {
       
        setFilterData(data)
    }

    return (
        <>
            <div className="card p-1">
                <ToastContainer />
                <div className="p-2 mb-2">
                    <div className="row mb-4 pr-3">
                        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Reports</h2>
                        </div>
                        <div style={{ width: "30%", paddingLeft: "15px" }}>
                            <DateRangePickerComponent
                                onChange={(e) => {
                                    handleSetDateData(e.target.value);
                                }}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={statesate}
                                direction="horizontal"
                            />
                        </div>
                        <div style={{ width: "30%", paddingLeft: "15px" }}>
                            <div className="form-group">
                                <select name="" id="" className="form-control" onChange={(e) => {
                                    handleDropdown(e.target.value);
                                }}>
                                    <option value="" >Select</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                    <option value="quarterly">Quarterly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        customStyles={customStyles}
                        style={{
                            marginTop: "-3rem",
                        }}
                        progressComponent={
                            <Loader type="Puff" color="#334D52" height={30} width={30} />
                        }
                        highlightOnHover
                    />
                </div>
            </div>
        </>
    );
};

export default Report;
