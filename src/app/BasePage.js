import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "../_metronic/layout";
import User from "../_metronic/components/User/User";
import DashboardPage from "./pages/DashboardPage";
import CourseName from '../_metronic/components/CourseSelection/CourseName'
import CourseCategory from '../_metronic/components/CourseSelection/CourseCategory'
import CourseType from '../_metronic/components/CourseSelection/CourseType'
import VehicleCategory from '../_metronic/components/CourseSelection/VehicleCategory'
import Cms from '../_metronic/components/Cms/Cms'
import Information from '../_metronic/components/Information/Information'
import ContactUs from "../_metronic/components/ContactUs/ContactUs";
import Payment from "../_metronic/components/Payment/Payment";
import Announcement from "../_metronic/components/Announcement/Announcement";
import Banner from "../_metronic/components/Banner/Banner";
import Description from "../_metronic/components/Description/Description";
import Clients from "../_metronic/components/Clients/Clients";

import Feedback from "../_metronic/components/Feedback/Feedback";
import TimeSlot from "../_metronic/components/TimeSlot/TimeSlot";
import FAQ from "../_metronic/components/FAQ/FAQ";
import Batch from "../_metronic/components/Batch/Batch";
import { getUserInfo } from "../../src/utils/user.util";
import PaymentData from "../_metronic/components/PaymentForm/payment";
import Examiner from "../_metronic/components/Examiner/Examiner";
// import QuestionSet from "../_metronic/components/QuestionSet/QuestionSet";
import Question from "../_metronic/components/Question/Question";
import Menu from "../_metronic/components/Menu/menu";
import Assign from "../_metronic/components/Assign/Assign";
import TakeTest from "../_metronic/components/TakeTest/TakeTest";
import CheckQuestion from "../_metronic/components/CheckQuestion/CheckQuestion";
import CheckTest from "../_metronic/components/CheckQuestion/CheckQuestion";
import Testomonial from "../_metronic/components/Testomonial/Testomonial";
import HelpfulTips from "../_metronic/components/HelpfulTips/HelpfulTips";

export default function BasePage() {
  let userInfo = getUserInfo()

  return (
    <>

      <Suspense fallback={<LayoutSplashScreen />}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <ContentRoute exact path="/dashboard" component={DashboardPage} />
          <ContentRoute exact path="/menu" component={Menu} />
          <ContentRoute exact path="/assign" component={Assign} />


          <ContentRoute exact path="/cms" component={Cms} />
          <ContentRoute exact path="/information" component={Information} />
          <ContentRoute exact path="/coursename" component={CourseName} />
          <ContentRoute exact path="/coursecategory" component={CourseCategory} />
          <ContentRoute exact path="/coursetype" component={CourseType} />
          <ContentRoute exact path="/vehiclecategory" component={VehicleCategory} />
          <ContentRoute exact path="/user" component={User} />
          <ContentRoute exact path="/payment" component={Payment} />
          <ContentRoute exact path="/take-test" component={TakeTest} />
          <ContentRoute exact path="/check-question" component={CheckTest} />
          <ContentRoute exact path="/testomonial" component={Testomonial} />
          <ContentRoute exact path="/helpful-tips" component={HelpfulTips} />


          <ContentRoute exact path="/announcement" component={Announcement} />
          {/* /////////////////////////////////////////////////////////////////////////*/}
          <ContentRoute exact path="/banner" component={Banner} />
          <ContentRoute exact path="/banner-description" component={Description} />
          <ContentRoute exact path="/clients" component={Clients} />

          <ContentRoute exact path="/timeslot" component={TimeSlot} />
          <ContentRoute exact path="/feedback" component={Feedback} />
          <ContentRoute exact path="/faq" component={FAQ} />
          <ContentRoute exact path="/batch" component={Batch} />
          <ContentRoute exact path="/examiner" component={Examiner} />
          <ContentRoute exact path="/question" component={Question} />


          {/* /////////////////////////////////////////////////////////////////////////*/}

          <ContentRoute exact path="/contact-us" component={ContactUs} />
          <ContentRoute exact path="/role" component={Examiner} />




          <Redirect to="error/error-v6" />
        </Switch>
      </Suspense>

    </>
  );
}
