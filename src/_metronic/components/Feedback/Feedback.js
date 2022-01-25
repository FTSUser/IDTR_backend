import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import {
  ApiGet,
  
} from "../../../helpers/API/ApiData";

import Slide from "@material-ui/core/Slide";

import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Feedback = ({ getNewCount, title }) => {
  const [filteredFeedback, setFilteredFeedback] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  

  //new data
  
  const [inputValue, setInputValue] = useState({});
  
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState("");

 
  

  

  useEffect(() => {
    getAllFeedback();
  }, [page, countPerPage]);

  const getAllFeedback = async () => {
    setIsLoaderVisible(true);
    if (!search) {
      await ApiGet(`feedback/getAllFeedback`)
        .then((res) => {
          setIsLoaderVisible(false);
          console.log("artistreport", res);
          setFilteredFeedback(res?.data?.payload?.Question);
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
        cell: (row) => {
          return(
              <span>
                  {row?.email === "" ? "-" : row?.email}
              </span>
          )
      },
      },

      {
        name: "Phone",
        selector: "phone",
        sortable: true,
      },


      {
        name: "Feedback Category",
        selector: "feedbackCategory",
        sortable: true,
      },

      
      {
        name: "Rating",
        selector: "rating",
        sortable: true,
        cell: (row) => {
          return(
              <span>
                  {!row?.rating ? "-" : row?.rating}
              </span>
          )
      },
      },

      
      {
        name: "Description",
        cell: (row) => {
            return(
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
         
          <DataTable
            columns={columns}
            data={filteredFeedback}
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
      
    </>
  );
};

export default Feedback;
