import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "./User.scss";

import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../helpers/API/ApiData";
import { Tooltip } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Dialog from "@material-ui/core/Dialog";
import S3 from "react-aws-s3";
import Select from 'react-select';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
import { AwsConfig } from "../../../config/S3Backet/app.config";
import PaymentForm from "../PaymentForm/payment";
import PaymentData from "../PaymentForm/payment";

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
  const [modalOpen, setModalOpen] = useState(false)


  const [tableFilterData, setTableFilterData] = useState({});
  const [setEndValue, endValue] = useState("")
  const [setStartValue, startValue] = useState("")
  const [isAddAnnouncement, setIsAddAnnouncement] = useState(false);
  const [isUpdateAnnouncement, setIsUpdateAnnouncement] = useState(false);
  const [show, setShow] = useState(false);
  const [dicloser, setdicloser] = useState(false);

  const [idForUpdateAnnouncementData, setIdForUpdateAnnouncementData] =
    useState("");
  const handleViewMoreClose = () => {
    setIsViewMoreUser(false);
    setDataViewMore({});
  };

  // const startValue = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   14
  // );
  // const endValue = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth() + 1,
  //   15
  // );
  const [getAllVehicalData, setgetAllVehicalData] = useState({});
  const [getAllCourceType, setgetAllCourceType] = useState({});
  const [getAllCourceName, setgetAllCourceName] = useState({});
  const [getCourseNameByID, setgetNameByID] = useState();
  const [getSeat, setSeat] = useState([]);



  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [VehicalCategoryData, setVehicalCategoryData] = useState("");
  const [TrainningDate, setTrainningDate] = useState("");
  const [CourceTypeData, setCourceTypeData] = useState("");
  const [price, setPrice] = useState("");
  const [cnid, setCNID] = useState("");
  const [alertForSlot, setAlertForSlot] = useState();



  const [submitpayment, setSubmitPayment] = useState(false);
  const [paymentId, setPaymentId] = useState();




  const [CourceType, setCourceType] = useState("");
  const [updateCall, setUpdateCall] = useState(false);



  const [typeTrueFalseform, settypeTrueFalseform] = useState(false);
  const [errorShow, seterrorShow] = useState('');

  const [tab, setTab] = useState("course");

  const [formdata, setFormData] = useState({

    vehicleCategory: '',
    courseType: '',
    courseName: '',
    firstname: '',
    middlename: '',
    lastname: '',
    dateofCourse: '',
    DateofBirth: '',
    qualification: '',
    gender: '',
    address: '',
    state: '',
    driverlicense: '',
    district: '',
    city: '',
    email: '',
    phone: '',
    pin: '',
    license: '',
    issueDate: '',
    validDate: '',
    authority: '',
    passport: null,
    driviniglicencephoto: null,
    idProof: null,
    mediacalCertificate: null,
    bloodgroup: '',
    preferdate: '',
    trainddateid: '',
    sloatId: '',
    authoritycity: '',
    authoritydistrict: '',
    type: ''
  })
  useEffect(() => {
    console.log("tableFilterData", tableFilterData);
  }, [tableFilterData])

  const handleAdminUpdateClose = () => {
    setInputValue({});


    setIsUpdateAnnouncement(false);
  };

  const handleAddAdminClose = () => {
    setInputValue({});


    setIsAddAnnouncement(false);
  };

  const handleClose = () => {
    setShow(false);
  };
  const onChangeDiscloser = (e) => {
    console.log("eee", e);
    setdicloser(e)

  }
  const handleSetDateData = (date) => {
    // console.log("1--", date);
    // console.log("--", tableData);
    setTableFilterData([]);
    if (!date) {
      setTableFilterData(filteredUser);
    } else {
      let newData = filteredUser.filter((data) => {
        if (
          moment(data.createdAt).unix() > moment(date[0]).unix() &&
          moment(data.createdAt).unix() < moment(date[1]).unix()
        ) {
          console.log("inifffffff---", data);
          return data;
        }
        // setTableFilterData((prevState) => {
        //   return {...prevState, data};
        // });
      });
      console.log("newData", newData);
      setTableFilterData(newData)
    }
    console.log("filteredUser", filteredUser);
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
      cell: (row) => {
        return (
          <span>
            {row?.email === "" ? "-" : row?.email}
          </span>
        )
      },
    },
    {
      name: "First Name",
      selector: "fname",
      sortable: true,
      cell: (row) => {
        return (
          <span>
            {row?.fname === "" ? "-" : row?.fname}
          </span>
        )
      },
    },

    {
      name: "Last Name",
      selector: "lname",
      sortable: true,
      cell: (row) => {
        return (
          <span>
            {row?.lname === "" ? "-" : row?.lname}
          </span>
        )
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
            <div
              className="cursor-pointer pl-2"

            >
              {row?.type === "offline" ?
                <Tooltip title="Payment" arrow>
                  <InfoOutlinedIcon />
                </Tooltip> :
                ""
              }

            </div>
            <div
              className="cursor-pointer pl-2"

            >
              {!row?.uid ?
                <>
                  <Tooltip title="Edit" arrow>
                    <CreateIcon onClick={() => {
                      console.log("row=======>", VehicalCategoryData);
                      setIsAddAnnouncement(true);
                      let index = getAllVehicalData?.Question?.findIndex((e) => e._id === row?.vcid)
                      let vehical;
                      if (index !== -1) {
                        vehical = { label: getAllVehicalData?.Question[index].vehicleCategory, value: getAllVehicalData?.Question[index]._id }
                        setVehicalCategoryData(vehical)
                      }
                      setFormData({
                        driverlicense: row?.drivingLicenseNumber,
                        firstname: row?.fname,
                        vehicleCategory: vehical ? vehical : row?.vcid,
                        courseType: row?.ctid,
                        courseName: row?.cnid,
                        license: row?.lcid,
                        dateofCourse: row?.dateofCourse,
                        middlename: row?.mname,
                        lastname: row?.lcid,
                        license: row?.lname,
                        DateofBirth: row?.DoB,
                        qualification: row?.qualification,
                        gender: row?.gender,
                        address: row?.address,
                        state: row?.state,
                        city: row?.city,
                        district: row?.district,

                        authoritycity: row?.authoritycity,
                        authoritydistrict: row?.authoritydistrict,
                        pin: row?.pincode,
                        email: row?.email,
                        phone: row?.phone,






                      })
                    }} />
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <DeleteIcon />
                  </Tooltip>
                </>
                :
                ""
              }

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




  const districts = [
    {
      "name": "Ambala"
    }, {
      "name": "Bhiwani"
    }, { "name": "Charkhi Dadri" },
    {
      "name": "Faridabad"
    }, {
      "name": "Fatehabad"
    }, {
      "name": "Gurgaon"
    }, {
      "name": "Hisar"
    }, {
      "name": "Jhajjar"
    }, {
      "name": "Jind"
    }, {
      "name": "Kaithal"
    }, {
      "name": "Karnal"
    }, {
      "name": "Kurukshetra"
    }, {
      "name": "Mahendragarh"
    }, {
      "name": "Mewat"
    }, {
      "name": "Palwal"
    }, {
      "name": "Panchkula"
    }, {
      "name": "Panipat"
    }, {
      "name": "Rewari"
    }, {
      "name": "Rohtak"
    }, {
      "name": "Sirsa"
    }, {
      "name": "Sonipat"
    }, {
      "name": "Yamunanagar"
    },];

  const city = [

    { "name": "Ambala", },
    { "name": "Asankhurd", },
    { "name": "Assandh", },
    { "name": "Ateli", },
    { "name": "Babiyal", },
    { "name": "Bahadurgarh", },
    { "name": "Barwala", },
    { "name": "Bhiwani", },
    { "name": "Charkhi Dadri", },
    { "name": "Cheeka", },
    { "name": "Ellenabad 2", },
    { "name": "Faridabad", },
    { "name": "Fatehabad", },
    { "name": "Ganaur", },
    { "name": "Gharaunda", },
    { "name": "Gohana", },
    { "name": "Gurgaon", },
    { "name": "Haibat(Yamuna Nagar)", },
    { "name": "Hansi", },
    { "name": "Hisar", },
    { "name": "Hodal", },
    { "name": "Jhajjar", },
    { "name": "Jind" },
    { "name": "Kaithal", },
    { "name": "Kalan Wali", },
    { "name": "Kalka", },
    { "name": "Karnal", },
    { "name": "Ladwa", },
    { "name": "Mahendragarh", },
    { "name": "Mandi Dabwali", },
    { "name": "Narnaul", },
    { "name": "Narwana", },
    { "name": "Palwal", },
    { "name": "Panchkula", },
    { "name": "Panipat", },
    { "name": "Pehowa", },
    { "name": "Pinjore", },
    { "name": "Rania", },
    { "name": "Ratia", },
    { "name": "Rewari", },
    { "name": "Rohtak", },
    { "name": "Safidon", },
    { "name": "Samalkha", },
    { "name": "Shahbad", },
    { "name": "Sirsa", },
    { "name": "Sohna", },
    { "name": "Sonipat", },
    { "name": "Taraori", },
    { "name": "Thanesar", },
    { "name": "Tohana", },
    { "name": "Yamunanagar", },
  ];
  const state = [
    { "name": "Haryana", },

  ];
  const qualification = [
    { "name": "10 Standard Graduate" },
    { "name": "12th Standard Graduate" },
    { "name": "Undergraduate" },
    { "name": "Postgraduate" },

  ];

  const bloodgroupData = [
    { "name": "A+" },
    { "name": "A-" },
    { "name": "B+" },
    { "name": "B-" },
    { "name": "AB+" },
    { "name": "AB-" },
    { "name": "O+" },
    { "name": "O-" },
    { "name": "NA" },


  ]
  const gender = [
    { "name": "Male" },
    { "name": "Female" },
    { "name": "Transgender" },


  ]
  const licenseCategoryData = [
    { "name": "Learner" },
    { "name": "Permanent" },
    { "name": "Renewal" },
    { "name": "NA" },
  ]
  const licenseAuthorityData = [
    { "name": "Haryana" },

  ]
  const history = useHistory();

  const register = () => {
    const data = {
      "vcid": formdata.vehicleCategory,
      "ctid": formdata.courseType,
      "cnid": formdata.courseName,
      "lcid": formdata.license,
      "dateofCourse": formdata.dateofCourse,
      "drivingLicenseNumber": formdata.driverlicense,
      "fname": formdata.firstname,
      "mname": formdata.middlename,
      "lname": formdata.lastname,
      "DoB": formdata.DateofBirth,
      "qualification": formdata.qualification,
      "gender": formdata.gender,
      "address": formdata.address,
      "state": "Haryana",
      "city": formdata.city,
      "district": formdata.district,
      "pincode": formdata.pin,
      "email": formdata.email,
      "phone": formdata.phone,
      "permanentDLnumber": formdata.driverlicense,
      "issueDate": formdata.issueDate,
      "validTill": formdata.validDate,
      "Authority": "Haryana",
      "passportPhoto": formdata.passport,
      "drivingLicense": formdata.driviniglicencephoto,
      "IDproof": formdata.idProof,
      "medicalCertificate": formdata.mediacalCertificate,
      "bloodGroup": formdata.bloodgroup,
      "paymentId": paymentId,
      "uid": userInfo?.payload?.user?._id,
      "tdid": formdata.sloatId,
      "authoritycity": formdata.authoritycity,
      "authoritydistrict": formdata.authoritydistrict,
      "type": formdata.type


    }
    ApiPost("register/addRegister", data)
      .then((res) => {
        if (res?.status == 200) {
          setIsAddAnnouncement(false);
          toast.success(res?.data?.message);
          // setInputValueForAdd({});
          getAllUser();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  console.log("formdata", formdata);
  console.log("slot", formdata.sloatId);
  const onChnageForm = (e) => {
    setFormData((formdataAll) => { return { ...formdataAll, [e.target.name]: e.target.value } })
    settypeTrueFalseform(false);
    seterrorShow('');
  }

  const onChnagSelectField = (e, name) => {
    setFormData((formdataAll) => { return { ...formdataAll, [name]: e.value } })
    settypeTrueFalseform(false);
    seterrorShow('');
  }
  const onChangImage = (e, name) => {
    setFormData((formdataAll) => { return { ...formdataAll, [name]: e } })
    settypeTrueFalseform(false)
    seterrorShow('');
  }
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleOnClick = (e, key) => {

    e.preventDefault();


    if (key === "personal") {
      if (formdata.vehicleCategory == '') {

        seterrorShow('Vehicle Category')
        toast.error(`Sorry! Vehicle Category must be specified`)
        settypeTrueFalseform(true)
      }
      else if (formdata.courseType == '') {
        toast.error(`Sorry! Course Type must be specified`)
        seterrorShow('Course Type')
        settypeTrueFalseform(true)
      }
      else if (formdata.courseName == '') {
        toast.error(`Sorry! Course Name must be specified`)
        seterrorShow('Course Name')
        settypeTrueFalseform(true)
      }

      else if (formdata.license === '') {
        toast.error(`Sorry! License Category must be specified`)
        seterrorShow('License Category ')
        settypeTrueFalseform(true)
      }
      else if (formdata.driverlicense === '') {
        toast.error(`Sorry! Driver's License Number must be specified`)
        seterrorShow(`Driver's License Number`)
        settypeTrueFalseform(true)
      }

      else if (formdata.issueDate === '') {
        toast.error(`Sorry! Issue Date must be specified`)
        seterrorShow('Issue Date')
        settypeTrueFalseform(true)
      }
      else if (formdata.validDate === '') {
        toast.error(`Sorry! Valid Date must be specified`)
        seterrorShow('Valid Date')
        settypeTrueFalseform(true)
      }
      // else if (formdata.authority === '') {
      //   toast.error(`Sorry! License Authority must be specified`)
      //   seterrorShow('License Authority')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata.authoritycity === '') {
        toast.error(`Sorry! License Authority City must be specified`)
        seterrorShow('License Authority City')
        settypeTrueFalseform(true)
      }
      else if (formdata.authoritydistrict === '') {
        toast.error(`Sorry! License Authority District must be specified`)
        seterrorShow('License Authority Disctrict')
        settypeTrueFalseform(true)
      }
      else if (formdata.preferdate === '') {
        toast.error(`Sorry! Preferred Training Date must be specified`)
        seterrorShow('Preferred Training Date')
        settypeTrueFalseform(true)
      }
      else if (formdata.sloatId === '') {
        toast.error(`Sorry! Slot must be specified`)
        seterrorShow('Slot')
        settypeTrueFalseform(true)
      }
      else if (alertForSlot === 0) {
        toast.error(`Sorry! Sloat Not Available`)
        seterrorShow('Sloat Not Available')
        settypeTrueFalseform(true)
      }
      else {
        setTab(key)
      }
    }
    else if (key === "document") {
      if (formdata.firstname === '') {
        toast.error(`Sorry! First name must be specified`)
        seterrorShow('First name')
        settypeTrueFalseform(true)
      }

      else if (formdata.DateofBirth === '') {
        toast.error(`Sorry! Date of Birth must be specified`)
        seterrorShow('Date of Birth')
        settypeTrueFalseform(true)
      }

      else if (formdata.qualification === '') {
        toast.error(`Sorry! Qualification must be specified`)
        seterrorShow('Qualification')
        settypeTrueFalseform(true)
      }
      else if (formdata.gender === '') {
        toast.error(`Sorry! Gender must be specified`)
        seterrorShow('Gender')
        settypeTrueFalseform(true)
      }
      else if (formdata.address === '') {
        toast.error(`Sorry! Address must be specified`)
        seterrorShow('Address')
        settypeTrueFalseform(true)
      }
      // else if (formdata.state === '') {
      //   toast.error(`Sorry! State must be specified`)
      //   seterrorShow('State')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata.district === '') {
        toast.error(`Sorry! District must be specified`)
        seterrorShow('District')
        settypeTrueFalseform(true)
      }
      else if (formdata.city === '') {
        toast.error(`Sorry! City must be specified`)
        seterrorShow('City')
        settypeTrueFalseform(true)
      }
      else if (formdata.pin === '') {
        toast.error(`Sorry! PIN must be specified`)
        seterrorShow('PIN')
        settypeTrueFalseform(true)
      }
      else if (formdata.phone === '') {
        toast.error(`Sorry! Phone must be specified`)
        seterrorShow('Phone')
        settypeTrueFalseform(true)
      }
      else {
        seterrorShow('')
        settypeTrueFalseform(false)
        setTab(key)
      }
    }

    else if (key === "payment") {

      if (formdata.passport === null) {
        toast.error("Select passport photo")
        seterrorShow('Passport Photo')
        settypeTrueFalseform(true)
      }
      else if (formdata.driviniglicencephoto === null) {
        toast.error("Select driving license photo")
        seterrorShow('Driving license photo')
        settypeTrueFalseform(true)
      }

      else if (typeof formdata.passport === "object" && typeof formdata.driviniglicencephoto === "object" && typeof formdata.idProof === "object" && typeof formdata.mediacalCertificate === "object") {
        toast.error("Please click on upload button")
      }
      else {
        seterrorShow('')
        settypeTrueFalseform(false)
        setTab(key)
      }

    }
    else {
      seterrorShow('')
      settypeTrueFalseform(false)
      setTab(key)
    }
  };
  const previousClick = (e, key) => {
    if (key === "course") {
      setTab(key)

    } else if (key === "personal") {
      setTab(key)
    } else if (key === "document") {
      setTab(key)
    } else if (key === "payment") {
      setTab(key)
    }
  }


  const getAllVehicleCategory = () => {
    ApiGet('vehicleCategory/getAllVehicleCategory?page=${page}&limit=1000',).then((res) => {
      setgetAllVehicalData(res.data.payload);
    })
  }

  const getAllCourseType = () => {

    setFormData({
      ...formdata, courseType: '',
      courseName: '',
    })
    setgetAllCourceName()
    setgetAllCourceType()
    const data = {
      vehicleCategory: VehicalCategoryData
    }
    ApiPost('courseType/getCoursetypeByVehiclecategory?page=${page}&limit=1000', data).then((res) => {
      setgetAllCourceType(res.data.payload);
    })
  }
  const getCourseNames = () => {
    ApiGet(`courseName/getCourseNameById/${cnid}`,).then((res) => {

      setgetNameByID(res.data.payload.Property);

    })
  }

  useEffect(() => {
    if (cnid) {
      getCourseNames()
    }
  }, [cnid])

  const getAllCourseName = () => {
    const data = {
      courseType: CourceTypeData,
      vehicleCategory: VehicalCategoryData


    }
    ApiPost('courseName/getCoursenameByCoursetype?page=${page}&limit=1000', data).then((res) => {


      setgetAllCourceName(res.data.payload);

    })
    setUpdateCall(false)
  }

  useEffect(() => {
    if (updateCall) {
      getAllCourseName()
    }
  }, [updateCall])
  useEffect(() => {

    if (formdata.vehicleCategory) {
      getAllCourseType()
    }
  }, [formdata?.vehicleCategory])


  useEffect(() => {
    getAllVehicleCategory();
  }, []);
  const getTrainignDate = () => {
    const data = {
      date: formdata.preferdate,
      coursenameid: formdata.courseName
    }
    ApiGet(`trainingDate/getDate?date=${data.date}&cnid=${data.coursenameid}`,).then((res) => {
      if (res.data.payload) {
        // setTimeout(() => {
        setSeat(res.data.payload?.subMenu)
        // }, 1000);
      }

    })
  }
  const checkTrainnigDate = () => {
    if (formdata.preferdate && formdata.courseName) {
      getTrainignDate()
    }
  }
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const uploadCertificate = async () => {
    let urls = {};
    if (formdata.passport && formdata.driviniglicencephoto) {
      if (formdata.passport) {
        let passport1 = await uploadS3bucket(formdata.passport);
        urls = { passport: passport1, ...urls }
      }
      if (formdata.driviniglicencephoto) {
        let driviniglicencephoto = await uploadS3bucket(formdata.driviniglicencephoto);
        urls = { driviniglicencephoto: driviniglicencephoto, ...urls }
      }
      if (formdata.mediacalCertificate) {
        let mediacalCertificate = await uploadS3bucket(formdata.mediacalCertificate);
        urls = { mediacalCertificate: mediacalCertificate, ...urls }
      }
      if (formdata.idProof) {
        let idProof = await uploadS3bucket(formdata.idProof);
        urls = { idProof: idProof, ...urls }
      }
      setFormData({ ...formdata, ...urls })
    } else {
      toast.error("Please Select file before Uploading");
    }
  }

  const uploadS3bucket = async (file) => {
    let config = AwsConfig;
    config = {
      ...config,
      dirName: "Cerificate",
      ACL: "public-read",

    };
    const Reacts3Client = new S3(config);
    let urls;
    let f = file;

    let filename = "AboutImage(" + new Date().getTime() + ")";
    let data = await Reacts3Client.uploadFile(f, filename);
    // try {
    // if (data.status === 204) {
    urls = data.location;
    return urls
    //   } else {
    //     toast.error("Failed to upload image:", f.name);

    //   }
    // } catch (err) {

    // }
  }
  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Add</h2>
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
                  setIsAddAnnouncement(true);
                }}
                className="btn btn-success mr-2"
              >
                Add
              </button>
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
              <div className="register-page-alignment ">
                <div className="container">
                  <div className="breadcrumbs-alignment">

                  </div>
                  <div className="page-title-alignment">
                    <h1>
                      Driver Training Course Registration Portal
                    </h1>
                  </div>
                  <div className="tab-design">
                    <ul>
                      <li
                        className={tab === 'course' && "tab-active"}

                      >
                        Course Selection
                      </li>
                      <li
                        className={tab === 'personal' && "tab-active"}

                      >
                        Personal Information
                      </li>
                      <li
                        className={tab === 'document' && "tab-active"}

                      >
                        Document Upload
                      </li>
                      <li
                        className={tab === 'payment' && "tab-active"}

                      >
                        Payment
                      </li>
                    </ul>
                  </div>
                  {tab === 'course' && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>Course Selection</h2>
                      </div>
                      <div className="register-grid">
                        <div className="register-grid-items12">
                          <label>Vehicle Category<span>*</span></label>
                          <Select
                            // styles={colourStyles}
                            // isClearable
                            options={getAllVehicalData?.Question?.map(e => ({ label: e.vehicleCategory, value: e._id }))}
                            name='vehicleCategory'
                            onChange={(e) => {
                              setCourceTypeData('');
                              setCourceType('');
                              onChnagSelectField(e, 'vehicleCategory')
                              setVehicalCategoryData(e.value)
                            }}
                            defaultValue={VehicalCategoryData}
                          />
                        </div>

                        <div className="register-grid-items12">
                          <label>Course Type<span>*</span></label>
                          <Select
                            // isClearable
                            options={getAllCourceType?.courseType?.map(e => ({ label: e.courseType, value: e._id }))}
                            name='courseType'
                            onChange={(e) => {
                              setCourceType('')
                              onChnagSelectField(e, 'courseType')
                              setCourceTypeData(e.value);
                              setUpdateCall(true)
                            }}
                            defaultValue={CourceTypeData}

                          />

                        </div>

                        <div className="register-grid-items12 ">
                          <label>Course Category<span>*</span></label>
                          <Select
                            // isClearable
                            options={getAllCourceName?.courseName?.map(e => ({ label: e.courseName, value: e._id }))}
                            name='courseName'
                            onChange={(e) => {
                              setCourceType(e.value)
                              if (e?.value) {
                                let index = getAllCourceName?.courseName?.findIndex(o => o?._id === e?.value);
                                if (index !== -1) {
                                  setPrice(getAllCourceName?.courseName[index].price)
                                  setCNID(getAllCourceName?.courseName[index]._id)


                                }
                              }
                              onChnagSelectField(e, 'courseName')
                            }}
                            defaultValue={CourceType}
                          />
                        </div>
                        {/* <div className="register-grid-items">
                  <label>Date of Course<span>*</span></label>
                  <input type="date" placeholder="" name='dateofCourse' value={formdata.dateofCourse} onChange={e => onChnageForm(e)} />
                </div> */}
                        <div className="register-grid-items12 ">
                          <label>License Category<span>*</span></label>
                          <Select
                            options={licenseCategoryData.map(e => ({ label: e.name, value: e.name }))}
                            name='license'
                            onChange={e => onChnagSelectField(e, 'license')}
                          />

                        </div>
                        <div className="register-grid-items ">
                          <label>Driver's License No.<span>*</span></label>
                          <input type="text" name='driverlicense' value={formdata.driverlicense} onChange={e => onChnageForm(e)} />
                        </div>
                        <div className="register-grid-items">
                          <label>Issue Date<span>*</span></label>
                          <input type="date" placeholder="" name='issueDate' value={formdata.issueDate} onChange={e => onChnageForm(e)} />
                        </div>
                        <div className="register-grid-items">
                          <label>Valid Till<span>*</span></label>
                          <input type="date" placeholder="" name='validDate' value={formdata.validDate} onChange={e => onChnageForm(e)} />
                        </div>
                        <div className="register-grid-items">

                        </div>
                        <div className="register-grid-items">

                        </div>

                        <div className="register-grid-items12">
                          <label>License Authority<span>*</span></label>


                          <Select
                            options={state.map(e => ({ label: e.name, value: e.name }))}
                            name='authority'
                            onChange={e => onChnagSelectField(e, 'authority')}
                            defaultValue={{ label: "Haryana", value: "Haryana" }}
                          />
                        </div>
                        <div className="register-grid-items12">
                          <label>License Authority District<span>*</span></label>

                          <Select
                            options={districts.map(e => ({ label: e.name, value: e.name }))}
                            name='authoritydistrict'
                            onChange={e => onChnagSelectField(e, 'authoritydistrict')}
                          />
                        </div>
                        <div className="register-grid-items12">
                          <label>License Authority Town / city<span>*</span></label>

                          <Select
                            options={city.map(e => ({ label: e.name, value: e.name }))}
                            name='authoritycity'
                            onChange={e => onChnagSelectField(e, 'authoritycity')}
                          />
                        </div>

                      </div>
                      <div className="full-fill-information">
                        {

                          CourceType ? (
                            <div>
                              <div>
                                <div className="sub-title">
                                  <p>{getCourseNameByID?.courseName}</p>

                                </div>
                                <div className="information">
                                  <p>
                                    <span>Duration:</span> {getCourseNameByID?.duration}
                                  </p>
                                  <p>
                                    <span>System Requirement:</span> {getCourseNameByID?.systemRequirement}
                                  </p>
                                  <p>
                                    <span>System Requirement:</span> Smart Phone, 4 GB data per
                                    day, google meet app, whatsapp{" "}
                                  </p>
                                  <p>
                                    <span>Certificate:</span> {getCourseNameByID?.certificate}
                                  </p>

                                </div>
                              </div>

                            </div>
                          ) : (
                            <div>
                              <div className="sub-title-one">
                                <p>Course Type Description :</p>
                              </div>
                              <div className="information">
                                <p><span>1 Learner:</span>Long duration program suitable for beginner/ new learner</p>
                                <p><span>2 Refresher </span>Short duration program suitable for existing driver</p>
                                <p><span>3 Evaluation </span>Test of driving skill and knowledge</p>
                              </div>
                            </div>
                          )
                        }




                      </div>
                      <div className="register-grid search-button-alignment">
                        <div className="register-grid-items">
                          <label>Preferred Training Date<span>*</span></label>
                          <input type="date" placeholder="Vehicle Category" onChange={e => onChnageForm(e)}
                            name='preferdate' value={formdata.preferdate}
                          />
                        </div>
                        <div className="register-grid-items">
                          {
                            cnid ? <button onClick={(e) => checkTrainnigDate()} >Search</button> : <button className="disabled" >Search</button>
                          }
                        </div>
                      </div>
                      <div>
                        {getSeat && getSeat.length > 0 ?



                          <Carousel responsive={{
                            superLargeDesktop: {
                              // the naming can be any, depends on you.
                              breakpoint: { max: 4000, min: 3000 },
                              items: 4,
                            },
                            desktop: {
                              breakpoint: { max: 3000, min: 1024 },
                              items: 5,
                            },
                            tablet: {
                              breakpoint: { max: 1024, min: 464 },
                              items: 2,
                            },
                            mobile: {
                              breakpoint: { max: 464, min: 0 },
                              items: 1,
                            },
                          }} >
                            {getSeat?.map((data, key) => {
                              return (
                                <div key={key} className={`calender-box un-active-background ${formdata.sloatId === data._id ? "activeSlot" : ''}`}
                                  name="trainddateid" value={formdata.trainddateid} onClick={(e) => {
                                    onChnagSelectField({ value: data?._id }, 'sloatId')
                                    setAlertForSlot(data?.seat)
                                  }}
                                >
                                  <div className="cus-box-alignment">
                                    <h2> {moment(data.date).format(
                                      "YYYY-MM-DD "
                                    )}</h2>
                                    <p> Time: {moment(data.startTime).format(
                                      "h:mm "
                                    )} -  {moment(data.endTime).format(
                                      "h:mm "
                                    )}  </p>

                                    <p>Seat:  {data?.seat ? data?.seat : 'N.A'}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </Carousel>

                          :

                          <div className="calender-box un-active-background">
                            <div className="cus-box-alignment">
                              <h2>No Slot Available</h2>
                            </div>
                          </div>





                        }
                      </div>


                      {typeTrueFalseform && (
                        <div className="alert mt-top">
                          <div className="alert-bottom">
                            <p>Sorry! {errorShow} must be specified
                            </p>
                          </div>
                        </div>
                      )}
                      {/* {
                nameTrueFalse ? (
                  <div className="alert">
                    <div className="alert-bottom">
                      <p>Sorry! Please select course name
                      </p>
                    </div>
                  </div>
                ) : ('')
              } */}

                      <div
                        className="next-step-alignment"

                      >

                        <button onClick={(e) => handleOnClick(e, "personal")} className="fill-button">Next</button>
                      </div>
                    </div>
                  )}
                  {tab === "personal" && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>Personal Information</h2>
                      </div>
                      <div className="Personal-details-background">
                        <p><b>Please fill your personal information!</b></p>
                        <p>All *(star) fields are mandatory</p>
                      </div>
                      <div className="form-boder-box">
                        <div className="register-grid-two">
                          <div className="register-grid-items">
                            <label>First Name<span>*</span></label>
                            <input type="text" placeholder="First Name" name='firstname' value={formdata.firstname} onChange={e => onChnageForm(e)} />
                          </div>
                          <div className="register-grid-items">
                            <label>Middle Name</label>
                            <input type="text" placeholder="Middle Name" name='middlename' value={formdata.middlename} onChange={e => onChnageForm(e)} />
                          </div>
                          <div className="register-grid-items">
                            <label>Last Name</label>
                            <input type="text" placeholder="Last Name" name='lastname' value={formdata.lastname} onChange={e => onChnageForm(e)} />
                          </div>
                          <div className="register-grid-items">
                            <label>Date of Birth<span>*</span></label>
                            <input type="date" name='DateofBirth' value={formdata.DateofBirth} onChange={e => onChnageForm(e)} />
                          </div>

                        </div>
                        <div className="two-col-grid">
                          <div className="register-grid-items12">
                            <label>Qualification<span>*</span></label>
                            {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                            <Select
                              options={qualification.map(e => ({ label: e.name, value: e.name }))}
                              name='qualification'
                              onChange={e => onChnagSelectField(e, 'qualification')}
                            />
                          </div>
                          <div className="register-grid-items12">
                            <label>Gender<span>*</span></label>
                            {/* <input type="text" placeholder="Select" name='gender' value={formdata.gender} onChange={e => onChnageForm(e)} /> */}
                            <Select
                              options={gender.map(e => ({ label: e.name, value: e.name }))}
                              name='gender'
                              onChange={e => onChnagSelectField(e, 'gender')}
                            />
                          </div>
                        </div>
                        <div className="two-col-grid">
                          <div className="register-grid-items register-full-width">
                            <label>Address as per License<span>*</span> (Flat/House No, Locality, Street Name, Locality)</label>
                            <input type="text" placeholder="Street Address" name='address' value={formdata.address} onChange={e => onChnageForm(e)} />
                          </div>
                        </div>
                        <div className="register-grid-one">
                          <div className="register-grid-items12">
                            <label>State<span>*</span></label>
                            {/* <input type="text" placeholder="State" disabled name='state' value={formdata.state} onChange={e => onChnageForm(e)} /> */}
                            <Select
                              options={state.map(e => ({ label: e.name, value: e.name }))}
                              name='state'
                              onChange={e => onChnagSelectField(e, 'state')}
                              defaultValue={{ label: "Haryana", value: "Haryana" }}
                            />
                          </div>
                          <div className="register-grid-items12">
                            <label>District<span>*</span></label>
                            {/* <input type="text" placeholder="District" name='district' value={formdata.district} onChange={e => onChnageForm(e)} /> */}
                            <Select
                              options={districts.map(e => ({ label: e.name, value: e.name }))}
                              name='district'
                              onChange={e => onChnagSelectField(e, 'district')}
                            />
                          </div>
                          <div className="register-grid-items12">
                            <label>Town / city<span>*</span></label>
                            {/* <input type="text" placeholder="city" name='city' value={formdata.city} onChange={e => onChnageForm(e)} /> */}
                            <Select
                              options={city.map(e => ({ label: e.name, value: e.name }))}
                              name='city'
                              onChange={e => onChnagSelectField(e, 'city')}
                            />
                          </div>
                          <div className="register-grid-items">
                            <label>PIN<span>*</span></label>
                            <input type="text"
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              placeholder="Pin" name='pin' value={formdata.pin} onChange={e => onChnageForm(e)} />
                          </div>
                        </div>
                        <div className="two-col-grid">
                          <div className="register-grid-items">
                            <label>Email address<span></span></label>
                            <input type="text" placeholder="Email Address" name='email' value={formdata.email} onChange={e => onChnageForm(e)} />
                          </div>
                          <div className="register-grid-items">
                            <label>Phone<span>*</span></label>
                            <input type="text" placeholder="9874 456 458"
                              maxLength={10}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                              name='phone' value={formdata.phone} onChange={e => onChnageForm(e)} />
                          </div>
                        </div>

                      </div>
                      {typeTrueFalseform && (
                        <div className="alert mt-top">
                          <div className="alert-bottom">
                            <p>Sorry! {errorShow} must be specified
                            </p>
                          </div>
                        </div>
                      )}

                      <div
                        className="next-step-alignment"
                      >
                        <button onClick={(e) => previousClick(e, "course")} className="out-line-button">Previous</button>
                        <button onClick={(e) => handleOnClick(e, "document")} className="fill-button">Next</button>
                      </div>
                    </div>
                  )}
                  {tab === 'document' && (
                    <div className="tab-details-alignment">
                      <div className="tab-details-title">
                        <h2>Document Upload</h2>
                      </div>
                      <div className="upload-decuments-background">
                        <p><b>Please upload documents!</b></p>
                        <ul>
                          <li>Passport size photo must be clear and less than 1 mb(jpg, jpeg, png)</li>
                          <li>Rest all documents less than 5 mb(jpg, jpeg, png, pdf)</li>
                          <li>Name of document should not contain any special characters or space(eg @,)</li>
                        </ul>
                      </div>
                      <div className="photo-upload-from">
                        <p> 1. Passport Photo<span className="star-color">*</span>:  less than 1 mb.(jpg, jpeg, PNG)/ Rest all documents less than 5 mb (jpg, jpeg, PNG, pdf)</p>
                        <input type="file" name='passport' onChange={e => onChangImage(e.target.files[0], "passport")} />
                      </div>
                      <div className="photo-upload-from">
                        <p>2. Driving License<span className="star-color">*</span> (Not valid incase of NA)</p>
                        <input type="file" name='driviniglicencephoto' onChange={e => onChangImage(e.target.files[0], "driviniglicencephoto")} />
                      </div>
                      <div className="photo-upload-from">
                        <p>3. ID Proof: Acceptable formats - Utility Bills (water, electricity, phone or gas bill)/ Aadhaar Card (UID)/Voter ID Card or Election Commission Photo ID Card/Ration Card</p>
                        <input type="file"
                          name='idProof'
                          onChange={e => onChangImage(e.target.files[0], "idProof")} />
                      </div>
                      <div className="photo-upload-from">
                        <p>4. Upload Medical certificate: For Eye vision and color blindness </p>
                        <input type="file" name='mediacalCertificate'
                          onChange={e => onChangImage(e.target.files[0], "mediacalCertificate")} />
                      </div>
                      <div className="photo-upload-from dropdown-style-change">
                        <p>5. Enter Blood Group </p>
                        <div className="register-grid-items12">
                          {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={bloodgroupData.map(e => ({ label: e.name, value: e.name }))}
                            name='bloodgroup'
                            onChange={e => onChnagSelectField(e, 'bloodgroup')}
                          />
                        </div>
                      </div>
                      {typeTrueFalseform && (
                        <div className="alert mt-top">
                          <div className="alert-bottom">
                            <p>Sorry! {errorShow} must be specified
                            </p>
                          </div>
                        </div>
                      )}
                      {
                        formdata.driviniglicencephoto && formdata.passport ?
                          <div className="next-step-alignment">
                            <button className="fill-button" onClick={() => uploadCertificate()}>Upload</button>
                          </div> : <div className="next-step-alignment">
                            <button className="fill-button disabled">Upload</button>
                          </div>
                      }
                      <div
                        className="next-step-alignment"
                      >
                        <button onClick={(e) => previousClick(e, "personal")} className="out-line-button">Previous</button>
                        <button onClick={(e) => handleOnClick(e, "payment")} className="fill-button">Next</button>

                      </div>
                    </div>
                  )}
                  {tab === "payment" && (
                    <div className="tab-details-alignment">
                      <div className="d-flex">
                        {/* <div className="d-flex py-2">
                          <input type="radio"

                            placeholder="online" name='type' value="online" onChange={e => onChnageForm(e)} />
                          <label htmlFor="online">online</label>

                        </div> */}
                        <div className="d-flex py-2">
                          <input type="radio"

                            placeholder="offline" name='type' value="offline" onChange={e => onChnageForm(e)} />
                          <label htmlFor="offline">offline</label>

                        </div>
                      </div>
                      {
                        formdata?.type === 'online' ?
                          <div>
                            <div className="d-flex">
                              <input type="checkbox" onChange={e => onChangeDiscloser(e.target.checked)} checked={dicloser} />
                              <div onClick={() => setModalOpen(!modalOpen)}>Disclooser</div>
                            </div>
                            {dicloser && (
                              <PaymentData price={price} cnid={cnid} vcid={formdata.vehicleCategory} ctid={formdata.courseType} tdid={formdata.sloatId} hhhhh={(data) => {
                                setSubmitPayment(data)

                              }}
                                paymentId={(data) => {
                                  setPaymentId(data)

                                }} />)
                            }
                          </div>
                          : <div>
                            <div className="d-flex">
                              <input type="checkbox" onChange={e => onChangeDiscloser(e.target.checked)} checked={dicloser} />
                              <div onClick={() => setModalOpen(!modalOpen)}>Disclooser</div></div>
                          </div>
                      }
                      <div
                        className="next-step-alignment"
                      >
                        <button className="out-line-button" onClick={(e) => handleOnClick(e, "document")}>Previous</button>

                        {
                          dicloser && (formdata.type === "online" ? submitpayment : true) && <button className="fill-button" onClick={() => register()}>Submit</button>
                        }
                      </div>
                    </div>
                  )}
                  {
                    modalOpen && (
                      <div className='feedback-background-blur'>
                        <div className='feedback-modal'>
                          <div className='modal-header'>
                            <h1>Disclose</h1>
                            <i onClick={() => setModalOpen(false)} class="fas fa-times"></i>
                          </div>
                          <div className='modal-body'>
                            Hello
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}

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
