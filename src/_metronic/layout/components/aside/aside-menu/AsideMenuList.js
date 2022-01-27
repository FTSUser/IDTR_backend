/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import { getUserInfo } from "../../../../../utils/user.util";
export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  let userInfo = getUserInfo();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${
          !hasSubmenu && "menu-item-active"
        } menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      {userInfo?.admin?.role?.roleName === "superadmin" && (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          {/*begin::1 Dashboard*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/dashboard",
              true
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink className="menu-link" to="/dashboard">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/dashboard.png" /> 
              </span>
              <span className="menu-text">Dashboard</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/user", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/user">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/user.png" /> 
              </span>
              <span className="menu-text">User</span>
            </NavLink>
          </li>
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/courseselection",
              true
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
          >
            <NavLink
              className="menu-link menu-toggle"
              to="/courseselection/vehiclecategory"
            >
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/course.png" /> 
              </span>
              <span className="menu-text">Course Selection</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <i className="menu-arrow" />
              <ul className="menu-subnav">
                {/* Inputs */}
                {/*begin::2 Level*/}
                <li
                  className={`menu-item menu-item-submenu  ${getMenuItemActive(
                    "/vehiclecategory",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link"
                    to="/courseselection/vehiclecategory"
                  >
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Vehicle Category</span>
                  </NavLink>
                </li>
                <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                    "/coursetype",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link"
                    to="/courseselection/coursetype"
                  >
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Course Type</span>
                  </NavLink>
                </li>

                <li
                  className={`menu-item menu-item-submenu ${getMenuItemActive(
                    "/coursename",
                    false
                  )}`}
                  aria-haspopup="true"
                  data-menu-toggle="hover"
                >
                  <NavLink
                    className="menu-link"
                    to="/courseselection/coursename"
                  >
                    <i className="menu-bullet menu-bullet-dot">
                      <span />
                    </i>
                    <span className="menu-text">Course Name</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/cms", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/cms">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/CMs.png" /> 
              </span>
              <span className="menu-text">CMS</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/information", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/information">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Information</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/timeslot", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/timeslot">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/time.png" /> 
              </span>
              <span className="menu-text">TimeSlot</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/payment", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/payment">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/makemoney.png" /> 
              </span>
              <span className="menu-text">Payment</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/announcement", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/announcement">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/annoncment.png" /> 
              </span>
              <span className="menu-text">Announcement</span>
            </NavLink>
          </li>

        {/* ///////////////////////////////////////////////////////////////////////// */}

        <li
            className={`menu-item ${getMenuItemActive("/banner", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/banner">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Banner</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/description", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/description">
              <span className="svg-icon menu-icon">
                <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                />
              </span>
              <span className="menu-text">Banner Description</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/clients", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/clients">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/client.png" /> 
              </span>
              <span className="menu-text">Clients</span>
            </NavLink>
          </li>

          {/* //////////////////////////////////////////////////////////////////////////////////// */}
          <li
            className={`menu-item ${getMenuItemActive("/feedback", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/feedback">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/feedback.png" /> 
              </span>
              <span className="menu-text">FeedBack</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/contactus", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/contactus">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/contactus.png" /> 
              </span>
              <span className="menu-text">Contact-Us</span>
            </NavLink>
          </li>
          <li
            className={`menu-item ${getMenuItemActive("/faq", false)}`}
            aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/faq">
              <span className="svg-icon menu-icon">
                {/* <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                /> */}
                <img src="media/allIconsForTable/FAQ.png" /> 
              </span>
              <span className="menu-text">FAQ</span>
            </NavLink>
          </li>
        </ul>
      )}
      {/* end::Menu Nav */}
    </>
  );
}
