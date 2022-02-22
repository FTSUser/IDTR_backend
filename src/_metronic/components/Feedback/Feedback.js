import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet } from "../../../helpers/API/ApiData";

import Slide from "@material-ui/core/Slide";

import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import CsvDownload from "react-json-to-csv";

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
    document.title = "Honda | Feedback";
  }, []);

  useEffect(() => {
    getAllFeedback();
  }, [page, countPerPage]);

  const getAllFeedback = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`feedback/getAllFeedback?page=${page}&limit=${countPerPage}`)
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredFeedback(res?.data?.payload?.Question);
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
        return <span>{moment(row?.createdAt).format("ll")}</span>;
      },
      selector: (row) => row?.createdAt,
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
      width: "250px",
      sortable: true,
      cell: (row) => {
        return <span>{row?.email === "" ? "-" : row?.email}</span>;
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
      name: "Sub Category",
     
      cell: (row) => {
        return <span>{row?.subCategory ?  row?.subCategory : '-'}</span>;
      },
      sortable: true,
    },

    {
      name: "Rating",
      selector: "rating",
      sortable: true,
      cell: (row) => {
        return <span>{!row?.rating ? "-" : row?.rating}</span>;
      },
    },

    {
      name: "Description",
      cell: (row) => {
        return <span>{row?.description === "" ? "-" : row?.description}</span>;
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

  //for excel file
  const [allFeedbackExcel, setAllFeedbackExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  useEffect(() => {
    getAllFeedbackForExcel();
  }, []);

  const getAllFeedbackForExcel = async () => {
    // if (!search) {
    await ApiGet(`feedback/getAll`)
      .then((res) => {
        setAllFeedbackExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      });
    // }
  };
  useEffect(() => {
    if (allFeedbackExcel) {
      allFeedbackExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          createdAt: moment(registerUser?.createdAt).format("ll"),
          createdBy: registerUser?.createdBy,
          description:
            registerUser?.description === ""
              ? "No data"
              : registerUser?.description,
          email: registerUser?.email === "" ? "No data" : registerUser?.email,
          feedbackCategory: registerUser?.feedbackCategory,
          name: registerUser?.name,
          phone: registerUser?.phone,
          rating: registerUser?.rating,
          updatedAt: moment(registerUser?.updatedAt).format("ll"),
          updatedBy: registerUser?.updatedBy,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
  }, [allFeedbackExcel]);

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Feedback</h2>
            </div>
            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Donations.csv"
                style={{
                  //pass other props, like styles
                  backgroundColor: "#CC0001",
                  borderRadius: "6px",
                  border: "1px solid #fff",
                  display: "inline-block",
                  cursor: "pointer",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  padding: "10px 18px",
                  textDecoration: "none",
                  position: "right",
                }}
              >
                Export to Excel
              </CsvDownload>
            </div>
          </div>

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
