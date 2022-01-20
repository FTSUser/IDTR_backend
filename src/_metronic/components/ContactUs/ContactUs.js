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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactUs = ({ getNewCount, title }) => {
  const [filteredContactUs, setFilteredContactUs] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreAboutus, setIsViewMoreAboutus] = useState(false);

  const [description, setDescription] = useState("");

  //new data
  const [isUpdateAboutUs, setIsUpdateAboutUs] = useState(false);
  const [isAddAboutUs, setIsAddAboutUs] = useState(false);
  const [idForUpdateAboutUsData, setIdForUpdateAboutUsData] = useState("");
  const [inputValue, setInputValue] = useState({});
  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errors, setErrors] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});
  const [idForEditStatus, setIdForEditStatus] = useState("");
  const [idForDeleteAboutUs, setIdForDeleteAboutUs] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

 
  const handleViewMoreClose = () => {
    setIsViewMoreAboutus(false);
    setDataViewMore({});
  };

  useEffect(() => {
    console.log("inputValue", inputValueForAdd);
  }, [inputValueForAdd]);


  useEffect(() => {
    console.log("idForEditStatus", idForEditStatus);
  }, [idForEditStatus]);

  

  useEffect(() => {
    getAllContactUs();
  }, [page, countPerPage]);

  const getAllContactUs = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`contactus/getContactus`)
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredContactUs(res?.data?.payload?.Question);
          setCount(res?.data?.payload?.count);
        })
        .catch((err) => {
          console.log(err);
        });
    } 
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
        selector: "subject",
        sortable: true,
      },



      {
        name: "Description",
        selector: "description",
        sortable: true,
      },

     




    


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
    //             console.log("rowShow", row);
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

  

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
         
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
