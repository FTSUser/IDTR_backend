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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FAQ = ({ getNewCount, title }) => {
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
  const [filteredVehicleCategory, setFilteredVehicleCategory] = useState({});

  useEffect(() => {
    document.title = "Honda | FAQ Section";
  }, []);

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };

  const handleViewMoreClose = () => {
    setIsViewMoreFAQ(false);
    setDataViewMore({});
  };

  const handleAddAdminClose = () => {
    setAnswer([]);
    setInputValueForAdd({})
    setIsAddFAQ(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllFAQ();
  }, [page, countPerPage]);
  const getAllVehicleCategory = async () => {
    setIsLoaderVisible(true);

    await ApiGet(`faqCategory/getAllfaqCategory?isActive=true`)
        .then((res) => {
            setIsLoaderVisible(false);
            setFilteredVehicleCategory(res?.data?.payload?.faqCategory);
            setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
            toast.error(err?.response?.data?.message)
        });
};
  const getAllFAQ = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`faq/getAllFAQ?page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredFAQ(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    } else {
      await ApiGet(`faq/getAllFAQ?search=${search}&page=${page}&limit=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          setFilteredFAQ(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    }
  };

  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};
    if (inputValueForAdd && !inputValueForAdd.question) {
      formIsValid = false;
      errorsForAdd["question"] = "*Please Enter Question!";
    }
    if (inputValueForAdd && !inputValueForAdd.fcid) {
      formIsValid = false;
      errorsForAdd["fcid"] = "*Please Enter FAQ Category!";
    }
    if (!answer) {
      formIsValid = false;
      errorsForAdd["answer"] = "*Please Enter Answer!";
    }
    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };

  const handleAddFAQDetails = (e) => {
    e.preventDefault();
    if (validateFormForAddAdmin()) {
      let Data = {
        question: inputValueForAdd.question,
        answer: answer,
        fcid: inputValueForAdd.fcid
      };
      ApiPost(`faq/addFAQ`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddFAQ(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setAnswer("");
            getAllFAQ();

          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });
    }
  };

  const handleDeleteFAQ = () => {
    ApiDelete(`faq/deleteFAQ/${idForDeleteFAQ}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllFAQ();
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
        toast.error(err?.response?.data?.message)
      });
  };


  const handleUpdateFAQDetails = (e) => {
    e.preventDefault();

    if (validateFormForAddAdmin()) {
      let Data = {
        question: inputValueForAdd.question,
        answer: answer,
        fcid: inputValueForAdd.fcid
      };
      ApiPut(`faq/updateFAQ/${idForUpdateFAQData}`, Data)
        .then((res) => {
          if (res?.status == 200) {
            setIsAddFAQ(false);
            toast.success(res?.data?.message);
            setInputValueForAdd({});
            setAnswer("");
            getAllFAQ();
            setIsEdit(false)
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
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
        return (
          <span>
            {moment(row?.createdAt).format('ll')}
          </span>
        );
      },
      sortable: true,
      selector: row => row?.createdAt,
    },
    {
      name: "Question",
      sortable: true,
      selector: row => row?.question,
    },
    {
      name: "Answer",
      selector: "name",
      cell: (row) => {
        return (
          <>
            <p
              dangerouslySetInnerHTML={{
                __html: row?.answer,
              }}
              className=""
            />
          </>
        );
      },
      sortable: true,
      selector: row => row?.answer,
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
                  setIsAddFAQ(true);
                  setIsEdit(true);
                  setIdForUpdateFAQData(row._id);
                  setAnswer(row?.answer);
                  setInputValueForAdd({
                    question: row?.question,
                    answer: row?.answer
                  });

                }}
              >
                <Tooltip title="Edit FAQ" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteFAQ(row?._id);
              }}
            >
              <Tooltip title="Delete FAQ" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreFAQ(true);
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

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">FAQ Section</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search FAQs"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  getAllVehicleCategory();
                  setIsAddFAQ(true);
                }}
                className="btn btn-success mr-2"
              >
                Add FAQ
              </button>
            </div>
          </div>

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
                  handleDeleteFAQ();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

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

      {isAddFAQ ? (
        <Dialog
          fullScreen
          open={isAddFAQ}
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
            {isAddFAQ === true ? (
              <div className="form ml-30 ">
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Select FAQ Category
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <select
                      className={`form-control form-control-lg form-control-solid `}
                      id="fcid"
                      name="fcid"
                      value={inputValueForAdd.fcid}
                      onChange={(e) => {
                        handleOnChnageAdd(e);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select FAQ Category
                      </option>
                      {filteredVehicleCategory?.length > 0 &&
                        filteredVehicleCategory?.map((item) => {
                          return (
                            <option key={item._id} value={item?._id}>
                              {" "}
                              {item.name}{" "}
                            </option>
                          );
                        })}
                    </select>

                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["fcid"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Question
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <input
                        type="text"
                        className={`form-control form-control-lg form-control-solid `}
                        id="question"
                        name="question"
                        value={inputValueForAdd.question}
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
                      {errorsForAdd["question"]}
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Enter Answer
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div>
                      <CKEditor
                        id="answer"
                        editor={ClassicEditor}
                        value={inputValueForAdd.answer}
                        data={answer}
                        onChange={(descriptionData, editor) => {
                          setAnswer(editor.getData());
                          setErrorsForAdd({ ...errorsForAdd, answer: "" });
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
                      {errorsForAdd["answer"]}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      isEdit === false ?
                        handleAddFAQDetails(e) : handleUpdateFAQDetails(e)
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>{isEdit === false ? 'Add' : 'Update'} FAQ</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null
      }

      {
        isViewMoreFAQ ? (
          <Dialog
            fullScreen
            open={isViewMoreFAQ}
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
              {isViewMoreFAQ === true ? (
                <div className="honda-container">
                  <div className="other-information-child-text-style1">
                    <h2>FAQ</h2>
                  </div>
                  <div className="honda-text-grid12 honda-text-grid-border">
                    <div className="honda-text-grid-items">
                      <p>Question:</p>
                      <span>{dataViewMore?.question}</span>
                    </div>
                    <div className="honda-text-grid-items">
                      <p>Answer:</p>
                      <span
                        style={{ fontSize: "16px", color: "#757575" }}
                        dangerouslySetInnerHTML={{
                          __html: dataViewMore?.answer,
                        }}
                        className=""
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-0">

                  </div>
                  <div className="form-group row mr-20">
                    <p></p>
                  </div>
                  <div className="form-group row mb-0">

                  </div>
                  <div className="form-group row mr-20">

                  </div>
                </div>
              ) : null}
            </List>
          </Dialog>
        ) : null
      }
    </>
  );
};

export default FAQ;
