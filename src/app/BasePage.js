import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import User from "../_metronic/components/User/User";
import DashboardPage from "./pages/DashboardPage";
import CourseName from '../_metronic/components/CourseSelection/CourseName'
import CourseType from '../_metronic/components/CourseSelection/CourseType'
import VehicleCategory from '../_metronic/components/CourseSelection/VehicleCategory'
import AboutUs from '../_metronic/components/AboutUs/AboutUs'
import { getUserInfo } from "../../src/utils/user.util";
export default function BasePage() {
  let userInfo = getUserInfo();

  return (
    <>
      {userInfo?.user?.role?.roleName === "superadmin" ? (
        <Suspense fallback={<LayoutSplashScreen />}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            {/* <Redirect exact from="/auth/login" to="/dashboard" /> */}

            <Redirect exact from="/OTP-verification" to="/dashboard" />

            <ContentRoute exact path="/dashboard" component={DashboardPage} />
            <ContentRoute exact path="/aboutus" component={AboutUs} />

            <ContentRoute exact path="/courseselection/coursename" component={CourseName} />
            <ContentRoute exact path="/courseselection/coursetype" component={CourseType} />
            <ContentRoute exact path="/courseselection/vehiclecategory" component={VehicleCategory} />

            <ContentRoute exact path="/user" component={User} />
          
            <Redirect to="error/error-v6" />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
}
