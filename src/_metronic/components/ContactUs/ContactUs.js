import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,

} from "../../../helpers/API/ApiData";

import Slide from "@material-ui/core/Slide";

import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactUs = ({ getNewCount, title }) => {
  const [filteredContactUs, setFilteredContactUs] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Honda | ContactUs";
  }, []);



  useEffect(() => {
  }, [inputValueForAdd]);


  useEffect(() => {
  }, [idForEditStatus]);



  useEffect(() => {
    getAllContactUs();
  }, [page, countPerPage]);

  const getAllContactUs = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`contactus/getContactus?page=${page}&limit=${countPerPage}`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredContactUs(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
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
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.creationDate).format("ll")}</span>;
      },
      selector: (row) => row?.creationDate,
      sortable: true,
      // width: "65px",
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },


    {
      name: "Email",
      selector: "email",
      sortable: true,
    },

    {
      name: "Phone",
      selector: "phone",
      sortable: true,
    },

    {
      name: "Subject",
      cell: (row) => {
        return (
          <span>
            {row?.subject}
          </span>
        )
      },
      sortable: true,

    },
    {
      name: "Description",
      cell: (row) => {
        return (
          <span>
            {row?.description === "" ? "-" : row?.description}
          </span>
        )
      },
      sortable: true,

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
        <div className="p-2 mb-2">
        <div className="col d-flex justify-content-between">
                            <h2 className="pl-3 pt-2">Contact Us</h2>
                        </div>
                      
                       
          <DataTable
            columns={columns}
            data={filteredContactUs}
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

      {/* {isViewMoreContactUs ? (
        <Dialog
          fullScreen
          open={isViewMoreContactUs}
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
            {isViewMoreAboutus === true ? (
              <div className="form ml-30 ">
                <div className="form-group row mb-0">
                  <p>Title:</p>
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
                  <p>Description:</p>
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
                  <p>Image:</p>
                </div>
                <div className="form-group row mr-20">
                  <img
                    src={dataViewMore?.passportPhoto}
                    alt=""
                    height="256px"
                    width="256px"
                  />
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null} */}
    </>
  );
};

export default ContactUs;
