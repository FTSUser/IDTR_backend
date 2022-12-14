import React, { useEffect, useState, useRef } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "./User.scss";

import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../helpers/API/ApiData";
import { Tooltip } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Dialog from "@material-ui/core/Dialog";
import S3 from "react-aws-s3";
import Select from "react-select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import moment from "moment";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import CsvDownload from "react-json-to-csv";
import { AwsConfig } from "../../../config/S3Backet/app.config";
import PaymentForm from "../PaymentForm/payment";
import PaymentData from "../PaymentForm/payment";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Logo from "./honda.png";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import { addDays } from "date-fns";
var a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
var b = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function inWords(num) {
  if (!num) return;
  if ((num?.toString()).length > 9) return;
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? " And " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        " Only "
      : "";
  return str;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// for pdf generation

class ComponentToPrints extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    return (
      <>
        <table
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style={{ padding: "30px" }}
        >
          <tr>
            <td style={{ padding: "0px 0 0px 0" }}>
              <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "100px" }}
                        src="https://i.ibb.co/87cN78k/aa.png"
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "50px" }}
                        src="https://i.ibb.co/XLg1jLn/rre.png"
                      />
                    </div>
                  </div>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "20px 0 20px 0" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Institute of Driving Training & Research
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                          maxWidth: "330px",
                        }}
                      >
                        Uchani Village, Baldhi part, Near New Bus Stand Teshil
                        and District Karnal, Haryana-122001
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Phone No:
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="first-grid">
                      <div class="first-grid-items">
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          GST No
                        </span>
                      </div>
                      <div class="first-grid-items">
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "16px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SAC Code:999293
                        </span>
                      </div>
                    </div>
                    <div   style={{
                         
                          margin: "20px 0 15px 0",
                        }}>
                      <p
                        style={{
                          fontSize: "18px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        PAYMENT RECEIPT
                      </p>
                    </div>
                    <div class="sec-grid">
                      <div class="sec-grid-items">
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Receipt No. <span>{`${this.props?.data?._id} `}</span>
                        </p>
                      
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Trainee Name:{" "}
                          <span>{`${this.props?.data?.fname} `}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Address:{" "}
                          <span>{`${this.props?.data?.address} `}</span>
                        </p>
                      </div>
                      <div class="sec-grid-items">
                        <div class="three-grid">
                          <div>
                            <p> Receipt Date:
                            {" "}
                          <span>{`${moment(this.props?.data?.receiptDate).format(
                            "DD-MM-YYYY "
                          )} `}</span>
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              S/o
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              Mobile No:{" "}
                              <span>{`${this.props?.data?.phone} `}</span>
                            </p>
                          </div>
                          <div
                            style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }}
                          >
                             <img  style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }} src={this?.props?.data?.passportPhoto}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="new-table-design new-table-design-style">
                      <thead style={{ border: "1px solid red" }}>
                        <tr>
                          <th align="center" width="8%">
                            Regn No
                          </th>
                          <th align="center" width="30%">
                            Regn Date
                          </th>
                          <th align="center" width="20.66">
                            Course Description/ Name
                          </th>
                          <th align="center" width="20.66">
                            Theory Date <br /> (Time- 8:45 AM)
                          </th>
                        </tr>
                      </thead>
                      <tr>
                        <td align="center">1</td>
                        <td>
                          {moment(this?.props?.data?.createdAt).format(
                            "DD-MM-YYYY "
                          )}
                        </td>
                        <td align="center">
                          <span>
                            {this.props?.data?.courseName[0]?.courseName}
                          </span>
                        </td>
                        <td align="center">
                          {this?.props?.data?.courseName[0]?.duration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="thee-col-alignment">
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount (RS):
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Taxable Amount:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Rounded Off:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount in Words:{' '}
                          <span>
                            {inWords(Math.round(this.props?.data?.paymentHistory?.price))}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Discount (Rs):<span>-</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          CGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.cgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Payable Amount :
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.sgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Pay Mode:
                          <span>{this.props?.data?.paymentType}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "40px 0 0px 0" }}>
                      <p>Fot IDTR Karnal:</p>
                      <span>Note:</span>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        1. 100% refund if cancellation is made 3 days prior to
                        course commencement
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        2. Offline cancellation is not allowed for online
                        bookings
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        3. Refunds will be processed to customer within 10-15
                        days
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        4. No Change/modification is allowed for allocated
                        training slot.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                          color: "#000",
                          textAlign: "center",
                        }}
                      >
                        ***** This is a computer-generated Invoice and signature
                        not required *****
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        {/* <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>
                        A joint venture of Transport Department, <br />{" "}
                        Government of Haryana & Honda IDTR
                      </p>
                      <p>GST Number:121222</p>
                    </td>
                    <td class="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created:{" "}
                      {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                    <td>
                      <h3>TAX INVOICE</h3>
                      Invoice #: {this.props?.data?._id}
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Invoice To: {`${this.props?.data?.fname} `} </td>
                <td>{this.props?.data?.lname}</td>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>
            </tr>

            <tr class="details">
              <td>{this.props?.data?.type}</td>
            </tr>

            <tr class="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>
            </tr>

            <tr class="item">
              <td>{this.props?.data?.courseName[0]?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr>

            <tr></tr>
            <tr class="total top">
              <td></td>

              <td>Total: &#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr>
            <tr class="total">
              <td></td>

              <td>
                Grand Total: &#x20b9;{this.props?.data?.courseName[0]?.price}
              </td>
            </tr>
          </table>
        </div> */}
      </>
    );
  }
}

class ComponentToPrintss extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentDidMount() {
    this.setState({ ...this.props });
  }

  render() {
    return (
      <>
        <table
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style={{ padding: "30px" }}
        >
          <tr>
            <td style={{ padding: "0px 0 0px 0" }}>
              <table align="center" cellpadding="0" cellspacing="0">
                <tr>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "100px" }}
                        src="https://i.ibb.co/87cN78k/aa.png"
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ maxWidth: "50px" }}
                        src="https://i.ibb.co/XLg1jLn/rre.png"
                      />
                    </div>
                  </div>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "20px 0 20px 0" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Institute of Driving Training & Research
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                          maxWidth: "330px",
                        }}
                      >
                        Uchani Village, Baldhi part, Near New Bus Stand Teshil
                        and District Karnal, Haryana-122001
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        Phone No:
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="first-grid">
                      <div class="first-grid-items">
                        <span
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          GST No
                        </span>
                      </div>
                      <div class="first-grid-items">
                        <span
                          style={{
                            fontSize: "14px",
                            lineHeight: "16px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SAC Code:999293
                        </span>
                      </div>
                    </div>
                    <div   style={{
                         
                          margin: "20px 0 15px 0",
                        }}>
                      <p
                        style={{
                          fontSize: "18px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        CANCELLATION RECEIPT
                      </p>
                    </div>
                    <div class="sec-grid">
                      <div class="sec-grid-items">
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Receipt No. <span>{`${this.props?.data?._id} `}</span>
                        </p>
                      
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Trainee Name:{" "}
                          <span>{`${this.props?.data?.fname} `}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Address:{" "}
                          <span>{`${this.props?.data?.address} `}</span>
                        </p>
                      </div>
                      <div class="sec-grid-items">
                        <div class="three-grid">
                          <div>
                            <p> CANCELLATION Receipt Date:
                            {" "}
                          <span>{`${moment(this.props?.data?.receiptDate).format(
                            "DD-MM-YYYY "
                          )} `}</span>
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              S/o
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                lineHeight: "14px",
                                fontWeight: "600",
                                color: "#000",
                                margin: "0 0 5px 0",
                              }}
                            >
                              Mobile No:{" "}
                              <span>{`${this.props?.data?.phone} `}</span>
                            </p>
                          </div>
                          <div
                            style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }}
                          >
                             <img  style={{
                              height: "120px",
                              width: "100%",
                              backgroundColor: "#000",
                            }} src={this?.props?.data?.passportPhoto}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="new-table-design new-table-design-style">
                      <thead style={{ border: "1px solid red" }}>
                        <tr>
                          <th align="center" width="8%">
                            Regn No
                          </th>
                          <th align="center" width="30%">
                            Regn Date
                          </th>
                          <th align="center" width="20.66">
                            Course Description/ Name
                          </th>
                          <th align="center" width="20.66">
                            Theory Date <br /> (Time- 8:45 AM)
                          </th>
                        </tr>
                      </thead>
                      <tr>
                        <td align="center">1</td>
                        <td>
                          {moment(this?.props?.data?.createdAt).format(
                            "DD-MM-YYYY "
                          )}
                        </td>
                        <td align="center">
                          <span>
                            {this.props?.data?.cnid?.courseName}
                          </span>
                        </td>
                        <td align="center">
                          {this?.props?.data?.cnid?.duration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}></div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="thee-col-alignment">
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount (RS):
                          <span>{this.props?.data?.cnid?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Taxable Amount:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Rounded Off:
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Amount in Words:{' '}
                          <span>
                            {inWords(Math.round(this.props?.data?.paymentHistory?.price))}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Discount (Rs):<span>-</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          CGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.cgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Payable Amount :
                          <span>{this.props?.data?.paymentHistory?.price}</span>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          SGST 9% ( Rs) :
                          <span>{this.props?.data?.paymentHistory?.sgst}</span>
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: "14px",
                            fontWeight: "600",
                            color: "#000",
                            margin: "0 0 5px 0",
                          }}
                        >
                          Pay Mode:
                          <span>{this.props?.data?.paymentType}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "40px 0 0px 0" }}>
                      <p>Fot IDTR Karnal:</p>
                      <span>Note:</span>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        1. 100% refund if cancellation is made 3 days prior to
                        course commencement
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        2. offline cancellation is not allowed for online
                        bookings
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        3. Refunds will be processed to customer with in 10-15
                        days
                      </p>
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "14px",
                          fontWeight: "600",
                          color: "#000",
                          margin: "0 0 5px 0",
                        }}
                      >
                        4. No Change/modification is allowed for allocared
                        training slot.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div style={{ padding: "30px 0 0px 0" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontWeight: "600",
                          color: "#000",
                          textAlign: "center",
                        }}
                      >
                        ***** This is a computer-generated Invoice and signature
                        not required *****
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        {/* <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <b>Institute of Driving and Traffic Research (IDTR)</b>
                      <p>
                        A joint venture of Transport Department, <br />{" "}
                        Government of Haryana & Honda IDTR
                      </p>
                      <p>GST Number:121222</p>
                    </td>
                    <td class="title">
                      <img src={Logo} />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Created:{" "}
                      {moment(this?.props?.data?.createdAt).format(
                        "DD-MM-YYYY "
                      )}
                    </td>
                    <td>
                      <h3>TAX INVOICE</h3>
                      Invoice #: {this.props?.data?._id}
                      <br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr className="">
              <td>
                <td>Invoice To: {`${this.props?.data?.fname} `} </td>
                <td>{this.props?.data?.lname}</td>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>
            </tr>

            <tr class="details">
              <td>{this.props?.data?.type}</td>
            </tr>

            <tr class="heading">
              <td>Item</td>
              <td>GST</td>
              <td>COST</td>
            </tr>

            <tr class="item">
              <td>{this.props?.data?.courseName[0]?.courseName}</td>
              <td>12FC34343433</td>
              <td>&#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr>

            <tr></tr>
            <tr class="total top">
              <td></td>

              <td>Total: &#x20b9;{this.props?.data?.courseName[0]?.price}</td>
            </tr>
            <tr class="total">
              <td></td>

              <td>
                Grand Total: &#x20b9;{this.props?.data?.courseName[0]?.price}
              </td>
            </tr>
          </table>
        </div> */}
      </>
    );
  }
}

//testing end

