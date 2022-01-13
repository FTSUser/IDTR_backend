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
import { ApiPutNoAuth,  } from "../../../helpers/API/ApiData"

import * as authUtil from '../../../utils/auth.util'
import * as userUtil from '../../../utils/user.util'

import { get } from "lodash";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import OtpInput from 'react-otp-input';

import "./OTP-Verification.scss";


// const handleChange = () => {}
// const verifyOTPCode = () => {



// }
// const sendVerificationCode = () => {}
// const otp = () => {}

const OTPVerification = () => {

  const [otp, setOtp] = useState("");

  const location = useLocation();
  const history = useHistory();

  // useEffect(() => {
  //   document.title = "OTP | BD-Pharma";
  //   sendVerificationCode();
  // }, []);

  const sendVerificationCode = (e) => {
    // e.preventdefault();

    ApiPutNoAuth("admin/verify-code", { phone: location?.state?.phone })
      .then((res) => {
        console.log("RES", res);
        if (res.data.result == 0) {
          console.log(res.data);

          toast.success(res.data.message, { theme: "colored" });
          // history.push( "/dashboard")
        } else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err?.message, { theme: "colored" });
      });
  };

  const verifyOTPCode = () => {
    if (otp.length != 4) {
      toast.info("Please enter 4 digit code", { theme: "colored" });
      return;
    }
    ApiPutNoAuth("admin/verify-code", {
      phone: location?.state?.phone,
      code: otp,
    })
      .then(async (res) => {
        if (res.data.result == 0) {
          console.log(res.data);
           authUtil.setToken(res.data.payload.token);
            userUtil.setUserInfo(res.data.payload);
          //  history.push("/dashboard")
          window.location.reload()
        } else {
          toast.error(res.data.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  const handleChange = (e) => {
    console.log("e", e);
    setOtp(e);
  };

  const handleOTP = (e) => {
    console.log("e", e);
    setOtp(e);
  };

  // const history = useHistory()
  // const location = useLocation()
//   console.log("email",history?.location?.state?.email);

//   useEffect(() => {
//     if(!history?.location?.state?.email) {
//       history.goBack()
//     }
//   },[])

    return (
      <div>
      <div>
        <div className="container-fluid">
          <div className="otp-box-center">
            <div className="otp-box-design">
              <div className="otp-in-grid">
                <div className="otp-in-grid-items">
                  <div className="otp-box-logo-center">
                    <NavLink to="/">
                      {/* <img src={Logo} alt="Logo" /> */}
                    </NavLink>
                  </div>
                  <ToastContainer />
                  <div className="otp-text-style">
                    <h3>
                      Thank you for your interest in exploring BD-Pharma
                      <sup>TM</sup>
                    </h3>
                    <p>
                      To continue with the sign up process, please check your
                      email for the one time passcode. If you don't receive the
                      OTP in 5 minutes, please check your junkmail.
                    </p>
                  </div>
                  <div className="without-signup">
                    <h5>Enter 6 digit otp</h5>
                  </div>
                  <div className="otp-input-style">
                    {/* <input className="otp-input" /> */}
                    <OtpInput
                      inputStyle="otp-input"
                      value={otp}
                      onChange={(e)=>handleOTP(e)}
                      numInputs={4}
                      isInputNum={true}
                    />
                  </div>
                  <div className="verify-button-center">
                    {/* <NavLink to="/profile"> */}
                    <button onClick={verifyOTPCode}>Verify</button>
                    {/* </NavLink> */}
                  </div>
                  <div className="otp-link-style">
                    <span>Haven't received OTP?</span>
                    <p
                      className="cursor-pointer"
                      onClick={sendVerificationCode}
                    >
                      Resend now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
};

export default OTPVerification;

