import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import moment from "moment";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ApiGet, ApiDelete } from "../../../helpers/API/ApiData";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Inventory = ({ title, getNewCount }) => {
  const [filteredInventory, setFilteredInventory] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [idForDeleteInventory, setIdForDeleteInventory] = useState("");
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreInventory, setIsViewMoreInventory] = useState(false);

  useEffect(() => {
    title === "Dashboard | Canna Source"
      ? (document.title = title)
      : (document.title = "Inventory | Canna Source");
  }, []);

  useEffect(() =>{
    console.log("filteredInventory",filteredInventory);
  },[filteredInventory])

  const handleClose = () => {
    setShow(false);
  };

  const handleViewMoreClose = () => {
    setIsViewMoreInventory(false);
    setDataViewMore({});
  };

  useEffect(() => {
    getAllInventories();
  }, [page, countPerPage]);

  const getAllInventories = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`inventory/all?pagination[offset]=${page}&pagination[count]=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredInventory(res?.data?.payload?.getInventory);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          toast.error(err?.message);
          console.log(err);
        });
    } else {
      await ApiGet(
        `inventory/all?search=${search}&pagination[offset]=${page}&pagination[count]=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredInventory(res?.data?.payload?.getInventory);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message);
        });
    }
  };

  const handleDeleteInventory = () => {
    ApiDelete(`inventory/id=${idForDeleteInventory}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Inventory Deleted Successfully");
          getAllInventories();
          {
            document.title === "Dashboard | Canna Source" && getNewCount();
          }
          setPage(0);
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

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "Market Place Name",
      selector: (row) => row?.marketplaceName,
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
      sortable: true,
    },
    {
      name: "Old Price",
      selector: (row) => row?.oldPrice,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.price,
      sortable: true,
    },
    {
      name: "Source Harvest",
      selector: (row) => row?.sourceHarvestNames,
      sortable: true,
    },
    {
      name: "size Category",
      selector: (row) => row?.sizeCategory?.name,
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: (row) => row?.subCategory?.name,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShow(true);
                setIdForDeleteInventory(row?._id);
              }}
            >
              <Tooltip title="Delete Ameninties" arrow>
                <DeleteIcon />
              </Tooltip>
            </div>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreInventory(true);
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

  //for search data

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(search, 500);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoaderVisible(true);
      setPage(0);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllInventories();
    } else {
      getAllInventories();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        {document.title === "Inventory | Canna Source" && <ToastContainer />}
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Inventory</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Inventory"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </div>

          {/* delete model */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To delete this Inventory
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteInventory();
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* end delete model */}

          <DataTable
            columns={columns}
            data={filteredInventory}
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
            paginationDefaultPage={(page+1)}
            onChangePage={(page) => {
              setPage((page-1));
            }}
            onChangeRowsPerPage={(rowPerPage) => {
              setCountPerPage(rowPerPage);
            }}
          />
        </div>
      </div>

      {isViewMoreInventory ? (
        <Dialog
          fullScreen
          open={isViewMoreInventory}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition}
        >
         
          <List>
            {isViewMoreInventory === true ? (
              <>
              <div className="cus-modal-center-align">
                <div className="cus-modal-box">
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
                  <div className="cus-modal-header">
                      <p className="">Inventory Data</p>
                  </div>
                  <div className="cus-modal-body">
                    <div className="text-grid">
                      <div className="text-grid-items">
                        <p>Name:</p>
                        <span>{` ${dataViewMore?.name}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>CreatedBy:</p>
                        <span>{` ${dataViewMore?.createdBy}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>CreatedAt:</p>
                        <span>{` ${moment(dataViewMore?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Price:</p>
                        <span>{` ${dataViewMore?.price}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Old Price:</p>
                        <span>{` ${dataViewMore?.oldPrice}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Quantity:</p>
                        <span>{` ${dataViewMore?.quantity}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>UnitOfMeasure:</p>
                        <span>{` ${dataViewMore?.unitOfMeasure}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>UnitOfMeasureName:</p>
                        <span>{` ${dataViewMore?.unitOfMeasureName}`}</span>
                      </div>
                      <div className="text-grid-items">
                      <p>Description:</p>
                      <span
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.description,
                    }}
                    className=""
                  />
                      </div>
                      <div className="text-grid-items">
                        <p>Is negotiable?:</p>
                        <span>{` ${dataViewMore?.negotiable}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Market Place Name:</p>
                        <span>{` ${dataViewMore?.marketplaceName}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Item Strain Name:</p>
                        <span>{` ${dataViewMore?.itemStrainName === "" ? "No data" : dataViewMore?.itemStrainName}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>isPublished?:</p>
                        <span>{` ${dataViewMore?.isPublished}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>isArchive?:</p>
                        <span>{` ${dataViewMore?.isArchive}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>initial LabTesting State:</p>
                        <span>{` ${dataViewMore?.initialLabTestingState === "" ? "No data" : dataViewMore?.initialLabTestingState}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>growType:</p>
                        <span>{` ${dataViewMore?.growType === "" ? "No data" : dataViewMore?.growType}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>COA:</p>
                        <span>{` ${dataViewMore?.coa}`}</span>
                      </div>
                    </div>
                    <div className="license-details">
                      <p className="">Category</p>
                    </div>
                    <div className="text-grid">
                      <div className="text-grid-items">
                        <p>Category:</p>
                        <span>{` ${dataViewMore?.category?.name}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>sizeCategory:</p>
                        <span>{` ${dataViewMore?.sizeCategory?.name}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>subCategory:</p>
                        <span>{` ${dataViewMore?.subCategory?.name}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Source Harvest Names:</p>
                        <span>{` ${dataViewMore?.sourceHarvestNames}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>Strain Classification:</p>
                        <span>{` ${dataViewMore?.strainClassification === "" ? "No data" : dataViewMore?.strainClassification}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>THC:</p>
                        <span>{` ${dataViewMore?.thc}`}</span>
                      </div>
                    
                    </div>
                  </div>
                  <div className="sub-header-style">
                    <p>Gallery View</p>
                  </div>
                  <div className="gallery-grid">
                    {
                      [0,1,2,3,4,5].map(() => {
                        return(
                          <div className="gallery-grid-items">
                      <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"/>
                    </div>
                        )
                      })
                    }
                  </div>
                  <div className="modal-bottom-align"></div>
                </div>
              </div>
             
              </>
            ) : null}
          </List>
        </Dialog>
      ) : null}
    </>
  );
};

export default Inventory;
