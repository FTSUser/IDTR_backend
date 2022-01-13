import React, { useEffect, useState } from "react";
import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
} from "../../../helpers/API/ApiData";
import DataTable, { defaultThemes } from "react-data-table-component";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "react-bootstrap";
// import { getUserInfo } from "../../../utils/user.util";
import { Modal } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { getUserInfo } from "../../../utils/user.util";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { reject } from "lodash";
import CourseName from "./CourseName";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductData = () => {
  let userInfo = getUserInfo();
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [roleid, setroleid] = useState([]);
  const [dataChange, setDataChange] = useState([]);
  const [submitValue, setSubmitValue] = useState(false);
  const [show, setShow] = useState(false);
  const [pid, setPid] = useState();
  const [productValues, setProductValues] = useState({});
  const [productError, setProductError] = useState({});

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);

  const [search, setSearch] = useState("");

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const [rowData, setRowData] = useState({});
  const [showStatus, setShowStatus] = useState(false);
  const [allCourseName, setAllCourseName] = useState();

  useEffect(() => {
    getAllCourseType();
  }, []);

  
  const getAllCourseType = async () => {
    await ApiGet("courseType/getAllCourseType")
      .then((res) => {
        console.log("coursetype", res.data.payload);
        setcategory(res.data.payload);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };

  const handleClickOpen = () => {
    setProductValues({});
    setOpen(true);
    setSubmitValue(false);
  };

  const handleClose1 = () => {
    setProductValues({});
    setProductError({});
    setOpen(false);
  };

  const handleUpdateClose = () => {
    setProductValues({});
    setProductError({});
    setOpenUpdate(false);
  };

  const handleClose = () => {
    setShow(false);
    setShowStatus(false);
  };

  useEffect(() => {
    getProductData();
  }, [dataChange, page, countPerPage, search]);


  const getAllCourseName= async () => {
    setIsLoaderVisible(true);
    await ApiGet("courseName/getAllCourseName")
      .then((res) => {
        console.log("getallcoursename", res.data.payload.Question);
        setAllCourseName(res?.data?.payload?.Question);
        setIsLoaderVisible(false);
      })
      .catch((err) => {
        console.log("err", err.message);
        toast.error(err.message);
        setIsLoaderVisible(false);
      });
  };



  //   const getProductData = async () => {
//     setIsLoaderVisible(true);

//     if (!search) {
//       await ApiGet(`product?page=${page}&limit=${countPerPage}`)
//         .then((res) => {
//           console.log("getbyalluser", res.data.payload);
//           setAllProducts(res.data.payload.allProduct);
//           setCount(res.data.payload.count);
//           setIsLoaderVisible(false);
//         })
//         .catch((err) => {
//           console.log("err", err);
//           toast.error(err.message);
//           setIsLoaderVisible(false);
//         });
//     } else {
//       await ApiGet(
//         `product/search=${search}?page=${page}&limit=${countPerPage}`
//       )
//         .then((res) => {
//           console.log("getbyalluser", res.data.payload);
//           setAllProducts(res.data.payload.allProduct);
//           setCount(res.data.payload.count);
//           setIsLoaderVisible(false);
//         })
//         .catch((err) => {
//           console.log("err", err);
//           toast.error(err.message);
//           setIsLoaderVisible(false);
//         });
//     }
//   };

  // const handleChange = (e) => {
  //   let { name, value } = e.target;

  //   setProductValues((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));

  //   setProductError({ ...productError, [name]: "" });

  // };

//   const handleChange = async (e) => {
//     let { name, value } = e.target;

//     // console.log("name",name)

//     if (
//       e.target.name === "price" ||
//       e.target.name === "point" ||
//       e.target.name === "stock" 
    
//     ) {
//       let val = await e.target.value.replace(/\D/g, "");

//       await setProductValues((prevState) => ({
//         ...prevState,

//         [name]: val,
//       }));
//     } else {
//       setProductValues((prevState) => ({
//         ...prevState,

//         [name]: value,
//       }));
//     }

//     setProductError({ ...productError, [name]: "" });
//   };

  const handleShow = (id) => {
    setShow(true);
    console.log("deleteid", id);
    setPid(id);
  };

  const handleDeleteCourseName = async () => {
    await ApiDelete(`courseName/deleteCourseName/id=${pid}`)
      .then((res) => {
        handleClose();
        setPid("");
        // setDataChange([...dataChange, "genre delete"]);
        // console.log(res.data.data);
        getAllCourseName();
        toast.success("Product Removed Successfully");
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const formValidator = () => {
    let isValid = true;

    if (!productValues.productName) {
      setProductError((cv) => {
        return { ...cv, productName: "Please Enter Product Name" };
      });
      isValid = false;
    }
    if (!productValues.price) {
      setProductError((cv) => {
        return { ...cv, price: "Please Enter Product Price" };
      });
      isValid = false;
    }
    if (!productValues.HSNcode) {
      setProductError((cv) => {
        return { ...cv, HSNcode: "Please Enter HSN Code" };
      });
      isValid = false;
    }
    if (!productValues.point) {
      setProductError((cv) => {
        return { ...cv, point: "Please Enter Points of Product" };
      });
      isValid = false;
    }
    if (!productValues.stock) {
      setProductError((cv) => {
        return { ...cv, stock: "Please Enter Stock Of Product" };
      });
      isValid = false;
    }
    if (!productValues.categoryId) {
      setProductError((cv) => {
        return { ...cv, categoryId: "Please Select Category" };
      });
      isValid = false;
    }
    if (!productValues.image) {
      setProductError((cv) => {
        return { ...cv, image: "Please Upload Image" };
      });
      isValid = false;
    }

    if (!productValues.description) {
      setProductError((cv) => {
        return { ...cv, description: "Please Enter Description Of Product" };
      });
      isValid = false;
    }
    return isValid;

  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formValidator()) {
      return;
    }
    setLoading(true);

    await ApiPost("courseName/addCourseName", allCourseName)
      .then((res) => {
        setLoading(false);
        setAllCourseName({});
        getProductData();
        handleClose1();
        setDataChange([...dataChange, "Product add"]);
        toast.success("Product Added Successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

//   const getImageArrayFromUpload = (e) => {
//     let files = e.target.files;
//     let imageB64Arr = [];

//     console.log(files[0].type, "files");
//     if (files[0].type.includes("image")) {
//       for (let i in Array.from(files)) {
//         convertBaseTo64(files.item(i))
//           .then((file) => {
//             imageB64Arr.push(file);
//           })
//           .catch((err) => {
//             console.log("err.....", err);
//           });
//       }

//       setProductValues((cv) => {
//         return { ...cv, image: imageB64Arr };
//       });
//     } else {
//       console.log("please enter image");
//     }
//   };

//   const convertBaseTo64 = (file) => {
//     return new Promise((resolve, object) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = function () {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = function (error) {
//         reject(error);
//       };
//     });
//   };

  const handleForUpdateProduct = async (data) => {
    setPid(data._id);
    setProductValues({
      CourseName: data.productName,
    //   price: data.price,
    //   HSNcode: data.HSNcode,
    //   stock: data.stock,
    //   point: data.point,
    //   categoryId: data.categoryId,
    //   image: data.image,
    //   description: data.description,

    });
  };

  const handleUpdateProduct = async () => {
    if (!formValidator()) {
      return;
    }
    setLoading(true);

    await ApiPut(`courseName/updateCourseName/id=${pid}`, allCourseName)
      .then((res) => {
        setLoading(false);
        setOpenUpdate(false);
        getProductData();
        toast.success(" Product Updated Successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleUpdateProductStatus = async () => {
    let data = {
      status: rowData.isActivate,
    };

    console.log("data", rowData);

    await ApiPut(`product/status/id=${rowData.row._id}`, data)
      .then((res) => {
        getProductData();
        setShowStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let i = 0;

  const columnProvider = () => {
    return [
    //   {
    //     name: "SNo",
    //     cell: (row, index) => (page - 1) * countPerPage + (index + 1),
    //     width: "65px",
    //   },
    //   {
    //     name: "Product Name",
    //     selector: "productName",
    //     sortable: true,
    //   },
    //   {
    //     name: "Price",
    //     selector: "price",
    //     wrap: true,
    //     sortable: true,
    //   },

    //   {
    //     name: "Category Name",
    //     cell: (raw) => {
    //       return (
    //         <div>
    //           <p>{raw?.categoryId?.categoryName}</p>
    //         </div>
    //       );
    //     },
    //     wrap: true,
    //     sortable: true,
    //   },
    //   {
    //     name: "HSNcode",
    //     selector: "HSNcode",
    //     wrap: true,
    //     sortable: true,
    //   },
    //   {
    //     name: "Point",
    //     selector: "point",
    //     wrap: true,
    //     sortable: true,
    //   },
    //   {
    //     name: "Stock",
    //     selector: "stock",
    //     wrap: true,
    //     sortable: true,
    //   },
    //   {
    //     name: "Product Description",
    //     selector: "description",
    //     wrap: true,
    //     sortable: true,
    //   },
    //   {
    //     name: "Image",
    //     cell: (row) => {
    //       return (
    //         <>
    //           <div className="p-3">
    //             <img
    //               className="max-w-50px zoom"
    //               alt="img"
    //               src={row?.image != null ? row.image[0] : ""}
    //             />
    //           </div>
    //         </>
    //       );
    //     },
    //     wrap: true,
    //   },
    {
        name: "Course Name",
        selector: "courseName",
        sortable: true,
      },

     
      {
        name: "Actions",
        cell: (row) => {
          return (
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  if (row.status != "false") {
                    handleForUpdateProduct(row);
                    setOpenUpdate(true);
                  }
                }}
              >
                <Tooltip title="Edit Product" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  handleShow(row._id);
                }}
              >
                <Tooltip title="Delete Product" arrow>
                  <DeleteIcon />
                </Tooltip>
              </div>

              {row.status == true ? (
                <div className="ml-5 cursor-pointer">
                  <button
                    className="btn btn-primary"
                    style={{ "white-space": "nowrap" }}
                    onClick={() => {
                      setRowData({
                        row: row,
                        isActivate: false,
                        status: "Deactivate",
                      });
                      setShowStatus(true);
                    }}
                  >
                    Active
                  </button>
                </div>
              ) : (
                <div className="ml-5 cursor-pointer">
                  <button
                    className="btn btn-danger"
                    style={{ "white-space": "nowrap" }}
                    onClick={() => {
                      setRowData({
                        row: row,
                        isActivate: true,
                        status: "Activate",
                      });
                      setShowStatus(true);
                    }}
                  >
                    Deactive
                  </button>
                </div>
              )}
            </div>
          );
        },
      },
    ];
  };
  const columns = columnProvider();

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
      <div>
        <div className="card p-1">
          <div className="p-2 mb-2">
            <div className="row">
              <div className="col-md-7">
                <h3 className="pt-2 pl-2">All Product</h3>
              </div>

              <div className="col-md-5">
                <div className="d-flex">
                  <input
                    className="mr-10 form-control"
                    style={{ display: "inline-block" }}
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    style={{ width: "-webkit-fill-available" }}
                    className="bg-primary"
                    onClick={() => {
                      handleClickOpen();
                    }}
                  >
                    Add New Product
                  </Button>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              {/* <Loader
                type="Puff"
                color="#334D52"
                height={30}
                width={30}
                // timeout={5000} //5 secs
                visible={isLoaderVisible}
              /> */}
            </div>
            <DataTable
              columns={columns}
              data={allProducts}
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
              // paginationComponentOptions={{
              //   noRowsPerPage: true
              // }}
              paginationRowsPerPageOptions={[10, 20, 25, 50, 100]}
              onChangePage={(page) => {
                setPage(page);
              }}
              onChangeRowsPerPage={(rowPerPage) => {
                // console.log("rowPerPare",rowPerPage);
                setCountPerPage(rowPerPage);
              }}
            />
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to want to delete Product</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeleteProduct()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStatus} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to {rowData?.status}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="danger" onClick={() => handleUpdateProductStatus()}>
            {rowData?.status}
          </Button>
        </Modal.Footer>
      </Modal>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose1}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose1}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <List>
          <form>
            <div className="form ml-30 ">
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Product Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      name="productName"
                      value={productValues.productName}
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                    {productError.productName || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Price
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      name="price"
                      value={productValues?.price}
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                    {productError.price || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  HSNcode
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      name="HSNcode"
                      value={productValues?.HSNcode}
                      onChange={(e) => {
                        handleChange(e);
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
                    {productError.HSNcode || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Product Point
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      name="point"
                      value={productValues?.point}
                      onChange={(e) => {
                        handleChange(e);
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
                    {productError.point || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Product Stock
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      name="stock"
                      value={productValues?.stock}
                      onChange={(e) => {
                        handleChange(e);
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
                    {productError.stock || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Product Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="textarea"
                      className={`form-control form-control-lg form-control-solid `}
                      name="description"
                      value={productValues.description}
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                    {productError.description || ""}
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Product Image
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="file"
                      multiple
                      className={`form-control form-control-lg form-control-solid `}
                      name="image"
                      // value={productValues.image || null}
                      onChange={(e) => {
                        getImageArrayFromUpload(e);
                        setProductError((cv) => {
                          return { ...cv, image: "" };
                        });
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
                    {productError.image || ""}
                  </span>
                </div>
              </div>

              

              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Select Category
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <div className="form-group fv-plugins-icon-container">
                      <select
                        className={`form-control form-control-lg form-control-solid `}
                        name="categoryId"
                        value={productValues.categoryId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        <option>Select Role...</option>
                        {category.map((record, i) => {
                          return (
                            <option
                              selected={productValues.categoryId === record._id}
                              value={record._id}
                            >
                              {record.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {productError.categoryId || ""}
                  </span>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-center">
                {submitValue && submitValue === true ? (
                  <button
                    onClick={(e) => {
                      handleUpdateProduct();
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Update Product</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      handleAddProduct(e);
                    }}
                    className="btn btn-success mr-2"
                  >
                    <span>Add Product</span>
                    {loading && (
                      <span className="mx-3 spinner spinner-white"></span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </List>
      </Dialog>

      <Dialog
        fullScreen
        open={openUpdate}
        onClose={handleUpdateClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleUpdateClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <List>
          <div className="form ml-30 ">
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Product Name
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="text"
                    className={`form-control form-control-lg form-control-solid `}
                    name="productName"
                    value={productValues.productName || ""}
                    onChange={(e) => {
                      setProductValues((cv) => {
                        return { ...cv, productName: e.target.value };
                      });
                      setProductError((cv) => {
                        return { ...cv, productName: "" };
                      });
                    }}
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
                  {productError.productName || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Price</label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="text"
                    className={`form-control form-control-lg form-control-solid `}
                    name="price"
                    value={productValues.price || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      setProductValues((cv) => {
                        return { ...cv, price: val };
                      });
                      setProductError((cv) => {
                        return { ...cv, price: "" };
                      });
                    }}
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
                  {productError.price || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                HSNcode
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="text"
                    className={`form-control form-control-lg form-control-solid `}
                    name="HSNcode"
                    value={productValues.HSNcode || ""}
                    onChange={(e) => {
                      setProductValues((cv) => {
                        return { ...cv, HSNcode: e.target.value };
                      });
                      setProductError((cv) => {
                        return { ...cv, HSNcode: "" };
                      });
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
                  {productError.HSNcode || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Product Point
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="text"
                    className={`form-control form-control-lg form-control-solid `}
                    name="point"
                    value={productValues.point || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      setProductValues((cv) => {
                        return { ...cv, point: val };
                      });
                      setProductError((cv) => {
                        return { ...cv, point: "" };
                      });
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
                  {productError.point || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Product Stock
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="text"
                    className={`form-control form-control-lg form-control-solid `}
                    name="stock"
                    value={productValues.stock || ""}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      setProductValues((cv) => {
                        return { ...cv, stock: val };
                      });
                      setProductError((cv) => {
                        return { ...cv, stock: "" };
                      });
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
                  {productError.stock || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Product Description
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  {/* <input
                    type="textarea"
                    className={`form-control form-control-lg form-control-solid `}
                   
                  /> */}
                  <textarea  className={`form-control form-control-lg form-control-solid `}  name="description"
                    value={productValues.description || ""}
                    onChange={(e) => {
                      setProductValues((cv) => {
                        return { ...cv, description: e.target.value };
                      });
                      setProductError((cv) => {
                        return { ...cv, description: "" };
                      });
                    }}
                    required>
                  </textarea>
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {productError.description || ""}
                </span>
              </div>
            </div>

            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Product Image
              </label>
              <div className="col-lg-9 col-xl-6">
                <div>
                  <input
                    type="file"
                    multiple
                    className={`form-control form-control-lg form-control-solid `}
                    name="image"
                    // value={productValues.image || null}
                    onChange={(e) => {
                      getImageArrayFromUpload(e);
                      setProductError((cv) => {
                        return { ...cv, image: "" };
                      });
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
                  {productError.image || ""}
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <button
                onClick={() => {
                  handleUpdateProduct();
                }}
                className="btn btn-success mr-2"
              >
                <span>Update Product</span>
                {loading && (
                  <span className="mx-3 spinner spinner-white"></span>
                )}
              </button>
            </div>
          </div>
        </List>
      </Dialog>
    </>
  );
};

export default ProductData;
