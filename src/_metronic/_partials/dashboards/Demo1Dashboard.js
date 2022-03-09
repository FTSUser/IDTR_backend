import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getLatLng } from "use-places-autocomplete";
import { ApiGet } from "../../../helpers/API/ApiData";
import { getUserInfo } from "../../../utils/user.util";
import {
  MixedWidget1, StatsWidget11,
  // StatsWidget11,
  // StatsWidget12
} from "../widgets";
// import TextField from "@material-ui/core/TextField";
// import { Button } from "react-bootstrap";
// import { ApiPost } from "../../../helpers/API/ApiData";
export function Demo1Dashboard() {
  const [count, setCount] = useState();
  let userInfo = getUserInfo();


  const getAll = async () => {
    await ApiGet(
      `admin/count`
    )
      .then((res) => {
        console.log("data", res.data.payload);
        setCount(res?.data?.payload);
      })
      .catch((err) => { });
  }

  useEffect(() => {
    console.log("userInfo", userInfo);
    if (userInfo?.admin[0]?.role?.roleName === 'superadmin') {
      getAll()
    }
  })
  return (
    <>
      {

        userInfo?.admin[0]?.role?.roleName != 'superadmin'  &&
        <div className="row" >
          <div className="col-lg-12 col-xxl-12 p-0">
            <MixedWidget1 className="card-stretch gutter-b" />
          </div>
        </div>
      }


      {
        userInfo?.admin[0]?.role?.roleName === 'superadmin' &&

        <div className="row align-items-center">
          <div className="col-lg-4 col-xxl-4 mb-5 ">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>User</h1></div>
                  <div>
                    <h3>{count?.Users}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Vehicle Category</h1></div>
                  <div>
                    <h3>{count?.vehicleCategory}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Course Category</h1></div>
                  <div>
                    <h3>{count?.courseCategory}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Course Name</h1></div>
                  <div>
                    <h3>{count?.courseName}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Course Type</h1></div>
                  <div>
                    <h3>{count?.courseType}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Data Entery</h1></div>
                  <div>
                    <h3>{count?.dataEntrys}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-xxl-4 mb-5">
            <div className="card card-custom py-5">
              <div className="card-body p-0 text-center">
                <div className="">
                  <div className="mb-3"><h1>Examiner</h1></div>
                  <div>
                    <h3>{count?.examiners}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  );
}
