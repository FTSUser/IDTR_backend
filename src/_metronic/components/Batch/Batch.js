import React, { useEffect, useState, useRef } from "react";
import { saveAs } from "file-saver";

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
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { reject } from "lodash";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import S3 from "react-aws-s3";
import { AwsConfig } from "../../../config/S3Backet/app.config";
import CsvDownload from "react-json-to-csv";
import Logo from "./honda.png";
import ReactToPrint from "react-to-print";
import { ExportCSV } from "./SampleExcel";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ComponentToPrints extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    return (
      <>
      
   
    
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>
                        A joint venture of Transport Department, <br />{" "}
                        Government of Haryana & Honda IDTR
                      </p>
                    </td>
                    <td class="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created:{" "}
                      {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Batch Name: {`${this.props?.data?.name} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>TotalUser: {`${this.props?.data?.totalUser} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>TotalSeat: {`${this.props?.data?.total} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Total user of this batch: {`${this.props?.data?.totalUser} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Examiner: {`${this.props?.data?.Examiner?.email} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Attendance Done?:{" "}
                  {`${this.props?.data?.Examiner?.isAttendence
                    ? "Done"
                    : "Not Yet"
                    } `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Examiner Phone: {`${this.props?.data?.Examiner?.phone} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Course Name:{" "}
                  {`${this.props?.data?.tdid[0]?.cnid?.courseName} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Course Category:{" "}
                  {`${this.props?.data?.tdid[0]?.cnid?.ccid?.courseCategory} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Course Category:{" "}
                  {`${this.props?.data?.tdid[0]?.cnid?.ccid?.ctid?.courseType} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Course Price: {`${this.props?.data?.tdid[0]?.cnid?.price} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Course Duration:{" "}
                  {`${this.props?.data?.tdid[0]?.cnid?.duration} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Mode of exam: {`${this.props?.data?.tdid[0]?.cnid?.mode} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Required Documents:{" "}
                  {`${this.props?.data?.tdid[0]?.cnid?.documentRequired} `}{" "}
                </td>
              </td>
            </tr>
            {/* <tr className="">
              <td>
                <td>Examiner Phone: {`${this.props?.data?.Examiner?.phone} `} </td>
              </td>
            </tr> */}

            {/* <tr class="heading">
              <td>Payment Method</td>
            </tr> */}

            {/* <tr class="details">
              <td>{this.props?.data?.type}</td>
            </tr> */}

            {/* <tr class="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>
            </tr>

            <tr class="item">
              <td>{this.props?.data?.courseName[0]?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr> */}
          </table>
        </div>
      </>
    );
  }
}
class ComponentToPrintsForUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    return (
      <>


<div class="certificate-box-center-alignment">
        <div class="certificate-box">
            <div class="sl-no-box-alignment">
                <div>
                    <label>SL NO: </label>
                    <input type="text" value={`${this?.props?.data?._id} `}/>
                </div>
            </div>
            <div class="header-alignment">
                <div>
                    <img src="https://i.ibb.co/87cN78k/aa.png" />
                </div>
                <div>
                    <h1>Institute of Driver???s Training & Research</h1>
                    <p>A Joint Venture of Transport Department Government of Haryana & Honda</p>
                    <span>UCHANI VILLAGE, Near New Bus Stand, Tehsil and District Kamal Haryana, 132001</span>
                </div>
                <div>
                    <img src="https://i.ibb.co/XLg1jLn/rre.png" />
                </div>
            </div>
            <div class="drivers-certificate-text">
                <h2>DRIVER'S CERTIFICATE</h2>
                <span>Form V</span>
                <p>See Rule 14(e), 17(1) b, 27(d) and 31A(2)</p>
            </div>
            <div class="first-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>Certificate No.: </label>
                        <input type="text" value={`${this?.props?.data?._id} `}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>REG NO: IDTR </label>
                        <input type="text" value={`${this?.props?.data?._id} `}/ >
                    </div>
                </div>
            </div>
            <div class="sec-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>This is to certify that Sh/ Smt/ Kumari</label>
                        <input type="text" value={`${this?.props?.data?.fname } `}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>Sh./Smt. /Son/ Wife / Daughter / of </label>
                        <input type="text" value={`${this?.props?.data?.mname} `}/>
                    </div>
                </div>
            </div>
            <div class="three-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>Residing at </label>
                        <input type="text" value={moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>was enrolled in this institute on</label>
                        <input type="text"value={`${this?.props?.data?.Authority} `}/>
                    </div>
                </div>
            </div>
            <div class="fourth-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>and his/ her name is registered at serial number</label>
                        <input type="text"/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>in our register in Form 14 and that</label>
                    </div>
                </div>
            </div>
            <div class="fifth-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>he/ she has undergone the course of training in driving of</label>
                        <input type="text" value={`${this?.props?.data?.cnid?.courseName} `}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>(mention class of vehicle )</label>
                    </div>
                </div>
            </div>
            <div class="six-row-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <label>according to the syllabus prescribed for a period from</label>
                        <input type="text" value={moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>To</label>
                        <input type="text" value={moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <label>satisfactorily.</label>
                    </div>
                </div>
            </div>
            <div class="footer-content-alignment">
                <div class="sl-no-box-alignment">
                    <div>
                        <input type="text" value={moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}/>
                        <label>Date</label>
                    </div>
                </div>
                <div>
                    <div class="photographer-printed-class">
                      <img src={this?.props?.data?.passportPhoto}/>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <input type="text"/>
                        <label>Authorized Signatory</label>
                    </div>
                </div>
                <div class="sl-no-box-alignment">
                    <div>
                        <input type="text"/>
                        <label>Principal, IDTR karnal</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="certificate-box-center-alignment">
        <div class="certificate-box" style={{display:"flex",alignItems:"center",padding:"80px 120px"}}>
            <div>
                <div class="box-title">
                    <h1>INSTRUCTIONS</h1>
                    <p>IF THIS CERTIFICATE IS LOST, A DUPLICATE COPY WILL BE ISSUED AGANIST PROCESSING CHARGES.</p>
                    <span>THIS GRADATION PATTERN IS GIVEN BELOW</span>
                </div>
                <div class="content-text-style">
                    <span>GRADE "A" ( 90% - 100% ) : EXCELLENT</span>
                    <span>GRADE "B" ( 80% - 89% ) : VERY GOOD</span>
                    <span>GRADE "C" ( 70% - 79% ) : GOOD</span>
                    <span>GRADE "D" ( 60% - 69% ) : PASS</span>
                </div>
            </div>
        </div>
    </div>

        {/* <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>
                        A joint venture of Transport Department, <br />{" "}
                        Government of Haryana & Honda IDTR
                      </p>
                    </td>
                    <td class="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created:{" "}
                      {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>First Name: {`${this?.props?.data?.fname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Middle Name: {`${this?.props?.data?.mname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Last Name: {`${this?.props?.data?.lname} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Email: {`${this?.props?.data?.email} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Phone:{" "}
                  {`${this?.props?.data?.phone
                    ? this?.props?.data?.phone
                    : "No Data"
                    } `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Gender: {`${this?.props?.data?.gender} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Address: {`${this?.props?.data?.address} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>City: {`${this?.props?.data?.city} `} </td>
              </td>
            </tr>
            <tr>
              <td>
                Created: {moment(this?.props?.data?.DoB).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Address: {`${this?.props?.data?.address} `} </td>
              </td>
            </tr>
            <tr>
              <td>
                Date of course:{" "}
                {moment(this?.props?.data?.dateofCourse).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr>
              <td>
                Pass?:{" "}
                {moment(this?.props?.data?.isPass ? "Pass" : "Fail").format(
                  "DD-MM-YYYY "
                )}
              </td>
            </tr>
            <tr>
              <td>
                LCID: {moment(this?.props?.data?.lcid).format("DD-MM-YYYY ")}
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Percentage: {`${this?.props?.data?.percentage}% `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>TotalScore: {`${this?.props?.data?.totalScore} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Status: {`${this?.props?.data?.status} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Type: {`${this?.props?.data?.type} `} </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Authoritydistrict:{" "}
                  {`${this?.props?.data?.authoritydistrict} `}{" "}
                </td>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>
                  Authoritycity: {`${this?.props?.data?.authoritycity} `}{" "}
                </td>
              </td>
            </tr>

       
          </table>
        </div> */}
      </>
    );
  }
}

const Batch = ({ getNewCount, title }) => {
  const ref = React.createRef();
  const itemsRef = useRef([]);
  const itemsRefForUser = useRef([]);
  const [filteredAnnouncement, setFilteredAnnouncement] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [linkData, setLinkData] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateTimezon, setdateTimezon] = useState([]);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreAnnouncement, setIsViewMoreAnnouncement] = useState(false);
  const [date, setDate] = useState(new Date());

  const [description, setDescription] = useState("");
  //new data
  const [isUpdateAnnouncement, setIsUpdateAnnouncement] = useState(false);
  const [isAddAnnouncement, setIsAddAnnouncement] = useState(false);
  const [idForUpdateAnnouncementData, setIdForUpdateAnnouncementData] =
    useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteAnnouncement, setIdForDeleteAnnouncement] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countForBatch, setCountForBatch] = useState(0);
  const [pageForBatch, setPageForBatch] = useState(1);
  const [countPerPageForBatch, setCountPerPageForBatch] = useState(10);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [getExaminer, setgetExaminer] = useState([]);
  const [getDataenter, setgetDataenter] = useState([]);
  const [responseByBatch, setResponseByBatch] = useState([]);
  const [idForgetResponseByBatch, setIdForgetResponseByBatch] = useState();
  const [isPaperViewModel, setIsPaperViewModel] = useState(false);
  const [paperSet, setPaperSet] = useState([]);
  const [allDataForResultDownload, setAllDataForResultDownload] = useState([]);
  const [allDataForAttendance, setAllDataForAttendance] = useState([]);
  const [dataCSVResults, setDataCSVResults] = useState([]);
  const [dataCSVForAttendance, setDataCSVForAttendance] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(date));

  useEffect(() => {
    document.title = "Honda | Batch Creation";
    getDateAndApi(new Date());
  }, []);

  // S3 link for image start

  // S3 link for image End
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

  const handleViewMoreClose = () => {
    setIsViewMoreAnnouncement(false);
    setDataViewMore({});
    setIdForgetResponseByBatch("");
    setResponseByBatch([]);
    setPageForBatch(1);
    setCountForBatch(0);
  };



  // useEffect(() => { }, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setDescription("");
    setDate(new Date());
    setShow(false);
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
    setIsUpdateAnnouncement(false);
    setdateTimezon([]);
    setbatchInfo([]);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setDescription([]);
    setDate(new Date());
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
    setdateTimezon([]);
    setbatchInfo([]);
  };

  const handleViewMorePaper = () => {
    setIsPaperViewModel(false);
  };

  const handleClose = () => {
    setShow(false);
    setInputValue({});
    setDescription([]);
    setdateTimezon([]);
    setbatchInfo([]);
    setDate(new Date());
    getDateAndApi(new Date());
    setIsAddAnnouncement(false);
    getAllAnnouncement();
  };

  useEffect(() => {
    getAllAnnouncement();
  }, [page, countPerPage]);

  const getAllAnnouncement = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`batch/getAllBatch?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => { });
    } else {
      await ApiGet(
        `batch/getAllBatch?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.batch);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => { });
    }
  };

  const getDateAndApi = async (selectdate) => {
    selectdate = new Date(selectdate);
    setIsLoaderVisible(true);
    await ApiGet(
      `trainingDate/getData?date=${selectdate.getFullYear() +
      "-" +
      (selectdate.getMonth() < 9
        ? "0" + (selectdate.getMonth() + 1)
        : selectdate.getMonth() + 1) +
      "-" +
      (selectdate.getDate() < 9
        ? "0" + selectdate.getDate()
        : selectdate.getDate())
      }`
    )
      .then((res) => {
        setdateTimezon(
          res?.data?.payload?.subMenu ? res?.data?.payload?.subMenu : []
        );
      })
      .catch((err) => {
        setdateTimezon([]);
      });
  };

  const getExaminerAndApi = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`admin/get-examiners`)
      .then((res) => {
        setgetExaminer(
          res?.data?.payload?.Examiner ? res?.data?.payload?.Examiner : []
        );
      })
      .catch((err) => {
        setgetExaminer([]);
      });
  };
  const getDataenterAndApi = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`admin/get-dataentry`)
      .then((res) => {
        setgetDataenter(
          res?.data?.payload?.DataEntry ? res?.data?.payload?.DataEntry : []
        );
      })
      .catch((err) => {
        setgetDataenter([]);
      });
  };
  const saveFile = (data, name) => {

    saveAs(
      data, name + '.zip'
    );
  };
  const genereateAllPDF = async (data) => {

    setIsLoaderVisible(true);
    await ApiGet(`generatepdf/generate-pdf/${data}`)
      .then((res) => {


        saveFile(res.data?.payload?.ZipLink, res.data?.payload?.batch?.name)
        setIsLoaderVisible(false);

      })
      .catch((err) => {
        setIsLoaderVisible(false);

      });
  }



  //getResponseByBatch

  useEffect(() => {
    if (idForgetResponseByBatch) {
      getResponseByBatch(idForgetResponseByBatch);
    }
  }, [pageForBatch, countPerPageForBatch]);

  const getResponseByBatch = async (id) => {
    await ApiGet(
      `register/getRegisterByBatch/${id}?page=${pageForBatch}&limit=${countPerPageForBatch}`
    )
      .then((res) => {

        setResponseByBatch(res?.data?.payload?.users);
        setCountForBatch(res?.data?.payload?.count);
      })
      .catch((err) => {
        // toast.error(err?.message);
     
      });
  };

  const getAllResponseByBatch = async (id) => {
    await ApiGet(`response/getResponseByUserWithoutPagination/${id}`)
      .then((res) => {

        setAllDataForResultDownload(res?.data?.payload?.findResponse);
      })
      .catch((err) => {

      });
  };

  const getAllResponseByBatchForUser = async (id) => {
    await ApiGet(`response/getResponseByBatch/${id}`)
      .then((res) => {

        setAllDataForAttendance(res?.data?.payload?.findResponse);
      })
      .catch((err) => {
    
      });
  };

  const getPapersetByUserId = async (id) => {
    await ApiGet(`response/getResponseByUser/${id}`)
      .then((res) => {

        setPaperSet(res?.data?.payload?.Response[0]);
      })
      .catch((err) => {
        toast.error(err?.message);

      });
  };

  useEffect(() => {
    getExaminerAndApi();
    getDataenterAndApi();
  }, []);



  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};

    if (inputValueForAdd && !inputValueForAdd.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please enter batch name!";
    }

    if (inputValueForAdd && !date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please upload date!";
    }
    if (batchInfo?.length === 0) {
      formIsValid = false;
      errorsForAdd["batchInfo"] = "*Please select batch!";
    }

    if (inputValueForAdd && !inputValueForAdd.DataEntry) {
      formIsValid = false;
      errorsForAdd["DataEntry"] = "*Please upload dataentry!";
    }

    if (inputValueForAdd && !inputValueForAdd.Examiner) {
      formIsValid = false;
      errorsForAdd["Examiner"] = "*Please upload examiner!";
    }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddAnnouncementDetails = (e) => {
    e.preventDefault();
    if (dateTimezon.length === 0) {
      toast.error("No slot available for this date");
    }
    if (validateFormForAddAdmin()) {
      let Data = {
        name: inputValueForAdd.name,
        date: date,
        tdid: batchInfo,
        Examiner: inputValueForAdd.Examiner,
        DataEntry: inputValueForAdd.DataEntry,
      };
      ApiPost(`batch/addBatch`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
            setDescription([]);
            setdateTimezon([]);
            setbatchInfo([]);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please Enter Batch Name!";
    }

    if (inputValue && !date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please Upload Date!";
    }
    if (batchInfo?.length === 0) {
      formIsValid = false;
      errorsForAdd["batchInfo"] = "*Please Select Batch!";
    }

    if (inputValue && !inputValue.DataEntry) {
      formIsValid = false;
      errorsForAdd["DataEntry"] = "*Please Upload DataEntry!";
    }

    if (inputValue && !inputValue.Examiner) {
      formIsValid = false;
      errorsForAdd["Examiner"] = "*Please Upload Examiner!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteAnnouncement = () => {
    ApiDelete(`batch/deleteBatch/${idForDeleteAnnouncement}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllAnnouncement();
          // {
          //   document.title === "Dashboard | OUR LEISURE HOME" && getNewCount();
          // }
          setPage(1);
          setCount(0);
          setCountPerPage(countPerPage);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  // const getResultData = async (id) => {
  //   await ApiGet(`response/getResponseByUser/${id}`)
  //     .then((res) => {
  
  //       // setResultData(res?.data?.payload?.user);
  //     })
  //     .catch((err) => {
  //       toast.error(err?.response?.data?.message);
  //     });
  //   // }
  // };

  useEffect(() => { }, [inputValue]);

  const handleUpdateAnnouncementDetails = (e) => {
    e.preventDefault();

    // if (dateTimezon.length === 0) {
    //   toast.error("No slot available for this date");
    // }

    if (validateForm()) {
      let Data = {
        name: inputValue.name,
        date: date,
        tdid: batchInfo,
        Examiner: inputValue.Examiner,
        DataEntry: inputValue.DataEntry,
      };
      ApiPut(`batch/updateBatch/${idForUpdateAnnouncementData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsUpdateAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValue({});
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
            setDescription([]);
            setdateTimezon([]);
            setbatchInfo([]);
            setDescription("");
            setDate(new Date());
            getAllAnnouncement();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
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
      name: "Batch Name",
      selector: "name",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.name,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },

    {
      name: "Date",
      selector: "date",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: moment(row?.date).format("ll"),
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },

    {
      name: "Seat",
      selector: "numberOFUser",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.total,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Total User",
      selector: "totalUser",
      cell: (row) => {
        return (
          <>
            {row?.totalUser ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: row?.totalUser,
                }}
                className=""
              />
            ) : (
              <p>{"-"}</p>
            )}
          </>
        );
      },
      sortable: true,
    },
    // {
    //   name: "Course Name",
    //   selector: "courseName",
    //   cell: (row) => {
    //     return (
    //       <>
    //         {row?.totalUser ? (
    //           <p
    //             dangerouslySetInnerHTML={{
    //               __html: row?.tdid[0].cnid?.courseName,
    //             }}
    //             className=""
    //           />
    //         ) : (
    //           <p>{"-"}</p>
    //         )}
    //       </>
    //     );
    //   },
    //   sortable: true,
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
                  setInputValue({
                    name: row?.name,
                    date: row?.date,
                    _id: row?._id,
                    DataEntry: row?.DataEntry._id,
                    Examiner: row?.Examiner._id,
                  });

                  setdateTimezon(row?.tdid);
                  setIsUpdateAnnouncement(true);
                  setIdForUpdateAnnouncementData(row._id);
                  getExaminerAndApi();
                  getDataenterAndApi();
                  // getDateAndApi(row?.date);
                  setDate(new Date(row?.date));
                  const tdidId = row?.tdid.map((data) => {
                    return data._id;
                  });
                  setbatchInfo(tdidId);
                }}
              >
                <Tooltip title="Edit Batch" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteAnnouncement(row?._id);
              }}
            >
              <Tooltip title="Delete Batch" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIdForgetResponseByBatch(row?._id);
                setIsViewMoreAnnouncement(true);
                setDataViewMore(row);
                getResponseByBatch(row?._id);
                getAllResponseByBatch(row?._id);
                getResponseByBatch(row?._id);
                getAllResponseByBatchForUser(row?._id);
              }}
            >
              <Tooltip title="Show More" arrow>
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
            {/* <div className="cursor-pointer pl-2">
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Generate Pdf" arrow>
                    <img src="media/allIconsForTable/invoice.png" />
                  </Tooltip>
                )}
                content={() => itemsRef.current[row._id]}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={(el) => (itemsRef.current[row._id] = el)}
                  id={row?._id}
                >
                  <ComponentToPrints data={row} />
                </div>
              </div>
            </div> */}
            <div className="cursor-pointer pl-2">
              <Tooltip title="Generate Pdf" arrow >
                <img src="media/allIconsForTable/invoice.png" onClick={(e) => genereateAllPDF(row?._id)} />
              </Tooltip>
            </div>
          </>
        );
      },
    },
    // {
    //   name: "Test Data",
    //   cell: (row) => {
    
    //     return (
    //       <>
    //         {row?.completeResponse && (
    //           <div
    //             className="cursor-pointer pl-2"
    //             onClick={async () => {
    //               await getResultData(row?.User[0]?._id);
    //               // setModelForUserLogs(true);
    //             }}
    //           >
    //             <button className="btn btn-success mr-2">User Logs</button>
    //           </div>
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  const columnsUser = [
    {
      name: "SNo",
      cell: (row, index) =>
        (pageForBatch - 1) * countPerPageForBatch + (index + 1),
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
      cell: (row) => {
        return (
          <>
            <p>{row?.email ? row?.email : "-"}</p>
          </>
        );
      },
    },
    {
      name: "First Name",
      selector: "fname",
      cell: (row) => {
        return (
          <>
            <p>{row?.fname ? row?.fname : "-"}</p>
          </>
        );
      },
    },
    {
      name: "Middle Name",
      selector: "mname",
      cell: (row) => {
        return (
          <>
            <p>{row?.mname ? row?.mname : "-"}</p>
          </>
        );
      },
    },
    {
      name: "Last Name",
      selector: "lname",
      cell: (row) => {
        return (
          <>
            <p>{row?.lname ? row?.lname : "-"}</p>
          </>
        );
      },
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              {row?.isPaperDone && (
                <div
                  className="cursor-pointer pl-2"
                  onClick={() => {
                    setIsPaperViewModel(true);
                    getPapersetByUserId(row?._id);
                  }}
                >
                  <div className="cus-medium-button-style">
                    <button className="btn btn-success mr-2">
                      View Paperset
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="cursor-pointer pl-2">
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Generate Pdf" arrow>
                    <img src="media/allIconsForTable/invoice.png" />
                  </Tooltip>
                )}
                content={() => itemsRefForUser.current[row._id]}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={(el) => (itemsRefForUser.current[row._id] = el)}
                  id={row?._id}
                >
                  <ComponentToPrintsForUser data={row} />
                </div>
              </div>
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
      getAllAnnouncement();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllAnnouncement();
    }
  }, [debouncedSearchTerm]);

  const [batchInfo, setbatchInfo] = useState([]);

  const getBatch = (e, valueId) => {
    if (batchInfo.includes(valueId)) {
      setbatchInfo((data) => {
        return data.filter((allID) => {
          return allID !== valueId;
        });
      });
    } else {
      setbatchInfo((data) => {
        return [...data, valueId];
      });
    }
  };

  // for excel generation
  useEffect(() => {
    if (allDataForResultDownload) {
      allDataForResultDownload.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id,
          FirstName: registerUser?.uid?.fname,
          LastName: registerUser?.uid?.lname,
          EmailAddress: registerUser?.uid?.email,
          MobileNumber: registerUser?.uid?.phone,
          CourseType: registerUser?.uid?.cnid?.ccid?.ctid?.courseType,
          VehicleCategory:
            registerUser?.uid?.cnid?.ccid?.ctid?.vcid?.vehicleCategory,
          CourseName: registerUser?.uid?.cnid?.courseName,
          DateOfCourse: moment(registerUser?.uid?.dateofCourse).format("ll"),
          LicenseCategory: registerUser?.uid?.lcid,
          DriveringLicenseNo: registerUser?.uid?.drivingLicenseNumber
            ? registerUser?.uid?.drivingLicenseNumber
            : "-",
          CalendarSlotSelected: moment(registerUser?.uid?.tdid?.date).format(
            "ll"
          ),
          TestLanguage: registerUser?.Esid?.language,
          TotalQuestions: registerUser?.Esid?.no,
          QuestionsAnsweredCorrectly: registerUser?.uid?.totalScore,
          QuestionsAnsweredIncorrectly:
            registerUser?.Esid?.no - registerUser?.uid?.totalScore,
          "%": registerUser?.uid?.percentage,
          Status: registerUser?.uid?.isPass,
          NoofAttempts: "-",
          DataEntryUser: registerUser?.batch?.DataEntry?.email,
          DataEntryUserID: registerUser?.batch?.DataEntry?._id,
        };
        setDataCSVResults((currVal) => [...currVal, data]);
      });
    }
  }, [allDataForResultDownload]);

  useEffect(() => {
    if (allDataForAttendance) {
      allDataForAttendance.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id,
          FirstName: registerUser?.uid?.fname,
          LastName: registerUser?.uid?.lname,
          EmailAddress: registerUser?.uid?.email,
          MobileNumber: registerUser?.uid?.phone,
          CourseType: registerUser?.uid?.cnid?.ccid?.ctid?.courseType,

          VehicleCategory:
            registerUser?.uid?.cnid?.ccid?.ctid?.vcid?.vehicleCategory,
          CourseName: registerUser?.uid?.cnid?.courseName,
          DateOfCourse: moment(registerUser?.uid?.dateofCourse).format("ll"),
          LicenseCategory: registerUser?.uid?.lcid,
          DriveringLicenseNo: registerUser?.uid?.drivingLicenseNumber
            ? registerUser?.uid?.drivingLicenseNumber
            : "-",
          CalendarSlotSelected: moment(registerUser?.uid?.tdid?.date).format(
            "ll"
          ),
          ExaminerName: registerUser?.batch?.Examiner?.name,
          ExaminerUserID: registerUser?.batch?.Examiner?._id,
          TestAttendanceStatus: registerUser?.uid?.isAttendence,
          TestAttendanceTimeStamp: moment(registerUser?.uid?.updatedAt).format("lll"),
          TestLanguage: registerUser?.Esid?.language,
          TotalQuestions: registerUser?.Esid?.no,
        };
        setDataCSVForAttendance((currVal) => [...currVal, data]);
      });
    }
  }, [allDataForAttendance]);

  const onBulkUpload = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let formData = new FormData();
      formData.append("csv", e.target.files[0]);
      await ApiPost("batch/uploadcsv", formData)
        .then((res) => {
          if (res.data?.result === 0) {
            getResponseByBatch();
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          let img = document.getElementById("upload");
          img.value = null;
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Please Select Excel File !");
    }
  };

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col ">
              <h2 className=" pt-2"> Batch Creation</h2>

              <div>(Note : Please create batch only before starting the examination.)</div>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Batch Creation"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddAnnouncement(true);
                }}
                className="btn btn-success mr-2"
              >
                Add Batch
              </button>
            </div>
            {/* <div>
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
              >
                Upload Excel File
              </buttton>
            </div> */}
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to want To delete this batch?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteAnnouncement();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredAnnouncement}
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

      {isAddAnnouncement ? (
        <Dialog
          fullScreen
          open={isAddAnnouncement}
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
            {isAddAnnouncement === true ? (
              <div className="form ml-30 ">
                {/* Name Amenintie */}
                {/* <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Date
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="date"
                        name="date"
                        value={inputValueForAdd.date}
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
                      {errorsForAdd["date"]}
                    </span>
                  </div>
                </div> */}

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Batch Name
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
                    Select Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <DatePicker
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        getDateAndApi(date);
                        setErrorsForAdd({ ...errorsForAdd, date: "" });
                      }}
                      minDate={currentDate}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["date"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  {dateTimezon.length > 0 && (
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Slot
                    </label>
                  )}
                  <div className="">
                    {dateTimezon.length > 0 &&
                      dateTimezon.map((data, index) => {
                        return (
                          <div
                            className="d-flex align-items-center check-new-design"
                            key={index}
                          >
                            <input
                              className="mr-3 "
                              type="checkbox"
                              name="getBatch"
                              defaultChecked={data.istrue}
                              value={data._id}
                              onChange={(e) => {
                                getBatch(e, data._id);
                                setErrorsForAdd({
                                  ...errorsForAdd,
                                  batchInfo: "",
                                });
                              }}
                            />
                            <label>
                              {moment(data.startTime).format("ll") +
                                " " +
                                moment(data.startTime).format("LT") +
                                "-" +
                                moment(data.endTime).format("ll") +
                                " " +
                                moment(data.endTime).format("LT")}
                            </label>
                          </div>
                        );
                      })}
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["batchInfo"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Examiner
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="Examiner"
                        name="Examiner"
                        value={inputValueForAdd?.Examiner}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Examiner
                        </option>
                        {getExaminer?.length > 0 &&
                          getExaminer?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValueForAdd?.Examiner === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["Examiner"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select DataEntry
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="DataEntry"
                        name="DataEntry"
                        value={inputValueForAdd?.DataEntry}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select DataEntry
                        </option>
                        {getDataenter?.length > 0 &&
                          getDataenter?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValueForAdd?.DataEntry === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["DataEntry"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleAddAnnouncementDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Add Batch</span>
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

      {isUpdateAnnouncement ? (
        <Dialog
          fullScreen
          open={isUpdateAnnouncement}
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
            {isUpdateAnnouncement === true ? (
              <div className="form ml-30 ">
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Batch Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="name"
                        name="name"
                        value={inputValue.name}
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
                      {errors["name"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <DatePicker
                      disabled
                      id="date"
                      format="DD/MM/YYYY"
                      selected={new Date(date)}
                      onChange={(date) => {
                        setDate(date);
                        getDateAndApi(date);
                        setErrorsForAdd({ ...errorsForAdd, date: "" });
                      }}
                      minDate={currentDate}
                    />
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["date"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  {dateTimezon.length > 0 && (
                    <label className="col-xl-3 col-lg-3 col-form-label">
                      Select Slot
                    </label>
                  )}
                  <div className="form-group">
                    {dateTimezon.length > 0 &&
                      dateTimezon.map((data, index) => {
                        return (
                          <div
                            className="form-group d-flex align-items-center"
                            key={index}
                          >
                            <input
                              className="mr-3 "
                              type="checkbox"
                              name="getBatch"
                              disabled
                              defaultChecked={batchInfo.includes(data._id)}
                              value={data._id}
                              onChange={(e) => {
                                getBatch(e, data._id);
                                setErrorsForAdd({
                                  ...errorsForAdd,
                                  batchInfo: "",
                                });
                              }}
                            />
                            <label>
                              {moment(data.startTime).format("ll") +
                                " " +
                                moment(data.startTime).format("LT") +
                                "-" +
                                moment(data.endTime).format("ll") +
                                " " +
                                moment(data.endTime).format("LT")}
                            </label>
                          </div>
                        );
                      })}
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["batchInfo"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select Examiner
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="Examiner"
                        name="Examiner"
                        value={inputValueForAdd?.Examiner}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select Examiner
                        </option>
                        {getExaminer?.length > 0 &&
                          getExaminer?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  item?._id === inputValue?.Examiner
                                    ? true
                                    : false
                                }
                              >
                                {item.email}
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
                      {errorsForAdd["Examiner"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select DataEntry
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        id="DataEntry"
                        name="DataEntry"
                        value={inputValueForAdd?.DataEntry}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select DataEntry
                        </option>
                        {getDataenter?.length > 0 &&
                          getDataenter?.map((item) => {
                            return (
                              <option
                                key={item._id}
                                value={item?._id}
                                selected={
                                  inputValue?.DataEntry === item?._id
                                    ? true
                                    : false
                                }
                              >
                                {" "}
                                {item.email}{" "}
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
                      {errorsForAdd["DataEntry"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleUpdateAnnouncementDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Update Batch</span>
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

      {/* view more */}

      {isViewMoreAnnouncement ? (
        <Dialog
          fullScreen
          open={isViewMoreAnnouncement}
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
            {isViewMoreAnnouncement === true ? (
              <div className="honda-container">
                <div className="other-information-child-text-style1">
                  <h2>Batch Information</h2>
                </div>
                <div className="honda-text-grid honda-text-grid-border">
                  <div className="honda-text-grid-items">
                    <span>Batch Name:</span>
                    <p>{dataViewMore?.name}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Date:</span>
                    <p>{moment(dataViewMore?.date).format("ll")}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Total Seat:</span>
                    <p>{dataViewMore?.total}</p>
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Total User:</span>
                    <p>
                      {dataViewMore?.totalUser ? dataViewMore?.totalUser : "-"}
                    </p>
                  </div>
                </div>
                <div className="other-information-child-text-style1">
                  <h2>User Data</h2>
                </div>
                <div className="">
                  <div className="cursor-pointer pl-2 d-flex">
                    {allDataForResultDownload?.length > 0 ? (
                      <CsvDownload
                        className={``}
                        data={dataCSVResults}
                        filename="Test Data Report.csv"
                        style={{
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
                          marginRight: "30px"
                        }}
                      >
                        Download Test Data
                      </CsvDownload>
                    ) : (
                      <span className="mr-3">No test Data</span>
                    )}

                    {allDataForAttendance?.length > 0 ? (
                      <CsvDownload
                        className={``}
                        data={dataCSVForAttendance}
                        filename="Attendance Data.csv"
                        style={{
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
                        Download Attendance Data
                      </CsvDownload>
                    ) : (
                      <span>No Attendance Data</span>
                    )}
                  </div>
                  <DataTable
                    columns={columnsUser}
                    data={responseByBatch}
                    customStyles={customStyles}
                    style={{
                      marginTop: "-3rem",
                    }}
                    progressPending={isLoaderVisible}
                    progressComponent={
                      <Loader
                        type="Puff"
                        color="#334D52"
                        height={30}
                        width={30}
                      />
                    }
                    highlightOnHover
                    pagination
                    paginationServer
                    paginationTotalRows={countForBatch}
                    paginationPerPage={countPerPage}
                    paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
                    paginationDefaultPage={pageForBatch}
                    onChangePage={(page) => {
                      setPageForBatch(page);
                    }}
                    onChangeRowsPerPage={(rowPerPage) => {
                      setCountPerPageForBatch(rowPerPage);
                    }}
                  />
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
      {isPaperViewModel ? (
        <Dialog
          fullScreen
          open={isPaperViewModel}
          onClose={handleViewMorePaper}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMorePaper}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isViewMoreAnnouncement === true ? (
              <div className="honda-container">
                <div className="">

                  <div className="questionGrid12121">
                    {paperSet?.ListofQA?.map((data, key) => (
                      <div className="questionGridItems">
                        <div className="flexs mb-10">
                          <div className="questionCircle mr-3" key={key}>
                            {" "}
                            {key + 1}
                          </div>
                          <p>{data?.Qname}</p>
                        </div>
                        {data?.image &&
                          <div>
                            <img src={data?.image} alt="" />
                          </div>
                        }

                        <div className="">
                          Right / Wrong:{" "}
                          <span>
                            {data.isRight ? (
                              <div className="green">Right</div>
                            ) : (
                              <div className="red">Wrong</div>
                            )}
                          </span>
                        </div>
                        <div>
                          {data?.Option.map((record, i) => (
                            <>
                              {record?.istrue}

                              {data?.Answer?.findIndex(
                                (e) => e === record?.no
                              ) !== -1 ? (
                                <div className="">
                                  <b>{record?.name}</b>
                                </div>
                              ) : (
                                <div className="">{record?.name}</div>
                              )}

                              {/* {data.type === "mcq" ? (
                                <>
                                  <div
                                    className="d-flex align-items-baseline"
                                    key={i}
                                  >
                                    <input
                                      type="radio"
                                      name={key}
                                      id="radio"
                                      defaultChecked={record?.istrue}
                                      disabled
                                    />
                                    <span className="pl-2">
                                      {" "}
                                      {record?.name}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div
                                    className="d-flex align-items-baseline"
                                    key={i}
                                  >
                                    <input type="checkbox" id={record?.name} />

                                    <span className="pl-2">
                                      {" "}
                                      {record?.name}
                                    </span>
                                  </div>
                                </>
                              )} */}
                            </>
                          ))}
                        </div>
                      </div>
                    ))}
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

export default Batch;
