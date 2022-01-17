import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import User from "../_metronic/components/User/User";
import Inventory from "../_metronic/components/Inventory/Inventory";
import MarketPlace from "../_metronic/components/MarketPlace/MarketPlace";
import Order from "../_metronic/components/Order/Order";
import DashboardPage from "./pages/DashboardPage";
import CourseName from '../_metronic/components/CourseSelection/CourseName'
import CourseType from '../_metronic/components/CourseSelection/CourseType'
import VehicleCategory from '../_metronic/components/CourseSelection/VehicleCategory'

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
            <ContentRoute exact path="/courseselection/coursename" component={CourseName} />
            <ContentRoute exact path="/courseselection/coursetype" component={CourseType} />
            <ContentRoute exact path="/courseselection/vehiclecategory" component={VehicleCategory} />

            <ContentRoute exact path="/user" component={User} />
            <ContentRoute exact path="/inventory" component={Inventory} />
            <ContentRoute exact path="/marketPlace" component={MarketPlace} />
            <ContentRoute exact path="/order" component={Order} />

            <Redirect to="error/error-v6" />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
}
