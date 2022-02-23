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
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { reject } from "lodash";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import moment from "moment";
import S3 from "react-aws-s3";
import { AwsConfig } from "../../../config/S3Backet/app.config";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Announcement = ({ getNewCount, title }) => {
  const [filteredAnnouncement, setFilteredAnnouncement] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [idForUpdateCourseStatus, setIdForUpdateCourseStatus] = useState("");
  const [statusDisplay, setStatusDisplay] = useState(false);

  useEffect(() => {
    document.title = "Honda | Announcement";
  }, []);

  // S3 link for image start

  // S3 link for image End
  const handleOnChnage = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleCloseShowStatus = () => {
    setShowStatus(false);
  };
  const handleUpdateStatusCourseName = (status) => {
    ApiPut(`announcement/updateStatus/${idForUpdateCourseStatus}`, {
      isActive: status,
    })
      .then((res) => {
        if (res?.status == 200) {
          setShowStatus(false);
          toast.success("Status updated Successfully");
          getAllAnnouncement();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  const handleViewMoreClose = () => {
    setIsViewMoreAnnouncement(false);
    setDataViewMore({});
  };

  useEffect(() => { }, [inputValueForAdd]);

  useEffect(() => { }, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setDescription("");
    setDate(new Date());

    setIsUpdateAnnouncement(false);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setDescription([]);
    setDate(new Date());

    setIsAddAnnouncement(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllAnnouncement();
  }, [page, countPerPage]);

  const getAllAnnouncement = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(
        `Announcement/getAllAnnouncement?page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => { });
    } else {
      await ApiGet(
        `Announcement/getAllAnnouncement?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredAnnouncement(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => { });
    }
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (!date) {
      formIsValid = false;
      errorsForAdd["date"] = "*Please Enter date!";
    }
    if (inputValueForAdd && !inputValueForAdd.name) {
      formIsValid = false;
      errorsForAdd["name"] = "*Please Enter Name!";
    }

    if (inputValueForAdd && !inputValueForAdd.type) {
      formIsValid = false;
      errorsForAdd["type"] = "*Please Enter Type!";
    }

    if (!description) {
      formIsValid = false;
      errorsForAdd["description"] = "*Please Enter Description!";
    }
    // if (inputValueForAdd && !inputValueForAdd.image) {
    //   formIsValid = false;
    //   errorsForAdd["image"] = "*Please Upload Image!";
    // }

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddAnnouncementDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        date: date.toLocaleDateString(),
        name: inputValueForAdd.name,
        type: inputValueForAdd.type,
        description: description,
        image: inputValueForAdd.image,
      };
      ApiPost(`Announcement/addAnnouncement`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
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



    // if (files[0].type.includes("image")) {
    //   for (let i in Array.from(files)) {
    //     convertBaseTo64(files.item(i))
    //       .then((file) => {
    //         imageB64Arr.push(file);
    //       })
    //       .catch((err) => {
    //       });
    //   }

    //   setInputValueForAdd((cv) => {
    //     return { ...cv, image: imageB64Arr };
    //   });
    // } else {
    //   errorsForAdd["image"] = "*Please Upload Image!";
    // }
  };

  const uploadS3bucket = async (file) => {
    debugger
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
        let f = file;
        let filename = "AboutImage(" + new Date().getTime() + ")";
        let data = await Reacts3Client.uploadFile(f, filename);
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

  const getImageArrayFromUpdateUpload = async (e) => {
    let files = e.target.files[0];

    if (files.type.includes("image")) {
      let config = AwsConfig;
      config = {
        ...config,
        dirName: "Cerificate",
        ACL: "public-read",
      };
      const Reacts3Client = new S3(config);
      let urls;
      let f = files;
      let filename = "AboutImage(" + new Date().getTime() + ")";
      let data = await Reacts3Client.uploadFile(f, filename);
      // try {
      // if (data.status === 204) {
      urls = data.location;
      if (urls) {
        setInputValue((cv) => {
          return { ...cv, image: urls };
        });
      }
    } else {
      errors["image"] = "*Please Upload Image!";
    }
  };

  const convertBaseTo64 = (file) => {
    return new Promise((resolve, object) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        resolve(fileReader.result);
      };
      fileReader.onerror = function (error) {
        reject(error);
      };
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (!date) {
      formIsValid = false;
      errors["date"] = "*Please Enter date!";
    }

    if (inputValue && !inputValue.name) {
      formIsValid = false;
      errors["name"] = "*Please Enter Name!";
    }

    if (inputValueForAdd && !inputValue.type) {
      formIsValid = false;
      errors["type"] = "*Please Enter Type!";
    }

    if (!description) {
      formIsValid = false;
      errors["description"] = "*Please Enter Description!";
    }
    // if (inputValue && !inputValue.image) {
    //   formIsValid = false;
    //   errors["image"] = "*Please Upload Image!";
    // }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteAnnouncement = () => {
    ApiDelete(`Announcement/deleteAnnouncement/${idForDeleteAnnouncement}`)
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

  useEffect(() => { }, [inputValue]);

  const handleUpdateAnnouncementDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let Data = {
        date: date,
        name: inputValue.name,
        type: inputValue.type,
        description: description,
        image: inputValue.image,
      };
      ApiPut(
        `Announcement/updateAnnouncement/${idForUpdateAnnouncementData}`,
        Data
      )
        .then((res) => {
          if (res?.status == 200) {
            setIsUpdateAnnouncement(false);
            toast.success(res?.data?.message);
            setInputValue({});
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
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.date).format("ll")}</span>;
      },
      sortable: true,
      selector: (row) => row?.date,

      // width: "65px",
    },

    {
      name: "Name",
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
      name: "Type",
      selector: "type",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.type,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },

    {
      name: "Description",
      selector: "description",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.description,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Image",
      //   selector: "photo",
      cell: (row) => {
        return (
          <>
            <div className="p-3">
              <img className="max-w-50px zoom" alt="img" src={row?.image} />
            </div>
          </>
        );
      },
      wrap: true,
    },
    {
      name: "Actions",
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
                <div className="cus-medium-button-style widthfixed">
                  <button className="btn btn-success mr-2">
                    {row?.isActive === true ? "Active" : "Deactive"}
                  </button>
                </div>
              </Tooltip>
            </div>
            <div className="d-flex justify-content-between">
           
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsUpdateAnnouncement(true);
                  setIdForUpdateAnnouncementData(row._id);

                  setDate(row?.date);
                  setDescription(row?.description);
                  setInputValue({
                    name: row?.name,
                    type: row?.type,
                    image: row?.image,
                  });
                }}
              >
                <Tooltip title="Edit Announcement" arrow>
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
              <Tooltip title="Delete Announcement" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreAnnouncement(true);
                setDataViewMore(row);
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

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2"> Announcement</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Announcement"
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
                Add Announcement
              </button>
            </div>
          </div>


          <Modal show={showStatus} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {statusDisplay === true ? "De-active" : "Active"} this Annoucemet
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShowStatus}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => {
                  handleUpdateStatusCourseName(!statusDisplay);
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
              Are You Sure To Want To delete this Announcement
            </Modal.Body>
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
                    Enter Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <div>
                      <DatePicker
                        id="date"
                        selected={date}
                        onChange={(date) => {
                          setDate(date);
                          setErrorsForAdd({ ...errorsForAdd, date: "" });
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
                </div>

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
                    Enter Type
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>

                      <select
                        className={`form-control form-control-lg form-control-solid`}
                        name="type"
                        value={inputValueForAdd.type}
                        onChange={(e) => {
                          handleOnChnageAdd(e);
                        }}>
                        <option>Select Type
                        </option>
                        <option value="General" >General </option>
                        <option value="News">News</option>
                        <option value="Update" >Update</option>
                        <option value="Important">Important</option>

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

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <CKEditor
                        id="description"
                        editor={ClassicEditor}
                        value={inputValueForAdd.description}
                        data={description}
                        onChange={(descriptionData, editor) => {
                          setDescription(editor.getData());
                          setErrorsForAdd({ ...errorsForAdd, description: "" });
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
                      {errorsForAdd["description"]}
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

                      />
                    </div>
                    {/* <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["image"]}
                    </span> */}
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleAddAnnouncementDetails(e);
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
                {/* Ameninties Name */}
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
                        value={inputValue.date}
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
                      {errors["date"]}
                    </span>
                  </div>
                </div> */}

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Date
                  </label>
                  <div className="col-lg-9 col-xl-6 cus-data-input-style">
                    <div>
                      <DatePicker
                        id="date"
                        selected={new Date(date)}
                        onChange={(date) => {
                          setDate(date);
                          setErrors({ ...errors, date: "" });
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
                      {errors["date"]}
                    </span>
                  </div>
                </div>

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
                    Enter Type
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                    <select
                        className={`form-control form-control-lg form-control-solid`}
                        name="type"
                        value={inputValue.type}
                        onChange={(e) => {
                          handleOnChnage(e);
                        }}>
                        <option>Select Type
                        </option>
                        <option value="General" selected={
                          inputValue?.type ===
                            "General"
                            ? true
                            : false
                        }>General </option>
                        <option value="News" selected={
                          inputValue?.type ===
                            "News"
                            ? true
                            : false
                        }>News</option>
                        <option value="Update" selected={
                          inputValue?.type ===
                            "Update"
                            ? true
                            : false
                        }>Update</option>
                        <option value="Important" selected={
                          inputValue?.type ===
                            "Important"
                            ? true
                            : false
                        }>Important</option>

                      </select>
                    </div>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["type"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Description
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <CKEditor
                        id="description"
                        editor={ClassicEditor}
                        value={inputValueForAdd.description}
                        data={description}
                        onChange={(descriptionData, editor) => {
                          setDescription(editor.getData());
                          setErrorsForAdd({ ...errorsForAdd, description: "" });
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
                      {errors["description"]}
                    </span>
                  </div>
                </div>
                {/* update image */}

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
                        id="image"
                        // value={productValues.image || null}
                        onChange={(e) => {
                          getImageArrayFromUpdateUpload(e);
                        }}
                        accept="image/*"

                      />
                    </div>
                    {/* <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errors["image"]}
                    </span> */}
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleUpdateAnnouncementDetails(e);
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
                <div className="honda-text-grid">
                  <div className="honda-text-grid-items">
                    <span>Date:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.date,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.name,
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
                    <p>Description:</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.description,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Image:</span>
                    <img
                      src={dataViewMore?.image}
                      alt=""
                      height="90px"
                      width="170px"
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

export default Announcement;
