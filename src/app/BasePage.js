import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import User from "../_metronic/components/User/User";
import DashboardPage from "./pages/DashboardPage";
import CourseName from '../_metronic/components/CourseSelection/CourseName'
import CourseType from '../_metronic/components/CourseSelection/CourseType'
import VehicleCategory from '../_metronic/components/CourseSelection/VehicleCategory'
import Cms from '../_metronic/components/Cms/Cms'
import ContactUs from "../_metronic/components/ContactUs/ContactUs";
import Payment from "../_metronic/components/Payment/Payment";
import Announcement from "../_metronic/components/Announcement/Announcement";
import Banner from "../_metronic/components/Banner/Banner";
import Description from "../_metronic/components/Description/Description";
import Clients from "../_metronic/components/Clients/Clients";

import Feedback from "../_metronic/components/Feedback/Feedback";
import TimeSlot from "../_metronic/components/TimeSlot/TimeSlot";
import FAQ from "../_metronic/components/FAQ/FAQ";

import { getUserInfo } from "../../src/utils/user.util";
import PaymentData from "../_metronic/components/PaymentForm/payment";
export default function BasePage() {
  let userInfo = getUserInfo()

  return (
    <>
      {userInfo?.admin?.role?.roleName === "superadmin" ? (
        <Suspense fallback={<LayoutSplashScreen />}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <ContentRoute exact path="/dashboard" component={DashboardPage} />
            <ContentRoute exact path="/cms" component={Cms} />
            <ContentRoute exact path="/courseselection/coursename" component={CourseName} />
            <ContentRoute exact path="/courseselection/coursetype" component={CourseType} />
            <ContentRoute exact path="/courseselection/vehiclecategory" component={VehicleCategory} />
            <ContentRoute exact path="/user" component={User} />
            <ContentRoute exact path="/payment" component={Payment} />
            {/* <ContentRoute exact path="/payment" component={PaymentData} /> */}

            <ContentRoute exact path="/announcement" component={Announcement} />
            {/* /////////////////////////////////////////////////////////////////////////*/}
            <ContentRoute exact path="/banner" component={Banner} />
            <ContentRoute exact path="/description" component={Description} />
            <ContentRoute exact path="/clients" component={Clients} />



            {/* /////////////////////////////////////////////////////////////////////////*/}

            <ContentRoute exact path="/timeslot" component={TimeSlot} />
            <ContentRoute exact path="/feedback" component={Feedback} />
            <ContentRoute exact path="/contactus" component={ContactUs} />
            <ContentRoute exact path="/faq" component={FAQ} />
            <Redirect to="error/error-v6" />
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
}
