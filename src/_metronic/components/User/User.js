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
import { reject } from "lodash";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = ({ getNewCount, title }) => {
  const [filteredUser, setFilteredUser] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
 
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreUser, setIsViewMoreUser] = useState(false);



  //new data
 
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});

  const [idForEditStatus, setIdForEditStatus] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);

 
  const [tableFilterData, setTableFilterData] = useState({});

  const handleViewMoreClose = () => {
    setIsViewMoreUser(false);
    setDataViewMore({});
  };

  const startValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    14
  );
  const endValue = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    15
  );

  useEffect(() =>{
    console.log("tableFilterData",tableFilterData);
  },[tableFilterData])


  const handleSetDateData = (date) => {
    // console.log("1--", date);
    // console.log("--", tableData);
    setTableFilterData({});
    if (!date) {
      setTableFilterData(filteredUser);
    } else {
      tableFilterData.filter((data) => {
        if (
          moment(data.createdAt).unix() > moment(date[0]).unix() &&
          moment(data.createdAt).unix() < moment(date[1]).unix()
        ) {
          //   console.log("in if");
          setTableFilterData((prevState) => {
            return {...prevState, data};
          });
        }
      });
    }
    console.log("filteredUser", tableFilterData);
  };


  useEffect(() => {
    console.log("inputValue", inputValueForAdd);
  }, [inputValueForAdd]);

  useEffect(() => {
    console.log("idForEditStatus", idForEditStatus);
  }, [idForEditStatus]);

  useEffect(() => {
    getAllUser();
  }, [page, countPerPage]);

  const getAllUser = async () => {
    setIsLoaderVisible(true);
    // if (!search) {
    await ApiGet(`register/getAllRegister?page=${page}&limit=${countPerPage}`)
      .then((res) => {
        setIsLoaderVisible(false);
        console.log("artistreport", res);
        setFilteredUser(res?.data?.payload?.Question);
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
        return (
          <span>
            {moment(row?.createdAt).format('ll')}
          </span>
        );
      },
      sortable: true,
      selector: row => row?.createdAt, 

      // width: "65px",
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "fname",
      sortable: true,
    },

    {
      name: "Last Name",
      selector: "lname",
      sortable: true,
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

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <DateRangePickerComponent
              placeholder="Enter Date Range"
              startDate={startValue}
              endDate={endValue}
              format="dd-MMM-yy"
              start="Year"
              depth="Year"
              onChange={(e) => {
                handleSetDateData(e.target.value);
              }}
            ></DateRangePickerComponent>
        <div className="p-2 mb-2">
          <DataTable
            columns={columns}
            data={tableFilterData?.length ===0 ? filteredUser: tableFilterData}
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
              <div className="form ml-30 ">
                <div className="form-group row mb-0">
                  <p>First Name:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.fname,
                    }}
                    className=""
                  />
                </div>
                <div className="form-group row mb-0">
                  <p>Middle Name:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.mname,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Last Name:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.lname,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Date of Birth:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.DoB,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Qualification:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.qualification,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Gender:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.gender,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Address:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.address,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>State:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.state,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>City:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.city,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>District:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.district,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Email:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.email,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Phone:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.phone,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Pincode:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.pincode,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Permanent DLnumber:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.permanentDLnumber,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Issue Date:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.issueDate,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Valid Till:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.validTill,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Authority:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.Authority,
                    }}
                    className=""
                  />
                </div>

                <div className="form-group row mb-0">
                  <p>Blood Group:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.bloodGroup,
                    }}
                    className=""
                  />
                </div>
                {/* <div className="form-group row mb-0">
                  <p>Image:</p>
                </div>
                <div className="form-group row mr-20">
                  <img
                    src={dataViewMore?.passportPhoto}
                    alt=""
                    height="256px"
                    width="256px"
                  />
                </div> */}
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default User;
