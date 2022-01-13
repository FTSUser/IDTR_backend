import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  ApiGet,
} from "../../../helpers/API/ApiData";
import Slide from "@material-ui/core/Slide";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MarketPlace = ({ title }) => {
  const [filteredMarketPlaces, setFilteredMarketPlaces] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreMarketPlaceData, setIsViewMoreMarketPlaceData] = useState(false);

  useEffect(() => {
    title === "Dashboard | Canna Source"
      ? (document.title = title)
      : (document.title = "Market Place | Canna Source");
  }, []);

  const handleViewMoreClose = () => {
    setIsViewMoreMarketPlaceData(false);
    setDataViewMore({});
  };

  useEffect(() => {
    getAllMarketPlaces();
  }, [page, countPerPage]);

  const getAllMarketPlaces = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`market-place?pagination[offset]=${page}&pagination[count]=${countPerPage}`)
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredMarketPlaces(res?.data?.payload?.getMarketPlace);
          setCount(res?.data?.payload?.result);
        })
        .catch((err) => {
            toast.error(err?.message)
          console.log(err);
        });
    } else {
      await ApiGet(
        `market-place?search=${search}&pagination[offset]=${page}&pagination[count]=${countPerPage}`
      )
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredMarketPlaces(res?.data?.payload?.getMarketPlace);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message)
        });
    }
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
      selector: "marketplaceName",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Old Price",
      selector: "oldPrice",
      sortable: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Source Harvest",
      selector: "sourceHarvestNames",
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
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreMarketPlaceData(true);
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
      getAllMarketPlaces();
    } else {
      setPage(0);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllMarketPlaces();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className="card p-1">
        {document.title === "MarketPlace | Canna Source" && <ToastContainer />}
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Market Place</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Market Place"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredMarketPlaces}
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

      {isViewMoreMarketPlaceData ? (
        <Dialog
          fullScreen
          open={isViewMoreMarketPlaceData}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition}
        >
        
          <List>
            {isViewMoreMarketPlaceData === true ? (
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
                     <p className="">Market Place Data</p>
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
                        <span>{` ${dataViewMore?.description}`}</span>
                      {/* <p
                    dangerouslySetInnerHTML={{
                      __html: dataViewMore?.description,
                    }}
                    className=""
                  /> */}
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
                        <span>{` ${dataViewMore?.itemStrainName === "" ? "No Data" : dataViewMore?.itemStrainName}`}</span>
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
                        <p>initialLabTestingState:</p>
                        <span>{` ${dataViewMore?.initialLabTestingState === "" ? "No Data" : dataViewMore?.initialLabTestingState}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>growType:</p>
                        <span>{` ${dataViewMore?.growType === "" ? "No data" : dataViewMore?.growType}`}</span>
                      </div>
                      <div className="text-grid-items">
                        <p>COA:</p>
                        <span>{` ${dataViewMore?.coa === null ? "No Data" : dataViewMore?.coa}`}</span>
                      </div>
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
                    <div className="modal-bottom-align"></div>
                  </div>
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

export default MarketPlace;