const User = ({ getNewCount, title }) => {
  const ref = React.createRef();
  const itemsRef = useRef([]);
  const [filteredUser, setFilteredUser] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);

  const [dataViewMore, setDataViewMore] = useState({});
  const [isViewMoreUser, setIsViewMoreUser] = useState(false);
  const [dataForEdit, setDataForEdit] = useState();
  const [modalOpens, setModalOpens] = useState(false);
  const [allData, setData] = useState();

  //new data

  const [inputValue, setInputValue] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [countPerPage, setCountPerPage] = useState(10);
  const [setEndValue, endValue] = useState("");
  const [setStartValue, startValue] = useState("");
  const [allRegisterUserExcel, setAllRegisterUserExcel] = useState([]);
  const [dataCSV, setDataCSV] = useState([]);
  const [dataCSVLogs, setDataCSVLogs] = useState([]);
  const [dataCSVPostLogs, setDataCSVPostLogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [tableFilterData, setTableFilterData] = useState({});
  const [isAddAnnouncement, setIsAddAnnouncement] = useState(false);
  const [isUpdateAnnouncement, setIsUpdateAnnouncement] = useState(false);
  const [show, setShow] = useState(false);
  const [dicloser, setdicloser] = useState(false);
  const [isPaymentPopUp, setIsPaymentPopUp] = useState(false);
  const [dataForPayment, setDataForPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idForDeleteAnnouncement, setIdForDeleteAnnouncement] = useState("");
  const [search, setSearch] = useState("");
  const [getAllCourceCategory, setgetAllCourceCategory] = useState({});
  const [logsData, setLogsData] = useState({});
  const [logsPostData, setLogsPostData] = useState({});
  const [modelForUserLogs, setModelForUserLogs] = useState(false);
  const [dataForUserLogCSV, setDataForUserLogCSV] = useState([]);

  const [idForUpdateAnnouncementData, setIdForUpdateAnnouncementData] =
    useState("");

  const handleViewMoreClose = () => {
    setIsViewMoreUser(false);
    setDataViewMore({});
  };

  const handleCloseForUserLogs = () => {
    setModelForUserLogs(false);
    setTabs("post");
  };

  useEffect(() => {
    document.title = "Honda | User";
  }, []);
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTab("course");
    }
  }, [seconds]);

  // const startValue = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   14
  // );
  // const endValue = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth() + 1,
  //   15
  // );
  const [getAllVehicalData, setgetAllVehicalData] = useState({});
  const [getAllCourceType, setgetAllCourceType] = useState({});
  const [getAllCourceName, setgetAllCourceName] = useState({});
  const [getCourseNameByID, setgetNameByID] = useState();
  const [getSeat, setSeat] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [VehicalCategoryData, setVehicalCategoryData] = useState("");
  const [TrainningDate, setTrainningDate] = useState("");
  const [CourceTypeData, setCourceTypeData] = useState("");
  const [CourceCategoryData, setCourceCategoryData] = useState("");
  const [CourceNameData, setCourceNameData] = useState("");
  const [price, setPrice] = useState("");
  const [cnid, setCNID] = useState("");
  const [alertForSlot, setAlertForSlot] = useState();
  const [editMode, setEditMode] = useState(false);
  const [defaultValue, setdefaultValue] = useState({
    vehicleCategory: null,
    courseType: null,
    courseCategory: null,
  });

  const [submitpayment, setSubmitPayment] = useState(false);
  const [paymentId, setPaymentId] = useState();

  const [CourceType, setCourceType] = useState("");
  const [dateForFilter, setDateForFilter] = useState();
  const [updateCall, setUpdateCall] = useState(false);

  const [typeTrueFalseform, settypeTrueFalseform] = useState(false);
  const [errorShow, seterrorShow] = useState("");

  const [tab, setTab] = useState("course");

  const [inputValueForAdd, setInputValueForAdd] = useState({});
  const [errorsForAdd, setErrorsForAdd] = useState({});

  const [formdata, setFormData] = useState({
    vehicleCategory: "",
    courseType: "",
    courseName: "",
    courseCategory: "",
    firstname: "",
    middlename: "",
    lastname: "",
    dateofCourse: "",
    DateofBirth: "",
    qualification: "",
    gender: "",
    address: "",
    state: "",
    driverlicense: "",
    district: "",
    city: "",
    email: "",
    phone: "",
    pin: "",
    license: "",
    issueDate: "",
    validDate: "",
    authority: "",
    passport: null,
    driviniglicencephoto: null,
    idProof: null,
    mediacalCertificate: null,
    bloodgroup: "",
    preferdate: "",
    trainddateid: "",
    sloatId: "",
    authoritycity: "",
    authoritydistrict: "",
    type: "",
  });

  useEffect(() => {
    if (submitpayment) {
      register();
    }
  }, [submitpayment]);

  const handleOnChnageAdd = (e) => {
    const { name, value } = e.target;
    setInputValueForAdd({ ...inputValueForAdd, [name]: value });
    setErrorsForAdd({ ...errorsForAdd, [name]: "" });
  };
  const handlePaymentClose = () => {
    setIsPaymentPopUp(false);
    setDataForPayment([]);
  };

  const handleAddAdminClose = () => {
    setSeat([]);
    setFormData({
      vehicleCategory: "",
      courseType: "",
      courseName: "",
      courseCategory: "",
      firstname: "",
      middlename: "",
      lastname: "",
      dateofCourse: "",
      DateofBirth: "",
      qualification: "",
      gender: "",
      address: "",
      state: "",
      driverlicense: "",
      district: "",
      city: "",
      email: "",
      phone: "",
      pin: "",
      license: "",
      issueDate: "",
      validDate: "",
      authority: "",
      passport: null,
      driviniglicencephoto: null,
      idProof: null,
      mediacalCertificate: null,
      bloodgroup: "",
      preferdate: "",
      trainddateid: "",
      sloatId: "",
      authoritycity: "",
      authoritydistrict: "",
      type: "",
    });
    setEditMode(false);
    setInputValue({});
    setCourceTypeData("");
    setCourceCategoryData("");
    setCourceNameData("");
    setgetNameByID();
    setTab("course");
    setdefaultValue({
      vehicleCategory: null,
      courseType: null,
      courseCategory: null,
      courseCategoryId: null,
    });
    setIsAddAnnouncement(false);
  };
  const onChangeDiscloser = (e) => {
    setdicloser(e);
  };
  const handleSetDateData = async (dateForFilter) => {
    if (dateForFilter) {
      await ApiGet(
        `register/getRecordsByRange?sd=${moment(dateForFilter[0]).format(
          "MM/DD/YYYY"
        )}&ed=${moment(dateForFilter[1]).format(
          "MM/DD/YYYY"
        )}&page=${page}&limit=${countPerPage}`
      )
        .then((res) => {
          // setTableFilterData(tableFilterData);

          setCount(res?.data?.payload?.count);
          setTableFilterData(res?.data?.payload?.Question);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      getAllUser();
    }
    // setTableFilterData([]);
    // if (!date) {
    //   setTableFilterData(tableFilterData);

    // } else {
    //   let newData = tableFilterData.filter((data) => {
    //     if (
    //       moment(data.createdAt).unix() > moment(date[0]).unix() &&
    //       moment(data.createdAt).unix() < moment(date[1]).unix()
    //     ) {
    //       return data;
    //     }
    //   });
    //   setTableFilterData(newData);
    // }
  };

  //test
  const getAllCourseCategory = () => {
    const data = {
      courseType: CourceTypeData,
      vehicleCategory: VehicalCategoryData,
    };
    ApiPost(
      "courseCategory/getCourseCategoryByCourseType?page=${page}&limit=1000",
      data
    ).then((res) => {
      setgetAllCourceCategory(res.data.payload);
    });
    setUpdateCall(false);
  };

  useEffect(() => {
    if (updateCall) {
      getAllCourseCategory();
    }
  }, [updateCall]);

  //end test
  const cancelBooking = (data) => {
    setModalOpens(false);
    if (data?._id) {
      ApiPut(`register/cancleBooking?uid=${data?._id}`)
        .then((res) => {
          toast.success("Your booking cancel successfully");
         
        })
        .catch((err) => {
          toast.error(err, { theme: "colored" });
        });
    }
  };
  useEffect(() => {
    if (dateForFilter) {
      handleSetDateData(dateForFilter);
    } else {
      getAllUser();
    }
  }, [page, countPerPage]);

  const getAllUser = async () => {
    setIsLoaderVisible(true);
    // if (!search) {
    await ApiGet(
      `register/getAllRegister?search=${search}&page=${page}&limit=${countPerPage}`
    )
      .then((res) => {
        setIsLoaderVisible(false);
        setFilteredUser(res?.data?.payload?.Question);
        setTableFilterData(res?.data?.payload?.Question);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    // }
  };
  const [tabs, setTabs] = useState("post");
  const handleOnClicks = (e, key) => {
    e.preventDefault();
    if (key === "pre") {
      setTabs(key);
    } else if (key === "post") {
      setTabs(key);
    }
  };

  const getAdminLogs = async (id) => {
    await ApiGet(`admin/get-admin-login-log/${id?._id}`)
      .then((res) => {
        setLogsData(res?.data?.payload?.user);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    // }
  };
  const getAdminPostLogs = async (id) => {
    await ApiGet(`admin/get-logout-users/${id?._id}`)
      .then((res) => {
        setLogsPostData(res?.data?.payload?.admin);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    // }
  };

  useEffect(() => {}, [inputValue]);

  let i = 0;
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "User ID",
      selector: "uid",
      width: "220px",
      sortable: true,
      cell: (row) => {
        return <span>{row?.uid?._id ? row?.uid?._id : row?._id}</span>;
      },
    },
    {
      name: "Tracking ID",
      selector: "id",
      width: "220px",
      sortable: true,
      cell: (row) => {
        return <span>{row?._id ? row?._id : row?._id}</span>;
      },
    },
    {
      name: "First Name",
      selector: "fname",
      width: "130px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.fname === "" ? "-" : row?.fname}</span>;
      },
    },

    {
      name: "Last Name",
      selector: "lname",
      width: "130px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.lname === "" ? "-" : row?.lname}</span>;
      },
    },

    {
      name: "Email",
      selector: "email",
      width: "160px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.email === "" ? "-" : row?.email}</span>;
      },
    },
    {
      name: "Mobile Number",
      width: "170px",

      cell: (row) => {
        return <span>{row?.phone === "" ? "-" : row?.phone}</span>;
      },
      sortable: true,
    },

    {
      name: "Registration Type",
      selector: "Registrationtype",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return (
          <span>
            {row?.Registrationtype === "" ? "-" : row?.Registrationtype}
          </span>
        );
      },
    },
    {
      name: "Father Name",
      selector: "firstName",
      width: "130px",

      sortable: true,
      cell: (row) => {
        return (
          <span>{row?.uid?.firstName === "" ? "-" : row?.uid?.firstName}</span>
        );
      },
    },
    {
      name: "Date of Birth",

      cell: (row) => {
        return <span>{moment(row?.DoB).format("ll")}</span>;
      },
      sortable: true,

      width: "135px",
    },
    {
      name: "Qualification",
      cell: (row) => {
        return (
          <span>{row?.qualification === "" ? "-" : row?.qualification}</span>
        );
      },
      sortable: true,
      width: "195px",
    },
    {
      name: "Gender",
      cell: (row) => {
        return <span>{row?.gender === "" ? "-" : row?.gender}</span>;
      },
      sortable: true,
      width: "135px",
    },
    {
      name: "Address",
      cell: (row) => {
        return <span>{row?.address === "" ? "-" : row?.address}</span>;
      },
      sortable: true,
      width: "135px",
    },
    {
      name: "State",
      cell: (row) => {
        return <span>{row?.state === "" ? "-" : row?.state}</span>;
      },
      sortable: true,
      width: "135px",
    },
    {
      name: "District",
      cell: (row) => {
        return <span>{row?.district === "" ? "-" : row?.district}</span>;
      },
      sortable: true,
      width: "135px",
    },
    {
      name: "Town / City",
      cell: (row) => {
        return <span>{row?.city === "" ? "-" : row?.city}</span>;
      },
      sortable: true,
      width: "135px",
    },
    {
      name: "Select IDTR Center",
      cell: (row) => {
        return (
          <span>
            {row?.uid?.IDTRcenter === "" ? "-" : row?.uid?.IDTRcenter}
          </span>
        );
      },
      sortable: true,
      width: "185px",
    },
    {
      name: "Course Type",
      cell: (row) => {
        return (
          <span>
            {row?.courseType[0]?.courseType === ""
              ? "-"
              : row?.courseType[0]?.courseType}
          </span>
        );
      },
      sortable: true,
      width: "185px",
    },
    {
      name: "Vehical Category",
      cell: (row) => {
        return (
          <span>
            {row?.vehicleCategory[0]?.vehicleCategory === ""
              ? "-"
              : row?.vehicleCategory[0]?.vehicleCategory}
          </span>
        );
      },
      sortable: true,
      width: "185px",
    },
    {
      name: "Course Name",
      selector: "courseName",
      width: "600px",
      cell: (row) => {
        return (
          <span>
            {row?.courseName[0]?.courseName === ""
              ? "-"
              : row?.courseName[0]?.courseName}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Date of Course",
      cell: (row) => {
        return (
          <span>{moment(row?.trainingDate[0]?.createdAt).format("ll")}</span>
        );
      },
      sortable: true,
      width: "185px",
    },
    {
      name: "License Category",
      selector: "lcid",
      width: "160px",
      cell: (row) => {
        return <span>{row?.lcid === "" ? "-" : row?.lcid}</span>;
      },
      sortable: true,
    },
    {
      name: "Driver's License. No",
      selector: "drivingLicenseNumber",
      width: "160px",
      cell: (row) => {
        return (
          <span>
            {row?.drivingLicenseNumber === null
              ? "-"
              : row?.drivingLicenseNumber}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Issue Date",
      selector: "issueDate",
      width: "160px",
      cell: (row) => {
        return <span>{row?.issueDate === null ? "-" : moment(row?.issueDate).format("ll")}</span>;
      },

      sortable: true,
    },
    {
      name: "Valid Till",
      selector: "validTill",
      width: "160px",
      cell: (row) => {
        return <span>{row?.validTill === null ? "-" : moment(row?.validTill).format("ll")}</span>;
      },

      sortable: true,
    },
    {
      name: "License Authority: State",
      selector: "Authority",
      width: "160px",
      cell: (row) => {
        return <span>{row?.Authority === "" ? "-" : row?.Authority}</span>;
      },

      sortable: true,
    },
    {
      name: "License Authority: City",
      selector: "authoritycity",
      width: "160px",
      cell: (row) => {
        return (
          <span>{row?.authoritycity === "" ? "-" : row?.authoritycity}</span>
        );
      },

      sortable: true,
    },
    {
      name: "License Authority: District",
      selector: "authoritydistrict",
      width: "160px",
      cell: (row) => {
        return (
          <span>
            {row?.authoritydistrict === "" ? "-" : row?.authoritydistrict}
          </span>
        );
      },

      sortable: true,
    },
    {
      name: "Blood Group",
      selector: "bloodGroup",
      width: "160px",
      cell: (row) => {
        return <span>{row?.bloodGroup === "" ? "-" : row?.bloodGroup}</span>;
      },

      sortable: true,
    },
    {
      name: "Payment Rcvd",
      selector: "isPaymentDone",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.isPaymentDone === true ? "Done" : "Pending"}</span>;
      },
    },
    {
      name: "Payment Mode",
      selector: "type",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.type === "" ? "-" : row?.type}</span>;
      },
    },
    {
      name: "Transaction ID",
      selector: "paymentId",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.paymentId === "" ? "-" : row?.paymentId}</span>;
      },
    },
    {
      name: "Payment ID",
      selector: "paymentId",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.paymentId === "" ? "-" : row?.paymentId}</span>;
      },
    },
    {
      name: "Payment Type",
      selector: "paymentType",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return <span>{row?.paymentType === "" ? "-" : row?.paymentType}</span>;
      },
    },
    {
      name: "Registeration Date",
      selector: "registrationDate",
      width: "180px",

      sortable: true,
      cell: (row) => {
        return (
          <span>
            {row?.uid?.registrationDate === ""
              ? "-"
              : row?.uid?.registrationDate}
          </span>
        );
      },
    },

    {
      name: "Actions",
    
      cell: (row) => {
        return (
          <>
            <div
              className="cursor-pointer pl-2"
              onClick={() => {
                setIsViewMoreUser(true);
                setDataViewMore(row);
              }}
            >
              <Tooltip title="Show More" arrow>
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
            {
              row?.isPaymentDone == true &&   <div className="cursor-pointer pl-2">
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Generate Pdf" arrow>
                    <img src="media/allIconsForTable/invoice.png" />
                  </Tooltip>
                )}
                content={() => itemsRef.current[row._id]}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={(el) => (itemsRef.current[row._id] = el)}
                  id={row?._id}
                >
                  <ComponentToPrints data={row} />
                </div>
              </div>
            </div>
            }
         

            <div className="cursor-pointer pl-2">
              {!row?.uid ? (
                <>
                  <Tooltip title="Edit User" arrow>
                    <CreateIcon
                      onClick={() => {
                        setTab("course");
                        setIsAddAnnouncement(true);
                        setSeconds(300);
                        setEditMode(true);
                        let index = getAllVehicalData?.Question?.findIndex(
                          (e) => e._id === row?.vcid
                        );
                        let vehical;
                        if (index !== -1) {
                          vehical = {
                            label:
                              getAllVehicalData?.Question[index]
                                .vehicleCategory,
                            value: getAllVehicalData?.Question[index]._id,
                          };
                          setdefaultValue((data) => ({
                            ...data,
                            vehicleCategory: vehical,
                          }));
                        }
                        setVehicalCategoryData(row?.vcid);
                        getAllCourseTypeDataEdit(row?.vcid, row?.ctid);
                        getAllCourseCategoryEdit(
                          row?.ctid,
                          row?.vcid,
                          row?.ccid
                        );
                        getAllCourseNameEdit(
                          row?.ctid,
                          row?.vcid,
                          row?.ccid,
                          row?.cnid
                        );
                        setCNID(row?.cnid);

                        setFormData({
                          _id: row?._id,
                          vehicleCategory: row?.vcid,
                          courseType: row?.ctid,
                          courseName: row?.cnid,
                          courseCategory: row?.ccid,
                          firstname: row?.fname,
                          middlename: row?.mname,
                          lastname: row?.lname,
                          dateofCourse: row?.dateofCourse,
                          DateofBirth: row?.DoB,
                          qualification: row?.qualification,
                          gender: row?.gender,
                          address: row?.address,
                          state: row?.state,
                          district: row?.district,
                          city: row?.city,
                          email: row?.email,
                          phone: row?.phone,
                          pin: row?.pincode,
                          license: row?.lcid,
                          authority: row?.Authority,
                          passport: row?.passportPhoto,
                          driviniglicencephoto: row?.drivingLicense,
                          idProof: row?.IDproof,
                          mediacalCertificate: row?.medicalCertificate,
                          bloodgroup: row?.bloodGroup,
                          preferdate: row?.dateofCourse,
                          trainddateid: row?.trainddateid,
                          sloatId: row?.tdid,
                          authoritycity: row?.authoritycity,
                          authoritydistrict: row?.authoritydistrict,
                          type: row?.type,
                          driverlicense:
                            row?.license === "N/A"
                              ? null
                              : row?.drivingLicenseNumber,
                          issueDate:
                            row?.license === "N/A" ? "" : row?.issueDate,
                          validDate:
                            row?.license === "N/A" ? "" : row?.validTill,
                        });

                        getTrainignDateEditData(row?.dateofCourse, row?.cnid);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Delete User" arrow>
                    <DeleteIcon
                      onClick={() => {
                        setShow(true);
                        setIdForDeleteAnnouncement(row?._id);
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                ""
              )}
            </div>
            <Tooltip title="Make a Payment" arrow>
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setIsPaymentPopUp(true);
                  setDataForPayment(row);
                }}
              >
                {row?.isPaymentDone === false ? (
                  <img src="media/allIconsForTable/makepayment.png" />
                ) : (
                  ""
                )}
              </div>
            </Tooltip>
           
        
          </>
        );
      },
    },
    {
      name: "Cancel Booking",
      width:'200px',
      cell: (row) => {
        let subTractDate = moment(row?.trainingDate[0]?.date).subtract(3, "days").format("YYYY-MM-DD");
        let isCancleButton = moment(subTractDate).isAfter(moment(new Date()).format("YYYY-MM-DD"));
        return (
          <>
          
            {
              
              row?.recordType == 'upcomming' && isCancleButton && 
              
              
              
              <button className=" btn btn-success"  onClick={() => {
                setModalOpens(!modalOpens);
                setData(row);
              }}>Cancel Booking</button>
            }
            {
              row?.isCancle && <>
              <div>Booking Canceled</div>
              <div className="cursor-pointer pl-2">
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Generate Pdf" arrow>
                  <img src="media/allIconsForTable/invoice.png" />
                </Tooltip>
                )}
                content={() => itemsRef.current[row._id]}
              />
              <div style={{ display: "none" }}>
                <div
                  ref={(el) => (itemsRef.current[row._id] = el)}
                  id={row?._id}
                >
                  <ComponentToPrintss data={row} />
                </div>
              </div>
            </div>
              
              </>
            }
          </>
        );
      },
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            {row?.uid && (
              <div
                className="cursor-pointer pl-2"
                onClick={async () => {
                  await getAdminLogs(row?.uid);
                  await getAdminPostLogs(row?.uid);
                  setModelForUserLogs(true);
                }}
              >
                <button className="btn btn-success mr-2">User Logs</button>
              </div>
            )}
          </>
        );
      },
    },
  ];
  const columnsForUserLogs = [
    {
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("ll")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
    },
    {
      name: "Time",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("LT")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
    },
    {
      name: "Device",
      selector: (row) => row?.device,
      sortable: true,
    },
    {
      name: "IP",
      selector: (row) => row?.ip,
      sortable: true,
    },

    {
      name: "User Phone",
      selector: (row) => row?.uid?.phone,
      sortable: true,
      cell: (row) => {
        return <span>{row?.uid?.phone === "" ? "-" : row?.uid?.phone}</span>;
      },
    },
    {
      name: "First Name",
      selector: (row) => row?.uid?.firstName,
      sortable: true,
      cell: (row) => {
        return (
          <span>{row?.uid?.firstName === "" ? "-" : row?.uid?.firstName}</span>
        );
      },
    },

    // {
    //   name: "Actions",
    //   cell: (row) => {

    //     return (
    //       <>
    //         <div
    //           className="cursor-pointer pl-2"
    //         >
    //           <CsvDownload
    //             className={``}
    //             data={dataCSVLogs}
    //             filename="User Report.csv"
    //             style={{
    //               backgroundColor: "#CC0001",
    //               borderRadius: "6px",
    //               border: "1px solid #fff",
    //               display: "inline-block",
    //               cursor: "pointer",
    //               color: "#FFFFFF",
    //               fontSize: "12px",
    //               padding: "10px 18px",
    //               textDecoration: "none",
    //               position: "right",
    //             }}
    //           >
    //             Export to Excel
    //           </CsvDownload>
    //         </div>
    //       </>
    //     );
    //   },
    // },
  ];
  const columnsForUserLogsPost = [
    {
      name: "Date",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("ll")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
    },
    {
      name: "Time",
      cell: (row) => {
        return <span>{moment(row?.createdAt).format("LT")}</span>;
      },
      selector: (row) => row?.createdAt,
      sortable: true,
    },
    {
      name: "Device",
      selector: (row) => row?.device,
      sortable: true,
    },
    {
      name: "IP",
      selector: (row) => row?.ip,
      sortable: true,
    },

    {
      name: "User Phone",
      selector: (row) => row?.uid?.phone,
      sortable: true,
      cell: (row) => {
        return <span>{row?.uid?.phone === "" ? "-" : row?.uid?.phone}</span>;
      },
    },
    {
      name: "Last Page",
      width: "200px",
      cell: (row) => {
        return (
          <span>
            {row?.lastPage === ""
              ? "-"
              : row?.lastPage.trim().replace("/", "").trim()}
          </span>
        );
      },
      selector: (row) => row?.lastPage,
      // selector: "lastPage",
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row?.uid?.firstName,
      sortable: true,
      cell: (row) => {
        return (
          <span>{row?.uid?.firstName === "" ? "-" : row?.uid?.firstName}</span>
        );
      },
    },
    {
      name: "Father Name",
      selector: (row) => row?.uid?.fatherName,
      sortable: true,
      cell: (row) => {
        return (
          <span>
            {row?.uid?.fatherName === "" ? "-" : row?.uid?.fatherName}
          </span>
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

  //For Excel Download

  useEffect(() => {
    getAllUserForExcel();
  }, []);

  const getAllUserForExcel = async () => {
    // if (!search) {
    await ApiGet(`register/getAll`)
      .then((res) => {
        setAllRegisterUserExcel(res?.data?.payload?.Question);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
    // }
  };

  useEffect(() => {
    if (logsData?.length > 0) {
      logsData.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id,
          IP: registerUser?.ip,
          Device: registerUser?.device,
          MobileNumber: registerUser?.uid?.phone,
          RegistrationDate: moment(registerUser?.uid?.registrationDate).format(
            "ll"
          ),
        };
        setDataCSVLogs((currVal) => [...currVal, data]);
      });
    }
  }, [logsData]);
  useEffect(() => {
    if (logsPostData?.length > 0) {
      logsPostData.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._idF,
          IP: registerUser?.ip,
          Device: registerUser?.device,
          MobileNumber: registerUser?.uid?.phone,
          LastPage: registerUser?.lastPage,
          RegistrationDate: moment(registerUser?.uid?.registrationDate).format(
            "ll"
          ),
        };
        setDataCSVPostLogs((currVal) => [...currVal, data]);
      });
    }
  }, [logsPostData]);

  useEffect(() => {
    if (allRegisterUserExcel) {
      allRegisterUserExcel.map((registerUser, key) => {
        let data = {
          Number: key + 1,
          UserID: registerUser?.uid?._id
            ? registerUser?.uid?._id
            : registerUser?._id,
          BookingID: registerUser?._id,
          FirstName: registerUser?.fname,
          MiddleName: registerUser?.mname ? registerUser?.mname : "-",
          LastName: registerUser?.lname ? registerUser?.lname : "-",
          EmailAddress: registerUser?.email ? registerUser?.email : "-",
          MobileNumber: registerUser?.phone,
          RegistrationTypes: registerUser?.Registrationtype,
          FatherName: registerUser?.fatherName ? registerUser?.fatherName : "-",
          DateOfBirth: moment(registerUser?.DoB).format("ll"),
          Qualification: registerUser?.qualification,
          Gender: registerUser?.gender,
          AddressLine: registerUser?.address,
          State: registerUser?.state,
          District: registerUser?.district,
          TownORCity: registerUser?.city,
          PIN: registerUser?.pincode,
          SelectIDTRCentre: registerUser?.IDTRcenter
            ? registerUser?.IDTRcenter
            : "-",
          CourseType: registerUser?.ctid?.courseType,
          VehicleCategory: registerUser?.vcid?.vehicleCategory,
          CourseName: registerUser?.cnid?.courseName,
          DateOfCourse: moment(registerUser?.dateofCourse).format("ll"),
          LicenseCategory: registerUser?.lcid,
          DrivingLicenceNumber: registerUser?.drivingLicense,
          IssueDate: registerUser?.issueDate
            ? moment(registerUser?.issueDate).format("ll")
            : "-",
          ValidTill: registerUser?.validTill
            ? moment(registerUser?.validTill).format("ll")
            : "-",
          LicenseAuthorityState: registerUser?.Authority,
          LicenseAuthorityCity: registerUser?.authoritycity,
          LicenseAuthorityDistrict: registerUser?.authoritydistrict,
          PassportPhoto: registerUser?.passportPhoto,
          DrivingLicenseImage: registerUser?.drivingLicense,
          OtherIDProofDownload:
            registerUser?.IDproof === null ? "-" : registerUser?.IDproof,
          VisionInformation:
            registerUser?.medicalCertificate === null
              ? "-"
              : registerUser?.medicalCertificate,
          ColorBlindness:
            registerUser?.medicalCertificate === null
              ? "-"
              : registerUser?.medicalCertificate,
          BloodGroup:
            registerUser?.bloodGroup === "" || registerUser?.bloodGroup === null
              ? "-"
              : registerUser?.bloodGroup,
          PaymentRcvd:
            registerUser?.isPaymentDone === null ||
            registerUser?.isPaymentDone === false
              ? "Payment Pending"
              : registerUser?.isPaymentDone,
          PaymentMode: registerUser?.type,
          TransactionID:
            registerUser?.paymentId === null
              ? "Payment Pending"
              : registerUser?.paymentId,
          PaymentID:
            registerUser?.paymentId === null
              ? "Payment Pending"
              : registerUser?.paymentId,
          RegisterationDate: registerUser?.uid?.registrationDate,
        };
        setDataCSV((currVal) => [...currVal, data]);
      });
    }
  }, [allRegisterUserExcel]);

  const districts = [
    {
      name: "Ambala",
    },
    {
      name: "Bhiwani",
    },
    { name: "Charkhi Dadri" },
    {
      name: "Faridabad",
    },
    {
      name: "Fatehabad",
    },
    {
      name: "Gurgaon",
    },
    {
      name: "Hisar",
    },
    {
      name: "Jhajjar",
    },
    {
      name: "Jind",
    },
    {
      name: "Kaithal",
    },
    {
      name: "Karnal",
    },
    {
      name: "Kurukshetra",
    },
    {
      name: "Mahendragarh",
    },
    {
      name: "Mewat",
    },
    {
      name: "Palwal",
    },
    {
      name: "Panchkula",
    },
    {
      name: "Panipat",
    },
    {
      name: "Rewari",
    },
    {
      name: "Rohtak",
    },
    {
      name: "Sirsa",
    },
    {
      name: "Sonipat",
    },
    {
      name: "Yamunanagar",
    },
  ];

  const city = [
    { name: "Ambala" },
    { name: "Asankhurd" },
    { name: "Assandh" },
    { name: "Ateli" },
    { name: "Babiyal" },
    { name: "Bahadurgarh" },
    { name: "Barwala" },
    { name: "Bhiwani" },
    { name: "Charkhi Dadri" },
    { name: "Cheeka" },
    { name: "Ellenabad 2" },
    { name: "Faridabad" },
    { name: "Fatehabad" },
    { name: "Ganaur" },
    { name: "Gharaunda" },
    { name: "Gohana" },
    { name: "Gurgaon" },
    { name: "Haibat(Yamuna Nagar)" },
    { name: "Hansi" },
    { name: "Hisar" },
    { name: "Hodal" },
    { name: "Jhajjar" },
    { name: "Jind" },
    { name: "Kaithal" },
    { name: "Kalan Wali" },
    { name: "Kalka" },
    { name: "Karnal" },
    { name: "Ladwa" },
    { name: "Mahendragarh" },
    { name: "Mandi Dabwali" },
    { name: "Narnaul" },
    { name: "Narwana" },
    { name: "Palwal" },
    { name: "Panchkula" },
    { name: "Panipat" },
    { name: "Pehowa" },
    { name: "Pinjore" },
    { name: "Rania" },
    { name: "Ratia" },
    { name: "Rewari" },
    { name: "Rohtak" },
    { name: "Safidon" },
    { name: "Samalkha" },
    { name: "Shahbad" },
    { name: "Sirsa" },
    { name: "Sohna" },
    { name: "Sonipat" },
    { name: "Taraori" },
    { name: "Thanesar" },
    { name: "Tohana" },
    { name: "Yamunanagar" },
  ];
  const state = [{ name: "Haryana" }];
  const qualification = [
    { name: "10 Standard Graduate" },
    { name: "12th Standard Graduate" },
    { name: "Undergraduate" },
    { name: "Postgraduate" },
  ];

  const bloodgroupData = [
    { name: "A+" },
    { name: "A-" },
    { name: "B+" },
    { name: "B-" },
    { name: "AB+" },
    { name: "AB-" },
    { name: "O+" },
    { name: "O-" },
    { name: "N/A" },
  ];
  const gender = [
    { name: "Male" },
    { name: "Female" },
    { name: "Transgender" },
  ];
  const licenseCategoryData = [
    { name: "Learner" },
    { name: "Permanent" },
    { name: "Renewal" },
    { name: "N/A" },
  ];
  const licenseAuthorityData = [{ name: "Haryana" }];
  const history = useHistory();

  const register = () => {
    const data = {
      vcid: formdata.vehicleCategory,
      ctid: formdata.courseType,
      cnid: formdata.courseName,
      ccid: formdata.courseCategory,
      lcid: formdata.license,
      dateofCourse: formdata.preferdate,
      drivingLicenseNumber:
        formdata.license === "N/A" ? null : formdata.driverlicense,
      fname: formdata.firstname,
      mname: formdata.middlename,
      lname: formdata.lastname,
      DoB: formdata.DateofBirth,
      qualification: formdata.qualification,
      gender: formdata.gender,
      address: formdata.address,
      state: "Haryana",
      city: formdata.city,
      district: formdata.district,
      pincode: formdata.pin,
      email: formdata.email,
      phone: formdata.phone,
      // permanentDLnumber: formdata.driverlicense,
      issueDate: formdata.license === "N/A" ? "" : formdata.issueDate,
      validTill: formdata.license === "N/A" ? "" : formdata.validDate,
      Authority: "Haryana",
      passportPhoto: formdata.passport,
      drivingLicense: formdata.driviniglicencephoto
        ? formdata.driviniglicencephoto
        : null,
      IDproof: formdata.idProof,
      medicalCertificate: formdata.mediacalCertificate,
      bloodGroup: formdata.bloodgroup,
      paymentId: paymentId,
      uid: userInfo?.payload?.user?._id,
      tdid: formdata.sloatId,
      authoritycity: formdata.authoritycity,
      authoritydistrict: formdata.authoritydistrict,
      type: formdata.type,
      Registrationtype: "counter",
    };

    if (formdata.type == "offline") {
      const datas = {
        cnid: formdata?.courseName,
        ctid: formdata?.courseType,
        vcid: formdata?.vehicleCategory,
        phone: formdata?.phone,
        tdid: formdata?.sloatId,
      };
      ApiPost("payment/checkPayment", datas).then((res) => {
        if (res.data.result === 0) {
          ApiPost("register/addRegister", data)
            .then((res) => {
              if (res?.status == 200) {
                toast.success(res?.data?.message);
                handleAddAdminClose();

                getAllUser();
              } else {
                toast.error(res?.data?.message);
              }
            })
            .catch((err) => {
              toast.error(err?.response?.data?.message);
            });
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      });
    } else {
      ApiPost("register/addRegister", data)
        .then((res) => {
          if (res?.status == 200) {
            toast.success(res?.data?.message);
            handleAddAdminClose();

            getAllUser();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  const validateFormForAddAdmin = () => {
    let formIsValid = true;
    let errorsForAdd = {};

    if (inputValueForAdd && !inputValueForAdd.paymentType) {
      formIsValid = false;
      errorsForAdd["paymentType"] = "*Please enter paymentType!";
    }
    setErrorsForAdd(errorsForAdd);
    return formIsValid;
  };
  const handleOfflinePayment = () => {
    if (validateFormForAddAdmin()) {
      const data = {
        receiptDate: new Date(),
        receiptNumber: dataForPayment?._id,
        isPaymentDone: true,
        price: dataForPayment?.courseName[0].price,
        cnid: dataForPayment?.courseName[0]._id,
        vcid: dataForPayment.vehicleCategory[0]?._id,
        ctid: dataForPayment.courseType[0]?._id,
        tdid: dataForPayment.trainingDate[0]?._id,
        type: "offline",
        phone: dataForPayment?.phone,
        paymentType: inputValueForAdd.paymentType,
      };
      ApiPut("register/offlinePayment", data)
        .then((res) => {
          if (res?.status == 200) {
            setIsPaymentPopUp(false);
            toast.success(res?.data?.message);
            setDataForPayment([]);
            getAllUser();
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const updateData = () => {
    const data = {
      vcid: formdata.vehicleCategory,
      ctid: formdata.courseType,
      cnid: formdata.courseName,
      ccid: formdata.courseCategory,
      lcid: formdata.license,
      dateofCourse: formdata.preferdate,
      drivingLicenseNumber:
        formdata.license === "N/A" ? null : formdata.driverlicense,
      fname: formdata.firstname,
      mname: formdata.middlename,
      lname: formdata.lastname,
      DoB: formdata.DateofBirth,
      qualification: formdata.qualification,
      gender: formdata.gender,
      address: formdata.address,
      state: "Haryana",
      city: formdata.city,
      district: formdata.district,
      pincode: formdata.pin,
      email: formdata.email,
      phone: formdata.phone,
      permanentDLnumber: formdata.driverlicense,
      issueDate: formdata.license === "N/A" ? "" : formdata.issueDate,
      validTill: formdata.license === "N/A" ? "" : formdata.validDate,
      Authority: "Haryana",
      passportPhoto: formdata.passport,
      drivingLicense: formdata.driviniglicencephoto,
      IDproof: formdata.idProof,
      medicalCertificate: formdata.mediacalCertificate,
      bloodGroup: formdata.bloodgroup,
      paymentId: paymentId,
      uid: userInfo?.payload?.user?._id,
      tdid: formdata.sloatId,
      authoritycity: formdata.authoritycity,
      authoritydistrict: formdata.authoritydistrict,
      type: formdata.type,
      Registrationtype: "counter",
    };

    ApiPut(`register/updateRegister/${formdata._id}`, data)
      .then((res) => {
        if (res?.status == 200) {
          setIsAddAnnouncement(false);
          toast.success(res?.data?.message);
          setTab("course");

          // setInputValueForAdd({});
          getAllUser();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const onChnageForm = (e) => {
    setFormData((formdataAll) => {
      return { ...formdataAll, [e.target.name]: e.target.value };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
    if (e.target.name === "issueDate") {
      setFormData((formdataAll) => {
        return {
          ...formdataAll,
          validDate: moment(e?.target?.value).add(6, "M").format("YYYY-MM-DD"),
        };
      });
    }
  };

  const onChnagSelectField = (e, name) => {
    setFormData((formdataAll) => {
      return { ...formdataAll, [name]: e.value };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
  };
  const onChangImage = (e, name) => {
    setFormData((formdataAll) => {
      return { ...formdataAll, [name]: e };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const checkSlot = async () => {
    await ApiGet(`trainingDate/checkSlot/${formdata.sloatId}`)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const handleOnClick = (e, key) => {
    e.preventDefault();

    if (key === "personal") {
      if (!checkSlot()) return;
      if (formdata.vehicleCategory == "") {
        seterrorShow("Vehicle Category");
        toast.error(`Sorry! Vehicle Category must be specified`);
        settypeTrueFalseform(true);
      } else if (formdata.courseType == "") {
        toast.error(`Sorry! Course Type must be specified`);
        seterrorShow("Course Type");
        settypeTrueFalseform(true);
      } else if (formdata.courseCategory == "") {
        toast.error(`Sorry! Course Category must be specified`);
        seterrorShow("Course Category");
        settypeTrueFalseform(true);
      } else if (formdata.courseName == "") {
        toast.error(`Sorry! Course Category must be specified`);
        seterrorShow("Course Category");
        settypeTrueFalseform(true);
      } else if (formdata.license === "") {
        toast.error(`Sorry! License Category must be specified`);
        seterrorShow("License Category ");
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.driverlicense === "") {
        toast.error(`Sorry! Driver's License Number must be specified`);
        seterrorShow(`Driver's License Number`);
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.issueDate === "") {
        toast.error(`Sorry! Issue Date must be specified`);
        seterrorShow("Issue Date");
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.validDate === "") {
        toast.error(`Sorry! Valid Date must be specified`);
        seterrorShow("Valid Date");
        settypeTrueFalseform(true);
      }
      // else if (formdata.authority === '') {
      //   toast.error(`Sorry! License Authority must be specified`)
      //   seterrorShow('License Authority')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata?.license != "N/A" && formdata.authoritycity === "") {
        toast.error(`Sorry! License Authority City must be specified`);
        seterrorShow("License Authority City");
        settypeTrueFalseform(true);
      } else if (
        formdata?.license != "N/A" &&
        formdata.authoritydistrict === ""
      ) {
        toast.error(`Sorry! License Authority District must be specified`);
        seterrorShow("License Authority Disctrict");
        settypeTrueFalseform(true);
      } else if (formdata.preferdate === "") {
        toast.error(`Sorry! Preferred Training Date must be specified`);
        seterrorShow("Preferred Training Date");
        settypeTrueFalseform(true);
      } else if (formdata.sloatId === "") {
        toast.error(`Sorry! Slot must be specified`);
        seterrorShow("Slot");
        settypeTrueFalseform(true);
      } else if (alertForSlot === 0) {
        toast.error(`Sorry! Sloat Not Available`);
        seterrorShow("Sloat Not Available");
        settypeTrueFalseform(true);
      } else {
        setTab(key);
      }
    } else if (key === "document") {
      if (!checkSlot()) return;
      if (formdata.firstname === "") {
        toast.error(`Sorry! First name must be specified`);
        seterrorShow("First name");
        settypeTrueFalseform(true);
      } else if (formdata.lastname === "") {
        toast.error(`Sorry! Last name must be specified`);
        seterrorShow("Last name");
        settypeTrueFalseform(true);
      } else if (formdata.DateofBirth === "") {
        toast.error(`Sorry! Date of Birth must be specified`);
        seterrorShow("Date of Birth");
        settypeTrueFalseform(true);
      } else if (formdata.qualification === "") {
        toast.error(`Sorry! Qualification must be specified`);
        seterrorShow("Qualification");
        settypeTrueFalseform(true);
      } else if (formdata.gender === "") {
        toast.error(`Sorry! Gender must be specified`);
        seterrorShow("Gender");
        settypeTrueFalseform(true);
      } else if (formdata.address === "") {
        toast.error(`Sorry! Address must be specified`);
        seterrorShow("Address");
        settypeTrueFalseform(true);
      }
      // else if (formdata.state === '') {
      //   toast.error(`Sorry! State must be specified`)
      //   seterrorShow('State')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata.district === "") {
        toast.error(`Sorry! District must be specified`);
        seterrorShow("District");
        settypeTrueFalseform(true);
      } else if (formdata.city === "") {
        toast.error(`Sorry! City must be specified`);
        seterrorShow("City");
        settypeTrueFalseform(true);
      } else if (formdata.pin === "") {
        toast.error(`Sorry! PIN must be specified`);
        seterrorShow("PIN");
        settypeTrueFalseform(true);
      } else if (formdata.pin.length !== 6) {
        toast.error(`Sorry! PIN Not Valid must be specified`);
        seterrorShow("PIN Not Valid");
        settypeTrueFalseform(true);
      } else if (formdata.phone === "") {
        toast.error(`Sorry! Phone must be specified`);
        seterrorShow("Phone");
        settypeTrueFalseform(true);
      } else if (formdata.phone.length < 10) {
        toast.error(`Sorry! Phone Number Not Valid must be specified`);
        seterrorShow("Phone Number Not Valid");
        settypeTrueFalseform(true);
      } else {
        seterrorShow("");
        settypeTrueFalseform(false);
        setTab(key);
      }
    } else if (key === "payment") {
      if (!checkSlot()) return;
      if (formdata.license !== "Permanent" && formdata.passport === null) {
        toast.error("Select passport photo");
        seterrorShow("Passport Photo");
        settypeTrueFalseform(true);
      } else if (
        formdata.license !== "N/A" &&
        formdata.license !== "Learner" &&
        formdata.license !== "Permanent" &&
        formdata.driviniglicencephoto === null
      ) {
        toast.error("Select driving license photo");
        seterrorShow("Driving license photo");
        settypeTrueFalseform(true);
      } else if (
        typeof formdata.passport === "object" &&
        typeof formdata.driviniglicencephoto === "object" &&
        typeof formdata.idProof === "object" &&
        typeof formdata.mediacalCertificate === "object"
      ) {
        toast.error("Please click on upload button");
      } else {
        seterrorShow("");
        settypeTrueFalseform(false);
        setTab(key);
      }
    } else {
      seterrorShow("");
      settypeTrueFalseform(false);
      setTab(key);
    }
  };
  const [statesate, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  // const previousClick = (e, key) => {
  //   if (key === "course") {
  //     let index = getAllVehicalData?.Question?.findIndex((e) => e._id === formdata?.vehicleCategory);
  //     let vehaicalId = formdata.vehicleCategory;
  //     let courseTypeId = formdata.courseType;
  //     let courseNameId = formdata.courseName;

  //     let vehical;
  //     if (index !== -1) {
  //       vehical = { label: getAllVehicalData?.Question[index].vehicleCategory, value: getAllVehicalData?.Question[index]._id }
  //       setdefaultValue(data => ({ ...data, vehicleCategory: vehical }))
  //     }
  //     setVehicalCategoryData(formdata?.vehicleCategory)
  //     getAllCourseTypeDataEdit(vehaicalId, courseTypeId)
  //     getAllCourseNameEdit(courseTypeId, vehaicalId, courseNameId)
  //     setTimeout(() => {
  //       setTab(key)
  //     }, 1000);

  //   } else if (key === "personal") {
  //     setTab(key)
  //   } else if (key === "document") {
  //     setTab(key)
  //   } else if (key === "payment") {
  //     setTab(key)
  //   }
  // }

  const previousClick = (e, key) => {
    let index = getAllVehicalData?.Question?.findIndex(
      (e) => e._id === formdata?.vehicleCategory
    );
    let vehaicalId = formdata.vehicleCategory;
    let courseTypeId = formdata.courseType;
    let courseNameId = formdata.courseName;
    let courseCategoryId = formdata.courseCategory;

    let vehical;

    if (index !== -1) {
      vehical = {
        label: getAllVehicalData?.Question[index].vehicleCategory,
        value: getAllVehicalData?.Question[index]._id,
      };
      setdefaultValue((data) => ({ ...data, vehicleCategory: vehical }));
    }
    setVehicalCategoryData(formdata?.vehicleCategory);
    getAllCourseTypeDataEdit(vehaicalId, courseTypeId);
    getAllCourseNameEdit(
      courseTypeId,
      vehaicalId,
      courseCategoryId,
      courseNameId
    );
    getAllCourseCategoryEdit(courseTypeId, vehaicalId, courseCategoryId);
    if (key === "course") {
      setTimeout(() => {
        setTab(key);
      }, 1500);
    } else if (key === "personal") {
      setTab(key);
    } else if (key === "document") {
      setTab(key);
    } else if (key === "payment") {
      setTab(key);
    }
  };

  const getAllVehicleCategory = () => {
    ApiGet(
      "vehicleCategory/getAllVehicleCategory?page=${page}&limit=1000"
    ).then((res) => {
      setgetAllVehicalData(res.data.payload);
    });
  };
  const getAllCourseType = () => {
    setgetAllCourceName();
    setgetAllCourceType();
    const data = {
      vehicleCategory: VehicalCategoryData,
    };
    ApiPost(
      "courseType/getCoursetypeByVehiclecategory?page=${page}&limit=1000",
      data
    ).then((res) => {
      setgetAllCourceType(res.data.payload);
    });
  };

  const getCourseNames = () => {
    ApiGet(`courseName/getCourseNameById/${cnid}`).then((res) => {
      setgetNameByID(res.data.payload.Property);
    });
  };

  const getAllCourseTypeDataEdit = async (dataID, cidmain) => {
    setgetAllCourceName();
    setgetAllCourceType();
    const data = {
      vehicleCategory: dataID,
    };
    ApiPost(
      "courseType/getCoursetypeByVehiclecategory?page=${page}&limit=1000",
      data
    ).then(async (res) => {
      setgetAllCourceType(res.data.payload);
      const dataselect = res?.data?.payload?.courseType?.filter(
        (data) => data._id === cidmain
      );
      if (dataselect.length >= 0) {
        setdefaultValue((valueDefult) => ({
          ...valueDefult,
          courseType: {
            label: dataselect[0]?.description,
            value: dataselect[0]?._id,
          },
        }));
      }
    });
  };

  useEffect(() => {
    if (cnid) {
      getCourseNames();
    }
  }, [cnid]);

  const getAllCourseName = () => {
    const data = {
      courseType: CourceTypeData,
      vehicleCategory: VehicalCategoryData,
      courseCategory: CourceCategoryData,
    };
    ApiPost(
      "courseName/getCoursenameByCoursetype?page=${page}&limit=10000",
      data
    ).then((res) => {
      setgetAllCourceName(res.data.payload);
    });
    setUpdateCall(false);
  };

  const getAllCourseNameEdit = async (
    CourceTypeDataedit,
    VehicalCategoryDataedit,
    CourseCategoryDataedit,
    cId
  ) => {
    const data = {
      courseType: CourceTypeDataedit,
      vehicleCategory: VehicalCategoryDataedit,
      courseCategory: CourseCategoryDataedit,
    };
    ApiPost(
      "courseName/getCoursenameByCoursetype?page=${page}&limit=10000",
      data
    ).then((res) => {
      setgetAllCourceName(res.data.payload);
      const setDataMAin = res?.data?.payload?.courseName?.filter(
        (dataMain) => dataMain._id === cId
      );
      setdefaultValue((dataasd) => ({
        ...dataasd,
        courseName: {
          label: setDataMAin[0]?.courseName,
          value: setDataMAin[0]?._id,
        },
      }));
    });
    setUpdateCall(false);
  };
  const getAllCourseCategoryEdit = async (
    CourceTypeDataedit,
    VehicalCategoryDataedit,
    cId
  ) => {
    setgetAllCourceName();
    setgetAllCourceType();
    setgetAllCourceCategory();
    const data = {
      courseType: CourceTypeDataedit,
      vehicleCategory: VehicalCategoryDataedit,
    };
    ApiPost(
      "courseCategory/getCourseCategoryByCourseType?page=${page}&limit=10000",
      data
    ).then((res) => {
      setgetAllCourceCategory(res.data.payload);
      const setDataMAin = res?.data?.payload?.courseCategory?.filter(
        (dataMain) => dataMain._id === cId
      );

      setdefaultValue((dataasd) => ({
        ...dataasd,
        courseCategory: {
          label: setDataMAin[0]?.courseCategory,
          value: setDataMAin[0]?._id,
        },
      }));
    });
    setUpdateCall(false);
  };

  useEffect(() => {
    if (formdata?.courseCategory) {
      getAllCourseName();
    }
  }, [formdata?.courseCategory]);
  useEffect(() => {
    if (formdata.vehicleCategory) {
      getAllCourseType();
    }
  }, [formdata?.vehicleCategory]);
  useEffect(() => {
    getAllVehicleCategory();
  }, []);
  const getTrainignDate = () => {
    const data = {
      date: formdata.preferdate,
      cnid: formdata.courseName,
      ccid: formdata.courseCategory,
      ctid: formdata.courseType,
      vcid: formdata.vehicleCategory,
    };
    ApiGet(
      `trainingDate/getDatePrevious?date=${data.date}&vcid=${formdata.vehicleCategory}&ctid=${formdata.courseType}&ccid=${formdata.courseCategory}&cnid=${formdata.courseName}`
    ).then((res) => {
      if (res.data.payload) {
        // setTimeout(() => {
        setSeat(res.data.payload?.subMenu);
        // }, 1000);
      }
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteAnnouncement = () => {
    ApiDelete(`register/deleteRegister/${idForDeleteAnnouncement}`)
      .then((res) => {
        if (res?.status == 200) {
          setShow(false);
          toast.success("Deleted Successfully");
          getAllUser();
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
        toast.error(err?.response?.data?.message);
      });
  };

  const getTrainignDateEditData = (preferdate, courseName) => {
    const data = {
      date: preferdate,
      coursenameid: courseName,
    };
    ApiGet(
      `trainingDate/getDate?date=${data.date}&cnid=${data.coursenameid}`
    ).then((res) => {
      if (res.data.payload) {
        // setTimeout(() => {
        setSeat(res.data.payload?.subMenu);
        // }, 1000);
      }
    });
  };

  const checkTrainnigDate = () => {
    if (formdata.preferdate && formdata.courseName) {
      getTrainignDate();
    }
  };
  // const disablePastDate = () => {
  //   const today = new Date();
  //   const dd = String(today.getDate() + 1).padStart(2, "0");
  //   const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //   const yyyy = today.getFullYear();
  //   return yyyy + "-" + mm + "-" + dd;
  // };

  const uploadCertificate = async () => {
    let urls = {};
    let data = [];
    if (formdata?.license === "N/A") {
      if (formdata.passport) {
        if (formdata.passport && typeof formdata.passport !== "string") {
          if (!formdata.passport.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error(`*${formdata.passport.name} file is not valid.`);
            return;
          }
          if ((formdata.passport.size / 1048576).toFixed(2) > 1) {
            toast.error(`*Please Upload less than 1 MB Passport File.`);
            return;
          }
          data.push(formdata.passport);
          let passport1 = await uploadS3bucket(formdata.passport);
          urls = { passport: passport1, ...urls };
        } else if (
          formdata.driviniglicencephoto &&
          typeof formdata.driviniglicencephoto !== "string"
        ) {
          if (
            !formdata.driviniglicencephoto.name.match(/\.(jpg|jpeg|png|pdf)$/)
          ) {
            toast.error(
              `*${formdata.driviniglicencephoto.name} file is not valid.`
            );
            return;
          }
          if ((formdata.driviniglicencephoto.size / 1048576).toFixed(2) > 5) {
            toast.error(
              `*Please Upload less than 5 MB Drivinig Licence Photo File.`
            );
            return;
          }
          data.push(formdata.driviniglicencephoto);
          let driviniglicencephoto = await uploadS3bucket(
            formdata.driviniglicencephoto
          );
          urls = { driviniglicencephoto: driviniglicencephoto, ...urls };
        }
        if (
          formdata.mediacalCertificate &&
          typeof formdata.mediacalCertificate !== "string"
        ) {
          if (
            !formdata.mediacalCertificate.name.match(/\.(jpg|jpeg|png|pdf)$/)
          ) {
            toast.error(
              `*${formdata.mediacalCertificate.name} file is not valid.`
            );
            return;
          }
          if ((formdata.mediacalCertificate.size / 1048576).toFixed(2) > 5) {
            toast.error(
              `*Please Upload less than 5 MB Mediacal Certificate File.`
            );
            return;
          }
          data.push(formdata.mediacalCertificate);
          let mediacalCertificate = await uploadS3bucket(
            formdata.mediacalCertificate
          );
          urls = { mediacalCertificate: mediacalCertificate, ...urls };
        }
        if (formdata.idProof && typeof formdata.idProof !== "string") {
          if (!formdata.idProof.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error(`*${formdata.idProof.name} file is not valid.`);
            return;
          }
          if ((formdata.idProof.size / 1048576).toFixed(2) > 5) {
            toast.error(`*Please Upload less than 5 MB Id Proof File.`);
            return;
          }
          data.push(formdata.idProof);

          let idProof = await uploadS3bucket(formdata.idProof);
          urls = { idProof: idProof, ...urls };
        }
        if (Object.keys(urls).length === data.length) {
          toast.success("Document uploaded successfully ");
        }
        setFormData({ ...formdata, ...urls });
      } else {
        toast.error("Please Select file before Uploading");
      }
    } else if (formdata.passport && formdata.driviniglicencephoto) {
      if (formdata.passport && typeof formdata.passport !== "string") {
        if (!formdata.passport.name.match(/\.(jpg|jpeg|png)$/)) {
          toast.error(`*${formdata.passport.name} file is not valid.`);
          return;
        }
        if ((formdata.passport.size / 1048576).toFixed(2) > 1) {
          toast.error(`*Please Upload less than 1 MB Passport File.`);
          return;
        }
        data.push(formdata.passport);
        let passport1 = await uploadS3bucket(formdata.passport);
        urls = { passport: passport1, ...urls };
      }
      if (
        formdata.driviniglicencephoto &&
        typeof formdata.driviniglicencephoto !== "string"
      ) {
        if (
          !formdata.driviniglicencephoto.name.match(/\.(jpg|jpeg|png|pdf)$/)
        ) {
          toast.error(
            `*${formdata.driviniglicencephoto.name} file is not valid.`
          );
          return;
        }
        if ((formdata.driviniglicencephoto.size / 1048576).toFixed(2) > 5) {
          toast.error(
            `*Please Upload less than 5 MB Drivinig Licence Photo File.`
          );
          return;
        }
        data.push(formdata.driviniglicencephoto);
        let driviniglicencephoto = await uploadS3bucket(
          formdata.driviniglicencephoto
        );
        urls = { driviniglicencephoto: driviniglicencephoto, ...urls };
      }
      if (
        formdata.mediacalCertificate &&
        typeof formdata.mediacalCertificate !== "string"
      ) {
        if (!formdata.mediacalCertificate.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          toast.error(
            `*${formdata.mediacalCertificate.name} file is not valid.`
          );
          return;
        }
        if ((formdata.mediacalCertificate.size / 1048576).toFixed(2) > 5) {
          toast.error(
            `*Please Upload less than 5 MB Mediacal Certificate File.`
          );
          return;
        }
        data.push(formdata.mediacalCertificate);
        let mediacalCertificate = await uploadS3bucket(
          formdata.mediacalCertificate
        );
        urls = { mediacalCertificate: mediacalCertificate, ...urls };
      }
      if (formdata.idProof && typeof formdata.idProof !== "string") {
        if (!formdata.idProof.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          toast.error(`*${formdata.idProof.name} file is not valid.`);
          return;
        }
        if ((formdata.idProof.size / 1048576).toFixed(2) > 5) {
          toast.error(`*Please Upload less than 5 MB Id Proof File.`);
          return;
        }
        data.push(formdata.idProof);

        let idProof = await uploadS3bucket(formdata.idProof);
        urls = { idProof: idProof, ...urls };
      }
      if (Object.keys(urls).length === data.length) {
        toast.success("Document uploaded successfully ");
      }
      setFormData({ ...formdata, ...urls });
    } else {
      toast.error("Please Select file before Uploading");
    }
  };

  const uploadS3bucket = async (file) => {
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
    try {
      if (data.status === 204) {
        urls = data.location;
        return urls;
      } else {
        toast.error("Failed to upload image:", f.name);
      }
    } catch (err) {}
  };

  const handleSearch = (e) => {
    let val = e.target.value.replace(/[^\w\s]/gi, "");
    setSearch(val);
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
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllUser();
    } else {
      setPage(1);
      setCount(0);
      setCountPerPage(countPerPage);
      getAllUser();
    }
  }, [debouncedSearchTerm]);
  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Registered User</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="search"
                  value={search}
                  placeholder="Search Registered User"
                  onChange={(e) => handleSearch(e)}
                />
              </div>
            </div>

            <div className="cus-medium-button-style button-height">
              <button
                onClick={() => {
                  setIsAddAnnouncement(true);
                  setSeconds(300);
                }}
                className="btn btn-success mr-2"
              >
                Add
              </button>
            </div>
            {/* delete model */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="text-danger">Alert!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You Sure To Want To delete this registered user
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteAnnouncement();
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            {/* end delete model */}

            <div className="cus-medium-button-style button-height">
              <CsvDownload
                className={``}
                data={dataCSV}
                filename="Registered User.csv"
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
        </div>
        <div style={{ width: "30%", paddingLeft: "15px" }}>
          {/* <DateRangePickerComponent
            placeholder="Enter Date Range"
            startDate={startValue}
            endDate={endValue}
            format="dd-MMM-yy"
            start="Year"
            depth="Year"
            onChange={(e) => {
              handleSetDateData(e.target.value);
            }}
          ></DateRangePickerComponent> */}
          <DateRangePickerComponent
            onChange={(e) => {
              handleSetDateData(e.target.value);
              setDateForFilter(e.target.value);
            }}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={statesate}
            direction="horizontal"
          />
        </div>
        <div className="p-2 mb-2">
          <DataTable
            columns={columns}
            data={tableFilterData}
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

      {isAddAnnouncement ? (
        <List className="modelFixed">
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
          {isAddAnnouncement === true ? (
            <div className="register-page-alignment ">
              <div className="container">
                <div className="breadcrumbs-alignment"></div>
                <div className="page-title-alignment">
                  <h1>Driver Training Course Registration Portal</h1>
                  {/* <div>
                    {seconds}
                  </div> */}
                </div>
                <div className="tab-design">
                  <ul>
                    <li className={tab === "course" && "tab-active"}>
                      Course Selection
                    </li>
                    <li className={tab === "personal" && "tab-active"}>
                      Personal Information
                    </li>
                    <li className={tab === "document" && "tab-active"}>
                      Document Upload
                    </li>
                    <li className={tab === "payment" && "tab-active"}>
                      Payment
                    </li>
                  </ul>
                </div>
                {tab === "course" && (
                  <div className="tab-details-alignment">
                    <div className="tab-details-title">
                      <h2>Course Selection</h2>
                    </div>
                    <div className="register-grid">
                      <div className="register-grid-items12">
                        <label>
                          Vehicle Category<span>*</span>
                        </label>
                        <Select
                          // styles={colourStyles}
                          // isClearable
                          options={getAllVehicalData?.Question?.map((e) => ({
                            label: e.vehicleCategory,
                            value: e._id,
                          }))}
                          name="vehicleCategory"
                          onChange={(e) => {
                            setCourceTypeData("");
                            setCourceType("");
                            onChnagSelectField(e, "vehicleCategory");
                            setVehicalCategoryData(e.value);
                          }}
                          defaultValue={defaultValue.vehicleCategory}
                        />
                      </div>

                      <div className="register-grid-items12">
                        <label>
                          Course Type<span>*</span>
                        </label>
                        {(editMode ? defaultValue.courseType : true) && (
                          <Select
                            options={getAllCourceType?.courseType?.map((e) => ({
                              label: e.courseType,
                              value: e._id,
                            }))}
                            name="courseType"
                            onChange={(e) => {
                              setCourceType("");
                              onChnagSelectField(e, "courseType");
                              setCourceTypeData(e.value);
                              setUpdateCall(true);
                            }}
                            defaultValue={
                              defaultValue.courseType !== null &&
                              defaultValue.courseType
                            }
                          />
                        )}
                      </div>

                      {/* for course category test*/}

                      <div className="register-grid-items12 ">
                        <label>
                          Course Category<span>*</span>
                        </label>
                        {(editMode ? defaultValue?.courseCategory : true) && (
                          <Select
                            // isClearable
                            options={getAllCourceCategory?.courseCategory?.map(
                              (e) => ({
                                label: e.courseCategory,
                                value: e._id,
                              })
                            )}
                            name="courseCategory"
                            onChange={(e) => {
                              setCourceType(e.value);
                              setCourceCategoryData(e.value);
                              if (e?.value) {
                                let index =
                                  getAllCourceCategory?.courseCategory?.findIndex(
                                    (o) => o?._id === e?.value
                                  );
                              }
                              onChnagSelectField(e, "courseCategory");
                            }}
                            defaultValue={
                              defaultValue.courseCategory &&
                              defaultValue.courseCategory
                            }
                          />
                        )}
                      </div>

                      {/* end test */}

                      <div className="register-grid-items12 ">
                        <label>
                          Course Name<span>*</span>
                        </label>
                        {(editMode ? defaultValue?.courseName : true) && (
                          <Select
                            // isClearable
                            options={getAllCourceName?.courseName?.map((e) => ({
                              label: e.courseName,
                              value: e._id,
                            }))}
                            name="courseName"
                            onChange={(e) => {
                              // setCourceType(e.value);
                              // setCourceCategory(e.value)
                              setCourceNameData(e.value);
                              if (e?.value) {
                                let index =
                                  getAllCourceName?.courseName?.findIndex(
                                    (o) => o?._id === e?.value
                                  );
                                if (index !== -1) {
                                  setPrice(
                                    getAllCourceName?.courseName[index].price
                                  );
                                  setCNID(
                                    getAllCourceName?.courseName[index]._id
                                  );
                                }
                              }
                              onChnagSelectField(e, "courseName");
                            }}
                            defaultValue={
                              defaultValue.courseName && defaultValue.courseName
                            }
                          />
                        )}
                      </div>
                      <div className="register-grid-items12 ">
                        <label>
                          License Category<span>*</span>
                        </label>
                        <Select
                          options={licenseCategoryData.map((e) => ({
                            label: e.name,
                            value: e.name,
                          }))}
                          name="license"
                          onChange={(e) => onChnagSelectField(e, "license")}
                          defaultValue={{
                            label: formdata.license,
                            value: formdata.license,
                          }}
                        />
                      </div>
                      {formdata?.license === "Learner" && (
                        <>
                          <div className="register-grid-items ">
                            <label>
                              Learner's License No.<span>*</span>
                            </label>
                            <input
                              type="text"
                              name="driverlicense"
                              value={formdata.driverlicense}
                              onChange={(e) => onChnageForm(e)}
                            />
                          </div>
                          <div className="register-grid-items">
                            <label>
                              Issue Date<span>*</span>
                            </label>
                            <input
                              type="date"
                              placeholder=""
                              name="issueDate"
                              max={moment(new Date()).format("YYYY-MM-DD")}
                              value={
                                formdata.issueDate
                                  ? formdata.issueDate.slice(0, 10)
                                  : formdata.issueDate
                              }
                              onChange={(e) => onChnageForm(e)}
                            />
                          </div>

                          <div className="register-grid-items">
                            <label>
                              Valid Till<span>*</span>
                            </label>
                            <input
                              type="date"
                              placeholder=""
                              name="validDate"
                              min={moment(new Date()).format("YYYY-MM-DD")}
                              value={
                                formdata?.issueDate
                                  ? moment(formdata?.issueDate)
                                      .add(6, "M")
                                      .format("YYYY-MM-DD")
                                  : ""
                              }
                              onChange={(e) => onChnageForm(e)}
                              disabled="true"
                            />
                          </div>
                        </>
                      )}
                      {formdata?.license != "N/A" &&
                        formdata?.license != "Learner" && (
                          <>
                            <div className="register-grid-items ">
                              <label>
                                Driver's License No.<span>*</span>
                              </label>
                              <input
                                type="text"
                                name="driverlicense"
                                value={formdata.driverlicense}
                                onChange={(e) => onChnageForm(e)}
                              />
                            </div>
                            <div className="register-grid-items">
                              <label>
                                Issue Date<span>*</span>
                              </label>
                              <input
                                type="date"
                                placeholder=""
                                name="issueDate"
                                max={moment(new Date()).format("YYYY-MM-DD")}
                                value={
                                  formdata.issueDate
                                    ? formdata.issueDate.slice(0, 10)
                                    : formdata.issueDate
                                }
                                onChange={(e) => onChnageForm(e)}
                              />
                            </div>
                            <div className="register-grid-items">
                              <label>
                                Valid Till<span>*</span>
                              </label>
                              <input
                                type="date"
                                placeholder=""
                                name="validDate"
                                min={moment(new Date()).format("YYYY-MM-DD")}
                                value={
                                  formdata.validDate
                                    ? formdata.validDate.slice(0, 10)
                                    : formdata.validDate
                                }
                                onChange={(e) => onChnageForm(e)}
                              />
                            </div>
                          </>
                        )}

                      <div className="register-grid-items"></div>
                      {formdata?.license != "N/A" && (
                        <>
                          <div className="register-grid-items12">
                            <label>
                              License Authority<span>*</span>
                            </label>

                            <Select
                              options={state.map((e) => ({
                                label: e.name,
                                value: e.name,
                              }))}
                              name="authority"
                              onChange={(e) =>
                                onChnagSelectField(e, "authority")
                              }
                              defaultValue={{
                                label: "Haryana",
                                value: "Haryana",
                              }}
                            />
                          </div>
                          <div className="register-grid-items12">
                            <label>
                              License Authority (District)<span>*</span>
                            </label>

                            <Select
                              options={districts.map((e) => ({
                                label: e.name,
                                value: e.name,
                              }))}
                              name="authoritydistrict"
                              onChange={(e) =>
                                onChnagSelectField(e, "authoritydistrict")
                              }
                              defaultValue={{
                                label: formdata.authoritydistrict,
                                value: formdata.authoritydistrict,
                              }}
                            />
                          </div>
                          <div className="register-grid-items12">
                            <label>
                              License Authority (Town / city)<span>*</span>
                            </label>

                            <Select
                              options={city.map((e) => ({
                                label: e.name,
                                value: e.name,
                              }))}
                              name="authoritycity"
                              onChange={(e) =>
                                onChnagSelectField(e, "authoritycity")
                              }
                              defaultValue={{
                                label: formdata.authoritycity,
                                value: formdata.authoritycity,
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="full-fill-information">
                      {CourceType ? (
                        <div>
                          <div>
                            <div className="sub-title"></div>
                            <div className="information">
                              <p>
                                <span>Course Name:</span>{" "}
                                {getCourseNameByID?.courseName}
                              </p>
                              <p>
                                <span>Duration:</span>{" "}
                                {getCourseNameByID?.duration}
                              </p>
                              {/* <p>
                                <span>Timing:</span> {getCourseNameByID?.timing}
                              </p> */}
                              <p>
                                <span>Fees:</span> {getCourseNameByID?.price}
                              </p>
                              <p>
                                <span>Mode of Payment:</span>{" "}
                                {getCourseNameByID?.mode}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="sub-title-one">
                            <p>Course Type Description :</p>
                          </div>
                          <div className="information">
                            <p>
                              <span>1 Learner:</span>Long duration program
                              suitable for beginner/ new learner
                            </p>
                            <p>
                              <span>2 Refresher </span>Short duration program
                              suitable for existing driver
                            </p>
                            <p>
                              <span>3 Evaluation </span>Test of driving skill
                              and knowledge
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="register-grid search-button-alignment">
                      <div className="register-grid-items">
                        <label>
                          Preferred Training Date<span>*</span>
                        </label>
                        <input
                          type="date"
                          placeholder="Vehicle Category"
                          min={moment(new Date()).format("YYYY-MM-DD")}
                          onChange={(e) => {
                            onChnageForm(e);
                            // disablePastDate()
                          }}
                          name="preferdate"
                          value={formdata.preferdate.slice(0, 10)}
                        />
                      </div>
                      <div className="register-grid-items">
                        {cnid ? (
                          <button onClick={(e) => checkTrainnigDate()}>
                            Search
                          </button>
                        ) : (
                          <button className="disabled">Search</button>
                        )}
                      </div>
                    </div>
                    <div>
                      {getSeat && getSeat.length > 0 ? (
                        <Carousel
                          responsive={{
                            superLargeDesktop: {
                              // the naming can be any, depends on you.
                              breakpoint: { max: 4000, min: 3000 },
                              items: 4,
                            },
                            desktop: {
                              breakpoint: { max: 3000, min: 1024 },
                              items: 5,
                            },
                            tablet: {
                              breakpoint: { max: 1024, min: 464 },
                              items: 2,
                            },
                            mobile: {
                              breakpoint: { max: 464, min: 0 },
                              items: 1,
                            },
                          }}
                        >
                          {getSeat?.map((data, key) => {
                            return (
                              <div
                                key={key}
                                className={`calender-box un-active-background ${
                                  formdata.sloatId === data._id
                                    ? "activeSlot"
                                    : ""
                                }`}
                                name="trainddateid"
                                value={formdata.trainddateid}
                                onClick={(e) => {
                                  onChnagSelectField(
                                    { value: data?._id },
                                    "sloatId"
                                  );
                                  setAlertForSlot(data?.seat);
                                }}
                              >
                                <div className="cus-box-alignment">
                                  <h2>
                                    {" "}
                                    {moment(data.date).format("YYYY-MM-DD ")}
                                  </h2>
                                  <p>
                                    {" "}
                                    Time:{" "}
                                    {moment(data.startTime).format(
                                      "h:mm "
                                    )} - {moment(data.endTime).format("h:mm ")}{" "}
                                  </p>

                                  <p>Seat: {data?.seat ? data?.seat : "N.A"}</p>
                                </div>
                              </div>
                            );
                          })}
                        </Carousel>
                      ) : (
                        <div className="calender-box un-active-background">
                          <div className="cus-box-alignment">
                            <h2>No Slot Available</h2>
                          </div>
                        </div>
                      )}
                    </div>

                    {typeTrueFalseform && (
                      <div className="alert mt-top">
                        <div className="alert-bottom">
                          <p>Sorry! {errorShow} must be specified</p>
                        </div>
                      </div>
                    )}
                    {/* {
                nameTrueFalse ? (
                  <div className="alert">
                    <div className="alert-bottom">
                      <p>Sorry! Please select course name
                      </p>
                    </div>
                  </div>
                ) : ('')
              } */}

                    <div className="next-step-alignment">
                      <button
                        onClick={(e) => handleOnClick(e, "personal")}
                        className="fill-button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {tab === "personal" && (
                  <div className="tab-details-alignment">
                    <div className="tab-details-title">
                      <h2>Personal Information</h2>
                    </div>
                    <div className="Personal-details-background">
                      <p>
                        <b>Please fill your personal information!</b>
                      </p>
                      <p>All *(star) fields are mandatory</p>
                    </div>
                    <div className="form-boder-box">
                      <div className="register-grid-two">
                        <div className="register-grid-items">
                          <label>
                            First Name<span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            value={formdata.firstname}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                        <div className="register-grid-items">
                          <label>Middle Name</label>
                          <input
                            type="text"
                            placeholder="Middle Name"
                            name="middlename"
                            value={formdata.middlename}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                        <div className="register-grid-items">
                          <label>
                            Last Name <span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            value={formdata.lastname}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                        <div className="register-grid-items">
                          <label>
                            Date of Birth<span>*</span>
                          </label>
                          {/* <input type="date" name='DateofBirth' value={formdata.DateofBirth} onChange={e => onChnageForm(e)} /> */}

                          <input
                            type="date"
                            name="DateofBirth"
                            // value={`${new Date(
                            //   formdata.DateofBirth
                            // ).getFullYear()}${
                            //   new Date(formdata.DateofBirth).getMonth() < 9
                            //     ? "-0"
                            //     : "-"
                            // }${
                            //   new Date(formdata.DateofBirth).getMonth() + 1
                            // }-${new Date(formdata.DateofBirth).getDate()}`}
                            value={formdata.DateofBirth}
                            max={moment(new Date())
                              .subtract(18, "years")
                              .format("YYYY-MM-DD")}
                            // max={moment(new Date()).format("YYYY-MM-DD")}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                      </div>
                      <div className="two-col-grid">
                        <div className="register-grid-items12">
                          <label>
                            Qualification<span>*</span>
                          </label>
                          {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={qualification.map((e) => ({
                              label: e.name,
                              value: e.name,
                            }))}
                            name="qualification"
                            onChange={(e) =>
                              onChnagSelectField(e, "qualification")
                            }
                            defaultValue={{
                              label: formdata.qualification,
                              value: formdata.qualification,
                            }}
                          />
                        </div>
                        <div className="register-grid-items12">
                          <label>
                            Gender<span>*</span>
                          </label>
                          {/* <input type="text" placeholder="Select" name='gender' value={formdata.gender} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={gender.map((e) => ({
                              label: e.name,
                              value: e.name,
                            }))}
                            name="gender"
                            onChange={(e) => onChnagSelectField(e, "gender")}
                            defaultValue={{
                              label: formdata.gender,
                              value: formdata.gender,
                            }}
                          />
                        </div>
                      </div>
                      <div className="two-col-grid">
                        <div className="register-grid-items register-full-width">
                          <label>
                            Address as per License<span>*</span> (Flat/House No,
                            Locality, Street Name, Locality)
                          </label>
                          <input
                            type="text"
                            placeholder="Street Address"
                            name="address"
                            value={formdata.address}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                      </div>
                      <div className="register-grid-one">
                        <div className="register-grid-items12">
                          <label>
                            State<span>*</span>
                          </label>
                          {/* <input type="text" placeholder="State" disabled name='state' value={formdata.state} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={state.map((e) => ({
                              label: e.name,
                              value: e.name,
                            }))}
                            name="state"
                            onChange={(e) => onChnagSelectField(e, "state")}
                            defaultValue={{
                              label: "Haryana",
                              value: "Haryana",
                            }}
                          />
                        </div>
                        <div className="register-grid-items12">
                          <label>
                            District<span>*</span>
                          </label>
                          {/* <input type="text" placeholder="District" name='district' value={formdata.district} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={districts.map((e) => ({
                              label: e.name,
                              value: e.name,
                            }))}
                            name="district"
                            onChange={(e) => onChnagSelectField(e, "district")}
                            defaultValue={{
                              label: formdata.district,
                              value: formdata.district,
                            }}
                          />
                        </div>
                        <div className="register-grid-items12">
                          <label>
                            Town / city<span>*</span>
                          </label>
                          {/* <input type="text" placeholder="city" name='city' value={formdata.city} onChange={e => onChnageForm(e)} /> */}
                          <Select
                            options={city.map((e) => ({
                              label: e.name,
                              value: e.name,
                            }))}
                            name="city"
                            onChange={(e) => onChnagSelectField(e, "city")}
                            defaultValue={{
                              label: formdata.city,
                              value: formdata.city,
                            }}
                          />
                        </div>
                        <div className="register-grid-items">
                          <label>
                            PIN<span>*</span>
                          </label>
                          <input
                            type="text"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            maxLength={6}
                            placeholder="Pin"
                            name="pin"
                            value={formdata.pin}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                      </div>
                      <div className="two-col-grid">
                        <div className="register-grid-items">
                          <label>
                            Email address<span></span>
                          </label>
                          <input
                            type="text"
                            placeholder="Email Address"
                            name="email"
                            value={formdata.email}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                        <div className="register-grid-items">
                          <label>
                            Phone<span>*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="9874 456 458"
                            maxLength={10}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            name="phone"
                            value={formdata.phone}
                            onChange={(e) => onChnageForm(e)}
                          />
                        </div>
                      </div>
                    </div>
                    {typeTrueFalseform && (
                      <div className="alert mt-top">
                        <div className="alert-bottom">
                          <p>Sorry! {errorShow} must be specified</p>
                        </div>
                      </div>
                    )}

                    <div className="next-step-alignment">
                      <button
                        onClick={(e) => previousClick(e, "course")}
                        className="out-line-button"
                      >
                        Previous
                      </button>
                      <button
                        onClick={(e) => handleOnClick(e, "document")}
                        className="fill-button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {tab === "document" && (
                  <div className="tab-details-alignment">
                    <div className="tab-details-title">
                      <h2>Document Upload</h2>
                    </div>
                    <div className="upload-decuments-background">
                      <p>
                        <b>Please upload documents!</b>
                      </p>
                      <ul>
                        <li>
                          Passport size photo must be clear and less than 1
                          mb(jpg, jpeg, png)
                        </li>
                        <li>
                          Rest all documents less than 5 mb(jpg, jpeg, png, pdf)
                        </li>
                        <li>
                          Name of document should not contain any special
                          characters or space(eg @,)
                        </li>
                      </ul>
                    </div>
                    {formdata?.license === "Permanent" ? (
                      <div className="photo-upload-from">
                        <p>
                          {" "}
                          1. Passport Photo : less than 1 mb.(jpg, jpeg, PNG)/
                          Rest all documents less than 5 mb (jpg, jpeg, PNG,
                          pdf)
                        </p>
                        <input
                          type="file"
                          name="passport"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) =>
                            onChangImage(e.target.files[0], "passport")
                          }
                        />
                      </div>
                    ) : (
                      <div className="photo-upload-from">
                        <p>
                          {" "}
                          1. Passport Photo<span className="star-color">*</span>
                          : less than 1 mb.(jpg, jpeg, PNG)/ Rest all documents
                          less than 5 mb (jpg, jpeg, PNG, pdf)
                        </p>
                        <input
                          type="file"
                          name="passport"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={(e) =>
                            onChangImage(e.target.files[0], "passport")
                          }
                        />
                      </div>
                    )}

                    {formdata?.license === "N/A" ||
                    formdata?.license === "Permanent" ? (
                      <div className="photo-upload-from">
                        <p>
                          2. Driving License (Not valid incase of N/A and
                          Learner)
                        </p>
                        <input
                          type="file"
                          name="driviniglicencephoto"
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          onChange={(e) =>
                            onChangImage(
                              e.target.files[0],
                              "driviniglicencephoto"
                            )
                          }
                        />
                      </div>
                    ) : (
                      <div className="photo-upload-from">
                        <p>
                          2. Driving License
                          <span className="star-color">*</span> (Not valid
                          incase of N/A and Learner)
                        </p>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          name="driviniglicencephoto"
                          onChange={(e) =>
                            onChangImage(
                              e.target.files[0],
                              "driviniglicencephoto"
                            )
                          }
                        />
                      </div>
                    )}

                    <div className="photo-upload-from">
                      <p>
                        3. ID Proof: Acceptable formats - Utility Bills (water,
                        electricity, phone or gas bill)/ Aadhaar Card
                        (UID)/Voter ID Card or Election Commission Photo ID
                        Card/Ration Card
                      </p>
                      <input
                        type="file"
                        name="idProof"
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        onChange={(e) =>
                          onChangImage(e.target.files[0], "idProof")
                        }
                      />
                    </div>
                    <div className="photo-upload-from">
                      <p>
                        4. Upload Medical certificate: For Eye vision and color
                        blindness{" "}
                      </p>
                      <input
                        type="file"
                        name="mediacalCertificate"
                        accept="image/png,image/jpeg,image/jpg,application/pdf"
                        onChange={(e) =>
                          onChangImage(e.target.files[0], "mediacalCertificate")
                        }
                      />
                    </div>
                    <div className="photo-upload-from dropdown-style-change">
                      <p>5. Enter Blood Group </p>
                      <div className="register-grid-items12">
                        {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                        <Select
                          options={bloodgroupData.map((e) => ({
                            label: e.name,
                            value: e.name,
                          }))}
                          name="bloodgroup"
                          onChange={(e) => onChnagSelectField(e, "bloodgroup")}
                          defaultValue={{
                            label: formdata.bloodgroup,
                            value: formdata.bloodgroup,
                          }}
                        />
                      </div>
                    </div>
                    {typeTrueFalseform && (
                      <div className="alert mt-top">
                        <div className="alert-bottom">
                          <p>Sorry! {errorShow} must be specified</p>
                        </div>
                      </div>
                    )}
                    {formdata?.license === "N/A" ? (
                      formdata?.passport ? (
                        <div className="next-step-alignment">
                          <button
                            className="fill-button"
                            onClick={() => uploadCertificate()}
                          >
                            Upload
                          </button>
                        </div>
                      ) : (
                        <div className="next-step-alignment">
                          <button className="fill-button disabled">
                            Upload
                          </button>
                        </div>
                      )
                    ) : formdata.driviniglicencephoto && formdata.passport ? (
                      <div className="next-step-alignment">
                        <button
                          className="fill-button"
                          onClick={() => uploadCertificate()}
                        >
                          Upload
                        </button>
                      </div>
                    ) : (
                      <div className="next-step-alignment">
                        <button className="fill-button disabled">Upload</button>
                      </div>
                    )}

                    <div className="next-step-alignment">
                      <button
                        onClick={(e) => previousClick(e, "personal")}
                        className="out-line-button"
                      >
                        Previous
                      </button>
                      <button
                        onClick={(e) => handleOnClick(e, "payment")}
                        className="fill-button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {tab === "payment" && (
                  <div className="tab-details-alignment">
                    <div className="payment-title">Payment Type</div>

                    <div className="d-flex ">
                      <div className="d-flex aligncenetr margin-right-20">
                        <input
                          type="radio"
                          placeholder="online"
                          name="type"
                          className="margin-right-10"
                          value="online"
                          onChange={(e) => onChnageForm(e)}
                        />
                        <label className="labes" htmlFor="online">
                          Online
                        </label>
                      </div>
                      <div className="d-flex aligncenetr">
                        <input
                          type="radio"
                          placeholder="offline"
                          name="type"
                          className="margin-right-10"
                          value="offline"
                          onChange={(e) => onChnageForm(e)}
                        />
                        <label className="labes" htmlFor="offline">
                          Offline
                        </label>
                      </div>
                    </div>
                    {formdata?.type === "online" ? (
                      <div className="mt-3">
                        <div className="d-flex aligncenetr curser">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              onChangeDiscloser(e.target.checked)
                            }
                            checked={dicloser}
                          />
                          <a
                            className="s"
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            Disclaimer Notice
                          </a>
                        </div>
                        {dicloser && (
                          <PaymentData
                            price={price}
                            cnid={cnid}
                            vcid={formdata.vehicleCategory}
                            ctid={formdata.courseType}
                            tdid={formdata.sloatId}
                            phone={formdata.phone}
                            hhhhh={(data) => {
                              setSubmitPayment(data);
                            }}
                            paymentId={(data) => {
                              setPaymentId(data);
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="d-flex aligncenetr curser">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              onChangeDiscloser(e.target.checked)
                            }
                            checked={dicloser}
                          />
                          <a
                            className="s"
                            onClick={() => setModalOpen(!modalOpen)}
                          >
                            Disclaimer Notice
                          </a>
                        </div>
                      </div>
                    )}
                    <div className="next-step-alignment">
                      <button
                        className="out-line-button"
                        onClick={(e) => handleOnClick(e, "document")}
                      >
                        Previous
                      </button>

                      {!editMode
                        ? dicloser &&
                          formdata.type === "offline" && (
                            <button
                              className="fill-button"
                              onClick={() => register()}
                            >
                              Submit
                            </button>
                          )
                        : dicloser &&
                          formdata.type === "offline" && (
                            <button
                              className="fill-button"
                              onClick={() => updateData()}
                            >
                              Update
                            </button>
                          )}
                    </div>
                  </div>
                )}
                {modalOpen && (
                  <div className="feedback-background-blur">
                    <div className="feedback-modal">
                      <div className="modal-header">
                        <h1>Disclaimer Notice</h1>
                        <i
                          onClick={() => setModalOpen(false)}
                          class="fas fa-times"
                        ></i>
                      </div>
                      <div className="modal-body">
                        <p>
                          <b>
                            Cautionary statement regarding forward-looking
                            information
                          </b>
                        </p>
                        <p>
                          This Site contains statements that constitute
                          forward-looking statements within the meaning of the
                          Private Securities Litigation Reform Act of 1995. In
                          addition, in the future we, and others on our behalf,
                          may make statements that constitute forward-looking
                          statements. Such forward-looking statements may
                          include, without limitation, statements relating to
                          the following:
                        </p>
                        <ul>
                          <li>
                            <p> our plans, objectives or goals;</p>
                          </li>
                          <li>
                            <p>
                              {" "}
                              our future economic performance or prospects;
                            </p>
                          </li>
                          <li>
                            <p>
                              {" "}
                              the potential effect on our future performance of
                              certain contingencies; and
                            </p>
                          </li>
                          <li>
                            <p>assumptions underlying any such statements.</p>
                          </li>
                        </ul>
                        <p>
                          Words such as ???believes,??? ???anticipates,??? ???expects,???
                          ???intends??? and ???plans??? and similar expressions are
                          intended to identify forward-looking statements but
                          are not the exclusive means of identifying such
                          statements. We do not intend to update these
                          forward-looking statements except as may be required
                          by applicable securities laws. By their very nature,
                          forward-looking statements involve inherent risks and
                          uncertainties, both general and specific, and risks
                          exist that predictions, forecasts, projections and
                          other outcomes described or implied in forward-looking
                          statements will not be achieved. We caution you that a
                          number of important factors could cause results to
                          differ materially from the plans, objectives,
                          expectations, estimates and intentions expressed in
                          such forward-looking statements. These factors
                          include:
                        </p>
                        <ul>
                          <li>
                            <p>
                              {" "}
                              the ability to maintain sufficient liquidity and
                              access capital markets;
                            </p>
                          </li>
                          <li>
                            <p>
                              {" "}
                              market and interest rate fluctuations and interest
                              rate levels;
                            </p>
                          </li>
                          <li>
                            <p>
                              {" "}
                              the strength of the global economy in general and
                              the strength of the economies of the countries in
                              which we conduct our operations, in particular the
                              risk of continued slow economic recovery or
                              downturn in the US or other developed countries in
                              the future;
                            </p>
                          </li>
                          <li>
                            <p>
                              {" "}
                              the direct and indirect impacts of deterioration
                              or slow recovery in residential and commercial
                              real estate markets;
                            </p>
                          </li>
                          <li>
                            <p>
                              adverse rating actions by credit rating agencies
                              in respect of sovereign issuers, structured credit
                              products or other credit-related exposures;
                            </p>
                          </li>
                          <li>
                            <p>
                              the ability to achieve our strategic objectives,
                              including improved performance, reduced risks,
                              lower costs and more efficient use of capital;
                            </p>
                          </li>

                          <li>
                            <p>
                              the ability of counterparties to meet their
                              obligations to us;
                            </p>
                          </li>
                          <li>
                            <p>
                              the effects of, and changes in, fiscal, monetary,
                              trade and tax policies, and currency fluctuations;
                            </p>
                          </li>

                          <li>
                            <p>
                              political and social developments, including war,
                              civil unrest or terrorist activity;
                            </p>
                          </li>
                          <li>
                            <p>
                              the possibility of foreign exchange controls,
                              expropriation, nationalization or confiscation of
                              assets in countries in which we conduct our
                              operations;
                            </p>
                          </li>

                          <li>
                            <p>
                              operational factors such as systems failure, human
                              error, or the failure to implement procedures
                              properly;
                            </p>
                          </li>
                          <li>
                            <p>
                              actions taken by regulators with respect to our
                              business and practices in one or more of the
                              countries in which we conduct our operations;
                            </p>
                          </li>
                          <li>
                            <p>
                              the effects of changes in laws, regulations or
                              accounting policies or practices;
                            </p>
                          </li>
                          <li>
                            <p>
                              competition in geographic and business areas in
                              which we conduct our operations;
                            </p>
                          </li>

                          <li>
                            <p>
                              the ability to retain and recruit qualified
                              personnel;
                            </p>
                          </li>
                          <li>
                            <p>
                              the ability to maintain our reputation and promote
                              our brand;
                            </p>
                          </li>
                          <li>
                            <p>
                              the ability to increase market share and control
                              expenses;
                            </p>
                          </li>
                          <li>
                            <p>technological changes;</p>
                          </li>
                          <li>
                            <p>
                              the timely development and acceptance of our new
                              products and services and the perceived overall
                              value of these products and services by users;
                            </p>
                          </li>
                          <li>
                            <p>
                              acquisitions, including the ability to integrate
                              acquired businesses successfully, and
                              divestitures, including the ability to sell
                              non-core assets;
                            </p>
                          </li>
                          <li>
                            <p>
                              the adverse resolution of litigation and other
                              contingencies;
                            </p>
                          </li>
                          <li>
                            <p>
                              the ability to achieve our cost efficiency goals
                              and cost targets; and
                            </p>
                          </li>
                          <li>
                            <p>
                              our success at managing the risks involved in the
                              foregoing.
                            </p>
                          </li>
                        </ul>
                        <p>
                          We caution you that the foregoing list of important
                          factors is not exclusive. When evaluating
                          forward-looking statements, you should carefully
                          consider the foregoing factors and other uncertainties
                          and events, including the information set forth in our
                          most recent Annual Report under ???Risk Factors??? and in
                          our other public filings
                        </p>

                        <p>
                          <b>
                            {" "}
                            Cautionary Statement Regarding Non-GAAP Financial
                            Information
                          </b>
                        </p>
                        <p>
                          This Site may contain non-GAAP financial information.
                          If such non-GAAP financial information is disclosed,
                          the most directly comparable measures under generally
                          accepted accounting principles is provided in our most
                          recent periodic report or in our other public filings.
                        </p>
                        <p>
                          <b>
                            {" "}
                            Other information about disclosure on this site
                          </b>
                        </p>
                        <p>
                          On this Site, adjusted cost run-rate results are
                          measured against our annualized 6M11 expense run rate
                          measured at constant foreign exchange rates and
                          adjusted to exclude business realignment and other
                          significant non-operating expenses and variable
                          compensation expenses.
                        </p>

                        <p>
                          As of January 1, 2013, Basel III was implemented in
                          Switzerland along with the ???Too Big to Fail???
                          legislation and regulations thereunder. Our related
                          disclosures are in accordance with our current
                          interpretation of such requirements, including
                          relevant assumptions. Changes in the interpretation of
                          these requirements in Switzerland or in any of our
                          assumptions or estimates could result in different
                          numbers from those shown herein. Capital and ratio
                          numbers for periods prior to 2013 herein are based on
                          estimates, which are calculated as if the Basel III
                          framework had been in place in Switzerland during such
                          periods.
                        </p>
                        <p>
                          Unless otherwise noted, leverage ratio, leverage
                          exposure and total capital amounts included herein are
                          based on the current FINMA framework. The Swiss Total
                          Capital leverage ratio is calculated as Swiss Total
                          Capital, divided by a three-month average leverage
                          exposure, which consists of balance sheet assets,
                          off-balance sheet exposures, which consist of
                          guarantees and commitments, and regulatory
                          adjustments, which include cash collateral netting
                          reversals and derivative add-ons.
                        </p>
                        <p>
                          For further information on Core results, refer to
                          ???Results overview??? in II ??? Operating and financial
                          review ??? Core Results in our most recent Annual
                          Report.
                        </p>
                        <p>
                          All opinions and estimates expressed in this Site
                          constitute our judgment as of publication and do not
                          constitute general or specific investment legal, tax
                          or accounting advice of any kind
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </List>
      ) : null}

      {isViewMoreUser ? (
        <Dialog
          fullScreen
          open={isViewMoreUser}
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
            {isViewMoreUser === true ? (
              <div className="honda-container">
                <div className="other-information-child-text-style1">
                  <h2>Registered User Information</h2>
                </div>
                <div className="honda-text-grid honda-text-grid-border">
                  <div className="honda-text-grid-items">
                    <span>First Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.fname === null ||
                          dataViewMore?.fname === "" ||
                          !dataViewMore?.fname
                            ? "No data"
                            : dataViewMore?.fname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Middle Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.mname === null ||
                          dataViewMore?.mname === "" ||
                          !dataViewMore?.mname
                            ? "No data"
                            : dataViewMore?.mname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Last Name:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.lname === null ||
                          dataViewMore?.lname === "" ||
                          !dataViewMore?.lname
                            ? "No data"
                            : dataViewMore?.lname,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Date of Birth:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.DoB === null ||
                          dataViewMore?.DoB === "" ||
                          !dataViewMore?.DoB
                            ? "No data"
                            : moment(dataViewMore?.DoB).format("ll"),
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Qualification:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.qualification === null ||
                          dataViewMore?.qualification === "" ||
                          !dataViewMore?.qualification
                            ? "No data"
                            : dataViewMore?.qualification,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Gender:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.gender === null ||
                          dataViewMore?.gender === "" ||
                          !dataViewMore?.gender
                            ? "No data"
                            : dataViewMore?.gender,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Address:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.address === null ||
                          dataViewMore?.address === "" ||
                          !dataViewMore?.address
                            ? "No data"
                            : dataViewMore?.address,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>State:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.state === null ||
                          dataViewMore?.state === "" ||
                          !dataViewMore?.state
                            ? "No data"
                            : dataViewMore?.state,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>City:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.city === null ||
                          dataViewMore?.city === "" ||
                          !dataViewMore?.city
                            ? "No data"
                            : dataViewMore?.city,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>District:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.district === null ||
                          dataViewMore?.district === "" ||
                          !dataViewMore?.district
                            ? "No data"
                            : dataViewMore?.district,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Email:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.email === null ||
                          dataViewMore?.email === "" ||
                          !dataViewMore?.email
                            ? "No data"
                            : dataViewMore?.email,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Phone:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.phone === null ||
                          dataViewMore?.phone === "" ||
                          !dataViewMore?.phone
                            ? "No data"
                            : dataViewMore?.phone,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Pincode:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.pincode === null ||
                          dataViewMore?.pincode === "" ||
                          !dataViewMore?.pincode
                            ? "No data"
                            : dataViewMore?.pincode,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Permanent DLnumber:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.permanentDLnumber === null ||
                          dataViewMore?.permanentDLnumber === "" ||
                          !dataViewMore?.permanentDLnumber
                            ? "No data"
                            : dataViewMore?.permanentDLnumber,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Issue Date:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.issueDate === null ||
                          dataViewMore?.issueDate === "" ||
                          !dataViewMore?.issueDate
                            ? "No data"
                            : dataViewMore?.issueDate,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Valid Till:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.validTill === null ||
                          dataViewMore?.validTill === "" ||
                          !dataViewMore?.validTill
                            ? "No data"
                            : dataViewMore?.validTill,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Authority:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.Authority === null ||
                          dataViewMore?.Authority === "" ||
                          !dataViewMore?.Authority
                            ? "No data"
                            : dataViewMore?.Authority,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Blood Group:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.bloodGroup === null ||
                          dataViewMore?.bloodGroup === "" ||
                          !dataViewMore?.bloodGroup
                            ? "No data"
                            : dataViewMore?.bloodGroup,
                      }}
                      className=""
                    />
                  </div>

                  <div className="honda-text-grid-items">
                    <span>Authority City:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.authoritycity === null ||
                          dataViewMore?.authoritycity === "" ||
                          !dataViewMore?.authoritycity
                            ? "No data"
                            : dataViewMore?.authoritycity,
                      }}
                      className=""
                    />
                  </div>
                  <div className="honda-text-grid-items">
                    <span>Authority District:</span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          dataViewMore?.authoritydistrict === null ||
                          dataViewMore?.authoritydistrict === "" ||
                          !dataViewMore?.authoritydistrict
                            ? "No data"
                            : dataViewMore?.authoritydistrict,
                      }}
                      className=""
                    />
                  </div>
                </div>
                <div className="other-information-child-text-style">
                  <h2>Other Information</h2>
                </div>
                <div className="honda-text-grid-new">
                  <div className="honda-text-grid-new-items">
                    <span>Photo:</span>
                    <div className="card-main-border-image">
                      {dataViewMore?.passportPhoto === null ||
                      dataViewMore?.passportPhoto === "" ||
                      !dataViewMore?.passportPhoto ? (
                        "No Data"
                      ) : (
                        <img src={dataViewMore?.passportPhoto} alt="No Image" />
                      )}
                    </div>
                  </div>
                  <div className="honda-text-grid-new-items">
                    <span>Driving License Image:</span>
                    <div className="card-main-border-image">
                      {dataViewMore?.drivingLicense === null ||
                      dataViewMore?.drivingLicense === "" ||
                      !dataViewMore?.drivingLicense ? (
                        "No Data"
                      ) : (
                        <img
                          src={dataViewMore?.drivingLicense}
                          alt="No Image"
                        />
                      )}
                    </div>
                  </div>
                  <div className="honda-text-grid-new-items">
                    <span>ID Proof:</span>
                    <div className="card-main-border-image">
                      {dataViewMore?.IDproof === null ||
                      dataViewMore?.IDproof === "" ||
                      !dataViewMore?.IDproof ? (
                        "No Data"
                      ) : (
                        <img src={dataViewMore?.IDproof} alt="No Image" />
                      )}
                    </div>
                  </div>
                  <div className="honda-text-grid-new-items">
                    <span>Medical Certificate:</span>
                    <div className="card-main-border-image">
                      {dataViewMore?.medicalCertificate === null ||
                      dataViewMore?.medicalCertificate === "" ||
                      !dataViewMore?.medicalCertificate ? (
                        "No Data"
                      ) : (
                        <img
                          src={dataViewMore?.medicalCertificate}
                          alt="No Image"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}

      {isPaymentPopUp ? (
        <Dialog
          fullScreen
          open={isPaymentPopUp}
          onClose={handlePaymentClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handlePaymentClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {isPaymentPopUp === true ? (
              <div className="honda-container">
                <div className="honda-container-height">
                  <div className="honda-text-grid">
                    <div className="honda-text-grid-items">
                      <span>Receipt Amount:</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            dataForPayment?.courseName[0]?.price === null ||
                            dataForPayment?.courseName[0]?.price === "" ||
                            !dataForPayment?.courseName[0]?.price
                              ? "No data"
                              : dataForPayment?.courseName[0]?.price,
                        }}
                        className=""
                      />
                    </div>
                    <div className="honda-text-grid-items">
                      <span>Receipt Id:</span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            dataForPayment?._id === null ||
                            dataForPayment?._id === "" ||
                            !dataForPayment?._id
                              ? "No data"
                              : dataForPayment?._id,
                        }}
                        className=""
                      />
                    </div>
                    <div className="honda-text-grid-items">
                      <span>User Name:</span>
                      <p>
                        {dataForPayment?.fname} {dataForPayment?.mname}{" "}
                        {dataForPayment?.lname}
                      </p>
                    </div>
                    <select
                      className={`form-control form-control-lg form-control-solid`}
                      name="paymentType"
                      value={inputValueForAdd.paymentType}
                      onChange={(e) => {
                        handleOnChnageAdd(e);
                      }}
                    >
                      <option>Select Type</option>
                      <option value="Cash">Cash </option>
                      <option value="UPI">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Prepaid card">Prepaid card</option>
                      <option value="Net banking">Net banking </option>
                      <option value="Mobile wallet">Mobile wallet </option>
                      <option value="Other">Other.. </option>
                    </select>
                    <span
                      style={{
                        color: "red",
                        top: "5px",
                        fontSize: "12px",
                      }}
                    >
                      {errorsForAdd["paymentType"]}
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    onClick={(e) => {
                      handleOfflinePayment(e);
                    }}
                    className="btn btn-succes mr-2"
                  >
                    Make A Payment
                  </button>
                </div>
              </div>
            ) : null}
          </List>
        </Dialog>
      ) : null}

      {modelForUserLogs ? (
        <Dialog
          fullScreen
          open={modelForUserLogs}
          onClose={handleCloseForUserLogs}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseForUserLogs}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <List>
            {modelForUserLogs === true ? (
              <>
                <div className="honda-container">
                  <div className="tab-design">
                    <ul>
                      {/* <li
                        className={tabs === 'pre' ? "tab-active" : ""}
                        onClick={(e) => handleOnClicks(e, "pre")}
                      >
                        Pre Login
                      </li> */}
                      <li
                        className={tabs === "post" ? "tab-active" : ""}
                        onClick={(e) => handleOnClicks(e, "post")}
                      >
                        Post Login
                      </li>
                    </ul>
                  </div>
                  {/* {tabs === 'pre' && (
                    <div>


                      <div className="other-information-child-text-style1">
                        <h2>User Pre Login Log</h2>
                      </div>
                      <div className="honda-container-height">
                        <div
                          className="cursor-pointer pl-2"
                        >
                          <CsvDownload
                            className={``}
                            data={dataCSVLogs}
                            filename="User Pre Login Report.csv"
                            style={{
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
                        <div className="honda-text-grid">

                          <div className="honda-text-grid-items">
                            <DataTable
                              columns={columnsForUserLogs}
                              data={logsData}
                              customStyles={customStyles}
                              style={{
                                marginTop: "-3rem",
                              }}
                              progressPending={isLoaderVisible}
                              progressComponent={
                                <Loader
                                  type="Puff"
                                  color="#334D52"
                                  height={30}
                                  width={30}
                                />
                              }
                              highlightOnHove
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                  {tabs === "post" && (
                    <div>
                      <div className="other-information-child-text-style1">
                        <h2>User Post Login Log</h2>
                      </div>
                      <div className="honda-container-height">
                        <div className="cursor-pointer pl-2">
                          <CsvDownload
                            className={``}
                            data={dataCSVPostLogs}
                            filename="User Post Login Report.csv"
                            style={{
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
                        <div className="honda-text-grid">
                          <div className="honda-text-grid-items">
                            <DataTable
                              columns={columnsForUserLogsPost}
                              data={logsPostData}
                              customStyles={customStyles}
                              style={{
                                marginTop: "-3rem",
                              }}
                              progressPending={isLoaderVisible}
                              progressComponent={
                                <Loader
                                  type="Puff"
                                  color="#334D52"
                                  height={30}
                                  width={30}
                                />
                              }
                              highlightOnHove
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </List>
        </Dialog>
      ) : null}
        {modalOpens && (
        <div className="feedback-background-blur">
          <div className="feedback-modals">
            <div className="modal-header">
              <h1>Cancel Booking</h1>
              <i
                onClick={() => setModalOpens(false)}
                className="fas fa-times"
              ></i>
            </div>
            <div className="modal-body">
              <h2 className="text-center">
                Please confirm cancellation{" "}
              </h2>
              <div className="d-flex center">
                <div
                  className="cancel-booking ml3"
                  onClick={(e) => cancelBooking(allData)}
                >
                  Continue
                </div>
                <div
                  className="cancel-booking"
                  onClick={() => setModalOpens(!modalOpens)}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
