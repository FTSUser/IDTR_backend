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
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import moment from "moment";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import CsvDownload from "react-json-to-csv";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = ({ getNewCount, title }) => {
  const [filteredUser, setFilteredUser] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreUser, setIsViewMoreUser] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [tableFilterData, setTableFilterData] = useState({});
  const [setEndValue, endValue] = useState("");
  const [setStartValue, startValue] = useState("");
  const [allRegisterUserExcel, setAllRegisterUserExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);

  const handleViewMoreClose = () => {
    setIsViewMoreUser(false);
    setDataViewMore({});
  };

  const handleSetDateData = (date) => {
    setTableFilterData([]);
    if (!date) {
      setTableFilterData(filteredUser);
    } else {
      let newData = filteredUser.filter((data) => {
        if (
          moment(data.createdAt).unix() > moment(date[0]).unix() &&
          moment(data.createdAt).unix() < moment(date[1]).unix()
        ) {
          return data;
        }
      });
      setTableFilterData(newData);
    }
  };

  useEffect(() => {
    getAllUser();
    console.log("countPerPage",countPerPage,page);
  }, [page, countPerPage]);

  const getAllUser = async () => {
    setIsLoaderVisible(true);
    // if (!search) {
    await ApiGet(`register/getAllRegister?page=${page}&limit=${countPerPage}`)
      .then((res) => {
        setIsLoaderVisible(false);
        console.log("artistreport", res);
        setFilteredUser(res?.data?.payload?.Question);
        setTableFilterData(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  useEffect(() => {
    console.log("inputValue", inputValue);
  }, [inputValue]);

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
      sortable: true,
      // selector: (row) => row?.createdAt,

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
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreUser(true);
                setDataViewMore(row);
                console.log("rowShow", row);
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

  //For Excel Download

  useEffect(() => {
    getAllUserForExcel();
  }, []);

  const getAllUserForExcel = async () => {
    // if (!search) {
    await ApiGet(`register/getAll`)
      .then((res) => {
        console.log("regist", res?.data?.payload?.Question);
        setAllRegisterUserExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };
  useEffect(() => {
    if (allRegisterUserExcel) {
      allRegisterUserExcel.map((registerUser) => {
        let data = {
          CreatedAt: registerUser?.createdAt,
          CreatedBy: registerUser?.createdBy,
          Authority:registerUser?.Authority,
          FirstName: registerUser?.fname,
          MiddleName: registerUser?.mname,
          LastName: registerUser?.lname,
          Gender: registerUser?.gender,
          BloodGroup: registerUser?.bloodGroup,
          ValidTill: moment(registerUser?.validTill).format("ll"),
          Email: registerUser?.email,
          Phone: registerUser?.phone,
          Qualification: registerUser?.qualification,
          DrivingLicenseNumber: registerUser?.drivingLicenseNumber,
          DoB: moment(registerUser?.DoB).format("ll"),
          Address : registerUser?.address,
          City:registerUser?.city,
          District:registerUser?.district,
          State:registerUser?.state,
          Pincode:registerUser?.pincode,
          Authoritycity:registerUser?.authoritycity,
          Authoritydistrict:registerUser?.authoritydistrict,
          PaymentType:registerUser?.type,
          dateofMakePayment: registerUser?.dateofMakePayment === null ? "Payment Panding" : registerUser?.dateofMakePayment,
          IsPaymentDone: registerUser?.isPaymentDone === null ? "Payment Panding" : registerUser?.isPaymentDone,
          paymentId:registerUser?.paymentId === null ? "Payment Panding" : registerUser?.paymentId,
          lcid: registerUser?.lcid,
          IssueDate: moment(registerUser?.issueDate).format("ll"),



          //new test
          // tdid: "61dfe45964926806043a1ea5",
          // uid: "61e53e6c8edfdb46301d51a4",
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
    console.log("UsertCsvReport", allRegisterUserExcel);
  }, [allRegisterUserExcel]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Time Slot</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Course Name"
                  // onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>

            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  // setIsAddCourseName(true);
                  // getAllVehicleCategory();
                  // getAllCourseName();
                }}
                className="btn btn-success mr-2"
              >
                Add Time Slot
              </button>
            </div>
            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Donations.csv"
                style={{
                  //pass other props, like styles
                  backgroundColor: "#F64E60",
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
        </div>
        <DateRangePickerComponent
          placeholder="Enter Date Range"
          startDate={startValue}
          endDate={endValue}
          format="dd-MMM-yy"
          start="Year"
          depth="Year"
          onChange={(e) => {
            console.log("e.target.value", e.target.value);
            handleSetDateData(e.target.value);
          }}
        ></DateRangePickerComponent>
        <div className="p-2 mb-2">
          <DataTable
            columns={columns}
            data={tableFilterData}
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
      {/* view more */}

      {isViewMoreUser ? (
        <Dialog
          fullScreen
          open={isViewMoreUser}
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
            {isViewMoreUser === true ? (
              <div className="honda-container">
                <div className="honda-text-grid">
                  <div className="honda-text-grid-items">
                    <span>First Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.fname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Middle Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.mname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Last Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.lname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Date of Birth:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.DoB,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Qualification:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.qualification,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Gender:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.gender,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Address:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.address,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>State:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.state,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>City:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.city,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>District:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.district,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Email:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.email,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Phone:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.phone,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Pincode:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.pincode,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Permanent DLnumber:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.permanentDLnumber,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Issue Date:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.issueDate,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Valid Till:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.validTill,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Authority:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.Authority,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Blood Group:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.bloodGroup,
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

export default User;
