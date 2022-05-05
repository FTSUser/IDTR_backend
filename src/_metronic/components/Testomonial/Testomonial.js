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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Testomonial = ({ getNewCount, title }) => {
  const [filteredTestomonial, setFilteredTestomonial] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreTestomonial, setIsViewMoreTestomonial] = useState(false);

  const [description, setDescription] = useState("");

  //new data
  const [isUpdateTestomonial, setIsUpdateTestomonial] = useState(false);
  const [isAddTestomonial, setIsAddTestomonial] = useState(false);
  const [idForUpdateTestomonialData, setIdForUpdateTestomonialData] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteTestomonial, setIdForDeleteTestomonial] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Honda | Testimonials";
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
    setIsViewMoreTestomonial(false);
    setDataViewMore({});
  };

  useEffect(() => {
  }, [inputValueForAdd]);

  useEffect(() => {
  }, [idForEditStatus]);

  const handleAdminUpdateClose = () => {
    setInputValue({});
    setDescription("");
    setIsUpdateTestomonial(false);
  };

  const handleAddAdminClose = () => {
    setInputValue({});
    setDescription([]);
    setIsAddTestomonial(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllTestomonial();
  }, [page, countPerPage]);

  const getAllTestomonial = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`testomonial/getAllTestominial?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredTestomonial(res?.data?.payload?.Testomonial);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
        });
    } else {
      await ApiGet(
        `testomonial/getAllTestominial?search=${search}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredTestomonial(res?.data?.payload?.Testomonial);
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

    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddTestomonialDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        titleName: inputValueForAdd.titleName,
        description: description,
        image: inputValueForAdd.image,
      };
      ApiPost(`testomonial/addTestominial`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddTestomonial(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setDescription("");
            getAllTestomonial();
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
    // if (inputValue && !inputValue.titleName) {
    //   formIsValid = false;
    //   errors["titleName"] = "*Please Enter Title!";
    // }
    if (!description) {
      formIsValid = false;
      errors["description"] = "*Please Enter Description!";
    }
    if (inputValue && !inputValue.image) {
      formIsValid = false;
      errors["image"] = "*Please Upload Image!";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleDeleteTestomonial = () => {
    ApiDelete(`testomonial/deleteTestominial/${idForDeleteTestomonial}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllTestomonial();
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

  const handleUpdateTestomonialDetails = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let Data = {
        titleName: inputValue.titleName,
        description: description,
        image: inputValue.image,
      };
      ApiPut(`testomonial/updateTestominial/${idForUpdateTestomonialData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsUpdateTestomonial(false);
            toast.success(res?.data?.message);
            setInputValue({});
            setDescription("");
            getAllTestomonial();
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
                className="w-100 zoom"
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
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsUpdateTestomonial(true);
                  setIdForUpdateTestomonialData(row._id);
                  setInputValue({
                    titleName: row?.titleName,
                    image: row?.image,
                    titleName: row?.titleName
                  });

                  setDescription(row?.description);
                }}
              >
                <Tooltip title="Edit Testimonials" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteTestomonial(row?._id);
              }}
            >
              <Tooltip title="Delete Testimonials" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreTestomonial(true);
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
      getAllTestomonial();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllTestomonial();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2"> Testimonials</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Testimonials"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddTestomonial(true);
                }}
                className="btn btn-success mr-2"
              >
                Add Testomonial 
              </button>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are You Sure To Want To delete this Testomonial</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteTestomonial();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredTestomonial}
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

      {isAddTestomonial ? (
        <Dialog
          fullScreen
          open={isAddTestomonial}
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
            {isAddTestomonial === true ? (
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

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleAddTestomonialDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Add Testomonial</span>
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

      {isUpdateTestomonial ? (
        <Dialog
          fullScreen
          open={isUpdateTestomonial}
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
            {isUpdateTestomonial === true ? (
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

                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleUpdateTestomonialDetails(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Update Testomonial</span>
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

      {isViewMoreTestomonial ? (
        <Dialog
          fullScreen
          open={isViewMoreTestomonial}
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
            {isViewMoreTestomonial === true ? (
              <div className="form ml-30 ">
                <div className="form-group row mb-0">
                  <p className="titles">Title:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.titleName,
                    }}
                    className="cms-des"
                  />
                </div>
                <div className="form-group row mb-0">
                  <p className="titles">Description:</p>
                </div>
                <div className="form-group row mr-20">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.description,
                    }}
                    className="cms-des"
                  />
                </div>
                <div className="form-group row mb-0">
                  <p className="titles">Image:</p>
                </div>
                <div className="form-group row mr-20">
                  <img
                    src={dataViewMore?.image}
                    alt=""
                    className="cmsImage"
                  />
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default Testomonial;
