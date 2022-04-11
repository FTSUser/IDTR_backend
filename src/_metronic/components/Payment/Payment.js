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
import CsvDownload from "react-json-to-csv";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Payment = ({ getNewCount, title }) => {
  const [filteredPayment, setFilteredPayment] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMorePayment, setIsViewMorePayment] = useState(false);

  const [description, setDescription] = useState("");

  //new data
  const [isUpdatePayment, setIsUpdatePayment] = useState(false);
  const [isAddPayment, setIsAddPayment] = useState(false);
  const [idForUpdatePaymentData, setIdForUpdatePaymentData] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeletePayment, setIdForDeletePayment] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Honda | Payment History";
  }, []);

  const handleViewMoreClose = () => {
    setIsViewMorePayment(false);
    setDataViewMore({});
  };

  useEffect(() => {
  }, [inputValueForAdd]);

  useEffect(() => {
  }, [idForEditStatus]);

  useEffect(() => {
    getAllPayment();
  }, [page, countPerPage]);

  const getAllPayment = async () => {
    setIsLoaderVisible(true);
    // if (!search) {
    await ApiGet(`payment/getAllPayment?page=${page}&limit=${countPerPage}`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredPayment(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
    // }
  };

  useEffect(() => {
  }, [inputValue]);

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "User Name",
      cell: (row) => {
        return (
          <span>{row?.uid === null || !row?.uid ? "-" : row?.uid?.firstName}</span>
        );
      },
      selector: (row) => row?.uid?.email,
      sortable: true,
    },
    // {
    //   name: "User Email",
    //   cell: (row) => {
    //     return (
    //       <span>{row?.uid === null || !row?.uid ? "-" : row?.uid?.email}</span>
    //     );
    //   },
    //   selector: (row) => row?.uid?.email,
    //   sortable: true,
    // },
    {
      name: "Mobile Number",
      cell: (row) => {
        return (
          <span>{row?.uid === null || !row?.uid ? row?.phone : row?.uid?.phone}</span>
        );
      },
      selector: (row) => row?.uid?.phone,
      sortable: true,
      width: "150px",
    },
    {
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.created).format("ll")}</span>;
      },
      selector: (row) => row?.created,
      sortable: true,

      width: "150px",

    },
    {
      name: "Time",
      cell: (row) => {
        return <span>{moment(row?.created).format("LT")}</span>;
      },
      selector: (row) => row?.created,
      sortable: true,

      // width: "65px",
    },
    {
      name: "Payment Amount",
      cell: (row) => {
        return <span>{row?.cnid === null ? "-" : row?.cnid?.price}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,

      // width: "65px",
    },
    {
      name: "Payment Type",
      cell: (row) => {
        return (
          <span>{row?.type === null || !row?.type ? "online" : row?.type}</span>
        );
      },
      selector: (row) => row?.createdAt,
      sortable: true,

     
    },

    {
      name: "Course Name",
      cell: (row) => {
        return <span>{row?.cnid === null ? "-" : row?.cnid?.courseName}</span>;
      },
      selector: (row) => row?.cnid?.courseName,
      sortable: true,
    },
    {
      name: "Course Type",
      cell: (row) => {
        return (
          <span>
            {row?.ctid === null || !row?.ctid ? "-" : row?.ctid?.courseType}
          </span>
        );
      },
      selector: (row) => row?.ctid?.courseType,
      sortable: true,
    },
    {
      name: "Vehical Category",
      cell: (row) => {
        return (
          <span>
            {row?.vcid === null || !row?.vcid
              ? "-"
              : row?.vcid?.vehicleCategory}
          </span>
        );
      },
      selector: (row) => row?.vcid?.vehicleCategory,
      sortable: true,
    },

    // {
    //   name: "Gender",
    //   selector: "gender",
    //   sortable: true,
    // },

    // {
    //   name: "Actions",
    //   cell: (row) => {
    //     return (
    //       <>
    //         <div
    //           className="cursor-pointer pl-2"
    //           onClick={() => {
    //             setIsViewMoreAboutus(true);
    //             setDataViewMore(row);
    //           
    //           }}
    //         >
    //           <Tooltip title="Show More" arrow>
    //             <InfoOutlinedIcon />
    //           </Tooltip>
    //         </div>
    //       </>
    //     );
    //   },
    // },
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
  //for excel file
  const [allPaymentDetailsExcel, setAllPaymentDetailsExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  useEffect(() => {
    getAllPaymentDetailsForExcel();
  }, []);

  const getAllPaymentDetailsForExcel = async () => {
    // if (!search) {
    await ApiGet(`payment/getAll`)
      .then((res) => {
        setAllPaymentDetailsExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
    // }
  };
  useEffect(() => {
    if (allPaymentDetailsExcel) {
      allPaymentDetailsExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          email: registerUser?.uid?.email,
          name: registerUser?.uid?.firstName,
          UserID: registerUser?.uid?._id,
          certificate: registerUser?.cnid?.certificate,
          courseName: registerUser?.cnid?.courseName,
          createdAt: moment(registerUser?.cnid?.createdAt).format("ll"),
          createdBy: registerUser?.cnid?.createdBy,
          description: registerUser?.cnid?.description,
          documentRequired: registerUser?.cnid?.documentRequired,
          duration: registerUser?.cnid?.duration,
          isPaymentDone: registerUser?.paymentId ? 'True' : 'False',
          PaymentMode: registerUser?.type ? registerUser?.type :'-',
          PaymentAmount: registerUser?.cnid?.price,
          systemRequirement: registerUser?.cnid?.systemRequirement,
          timing: registerUser?.cnid?.timing,
          updatedBy: registerUser?.cnid?.updatedBy,
          validity: registerUser?.cnid?.validity,
          created: moment(registerUser?.cnid?.created).format("ll"),
          courseType: registerUser?.ctid?.courseType,
          createdAtCT: moment(registerUser?.ctid?.createdAt).format("ll"),
          createdByCT: registerUser?.ctid?.createdBy,
          descriptionCT: registerUser?.ctid?.description,
          isActiveCT: registerUser?.ctid?.isActive,
          updatedAtCT: moment(registerUser?.ctid?.updatedAt).format("ll"),
          updatedByCT: registerUser?.ctid?.updatedBy,
          priceCT: registerUser?.ctid?.price,
          createdAtTD: moment(registerUser?.tdid?.createdAt).format("ll"),
          createdByTD: registerUser?.tdid?.createdBy,
          dateTD: registerUser?.tdid?.date,
          endTimeTD: moment(registerUser?.tdid?.endTime).format("LT"),
          seat: registerUser?.tdid?.seat,
          startTimeTD: moment(registerUser?.tdid?.startTime).format("LT"),
          updatedAtTD: moment(registerUser?.tdid?.updatedAt).format("ll"),
          updatedByTD: registerUser?.tdid?.updatedBy,
          IDTRcenter: registerUser?.uid?.IDTRcenter,
          modificationData: moment(registerUser?.uid?.modificationData).format(
            "ll"
          ),
          phone: registerUser?.uid?.phone,
          RegistrationDate: moment(registerUser?.uid?.registrationDate).format(
            "ll"
          ),
          state: registerUser?.uid?.state,
          modificationDate: moment(
            registerUser?.tdid?.status?.modificationDate
          ).format("ll"),
          createdAtVC: moment(registerUser?.vcid?.createdAt).format("ll"),
          createdByVC: registerUser?.vcid?.createdBy,
          descriptionVC: registerUser?.vcid?.description,
          isActiveVC: registerUser?.vcid?.isActive,
          vehicleCategory: registerUser?.vcid?.vehicleCategory,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
  }, [allPaymentDetailsExcel]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Payment History</h2>
            </div>
            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Payment History Report.csv"
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
          <DataTable
            columns={columns}
            data={filteredPayment}
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

      {isViewMorePayment ? (
        <Dialog
          fullScreen
          open={isViewMorePayment}
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
            {isViewMorePayment === true ? (
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

export default Payment;
