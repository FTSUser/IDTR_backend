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
import { AwsConfig } from "../../../config/S3Backet/app.config";
import S3 from "react-aws-s3";
import Video from 'react-video-renderer';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HelpfulTips = ({ getNewCount, title }) => {
  const [filteredHelpfulTips, setFilteredHelpfulTips] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreHelpfulTips, setIsViewMoreHelpfulTips] = useState(false);

  const [description, setDescription] = useState("");

  //new data
  const [isUpdateHelpfulTips, setIsUpdateHelpfulTips] = useState(false);
  const [isAddHelpfulTips, setIsAddHelpfulTips] = useState(false);
  const [idForUpdateHelpfulTipsData, setIdForUpdateHelpfulTipsData] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteHelpfulTips, setIdForDeleteHelpfulTips] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Honda | HelpfulTips";
  }, []);

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
    setIsViewMoreHelpfulTips(false);
    setDataViewMore({});
  };

  useEffect(() => {
  }, [inputValueForAdd]);

  useEffect(() => {
  }, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setDescription("");
    setIsUpdateHelpfulTips(false);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setDescription([]);
    setIsAddHelpfulTips(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllHelpfulTips();
  }, [page, countPerPage]);

  const getAllHelpfulTips = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`helpfultips/getAllTips?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredHelpfulTips(res?.data?.payload?.Tips);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
        });
    } else {
      await ApiGet(
        `helpfultips/getAllTips?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredHelpfulTips(res?.data?.payload?.Tips);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
        });
    }
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.titleName) {
      formIsValid = false;
      errorsForAdd["titleName"] = "*Please Enter Title!";
    }
    if (!description) {
      formIsValid = false;
      errorsForAdd["description"] = "*Please Enter Description!";
    }
    if (inputValueForAdd && !inputValueForAdd.image) {
      formIsValid = false;
      errorsForAdd["image"] = "*Please Upload Image!";
    }

    if (inputValueForAdd && !inputValueForAdd.video) {
      formIsValid = false;
      errorsForAdd["video"] = "*Please Upload video!";
    }


    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };


  useEffect(() => {
    console.log("inputValueForAdd", inputValueForAdd);
  }, [inputValueForAdd])

  useEffect(() => {
    console.log("inputValue", inputValue);
  }, [inputValue])



  const handleAddHelpfulTipsDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        titleName: inputValueForAdd.titleName,
        description: description,
        image: inputValueForAdd.image,
        video: inputValueForAdd.video
      };
      ApiPost(`helpfultips/addTips`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddHelpfulTips(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setDescription("");
            getAllHelpfulTips();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
        });
    }
  };

  const uploadS3bucket = async (file) => {
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
        setInputValue((cv) => {
          return { ...cv, image: urls };
        });
      }
      return urls;
    } else {
      errors["image"] = "*Please Upload Image!";
    }
  };

  const uploadS3bucketForUpdate = async (file) => {
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
  };

  const getImageArrayFromUpload = async (e) => {
    uploadS3bucketForUpdate(e.target.files[0]);
  };

  const getImageArrayFromUpdateUpload = async (e) => {
    let files = e.target.files[0];

    uploadS3bucket(files);
  };

  const uploadvideoS3bucket = async (file) => {
    if (file.type.includes("video")) {
      let config = AwsConfig;
      config = {
        ...config,
        dirName: "Cerificate",
        ACL: "public-read",
      };
      const Reacts3Client = new S3(config);
      let urls;
      let f = file;
      let filename = "AboutVideo(" + new Date().getTime() + ")";
      let data = await Reacts3Client.uploadFile(f, filename);
      // try {
      // if (data.status === 204) {
      urls = data.location;
      if (urls) {
        setInputValue((cv) => {
          return { ...cv, video: urls };
        });
      }
      return urls;
    } else {
      errors["video"] = "*Please Upload Video!";
    }
  };

  const uploadvideoS3bucketForUpdate = async (file) => {
    if (file.type.includes("video")) {
      let config = AwsConfig;
      config = {
        ...config,
        dirName: "Cerificate",
        ACL: "public-read",
      };
      const Reacts3Client = new S3(config);
      let urls;
      let f = file;
      let filename = "AboutVideo(" + new Date().getTime() + ")";
      let data = await Reacts3Client.uploadFile(f, filename);
      // try {
      // if (data.status === 204) {
      urls = data.location;
      if (urls) {
        setInputValueForAdd((cv) => {
          return { ...cv, video: urls };
        });
      }
      return urls;
    } else {
      errorsForAdd["video"] = "*Please Upload Video!";
    }
  };

  const getVideoArrayFromUpload = async (e) => {
    uploadvideoS3bucketForUpdate(e.target.files[0]);
  };

  const getVideoArrayFromUpdateUpload = async (e) => {
    let files = e.target.files[0];

    uploadvideoS3bucket(files);
  };


  // const convertBaseTo64 = (file) => {
  //   return new Promise((resolve, object) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = function () {
  //       resolve(fileReader.result);
  //     };
  //     fileReader.onerror = function (error) {
  //       reject(error);
  //     };
  //   });
  // };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};
    if (inputValue && !inputValue.titleName) {
      formIsValid = false;
      errors["titleName"] = "*Please Enter Title!";
    }
    if (!description) {
      formIsValid = false;
      errors["description"] = "*Please Enter Description!";
    }
    if (inputValue && !inputValue.image) {
      formIsValid = false;
      errors["image"] = "*Please Upload Image!";
    }
    if (inputValue && !inputValue.video) {
      formIsValid = false;
      errors["video"] = "*Please Upload video!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteHelpfulTips = () => {
    ApiDelete(`helpfultips/deleteTips/${idForDeleteHelpfulTips}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllHelpfulTips();
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
        toast.error(err.message);
      });
  };

  useEffect(() => {
  }, [inputValue]);

  const handleUpdateHelpfulTipsDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let Data = {
        titleName: inputValue.titleName,
        description: description,
        image: inputValue.image,
        video: inputValue.video

      };
      ApiPut(`helpfultips/updateTips/${idForUpdateHelpfulTipsData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsUpdateHelpfulTips(false);
            toast.success(res?.data?.message);
            setInputValue({});
            setDescription("");
            getAllHelpfulTips();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
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
      name: "Title",
      selector: "titleName",
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
              <img
                className="max-w-150px zoom"
                alt="img"
                src={row?.image && row?.image}
              />
            </div>
          </>
        );
      },
      wrap: true,
    },
    {
      name: "Video",
      //   selector: "photo",
      cell: (row) => {
        return (
          <>
            <div className="p-3">
              <video
                className="max-w-150px zoom"
                alt="img"
                src={row?.video && row?.video}
              />
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
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsUpdateHelpfulTips(true);
                  setIdForUpdateHelpfulTipsData(row._id);
                  setInputValue({
                    titleName: row?.titleName,
                    image: row?.image,
                    video: row?.video
                  });

                  setDescription(row?.description);
                }}
              >
                <Tooltip title="Edit HelpfulTips" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteHelpfulTips(row?._id);
              }}
            >
              <Tooltip title="Delete HelpfulTips" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreHelpfulTips(true);
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
    setSearch(e.target.value);
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
      getAllHelpfulTips();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllHelpfulTips();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2"> HelpfulTips</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search HelpfulTips"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddHelpfulTips(true);
                }}
                className="btn btn-success mr-2"
              >
                Add HelpfulTips
              </button>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure To Want To delete this HelpfulTips</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteHelpfulTips();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredHelpfulTips}
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

      {isAddHelpfulTips ? (
        <Dialog
          fullScreen
          open={isAddHelpfulTips}
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
            {isAddHelpfulTips === true ? (
              <div className="form ml-30 ">
                {/* Name Amenintie */}
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Title
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="titleName"
                        name="titleName"
                        value={inputValueForAdd.titleName}
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
                      {errorsForAdd["titleName"]}
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
                        value={description}
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
                    Video
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="file"
                        className={`form-control form-control-lg form-control-solid `}
                        name="video"
                        // value={productValues.video || null}
                        onChange={(e) => {
                          getVideoArrayFromUpload(e);
                        }}
                        accept="video/*"
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
                      {errorsForAdd["video"]}
                    </span>
                  </div>
                </div>


                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleAddHelpfulTipsDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Add HelpfulTips</span>
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

      {isUpdateHelpfulTips ? (
        <Dialog
          fullScreen
          open={isUpdateHelpfulTips}
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
            {isUpdateHelpfulTips === true ? (
              <div className="form ml-30 ">
                {/* Ameninties Name */}
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Title
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="titleName"
                        name="titleName"
                        value={inputValue.titleName}
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
                      {errors["titleName"]}
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
                      {errors["image"]}
                    </span>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Video
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="file"
                        className={`form-control form-control-lg form-control-solid `}
                        name="video"
                        id="video"
                        // value={productValues.video || null}
                        onChange={(e) => {
                          getVideoArrayFromUpdateUpload(e);
                        }}
                        accept="video/*"
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
                      {errors["video"]}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleUpdateHelpfulTipsDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Update HelpfulTips</span>
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

      {isViewMoreHelpfulTips ? (
        <Dialog
          fullScreen
          open={isViewMoreHelpfulTips}
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
            {isViewMoreHelpfulTips === true ? (

              <div className="honda-container">
                <div className="other-information-child-text-style1">
                  <h2>HelpFul Tips</h2>
                </div>
                <div className="honda-text-grid12 honda-text-grid-border">

                  <div className="honda-text-grid-items">
                    <p>Title:</p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.titleName,
                      }}
                      className=""
                    />
                  </div>

                  <div className="honda-text-grid-items">
                    <p>Description:</p>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: dataViewMore?.description,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <p>Image:</p>
                    <img className="images" src={dataViewMore?.image} alt="" />
                  </div>
                  <div className="honda-text-grid-items">
                    <p>Video:</p>
                    <Video src={dataViewMore?.video}>
                      {(video, state, actions) => (
                        <div>
                          {video}
                          {/* <div>{state.currentTime} / {state.duration} / {state.buffered}</div> */}
                          <progress value={state.currentTime} max={state.duration} onChange={actions.navigate} /> <br />
                          {/* <progress value={state.volume} max={1} onChange={actions.setVolume} />  <br/> */}
                          <Button onClick={actions.play}>Play</Button> &nbsp;
                          <Button onClick={actions.pause}>Pause</Button>
                        </div>
                      )}
                    </Video>
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

export default HelpfulTips;
